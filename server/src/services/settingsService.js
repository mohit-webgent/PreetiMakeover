/**
 * Business settings: single source of truth for phone, WhatsApp, hours and weekly off day.
 */
const prisma = require('../db');
const cache = require('./cache');

const DEFAULT_SETTINGS = Object.freeze({
  businessName: 'Preeti Makeover',
  tagline: 'Your Beauty Is Our Duty.',
  ownerName: 'Preeti Mandal',
  phone: '+918810359438',
  whatsapp: '+918810359438',
  email: 'preetimakeoverpm@gmail.com',
  address: 'D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044',
  openingHour: '10:00 AM',
  closingHour: '09:00 PM',
  weeklyOffDay: 'Tuesday',
  googleMapsUrl: null
});

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Day index (0=Sun) of the weekly off day, or -1 when the salon is open every day. */
function weeklyOffIndex(dayName) {
  return DAY_NAMES.findIndex((d) => d.toLowerCase() === String(dayName || '').trim().toLowerCase());
}

/** "10:30 AM" → minutes after midnight, or null if unparseable. */
function parseTimeToMinutes(value) {
  const m = String(value || '').trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return h * 60 + parseInt(m[2], 10);
}

async function getSettings() {
  return cache.remember('settings', 5 * 60 * 1000, async () => {
    const row = await prisma.businessSettings.findUnique({ where: { id: 'default' } });
    return { ...DEFAULT_SETTINGS, ...(row || {}) };
  });
}

module.exports = { getSettings, DEFAULT_SETTINGS, DAY_NAMES, weeklyOffIndex, parseTimeToMinutes };
