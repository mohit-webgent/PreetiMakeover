const prisma = require('../db');
const { sanitizeText } = require('../utils/validators');

/**
 * Slugify helper
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// =========================================================================
// 1. DASHBOARD & KPIS
// =========================================================================

async function getDashboardSummary(req, res, next) {
  try {
    const [
      pendingCount,
      confirmedCount,
      totalEnquiries,
      activeServicesCount,
      totalCategoriesCount,
      totalGalleryCount,
      pendingTestimonialsCount,
      recentAppointments
    ] = await Promise.all([
      prisma.appointment.count({ where: { status: 'PENDING' } }),
      prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
      prisma.appointment.count(),
      prisma.service.count({ where: { isActive: true } }),
      prisma.serviceCategory.count({ where: { isActive: true } }),
      prisma.galleryImage.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isApproved: false } }),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        pendingEnquiries: pendingCount,
        confirmedAppointments: confirmedCount,
        totalEnquiries,
        activeServicesCount,
        totalCategoriesCount,
        totalGalleryCount,
        pendingTestimonialsCount,
        recentAppointments
      }
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================================
// 2. APPOINTMENTS MANAGEMENT
// =========================================================================

async function getAppointments(req, res, next) {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const take = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * take;

    const where = {};

    if (status && ['PENDING', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status.toUpperCase())) {
      where.status = status.toUpperCase();
    }

    if (search && search.trim()) {
      const query = search.trim();
      where.OR = [
        { customerName: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query } },
        { serviceName: { contains: query, mode: 'insensitive' } }
      ];
    }

    const [total, appointments] = await Promise.all([
      prisma.appointment.count({ where }),
      prisma.appointment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          service: {
            select: { id: true, name: true, slug: true, startingPrice: true }
          }
        }
      })
    ]);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: pageNum,
        limit: take,
        totalPages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    next(error);
  }
}

async function updateAppointmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ['PENDING', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
    if (status && !validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.'
      });
    }

    const updateData = {};
    if (status) updateData.status = status.toUpperCase();
    if (adminNotes !== undefined) updateData.adminNotes = sanitizeText(adminNotes, 1000);

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================================
// 3. SERVICES & CATEGORIES MANAGEMENT
// =========================================================================

async function getAdminServices(req, res, next) {
  try {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { displayOrder: 'asc' },
      include: {
        services: {
          orderBy: { displayOrder: 'asc' }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
}

async function createService(req, res, next) {
  try {
    const { categoryId, name, description, startingPrice, durationMinutes, isFeatured, isActive, displayOrder } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Service name is required.' });
    }
    if (!categoryId) {
      return res.status(400).json({ success: false, message: 'Category is required.' });
    }

    const cleanName = sanitizeText(name, 120);
    let slug = slugify(cleanName);
    
    // Check slug collision
    const existingSlug = await prisma.service.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    let parsedPrice = null;
    if (startingPrice !== undefined && startingPrice !== null && startingPrice !== '') {
      const num = parseFloat(startingPrice);
      if (!isNaN(num) && num >= 0) parsedPrice = num;
    }

    const newService = await prisma.service.create({
      data: {
        categoryId,
        name: cleanName,
        slug,
        description: description ? sanitizeText(description, 500) : null,
        startingPrice: parsedPrice,
        durationMinutes: durationMinutes ? parseInt(durationMinutes, 10) : null,
        isFeatured: Boolean(isFeatured),
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        displayOrder: displayOrder ? parseInt(displayOrder, 10) : 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: newService
    });
  } catch (error) {
    next(error);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;
    const { categoryId, name, description, startingPrice, durationMinutes, isFeatured, isActive, displayOrder } = req.body;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    const updateData = {};
    if (name && name.trim()) {
      updateData.name = sanitizeText(name, 120);
    }
    if (categoryId) updateData.categoryId = categoryId;
    if (description !== undefined) {
      updateData.description = description ? sanitizeText(description, 500) : null;
    }
    if (startingPrice !== undefined) {
      if (startingPrice === null || startingPrice === '') {
        updateData.startingPrice = null;
      } else {
        const num = parseFloat(startingPrice);
        updateData.startingPrice = (!isNaN(num) && num >= 0) ? num : null;
      }
    }
    if (durationMinutes !== undefined) {
      updateData.durationMinutes = durationMinutes ? parseInt(durationMinutes, 10) : null;
    }
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (displayOrder !== undefined) updateData.displayOrder = parseInt(displayOrder, 10) || 0;

    const updated = await prisma.service.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function deleteService(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    await prisma.service.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const { name, description, displayOrder } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const cleanName = sanitizeText(name, 100);
    let slug = slugify(cleanName);
    const existing = await prisma.serviceCategory.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newCategory = await prisma.serviceCategory.create({
      data: {
        name: cleanName,
        slug,
        description: description ? sanitizeText(description, 500) : null,
        displayOrder: displayOrder ? parseInt(displayOrder, 10) : 0,
        isActive: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: newCategory
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================================
// 4. GALLERY MANAGEMENT
// =========================================================================

async function getAdminGallery(req, res, next) {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { displayOrder: 'asc' }
    });

    res.status(200).json({
      success: true,
      data: images
    });
  } catch (error) {
    next(error);
  }
}

async function createGalleryImage(req, res, next) {
  try {
    const { title, category, imageUrl, altText, displayOrder, isFeatured, isActive } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Image title is required.' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: 'Image category is required.' });
    }
    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({ success: false, message: 'Image URL is required.' });
    }

    // Basic URL validation
    const cleanUrl = imageUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('/')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid image URL (http/https or relative path).' });
    }

    const newImage = await prisma.galleryImage.create({
      data: {
        title: sanitizeText(title, 120),
        category: sanitizeText(category, 50),
        imageUrl: cleanUrl,
        altText: altText ? sanitizeText(altText, 200) : sanitizeText(title, 120),
        displayOrder: displayOrder ? parseInt(displayOrder, 10) : 0,
        isFeatured: Boolean(isFeatured),
        isActive: isActive !== undefined ? Boolean(isActive) : true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Gallery image added successfully.',
      data: newImage
    });
  } catch (error) {
    next(error);
  }
}

async function updateGalleryImage(req, res, next) {
  try {
    const { id } = req.params;
    const { title, category, imageUrl, altText, displayOrder, isFeatured, isActive } = req.body;

    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery image not found.' });
    }

    const updateData = {};
    if (title && title.trim()) updateData.title = sanitizeText(title, 120);
    if (category && category.trim()) updateData.category = sanitizeText(category, 50);
    if (imageUrl && imageUrl.trim()) updateData.imageUrl = imageUrl.trim();
    if (altText !== undefined) updateData.altText = sanitizeText(altText, 200);
    if (displayOrder !== undefined) updateData.displayOrder = parseInt(displayOrder, 10) || 0;
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await prisma.galleryImage.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Gallery image updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function deleteGalleryImage(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery image not found.' });
    }

    await prisma.galleryImage.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Gallery image removed successfully.'
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================================
// 5. TESTIMONIALS MODERATION
// =========================================================================

async function getAdminTestimonials(req, res, next) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
}

async function updateTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const { isApproved, clientName, serviceName, rating, reviewText, displayOrder } = req.body;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    const updateData = {};
    if (isApproved !== undefined) updateData.isApproved = Boolean(isApproved);
    if (clientName && clientName.trim()) updateData.clientName = sanitizeText(clientName, 100);
    if (serviceName !== undefined) updateData.serviceName = serviceName ? sanitizeText(serviceName, 100) : null;
    if (rating !== undefined) {
      const num = parseInt(rating, 10);
      if (!isNaN(num) && num >= 1 && num <= 5) updateData.rating = num;
    }
    if (reviewText && reviewText.trim()) updateData.reviewText = sanitizeText(reviewText, 1000);
    if (displayOrder !== undefined) updateData.displayOrder = parseInt(displayOrder, 10) || 0;

    const updated = await prisma.testimonial.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTestimonial(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }

    await prisma.testimonial.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Testimonial removed successfully.'
    });
  } catch (error) {
    next(error);
  }
}

// =========================================================================
// 6. BUSINESS SETTINGS MANAGEMENT
// =========================================================================

async function updateBusinessSettings(req, res, next) {
  try {
    const {
      businessName,
      tagline,
      ownerName,
      phone,
      whatsapp,
      email,
      address,
      openingHour,
      closingHour,
      weeklyOffDay,
      googleMapsUrl
    } = req.body;

    const updateData = {};
    if (businessName) updateData.businessName = sanitizeText(businessName, 100);
    if (tagline) updateData.tagline = sanitizeText(tagline, 200);
    if (ownerName) updateData.ownerName = sanitizeText(ownerName, 100);
    if (phone) updateData.phone = sanitizeText(phone, 30);
    if (whatsapp) updateData.whatsapp = sanitizeText(whatsapp, 30);
    if (email) updateData.email = sanitizeText(email, 100);
    if (address) updateData.address = sanitizeText(address, 300);
    if (openingHour) updateData.openingHour = sanitizeText(openingHour, 20);
    if (closingHour) updateData.closingHour = sanitizeText(closingHour, 20);
    if (weeklyOffDay) updateData.weeklyOffDay = sanitizeText(weeklyOffDay, 20);
    if (googleMapsUrl !== undefined) updateData.googleMapsUrl = googleMapsUrl ? googleMapsUrl.trim() : null;

    const updated = await prisma.businessSettings.upsert({
      where: { id: 'default' },
      update: updateData,
      create: {
        id: 'default',
        businessName: updateData.businessName || 'Preeti Makeover',
        tagline: updateData.tagline || 'Your Beauty Is Our Duty.',
        ownerName: updateData.ownerName || 'Preeti Mandal',
        phone: updateData.phone || '+918810359438',
        whatsapp: updateData.whatsapp || '+918810359438',
        email: updateData.email || 'preetimakeoverpm@gmail.com',
        address: updateData.address || 'D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044',
        openingHour: updateData.openingHour || '10:00 AM',
        closingHour: updateData.closingHour || '09:00 PM',
        weeklyOffDay: updateData.weeklyOffDay || 'Tuesday',
        googleMapsUrl: updateData.googleMapsUrl || null
      }
    });

    res.status(200).json({
      success: true,
      message: 'Business settings updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
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
};
