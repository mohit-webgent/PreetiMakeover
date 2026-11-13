/**
 * Validation utilities for Preeti Makeover Backend
 */

/**
 * Validate and clean Indian mobile number
 * Must be 10 digits starting with 6, 7, 8, or 9
 * @param {string} phone
 * @returns {{ isValid: boolean, normalizedPhone?: string, error?: string }}
 */
function validateIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required.' };
  }

  // Remove spaces, hyphens, parentheses, and leading +91 or 0
  let cleaned = phone.trim().replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(cleaned)) {
    return { 
      isValid: false, 
      error: 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).' 
    };
  }

  return { isValid: true, normalizedPhone: `+91${cleaned}` };
}

/**
 * Validate appointment date
 * - Must be valid YYYY-MM-DD
 * - Cannot be in the past
 * - Cannot fall on the salon's weekly off day
 * @param {string} dateStr YYYY-MM-DD
 * @param {{ offDayIndex?: number, offDayName?: string }} [opts] weekly off day (0=Sun … 6=Sat, -1 = none). Defaults to Tuesday.
 * @returns {{ isValid: boolean, parsedDate?: Date, isToday?: boolean, error?: string, isClosedDay?: boolean, isTuesday?: boolean, isPast?: boolean }}
 */
function validateAppointmentDate(dateStr, { offDayIndex = 2, offDayName = 'Tuesday' } = {}) {
  if (!dateStr || typeof dateStr !== 'string') {
    return { isValid: false, error: 'Preferred date is required.' };
  }

  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return { isValid: false, error: 'Date must be in YYYY-MM-DD format.' };
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1; // 0-indexed
  const day = parseInt(match[3], 10);

  // Construct date at noon UTC to prevent timezone shifts
  const targetDate = new Date(Date.UTC(year, month, day, 12, 0, 0));
  if (isNaN(targetDate.getTime()) || targetDate.getUTCDate() !== day) {
    return { isValid: false, error: 'Invalid calendar date provided.' };
  }

  // Calculate current date in IST (UTC +5:30)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const nowIst = new Date(now.getTime() + istOffset);
  const todayIstDateOnly = new Date(Date.UTC(
    nowIst.getUTCFullYear(),
    nowIst.getUTCMonth(),
    nowIst.getUTCDate(),
    12, 0, 0
  ));

  // Check if date is in the past
  if (targetDate.getTime() < todayIstDateOnly.getTime()) {
    return {
      isValid: false,
      isPast: true,
      error: 'Requested date cannot be in the past. Please select today or a future date.'
    };
  }

  // Weekly off day (0=Sun, 1=Mon, 2=Tue, ...)
  if (offDayIndex >= 0 && targetDate.getUTCDay() === offDayIndex) {
    return {
      isValid: false,
      isClosedDay: true,
      isTuesday: offDayIndex === 2,
      error: `Preeti Makeover is closed on ${offDayName}s (weekly off). Please choose another day.`
    };
  }

  return {
    isValid: true,
    parsedDate: targetDate,
    isToday: targetDate.getTime() === todayIstDateOnly.getTime()
  };
}

/** Minutes after midnight right now in India (IST, UTC+5:30). */
function nowIstMinutes() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return ist.getUTCHours() * 60 + ist.getUTCMinutes();
}

/**
 * Sanitize simple text inputs (strip HTML tags and limit length)
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
function sanitizeText(str, maxLen = 500) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim().substring(0, maxLen);
}

module.exports = {
  validateIndianPhone,
  validateAppointmentDate,
  nowIstMinutes,
  sanitizeText
};

/**
 * Validate an image/link URL supplied by an admin.
 * Allows https/http absolute URLs and site-relative paths ("/uploads/x.jpg"); blocks javascript:, data:, etc.
 */
function isSafeUrl(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  if (!v) return false;
  if (v.startsWith('/') && !v.startsWith('//')) return true;
  try {
    const u = new URL(v);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Parse an optional integer, returning `fallback` for empty/invalid input. */
function toInt(value, fallback = 0) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

module.exports.isSafeUrl = isSafeUrl;
module.exports.toInt = toInt;
