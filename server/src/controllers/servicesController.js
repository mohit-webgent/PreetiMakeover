const prisma = require('../db');

/**
 * Get all active categories with their services
 */
async function getAllServices(req, res, next) {
  try {
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: categories,
      meta: {
        totalCategories: categories.length,
        totalServices: categories.reduce((acc, cat) => acc + cat.services.length, 0)
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get single service by slug
 */
async function getServiceBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        }
      }
    });

    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Service not found or is currently inactive.'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllServices,
  getServiceBySlug
};
