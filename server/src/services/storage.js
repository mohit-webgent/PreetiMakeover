/**
 * Image storage service.
 *  - Production: Cloudinary (set CLOUDINARY_URL) — persistent, CDN-served, returns absolute https URLs.
 *  - Development fallback: local ./uploads folder served at /uploads.
 */
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { config } = require('../config/env');

const LOCAL_DIR = path.join(__dirname, '../../uploads');

let cloudinary = null;
if (config.uploads.cloudinaryUrl) {
  // The SDK reads CLOUDINARY_URL from the environment automatically.
  cloudinary = require('cloudinary').v2;
  cloudinary.config({ secure: true });
}

function safeBaseName(originalName = 'image') {
  return path
    .parse(originalName)
    .name.replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30) || 'image';
}

async function saveImage(buffer, { originalName, ext }) {
  const id = `${safeBaseName(originalName)}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;

  if (cloudinary) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: config.uploads.cloudinaryFolder, public_id: id, resource_type: 'image', overwrite: false },
        (err, res) => (err ? reject(err) : resolve(res))
      );
      stream.end(buffer);
    });
    return { url: result.secure_url, filename: result.public_id, provider: 'cloudinary' };
  }

  await fs.mkdir(LOCAL_DIR, { recursive: true });
  const filename = `${id}.${ext}`;
  await fs.writeFile(path.join(LOCAL_DIR, filename), buffer);
  return { url: `/uploads/${filename}`, filename, provider: 'local' };
}

module.exports = { saveImage, LOCAL_DIR, storageProvider: () => (cloudinary ? 'cloudinary' : 'local') };
