const { asyncHandler } = require('../utils/httpError');
const { getSettings } = require('../services/settingsService');

/** Public business settings & contact info (cached; falls back to defaults if the row is missing). */
const getBusinessSettings = asyncHandler(async (req, res) => {
  const settings = await getSettings();
  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data: settings });
});

module.exports = { getBusinessSettings };
