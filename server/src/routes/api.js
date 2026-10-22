const express = require('express');
const rateLimit = require('express-rate-limit');

const { getAllServices, getServiceBySlug } = require('../controllers/servicesController');
const { createAppointmentEnquiry } = require('../controllers/appointmentController');
const { getBusinessSettings } = require('../controllers/settingsController');
const { adminLogin, getAdminProfile, changePassword } = require('../controllers/authController');
const {
  getDashboardSummary,
  getAppointments,
  updateAppointmentStatus,
  getAdminServices,
  createService,
  updateService,
  deleteService,
  createCategory,
  getAdminGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getAdminTestimonials,
  updateTestimonial,
  deleteTestimonial,
  updateBusinessSettings
} = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Specific Rate Limiter for Appointment Submissions (anti-spam)
const appointmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many appointment requests from this connection. Please wait a few minutes or message us on WhatsApp.'
  }
});

// Specific Rate Limiter for Admin Login (anti-brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.'
  }
});

// ==========================================
// Public Endpoints
// ==========================================

// Services Catalog
router.get('/services', getAllServices);
router.get('/services/:slug', getServiceBySlug);

// Appointment Enquiry (with anti-spam limiter)
router.post('/appointments', appointmentLimiter, createAppointmentEnquiry);

// Business Settings & Schedule
router.get('/settings', getBusinessSettings);

// Public Approved Testimonials Only
router.get('/testimonials', async (req, res, next) => {
  try {
    const prisma = require('../db');
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { displayOrder: 'asc' }
    });
    res.status(200).json({ success: true, data: testimonials });
  } catch (err) {
    next(err);
  }
});

// Public Gallery (Active items only)
router.get('/gallery', async (req, res, next) => {
  try {
    const prisma = require('../db');
    const images = await prisma.galleryImage.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' }
    });
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// Admin Authentication & Protected Endpoints
// ==========================================

// Login (Public with brute-force rate limiting)
router.post('/admin/login', loginLimiter, adminLogin);

// 1. Session & KPI Dashboard
router.get('/admin/me', authenticateAdmin, getAdminProfile);
router.post('/admin/change-password', authenticateAdmin, changePassword);
router.get('/admin/dashboard', authenticateAdmin, getDashboardSummary);

// 2. Appointment Management
router.get('/admin/appointments', authenticateAdmin, getAppointments);
router.patch('/admin/appointments/:id/status', authenticateAdmin, updateAppointmentStatus);

// 3. Services & Categories
router.get('/admin/services', authenticateAdmin, getAdminServices);
router.post('/admin/services', authenticateAdmin, createService);
router.put('/admin/services/:id', authenticateAdmin, updateService);
router.delete('/admin/services/:id', authenticateAdmin, deleteService);
router.post('/admin/categories', authenticateAdmin, createCategory);

// 4. Gallery Management
router.get('/admin/gallery', authenticateAdmin, getAdminGallery);
router.post('/admin/gallery', authenticateAdmin, createGalleryImage);
router.put('/admin/gallery/:id', authenticateAdmin, updateGalleryImage);
router.delete('/admin/gallery/:id', authenticateAdmin, deleteGalleryImage);

// 5. Testimonials Moderation
router.get('/admin/testimonials', authenticateAdmin, getAdminTestimonials);
router.put('/admin/testimonials/:id', authenticateAdmin, updateTestimonial);
router.delete('/admin/testimonials/:id', authenticateAdmin, deleteTestimonial);

// 6. Business Settings
router.put('/admin/settings', authenticateAdmin, updateBusinessSettings);

module.exports = router;
