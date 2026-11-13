const prisma = require('../db');
const { HttpError, asyncHandler } = require('../utils/httpError');
const { validateIndianPhone, validateAppointmentDate, nowIstMinutes, sanitizeText } = require('../utils/validators');
const { generateSalonWhatsAppUrl } = require('../utils/whatsappHelper');
const { getSettings, weeklyOffIndex, parseTimeToMinutes } = require('../services/settingsService');
const { notifyNewBooking } = require('../services/notifier');

const ACTIVE_STATUSES = ['PENDING', 'CONTACTED', 'CONFIRMED'];
// A same-day slot must be at least this far in the future to be bookable.
const SAME_DAY_LEAD_MINUTES = 30;

/** Resolve a service by id, or by exact name/slug, so the enquiry links to the catalogue when possible. */
async function resolveService(serviceId, rawServiceName) {
  if (serviceId) {
    const byId = await prisma.service.findUnique({ where: { id: String(serviceId) } });
    if (byId) return byId;
  }
  if (!rawServiceName) return null;
  return prisma.service.findFirst({
    where: {
      OR: [
        { name: { equals: rawServiceName, mode: 'insensitive' } },
        { slug: { equals: rawServiceName, mode: 'insensitive' } }
      ]
    }
  });
}

function toResponse(appointment, preferredDate, whatsappUrl) {
  return {
    id: appointment.id,
    customerName: appointment.customerName,
    phone: appointment.phone,
    serviceName: appointment.serviceName,
    preferredDate,
    preferredTime: appointment.preferredTime,
    status: appointment.status,
    whatsappUrl
  };
}

/**
 * Public appointment enquiry. Creates a PENDING request (never auto-confirmed),
 * returns a prefilled WhatsApp link and alerts the owner.
 */
const createAppointmentEnquiry = asyncHandler(async (req, res) => {
  const { customerName, phone, serviceId, serviceName: rawServiceName, preferredDate, preferredTime, message, website, _hp } = req.body || {};

  // Honeypot: silently accept so bots don't learn they were caught.
  if (website || _hp) {
    return res.status(200).json({ success: true, message: 'Your enquiry has been received.' });
  }

  const name = sanitizeText(customerName, 100);
  if (name.length < 2) {
    throw new HttpError(400, 'Please provide a valid name (minimum 2 characters).', { field: 'customerName' });
  }

  const phoneCheck = validateIndianPhone(phone);
  if (!phoneCheck.isValid) throw new HttpError(400, phoneCheck.error, { field: 'phone' });

  const settings = await getSettings();
  const offDayIndex = weeklyOffIndex(settings.weeklyOffDay);
  const dateCheck = validateAppointmentDate(preferredDate, { offDayIndex, offDayName: settings.weeklyOffDay });
  if (!dateCheck.isValid) {
    throw new HttpError(dateCheck.isClosedDay ? 422 : 400, dateCheck.error, {
      field: 'preferredDate',
      isClosedDay: !!dateCheck.isClosedDay,
      isTuesday: !!dateCheck.isTuesday,
      isPast: !!dateCheck.isPast
    });
  }

  const time = sanitizeText(preferredTime, 50);
  const slotMinutes = parseTimeToMinutes(time);
  if (time && slotMinutes !== null) {
    const open = parseTimeToMinutes(settings.openingHour);
    const close = parseTimeToMinutes(settings.closingHour);
    if (open !== null && close !== null && (slotMinutes < open || slotMinutes >= close)) {
      throw new HttpError(400, `Please choose a time between ${settings.openingHour} and ${settings.closingHour}.`, { field: 'preferredTime' });
    }
    if (dateCheck.isToday && slotMinutes < nowIstMinutes() + SAME_DAY_LEAD_MINUTES) {
      throw new HttpError(400, 'That time has already passed today. Please pick a later slot or another day.', { field: 'preferredTime', isPastTime: true });
    }
  }

  const service = await resolveService(serviceId, rawServiceName);
  const finalServiceName = service?.name || sanitizeText(rawServiceName, 100) || 'General Beauty Consultation';
  const whatsappFor = (appt) =>
    generateSalonWhatsAppUrl({
      salonPhone: settings.whatsapp,
      customerName: appt.customerName,
      serviceName: appt.serviceName,
      preferredDate,
      preferredTime: appt.preferredTime,
      enquiryId: appt.id
    });

  // Idempotency: the same person requesting the same service on the same day gets their existing request back.
  const existing = await prisma.appointment.findFirst({
    where: {
      phone: phoneCheck.normalizedPhone,
      preferredDate: dateCheck.parsedDate,
      serviceName: finalServiceName,
      status: { in: ACTIVE_STATUSES }
    },
    orderBy: { createdAt: 'desc' }
  });
  if (existing) {
    return res.status(200).json({
      success: true,
      duplicate: true,
      isConfirmed: existing.status === 'CONFIRMED',
      message: `We already have your request for ${finalServiceName} on this day, ${name}. Our team will contact you shortly.`,
      data: toResponse(existing, preferredDate, whatsappFor(existing))
    });
  }

  const ip = req.ip || req.socket?.remoteAddress;
  const appointment = await prisma.appointment.create({
    data: {
      customerName: name,
      phone: phoneCheck.normalizedPhone,
      serviceId: service?.id || null,
      serviceName: finalServiceName,
      preferredDate: dateCheck.parsedDate,
      preferredTime: time || null,
      message: sanitizeText(message, 500) || null,
      status: 'PENDING',
      ipAddress: typeof ip === 'string' ? ip.substring(0, 45) : null,
      userAgent: req.headers['user-agent'] ? sanitizeText(req.headers['user-agent'], 255) : null
    }
  });

  // Fire-and-forget: the customer never waits on email/Telegram delivery.
  notifyNewBooking({ ...appointment, preferredDate });

  res.status(201).json({
    success: true,
    isConfirmed: false,
    message: `Thank you, ${name}! Your appointment request has been received. Our team will contact you shortly to confirm.`,
    data: toResponse(appointment, preferredDate, whatsappFor(appointment))
  });
});

module.exports = { createAppointmentEnquiry };
