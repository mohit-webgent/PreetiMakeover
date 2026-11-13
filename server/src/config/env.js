/**
 * Centralised, validated environment configuration.
 * Every other module reads settings from here — never from process.env directly.
 */
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

function int(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

const DEV_JWT_SECRET = 'dev-only-local-secret-do-not-use-in-production-123456789';

const config = {
  nodeEnv: NODE_ENV,
  isProduction,
  isTest,
  port: int(process.env.PORT, 5000),
  databaseUrl: process.env.DATABASE_URL || '',
  clientUrl: process.env.CLIENT_URL || '',
  // Number of reverse proxies in front of the app (Render/Vercel = 1). Needed for correct client IPs.
  trustProxy: int(process.env.TRUST_PROXY, isProduction ? 1 : 0),
  jwt: {
    secret: process.env.JWT_SECRET || (isProduction ? '' : DEV_JWT_SECRET),
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  rateLimit: {
    windowMinutes: int(process.env.RATE_LIMIT_WINDOW_MINUTES, 15),
    maxRequests: int(process.env.RATE_LIMIT_MAX_REQUESTS, 300)
  },
  uploads: {
    maxBytes: int(process.env.UPLOAD_MAX_MB, 8) * 1024 * 1024,
    // When CLOUDINARY_URL is set, uploads go to Cloudinary (persistent). Otherwise local disk (dev only).
    cloudinaryUrl: process.env.CLOUDINARY_URL || '',
    cloudinaryFolder: process.env.CLOUDINARY_FOLDER || 'preeti-makeover'
  },
  salon: {
    whatsapp: process.env.SALON_WHATSAPP || '+918810359438'
  },
  // Owner alerts for new booking requests. Each channel is optional and enabled only when fully configured.
  notify: {
    adminUrl: (process.env.ADMIN_PANEL_URL || '').trim(),
    email: {
      host: process.env.SMTP_HOST || '',
      port: int(process.env.SMTP_PORT, 465),
      secure: (process.env.SMTP_SECURE || '').toLowerCase() !== 'false',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
      to: process.env.NOTIFY_EMAIL_TO || ''
    },
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || ''
    }
  }
};

/** Fail fast on misconfiguration in production instead of failing per-request later. */
function assertProductionConfig() {
  if (!isProduction) return;
  const missing = [];
  if (!config.databaseUrl) missing.push('DATABASE_URL');
  if (!config.jwt.secret) missing.push('JWT_SECRET');
  if (missing.length) {
    throw new Error(`FATAL: missing required environment variables: ${missing.join(', ')}`);
  }
  if (config.jwt.secret.length < 32) {
    throw new Error('FATAL: JWT_SECRET must be at least 32 characters in production.');
  }
  const { email, telegram } = config.notify;
  if (!(email.host && email.user && email.pass && email.to) && !(telegram.botToken && telegram.chatId)) {
    console.warn('[config] No owner notification channel configured (SMTP_* or TELEGRAM_*): new bookings will only appear in the admin panel.');
  }
  if (!config.uploads.cloudinaryUrl) {
    console.warn('[config] CLOUDINARY_URL not set: uploaded images will be stored on local disk and lost on redeploy.');
  }
}

/** True when DATABASE_URL points at this machine (the only case where we may auto-start Postgres). */
function isLocalDatabase() {
  try {
    const { hostname } = new URL(config.databaseUrl);
    return ['localhost', '127.0.0.1', '::1'].includes(hostname);
  } catch {
    return false;
  }
}

module.exports = { config, assertProductionConfig, isLocalDatabase, DEV_JWT_SECRET };
