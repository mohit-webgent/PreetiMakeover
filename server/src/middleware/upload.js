const multer = require('multer');
const { config } = require('../config/env');
const { HttpError } = require('../utils/httpError');

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

/**
 * Accept only real raster images. Both the declared mime type AND the file's
 * magic bytes are checked (in validateImageBuffer) so a renamed .html/.svg cannot slip through.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.uploads.maxBytes, files: 1 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) return cb(null, true);
    return cb(new HttpError(400, 'Only JPG, PNG, WebP or GIF images are allowed.'));
  }
});

/** Detect the real image type from its first bytes. Returns an extension or null. */
function sniffImageType(buf) {
  if (!buf || buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.slice(0, 3).toString('ascii') === 'GIF') return 'gif';
  if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') return 'webp';
  return null;
}

module.exports = { uploadSingleImage: upload.single('image'), sniffImageType };
