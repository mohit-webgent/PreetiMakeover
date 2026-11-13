/**
 * Owner notifications for new booking requests.
 *
 * Channels (each optional, enabled only when fully configured in env):
 *   - Email via SMTP (Gmail app password, Zoho, Brevo, …)
 *   - Telegram bot message (free, instant push on the owner's phone)
 *
 * Notifications are fire-and-forget: a failing channel is logged and never
 * affects the customer's booking response.
 */
const nodemailer = require('nodemailer');
const { config } = require('../config/env');

const { email, telegram, adminUrl } = config.notify;

const emailEnabled = Boolean(email.host && email.user && email.pass && email.to);
const telegramEnabled = Boolean(telegram.botToken && telegram.chatId);

let transporter = null;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: email.host,
      port: email.port,
      secure: email.secure,
      auth: { user: email.user, pass: email.pass }
    });
  }
  return transporter;
}

const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function formatDate(dateStr) {
  const [y, m, d] = String(dateStr).split('-').map(Number);
  if (!y || !m || !d) return String(dateStr);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  });
}

function bookingRows(a) {
  return [
    ['Name', a.customerName],
    ['Phone', a.phone],
    ['Service', a.serviceName],
    ['Date', formatDate(a.preferredDate)],
    ['Time', a.preferredTime || 'Any time'],
    ['Notes', a.message || '—'],
    ['Ref', String(a.id).slice(0, 8).toUpperCase()]
  ];
}

function customerWhatsAppUrl(a) {
  const text = `Hello ${a.customerName}, this is Preeti Makeover 🌸 Thank you for your booking request for ${a.serviceName} on ${formatDate(a.preferredDate)}${a.preferredTime ? ` at ${a.preferredTime}` : ''}.`;
  return `https://wa.me/${String(a.phone).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

async function sendEmail(a) {
  const rows = bookingRows(a)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#765669;font-size:13px">${k}</td><td style="padding:6px 12px;color:#3D2234;font-size:14px;font-weight:600">${escapeHtml(v)}</td></tr>`)
    .join('');
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #F8BCD2;border-radius:16px;overflow:hidden">
    <div style="background:#6B1442;color:#fff;padding:18px 20px">
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.8">Preeti Makeover</div>
      <div style="font-size:20px;font-weight:bold;margin-top:4px">New booking request</div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin:12px 0">${rows}</table>
    <div style="padding:0 20px 20px">
      <a href="${customerWhatsAppUrl(a)}" style="display:inline-block;background:#16a34a;color:#fff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:bold;font-size:14px">Reply on WhatsApp</a>
      <a href="tel:${escapeHtml(a.phone)}" style="display:inline-block;margin-left:8px;color:#A3245E;font-weight:bold;font-size:14px">Call ${escapeHtml(a.phone)}</a>
      ${adminUrl ? `<p style="margin-top:16px;font-size:12px"><a href="${escapeHtml(adminUrl)}" style="color:#A3245E">Open admin panel →</a></p>` : ''}
    </div>
  </div>`;
  const text = bookingRows(a).map(([k, v]) => `${k}: ${v}`).join('\n');

  await getTransporter().sendMail({
    from: email.from,
    to: email.to,
    subject: `New booking: ${a.customerName} · ${a.serviceName} · ${formatDate(a.preferredDate)}`,
    text,
    html
  });
}

async function sendTelegram(a) {
  const lines = ['🌸 <b>New booking request</b>', ...bookingRows(a).map(([k, v]) => `<b>${k}:</b> ${escapeHtml(v)}`), '', `<a href="${customerWhatsAppUrl(a)}">Reply on WhatsApp</a>`];
  const res = await fetch(`https://api.telegram.org/bot${telegram.botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: telegram.chatId, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true }),
    signal: AbortSignal.timeout(8000)
  });
  if (!res.ok) throw new Error(`Telegram responded ${res.status}`);
}

/**
 * Notify the salon owner about a new booking. Never throws.
 * @param {{id:string, customerName:string, phone:string, serviceName:string, preferredDate:string, preferredTime?:string, message?:string}} appointment
 */
function notifyNewBooking(appointment) {
  if (config.isTest) return Promise.resolve();
  const jobs = [];
  if (emailEnabled) jobs.push(sendEmail(appointment).catch((e) => console.error('[notify] email failed:', e.message)));
  if (telegramEnabled) jobs.push(sendTelegram(appointment).catch((e) => console.error('[notify] telegram failed:', e.message)));
  if (!jobs.length && !config.isProduction) console.info('[notify] No owner notification channel configured (SMTP_* or TELEGRAM_*).');
  return Promise.all(jobs);
}

function notificationChannels() {
  return { email: emailEnabled, telegram: telegramEnabled };
}

module.exports = { notifyNewBooking, notificationChannels };
