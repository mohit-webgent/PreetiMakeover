const fs = require('fs');
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

// ── CMS Content & Media Upload Configuration ──
const path = require('path');
const multer = require('multer');
const prisma = require('../db');

// Multer storage config for local uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const cleanExt = path.extname(file.originalname).toLowerCase();
    const safeName = file.originalname
      .replace(cleanExt, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e4);
    cb(null, `${safeName}_${uniqueSuffix}${cleanExt}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP, SVG, GIF) are allowed.'));
    }
  }
});

// Public GET: Fetch all website CMS content grouped by key and section
router.get('/content', async (req, res, next) => {
  try {
    const items = await prisma.siteContent.findMany();
    const structured = {};
    const keyMap = {};

    items.forEach(item => {
      keyMap[item.key] = item.value;
      if (!structured[item.section]) {
        structured[item.section] = {};
      }
      // Parse JSON types automatically
      if (item.type === 'json') {
        try {
          structured[item.section][item.key.replace(`${item.section}.`, '')] = JSON.parse(item.value);
        } catch {
          structured[item.section][item.key.replace(`${item.section}.`, '')] = item.value;
        }
      } else {
        structured[item.section][item.key.replace(`${item.section}.`, '')] = item.value;
      }
    });

    res.status(200).json({
      success: true,
      data: structured,
      rawMap: keyMap,
      count: items.length
    });
  } catch (error) {
    next(error);
  }
});

// Admin GET: List all editable content items
router.get('/admin/content', authenticateAdmin, async (req, res, next) => {
  try {
    const items = await prisma.siteContent.findMany({
      orderBy: [{ section: 'asc' }, { key: 'asc' }]
    });
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    next(error);
  }
});

// Admin PUT: Update single content item
router.put('/admin/content/:key', authenticateAdmin, async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value, label, type, section } = req.body;

    if (value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Value is required'
      });
    }

    const updated = await prisma.siteContent.upsert({
      where: { key },
      update: {
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
        ...(label && { label }),
        ...(type && { type }),
        ...(section && { section })
      },
      create: {
        key,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
        label: label || key,
        type: type || 'text',
        section: section || key.split('.')[0] || 'general'
      }
    });

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Content updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Admin PUT: Batch update multiple content items (e.g. saving an entire section)
router.put('/admin/content/batch/save', authenticateAdmin, async (req, res, next) => {
  try {
    const { items } = req.body; // Array of { key, value, label?, type?, section? }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    const operations = items.map(item =>
      prisma.siteContent.upsert({
        where: { key: item.key },
        update: {
          value: typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value),
          ...(item.label && { label: item.label }),
          ...(item.type && { type: item.type }),
          ...(item.section && { section: item.section })
        },
        create: {
          key: item.key,
          value: typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value),
          label: item.label || item.key,
          type: item.type || 'text',
          section: item.section || item.key.split('.')[0] || 'general'
        }
      })
    );

    const results = await prisma.$transaction(operations);

    res.status(200).json({
      success: true,
      message: `Successfully updated ${results.length} content fields`,
      count: results.length
    });
  } catch (error) {
    next(error);
  }
});

// Admin POST: Image Upload (File picker / Drag and drop)
router.post('/admin/upload', authenticateAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Image upload failed'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file was provided'
      });
    }

    // Relative public URL accessible via Express static /uploads
    const relativeUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      url: relativeUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      message: 'Image uploaded successfully'
    });
  });
});
