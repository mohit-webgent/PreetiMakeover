const jwt = require('jsonwebtoken');
const prisma = require('../db');

/**
 * Get JWT Secret safely, failing in production if not configured
 */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FATAL: JWT_SECRET environment variable is missing in production mode. Refusing to operate insecurely.');
    }
    return 'dev-only-local-secret-do-not-use-in-production-123456789';
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
      select: { id: true, email: true, name: true, role: true }
    });

    if (!adminUser) {
      return res.status(401).json({
        success: false,
        message: 'User account associated with this token no longer exists.'
      });
    }

    req.admin = adminUser;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticateAdmin,
  getJwtSecret
};
