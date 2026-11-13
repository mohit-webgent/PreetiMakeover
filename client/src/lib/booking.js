/**
 * Booking helpers: bookable days, time slots, and calendar exports.
 * All "today" logic uses India time so it matches the server's validation.
 */
import { DAY_NAMES, formatTime, istNow, parseTime } from './business';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Same-day slots must start at least this far ahead (mirrors the server).
export const SAME_DAY_LEAD_MINUTES = 30;
const pad = (n) => String(n).padStart(2, '0');

/** Next `count` calendar days starting today (IST), with closed days flagged. */
export function getBookableDays(count, offDayIndex) {
  const now = istNow();
  const days = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(Date.UTC(now.year, now.month, now.date + i, 12));
    days.push({
      iso: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
      weekday: DAY_NAMES[d.getUTCDay()].slice(0, 3),
      weekdayLong: DAY_NAMES[d.getUTCDay()],
      day: d.getUTCDate(),
      month: MONTHS[d.getUTCMonth()],
      isToday: i === 0,
      isTomorrow: i === 1,
      closed: d.getUTCDay() === offDayIndex
    });
  }
  return days;
}

/** Slots every `step` minutes from opening until one hour before closing. */
export function getTimeSlots(openMin, closeMin, step = 30, lastSlotBufferMin = 60) {
  const slots = [];
  for (let t = openMin; t <= closeMin - lastSlotBufferMin; t += step) slots.push(formatTime(t));
  return slots;
}

/** Remove slots that have already passed when the chosen date is today. */
export function availableSlots(slots, dateIso) {
  const now = istNow();
  const todayIso = `${now.year}-${pad(now.month + 1)}-${pad(now.date)}`;
  if (dateIso !== todayIso) return slots;
  return slots.filter((s) => parseTime(s) >= now.minutes + SAME_DAY_LEAD_MINUTES);
}

/** Group slots into Morning / Afternoon / Evening for a calmer picker. */
export function groupSlots(slots) {
  const groups = { Morning: [], Afternoon: [], Evening: [] };
  slots.forEach((s) => {
    const m = parseTime(s);
    if (m < 12 * 60) groups.Morning.push(s);
    else if (m < 17 * 60) groups.Afternoon.push(s);
    else groups.Evening.push(s);
  });
  return Object.entries(groups).filter(([, list]) => list.length);
}

export function formatLongDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return `${DAY_NAMES[date.getUTCDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

/** Start/end stamps (local floating time, IST assumed) for calendar files and links. */
function eventStamps(dateIso, time, durationMinutes) {
  const start = parseTime(time) ?? 11 * 60;
  const end = start + (durationMinutes || 60);
  const ymd = dateIso.replace(/-/g, '');
  const hm = (min) => `${pad(Math.floor(min / 60) % 24)}${pad(min % 60)}00`;
  return { start: `${ymd}T${hm(start)}`, end: `${ymd}T${hm(end)}` };
}

/** Download an .ics calendar file (works with Apple, Google, Outlook calendars). */
export function downloadIcs({ title, description, location, dateIso, time, durationMinutes, uid }) {
  const { start, end } = eventStamps(dateIso, time, durationMinutes);
  const esc = (s) => String(s || '').replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Preeti Makeover//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${uid || Date.now()}@preetimakeover.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Asia/Kolkata:${start}`,
    `DTEND;TZID=Asia/Kolkata:${end}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    `LOCATION:${esc(location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Salon appointment reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'preeti-makeover-appointment.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function googleCalendarUrl({ title, description, location, dateIso, time, durationMinutes }) {
  const { start, end } = eventStamps(dateIso, time, durationMinutes);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    ctz: 'Asia/Kolkata',
    details: description,
    location
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
