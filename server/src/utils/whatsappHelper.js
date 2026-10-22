/**
 * WhatsApp message helper for Preeti Makeover
 */

function generateSalonWhatsAppUrl({
  salonPhone = '918810359438',
  customerName,
  serviceName,
  preferredDate,
  preferredTime,
  enquiryId
}) {
  const cleanPhone = salonPhone.replace(/\D/g, '');
  
  let text = `Hello Preeti Makeover! 🌸\n`;
  text += `I have submitted an appointment enquiry on your website.\n\n`;
  text += `👤 *Name:* ${customerName}\n`;
  text += `💅 *Service:* ${serviceName || 'General Consultation'}\n`;
  text += `📅 *Preferred Date:* ${preferredDate}\n`;
  if (preferredTime) {
    text += `⏰ *Preferred Time:* ${preferredTime}\n`;
  }
  if (enquiryId) {
    text += `🔖 *Ref ID:* ${enquiryId.substring(0, 8).toUpperCase()}\n`;
  }
  text += `\nPlease confirm if this slot is suitable. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

module.exports = {
  generateSalonWhatsAppUrl
};
