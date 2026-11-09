const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { config } = require('./config/env');
const { apiLimiter } = require('./middleware/rateLimiters');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { LOCAL_DIR } = require('./services/storage');
const apiRoutes = require('./routes');

const app = express();

// Behind Render/Vercel proxies: trust X-Forwarded-For so rate limits and logs see the real client IP.
app.set('trust proxy', config.trustProxy);
app.disable('x-powered-by');

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// ── CORS: local dev origins + CLIENT_URL (single or comma-separated, quotes/trailing slashes tolerated)
const LOCAL_DEV_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000'
];

function getAllowedOrigins() {
  const configured = (process.env.CLIENT_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/^['"]|['"]$/g, '').replace(/\/+$/, ''))
    .filter(Boolean)
    .map((url) => (/^https?:\/\//i.test(url) ? url : `https://${url}`));
  return [...new Set([...LOCAL_DEV_ORIGINS, ...configured])];
}

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header: curl, server-to-server, health checks, same-origin proxies
      if (!origin) return callback(null, true);
      return callback(null, getAllowedOrigins().includes(origin.trim().replace(/\/+$/, '')));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    optionsSuccessStatus: 200
  })
);
app.getAllowedOrigins = getAllowedOrigins;

if (!config.isTest) app.use(morgan(config.isProduction ? 'combined' : 'dev'));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health check (unauthenticated, not rate-limited)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    business: 'Preeti Makeover API',
    version: '1.1.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Locally stored uploads (development fallback when Cloudinary is not configured).
// nosniff + image-only files guarantee these are never rendered as HTML.
app.use(
  '/uploads',
  express.static(LOCAL_DIR, {
    maxAge: '30d',
    setHeaders: (res) => res.setHeader('X-Content-Type-Options', 'nosniff')
  })
);

app.use('/api', apiLimiter, apiRoutes);

app.get('/', (req, res) => {
  res.json({ business: 'Preeti Makeover', tagline: 'Your Beauty Is Our Duty.', apiStatus: 'online', healthCheck: '/api/health' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
