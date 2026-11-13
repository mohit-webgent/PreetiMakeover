const prisma = require('../db');
const cache = require('../services/cache');
const { HttpError, asyncHandler } = require('../utils/httpError');

const ALLOWED_TYPES = new Set(['text', 'textarea', 'image', 'json']);
const KEY_PATTERN = /^[a-z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; // e.g. "hero.headingLine1"
const MAX_VALUE_LENGTH = 20000;

function serialise(value) {
  return typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
}

/** Normalise and validate one content item; throws HttpError on bad input. */
function toRecord(item) {
  const key = String(item.key || '').trim();
  if (!KEY_PATTERN.test(key)) throw new HttpError(400, `Invalid content key "${key}". Use "section.field" format.`);
  if (item.value === undefined) throw new HttpError(400, `Value is required for "${key}".`);
  const value = serialise(item.value);
  if (value.length > MAX_VALUE_LENGTH) throw new HttpError(400, `Value for "${key}" is too long.`);
  const type = item.type && ALLOWED_TYPES.has(item.type) ? item.type : undefined;
  const section = item.section ? String(item.section).slice(0, 50) : key.split('.')[0];
  const label = item.label ? String(item.label).slice(0, 120) : undefined;
  return { key, value, type, section, label };
}

function upsert(rec) {
  return prisma.siteContent.upsert({
    where: { key: rec.key },
    update: { value: rec.value, section: rec.section, ...(rec.type && { type: rec.type }), ...(rec.label && { label: rec.label }) },
    create: { key: rec.key, value: rec.value, section: rec.section, type: rec.type || 'text', label: rec.label || rec.key }
  });
}

/** Public: all CMS content grouped by section ({ hero: { headingLine1: '...' } }). JSON types are parsed. */
const getPublicContent = asyncHandler(async (req, res) => {
  const items = await cache.remember('content:all', 5 * 60 * 1000, () => prisma.siteContent.findMany());
  const structured = {};
  const rawMap = {};

  for (const item of items) {
    rawMap[item.key] = item.value;
    const field = item.key.slice(item.section.length + 1) || item.key;
    let value = item.value;
    if (item.type === 'json') {
      try { value = JSON.parse(item.value); } catch { /* keep raw string */ }
    }
    (structured[item.section] ||= {})[field] = value;
  }

  res.set('Cache-Control', 'public, max-age=60');
  res.json({ success: true, data: structured, rawMap, count: items.length });
});

const listContent = asyncHandler(async (req, res) => {
  const data = await prisma.siteContent.findMany({ orderBy: [{ section: 'asc' }, { key: 'asc' }] });
  res.json({ success: true, data });
});

const updateContentItem = asyncHandler(async (req, res) => {
  const rec = toRecord({ ...req.body, key: req.params.key });
  const data = await upsert(rec);
  res.json({ success: true, data, message: 'Content updated successfully' });
});

const saveContentBatch = asyncHandler(async (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) throw new HttpError(400, 'Items array is required');
  if (items.length > 200) throw new HttpError(400, 'Too many items in one batch (max 200).');
  const records = items.map(toRecord);
  const results = await prisma.$transaction(records.map(upsert));
  res.json({ success: true, message: `Successfully updated ${results.length} content fields`, count: results.length });
});

module.exports = { getPublicContent, listContent, updateContentItem, saveContentBatch };
