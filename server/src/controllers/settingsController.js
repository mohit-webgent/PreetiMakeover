const prisma = require('../db');

/**
 * Get public business settings & contact info
 */
async function getBusinessSettings(req, res, next) {
  try {
    const settings = await prisma.businessSettings.findUnique({
      where: { id: 'default' }
    });

    if (!settings) {
      return res.status(200).json({
        success: true,
        data: {
          businessName: 'Preeti Makeover',
          tagline: 'Your Beauty Is Our Duty.',
          ownerName: 'Preeti Mandal',
          phone: '+918810359438',
          whatsapp: '+918810359438',
          email: 'preetimakeoverpm@gmail.com',
          address: 'D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044',
          openingHour: '10:00 AM',
          closingHour: '09:00 PM',
          weeklyOffDay: 'Tuesday'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBusinessSettings
};
