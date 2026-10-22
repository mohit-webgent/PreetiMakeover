const prisma = require('../db');
const { validateIndianPhone, validateAppointmentDate, sanitizeText } = require('../utils/validators');
const { generateSalonWhatsAppUrl } = require('../utils/whatsappHelper');

/**
 * Handle public appointment enquiry submission
 */
async function createAppointmentEnquiry(req, res, next) {
  try {
    const {
      customerName,
      phone,
      serviceId,
      serviceName: rawServiceName,
      preferredDate,
      preferredTime,
      message,
      // Honeypot spam field
      website,
      _hp
    } = req.body;

    // 1. Honeypot Spam Check: Bot filled invisible trap fields
    if (website || _hp) {
      // Silent discard to fool spam bots
      return res.status(200).json({
        success: true,
        message: 'Your enquiry has been received.'
      });
    }

    // 2. Validate Customer Name
    const sanitizedName = sanitizeText(customerName, 100);
    if (!sanitizedName || sanitizedName.length < 2) {
      return res.status(400).json({
        success: false,
        field: 'customerName',
        message: 'Please provide a valid name (minimum 2 characters).'
      });
    }

    // 3. Validate Phone Number
    const phoneValidation = validateIndianPhone(phone);
    if (!phoneValidation.isValid) {
      return res.status(400).json({
        success: false,
        field: 'phone',
        message: phoneValidation.error
      });
    }

    // 4. Validate Preferred Date (reject past dates and Tuesday bookings)
    const dateValidation = validateAppointmentDate(preferredDate);
    if (!dateValidation.isValid) {
      const statusCode = dateValidation.isTuesday ? 422 : 400;
      return res.status(statusCode).json({
        success: false,
        field: 'preferredDate',
        isTuesday: !!dateValidation.isTuesday,
        isPast: !!dateValidation.isPast,
        message: dateValidation.error
      });
    }

    // 5. Resolve Service and snapshot Service Name
    let matchedService = null;
    let finalServiceName = sanitizeText(rawServiceName, 100) || 'General Beauty Consultation';

    if (serviceId) {
      matchedService = await prisma.service.findUnique({
        where: { id: serviceId }
      });
      if (matchedService) {
        finalServiceName = matchedService.name;
      }
    } else if (rawServiceName) {
      // Attempt lookup by slug or exact name
      matchedService = await prisma.service.findFirst({
        where: {
          OR: [
            { name: { equals: rawServiceName, mode: 'insensitive' } },
            { slug: { equals: rawServiceName, mode: 'insensitive' } }
          ]
        }
      });
      if (matchedService) {
        finalServiceName = matchedService.name;
      }
    }

    // 6. Sanitize Time and Message
    const sanitizedTime = sanitizeText(preferredTime, 50);
    const sanitizedMessage = sanitizeText(message, 500);

    // 7. Save Appointment Enquiry to Database
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] ? sanitizeText(req.headers['user-agent'], 255) : null;

    const appointment = await prisma.appointment.create({
      data: {
        customerName: sanitizedName,
        phone: phoneValidation.normalizedPhone,
        serviceId: matchedService ? matchedService.id : null,
        serviceName: finalServiceName,
        preferredDate: dateValidation.parsedDate,
        preferredTime: sanitizedTime || null,
        message: sanitizedMessage || null,
        status: 'PENDING',
        ipAddress: typeof ipAddress === 'string' ? ipAddress.substring(0, 45) : null,
        userAgent
      }
    });

    // 8. Generate Salon WhatsApp Bridge URL
    const settings = await prisma.businessSettings.findUnique({ where: { id: 'default' } });
    const salonWhatsApp = settings?.whatsapp || '+918810359438';

    const whatsappUrl = generateSalonWhatsAppUrl({
      salonPhone: salonWhatsApp,
      customerName: sanitizedName,
      serviceName: finalServiceName,
      preferredDate,
      preferredTime: sanitizedTime,
      enquiryId: appointment.id
    });

    // 9. Response: Explicitly state enquiry received (NOT auto-confirmed)
    res.status(201).json({
      success: true,
      message: `Thank you, ${sanitizedName}! Your appointment enquiry has been received. Our team will contact you shortly to confirm your booking.`,
      isConfirmed: false,
      data: {
        id: appointment.id,
        customerName: appointment.customerName,
        phone: appointment.phone,
        serviceName: appointment.serviceName,
        preferredDate,
        preferredTime: appointment.preferredTime,
        status: appointment.status,
        whatsappUrl
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAppointmentEnquiry
};
