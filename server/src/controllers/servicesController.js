const prisma = require('../db');
const cache = require('../services/cache');
const { HttpError, asyncHandler } = require('../utils/httpError');

const TTL = 5 * 60 * 1000;

/** All active categories with their active services (cached until an admin edit). */
const getAllServices = asyncHandler(async (req, res) => {
  const categories = await cache.remember('services:all', TTL, () =>
    prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      include: { services: { where: { isActive: true }, orderBy: { displayOrder: 'asc' } } }
    })
  );

  res.set('Cache-Control', 'public, max-age=60');
  res.json({
    success: true,
    data: categories,
    meta: {
      totalCategories: categories.length,
      totalServices: categories.reduce((acc, cat) => acc + cat.services.length, 0)
    }
  });
});

/** Single active service by slug. */
const getServiceBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const service = await cache.remember(`services:${slug}`, TTL, () =>
    prisma.service.findUnique({
      where: { slug },
      include: { category: { select: { id: true, name: true, slug: true } } }
    })
  );

  if (!service || !service.isActive) throw new HttpError(404, 'Service not found or is currently inactive.');
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data: service });
});

module.exports = { getAllServices, getServiceBySlug };
