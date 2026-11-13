/**
 * Generates web-optimised images in /public:
 *   - <name>.webp (and <name>-480.webp for small screens) for every JPG photo
 *   - og-preview.jpg (1200×630) used by WhatsApp / Facebook / X link previews
 *
 * Run after adding or replacing photos:  npm run images
 * Originals are kept as the <img> fallback for very old browsers.
 */
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const SMALL_WIDTH = 480;

async function newerThan(target, source) {
  try {
    return (await stat(target)).mtimeMs >= (await stat(source)).mtimeMs;
  } catch {
    return false;
  }
}

const files = (await readdir(PUBLIC_DIR)).filter((f) => /\.jpe?g$/i.test(f) && f !== 'og-preview.jpg');

for (const file of files) {
  const src = path.join(PUBLIC_DIR, file);
  const base = file.replace(/\.jpe?g$/i, '');
  const full = path.join(PUBLIC_DIR, `${base}.webp`);
  const small = path.join(PUBLIC_DIR, `${base}-${SMALL_WIDTH}.webp`);

  if (!(await newerThan(full, src))) {
    await sharp(src).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 78 }).toFile(full);
  }
  if (!(await newerThan(small, src))) {
    await sharp(src).resize({ width: SMALL_WIDTH }).webp({ quality: 74 }).toFile(small);
  }
  const [a, b, c] = await Promise.all([stat(src), stat(full), stat(small)]);
  console.log(`${file.padEnd(28)} ${(a.size / 1024).toFixed(0).padStart(5)} KB → ${(b.size / 1024).toFixed(0).padStart(4)} KB webp, ${(c.size / 1024).toFixed(0).padStart(3)} KB @${SMALL_WIDTH}`);
}

// Social share card: hero photo on the right, brand panel on the left
const ogPath = path.join(PUBLIC_DIR, 'og-preview.jpg');
const hero = await sharp(path.join(PUBLIC_DIR, 'hero-bridal.jpg')).resize(520, 630, { fit: 'cover', position: 'top' }).toBuffer();
const panel = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4A0E30"/><stop offset="0.55" stop-color="#6B1442"/><stop offset="1" stop-color="#A3245E"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="70" y="150" font-family="Georgia, serif" font-size="20" letter-spacing="4" fill="#F8BCD2">BEAUTY SALON &amp; MAKEOVER STUDIO</text>
  <text x="70" y="250" font-family="Georgia, serif" font-size="78" font-weight="bold" fill="#FFFFFF">Preeti</text>
  <text x="70" y="340" font-family="Georgia, serif" font-size="78" font-style="italic" font-weight="bold" fill="#F8BCD2">Makeover</text>
  <text x="70" y="420" font-family="Georgia, serif" font-size="30" fill="#FFFFFF" opacity="0.9">HD Bridal · Hair Treatments · Luxury Facials</text>
  <text x="70" y="540" font-family="Arial, sans-serif" font-size="24" fill="#FFFFFF" opacity="0.75">Badarpur, New Delhi  ·  Your Beauty Is Our Duty</text>
</svg>`);
await sharp(panel).composite([{ input: hero, left: 680, top: 0 }]).jpeg({ quality: 84, mozjpeg: true }).toFile(ogPath);
console.log(`og-preview.jpg               ${((await stat(ogPath)).size / 1024).toFixed(0)} KB (1200×630)`);
