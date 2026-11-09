const express = require('express');
const { getAllServices, getServiceBySlug } = require('../controllers/servicesController');
const { createAppointmentEnquiry } = require('../controllers/appointmentController');
const { getBusinessSettings } = require('../controllers/settingsController');
const { getPublicContent } = require('../controllers/contentController');
const { getApprovedTestimonials, getActiveGallery, submitTestimonial } = require('../controllers/publicController');
const { appointmentLimiter, reviewLimiter } = require('../middleware/rateLimiters');

const router = express.Router();

router.get('/services', getAllServices);
router.get('/services/:slug', getServiceBySlug);
router.get('/settings', getBusinessSettings);
router.get('/content', getPublicContent);
router.get('/gallery', getActiveGallery);
router.get('/testimonials', getApprovedTestimonials);

router.post('/appointments', appointmentLimiter, createAppointmentEnquiry);
router.post('/testimonials', reviewLimiter, submitTestimonial);

module.exports = router;
