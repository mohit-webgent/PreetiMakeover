/**
 * Derived, display-ready business details (phone links, hours labels, map URLs, open-now status)
 * computed from the admin-editable settings.
 */

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const digits = (s) => String(s || '').replace(/\D/g, '');

/** "+918810359438" → "+91 88103 59438" */
export function formatPhone(phone) {
  const d = digits(phone);
  const local = d.length > 10 ? d.slice(-10) : d;
  if (local.length !== 10) return phone || '';
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
}

/** "10:30 AM" → 630 (minutes after midnight), or null. */
export function parseTime(value) {
  const m = String(value || '').trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (!m) return null;
  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return h * 60 + parseInt(m[2], 10);
}

/** 630 → "10:30 AM"; `compact` drops ":00" ("10 AM"). */
export function formatTime(minutes, { compact = false } = {}) {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  if (compact && m === 0) return `${h12} ${suffix}`;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
}

/** Current day-of-week (0=Sun) and minutes-after-midnight in India, regardless of the visitor's timezone. */
export function istNow() {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return {
    day: ist.getUTCDay(),
    minutes: ist.getUTCHours() * 60 + ist.getUTCMinutes(),
    year: ist.getUTCFullYear(),
    month: ist.getUTCMonth(),
    date: ist.getUTCDate()
  };
}

export function waLink(number, text) {
  const base = `https://wa.me/${digits(number)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Build everything components need from the raw settings object. */
export function deriveBusiness(settings) {
  const offDayIndex = DAY_NAMES.findIndex((d) => d.toLowerCase() === String(settings.weeklyOffDay || '').toLowerCase());
  const openMin = parseTime(settings.openingHour) ?? 600;
  const closeMin = parseTime(settings.closingHour) ?? 1260;
  const hoursLabel = `${formatTime(openMin, { compact: true })} – ${formatTime(closeMin, { compact: true })}`;

  // "Wednesday – Monday" when one day is off, "Open all week" otherwise
  const openDaysLabel = offDayIndex >= 0
    ? `${DAY_NAMES[(offDayIndex + 1) % 7]} – ${DAY_NAMES[(offDayIndex + 6) % 7]}`
    : 'Monday – Sunday';

  const addressParts = String(settings.address || '').split(',').map((s) => s.trim()).filter(Boolean);
  // Drop the house/lane parts and the PIN for a short, readable locality line
  const shortAddress = addressParts.slice(2).join(', ').replace(/\s*[–-]\s*\d{6}$/, '') || settings.address;

  const mapsQuery = encodeURIComponent(settings.address || settings.businessName);
  const mapsUrl = settings.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const directionsUrl = settings.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

  return {
    ...settings,
    offDayIndex,
    openMin,
    closeMin,
    hoursLabel,
    openDaysLabel,
    shortAddress,
    phoneDisplay: formatPhone(settings.phone),
    whatsappDisplay: formatPhone(settings.whatsapp),
    telHref: `tel:+${digits(settings.phone)}`,
    mailHref: `mailto:${settings.email}`,
    wa: (text) => waLink(settings.whatsapp, text),
    mapsUrl,
    directionsUrl,
    mapEmbedUrl: `https://www.google.com/maps?q=${mapsQuery}&output=embed`
  };
}

/** Live status sentence such as "Open now until 9 PM" or "Closed today. Opens Wednesday at 10 AM". */
export function openStatus(biz) {
  const now = istNow();
  const opens = formatTime(biz.openMin, { compact: true });
  const closes = formatTime(biz.closeMin, { compact: true });
  const closedToday = now.day === biz.offDayIndex;

  if (!closedToday && now.minutes >= biz.openMin && now.minutes < biz.closeMin) {
    return { isOpen: true, label: `Open now until ${closes}` };
  }
  if (!closedToday && now.minutes < biz.openMin) {
    return { isOpen: false, label: `Opens today at ${opens}` };
  }
  // Find the next open day
  for (let i = 1; i <= 7; i += 1) {
    const d = (now.day + i) % 7;
    if (d !== biz.offDayIndex) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[d];
      return { isOpen: false, label: `${closedToday ? 'Closed today' : 'Closed now'}. Opens ${when} at ${opens}` };
    }
  }
  return { isOpen: false, label: 'Closed' };
}
