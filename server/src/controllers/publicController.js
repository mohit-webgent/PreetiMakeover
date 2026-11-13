const prisma = require('../db');
const cache = require('../services/cache');
const { HttpError, asyncHandler } = require('../utils/httpError');
const { sanitizeText, toInt } = require('../utils/validators');

const TTL = 5 * 60 * 1000;

const getApprovedTestimonials = asyncHandler(async (req, res) => {
  const data = await cache.remember('testimonials:approved', TTL, () =>
    prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }]
    })
  );
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data });
});

const getActiveGallery = asyncHandler(async (req, res) => {
  const data = await cache.remember('gallery:active', TTL, () =>
    prisma.galleryImage.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }]
    })
  );
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data });
});

/** Public review submission — stored unapproved until moderated in the admin panel. */
const submitTestimonial = asyncHandler(async (req, res) => {
  const { clientName, serviceName, rating, reviewText, website, _hp } = req.body || {};
  if (website || _hp) return res.status(200).json({ success: true, message: 'Thank you for your review!' });

  const name = sanitizeText(clientName, 100);
  const text = sanitizeText(reviewText, 1000);
  const stars = toInt(rating, 5);
  if (name.length < 2) throw new HttpError(400, 'Please provide your name.', { field: 'clientName' });
  if (text.length < 10) throw new HttpError(400, 'Please write at least a short sentence about your experience.', { field: 'reviewText' });
  if (stars < 1 || stars > 5) throw new HttpError(400, 'Rating must be between 1 and 5.', { field: 'rating' });

  await prisma.testimonial.create({
    data: { clientName: name, serviceName: sanitizeText(serviceName, 100) || null, rating: stars, reviewText: text, isApproved: false }
  });
  res.status(201).json({ success: true, message: 'Thank you! Your review will appear once approved by the salon.' });
});

module.exports = { getApprovedTestimonials, getActiveGallery, submitTestimonial };
