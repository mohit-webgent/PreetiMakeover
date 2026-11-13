const express = require('express');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiters');
const { uploadSingleImage } = require('../middleware/upload');
const { adminLogin, getAdminProfile, changePassword } = require('../controllers/authController');
const { listContent, updateContentItem, saveContentBatch } = require('../controllers/contentController');
const { uploadImage } = require('../controllers/uploadController');
const admin = require('../controllers/adminController');
const cache = require('../services/cache');

const router = express.Router();

// Public (brute-force limited)
router.post('/login', loginLimiter, adminLogin);

// Everything below requires a valid admin session
router.use(authenticateAdmin);

// Any successful admin write invalidates the public read cache so the live site updates immediately.
router.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.on('finish', () => {
      if (res.statusCode < 400) cache.clear();
    });
  }
  next();
});

// Session
router.get('/me', getAdminProfile);
router.post('/change-password', changePassword);
router.get('/dashboard', admin.getDashboardSummary);

// Appointments
router.get('/appointments', admin.getAppointments);
router.get('/appointments/export.csv', admin.exportAppointmentsCsv);
router.patch('/appointments/:id/status', admin.updateAppointmentStatus);

// Services & categories
router.get('/services', admin.getAdminServices);
router.post('/services', admin.createService);
router.put('/services/:id', admin.updateService);
router.delete('/services/:id', admin.deleteService);
router.post('/categories', admin.createCategory);
router.put('/categories/:id', admin.updateCategory);
router.delete('/categories/:id', admin.deleteCategory);

// Gallery
router.get('/gallery', admin.getAdminGallery);
router.post('/gallery', admin.createGalleryImage);
router.put('/gallery/:id', admin.updateGalleryImage);
router.delete('/gallery/:id', admin.deleteGalleryImage);

// Testimonials
router.get('/testimonials', admin.getAdminTestimonials);
router.post('/testimonials', admin.createTestimonial);
router.put('/testimonials/:id', admin.updateTestimonial);
router.delete('/testimonials/:id', admin.deleteTestimonial);

// Business settings
router.put('/settings', admin.updateBusinessSettings);

// Website CMS content (batch route must come before /:key)
router.get('/content', listContent);
router.put('/content/batch/save', saveContentBatch);
router.put('/content/:key', updateContentItem);

// Media upload
router.post('/upload', uploadSingleImage, uploadImage);

module.exports = router;
