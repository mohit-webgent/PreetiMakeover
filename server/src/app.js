const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();

// Security Headers
app.use(helmet());

// CORS configuration: resolve and normalize allowed origins
function getAllowedOrigins() {
  const localDevOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000'
  ];

  const clientUrlEnv = process.env.CLIENT_URL;
  if (!clientUrlEnv) {
    return localDevOrigins;
  }

  // Parse single or comma-separated origins, strip surrounding quotes and trailing slashes
  const configuredOrigins = clientUrlEnv
    .split(',')
    .map(url => url.trim().replace(/^['"]|['"]$/g, '').replace(/\/+$/, ''))
    .filter(Boolean)
    .map(url => (/^https?:\/\//i.test(url) ? url : `https://${url}`));

  return [...new Set([...localDevOrigins, ...configuredOrigins])];
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (such as mobile apps, curl, server-to-server, Render health checks)
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.trim().replace(/\/+$/, '');
    const allowedOrigins = getAllowedOrigins();

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    // Reject disallowed origins cleanly without throwing a 500 Unhandled Server Error
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));

app.getAllowedOrigins = getAllowedOrigins;

// Request Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Global Rate Limiting for general API endpoints
const apiLimiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES, 10) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

app.use('/api/', apiLimiter);

// Health Check Endpoint (public, unauthenticated)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    business: 'Preeti Makeover API',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount Core REST API Endpoints
app.use('/api', apiRoutes);

// Root Info Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    business: 'Preeti Makeover',
    tagline: 'Your Beauty Is Our Duty.',
    apiStatus: 'online',
    healthCheck: '/api/health'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An internal server error occurred.' 
      : err.message || 'Internal server error'
  });
});

module.exports = app;
