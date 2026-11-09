const { config } = require('../config/env');

function notFound(req, res) {
  res.status(404).json({ success: false, message: `Resource not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Malformed JSON body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Request body is not valid JSON.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request body is too large.' });
  }
  // Multer upload errors
  if (err.name === 'MulterError') {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? `Image is too large (max ${Math.round(config.uploads.maxBytes / 1024 / 1024)}MB).`
      : err.message;
    return res.status(400).json({ success: false, message });
  }
  // Prisma: record not found / unique constraint / bad relation
  if (err.code === 'P2025') return res.status(404).json({ success: false, message: 'Record not found.' });
  if (err.code === 'P2002') return res.status(409).json({ success: false, message: 'A record with this value already exists.' });
  if (err.code === 'P2003') return res.status(400).json({ success: false, message: 'Related record does not exist.' });

  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error('Unhandled Server Error:', err);

  res.status(status).json({
    success: false,
    message: status >= 500 && config.isProduction ? 'An internal server error occurred.' : err.message || 'Internal server error',
    ...(err.extra || {})
  });
}

module.exports = { notFound, errorHandler };
