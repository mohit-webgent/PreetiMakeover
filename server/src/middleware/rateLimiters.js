const rateLimit = require('express-rate-limit');
const { config } = require('../config/env');

const base = { standardHeaders: true, legacyHeaders: false, skip: () => config.isTest };

const apiLimiter = rateLimit({
  ...base,
  windowMs: config.rateLimit.windowMinutes * 60 * 1000,
  max: config.rateLimit.maxRequests,
  message: { success: false, message: 'Too many requests from this IP, please try again in a few minutes.' }
});

const appointmentLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many appointment requests from this connection. Please wait a few minutes or message us on WhatsApp.' }
});

const loginLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
});

const reviewLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many reviews submitted. Please try again later.' }
});

module.exports = { apiLimiter, appointmentLimiter, loginLimiter, reviewLimiter };
