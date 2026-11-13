const jwt = require('jsonwebtoken');
const prisma = require('../db');
const { DEV_JWT_SECRET } = require('../config/env');

/**
 * Get JWT Secret safely, failing in production if not configured.
 * Read at call time (not from the frozen config) so a missing secret can never silently fall back in production.
 */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: JWT_SECRET environment variable is missing in production mode. Refusing to operate insecurely.');
    }
    return DEV_JWT_SECRET;
  }
  return secret;
}

/**
 * Authentication middleware for protected admin routes
 */
async function authenticateAdmin(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No authentication token provided.'
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      const secret = getJwtSecret();
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication session. Please log in again.'
      });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Malformed authentication token payload.'
      });
    }

    // Verify admin user still exists in database
    // Strictly select only safe fields (NEVER passwordHash)
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, passwordChangedAt: true }
    });

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: 'User account associated with this token no longer exists.'
      });
    }

    // Tokens issued before the last password change are revoked
    if (adminUser.passwordChangedAt && decoded.iat && decoded.iat < Math.floor(adminUser.passwordChangedAt.getTime() / 1000)) {
      return res.status(401).json({
        success: false,
        message: 'Your password was changed. Please log in again.'
      });
    }

    const { passwordChangedAt, ...safeAdmin } = adminUser;
    req.admin = safeAdmin;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticateAdmin,
  getJwtSecret
};
