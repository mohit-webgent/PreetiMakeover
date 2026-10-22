const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db');
const { getJwtSecret } = require('../middleware/authMiddleware');

/**
 * Admin Login
 */
async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const admin = await prisma.adminUser.findUnique({
      where: { email: cleanEmail }
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const secret = getJwtSecret();

    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      secret,
      { expiresIn: '24h' }
    );

    // Return only safe fields (NEVER passwordHash)
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get current admin session profile
 */
async function getAdminProfile(req, res) {
  // req.admin was already sanitized by authenticateAdmin middleware
  res.status(200).json({
    success: true,
    data: req.admin
  });
}

/**
 * Change Admin Password
 * Requires authenticated session and verification of current password
 */
async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirmation password do not match.'
      });
    }

    // Retrieve user including hash for comparison
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin account not found.'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect current password.'
      });
    }

    // Hash new password using 12 rounds of bcrypt
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash: newPasswordHash }
    });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully. Please keep your credentials secure.'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  adminLogin,
  getAdminProfile,
  changePassword
};
