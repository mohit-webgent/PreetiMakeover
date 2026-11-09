const { HttpError, asyncHandler } = require('../utils/httpError');
const { sniffImageType } = require('../middleware/upload');
const { saveImage } = require('../services/storage');

const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new HttpError(400, 'No image file was provided');

  const ext = sniffImageType(req.file.buffer);
  if (!ext) throw new HttpError(400, 'File content is not a valid JPG, PNG, WebP or GIF image.');

  const saved = await saveImage(req.file.buffer, { originalName: req.file.originalname, ext });
  res.json({
    success: true,
    url: saved.url,
    filename: saved.filename,
    provider: saved.provider,
    size: req.file.size,
    mimetype: req.file.mimetype,
    message: 'Image uploaded successfully'
  });
});

module.exports = { uploadImage };
