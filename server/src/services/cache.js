/**
 * Tiny in-process TTL cache for public read endpoints.
 * Public data (services, gallery, reviews, CMS, settings) changes only when an admin
 * edits it, so admin writes call `clear()` and readers can cache aggressively.
 */
const store = new Map();

/** Return the cached value for `key`, or compute it with `loader` and keep it for `ttlMs`. */
async function remember(key, ttlMs, loader) {
  const hit = store.get(key);
  if (hit && hit.expires > Date.now()) return hit.value;
  const value = await loader();
  store.set(key, { value, expires: Date.now() + ttlMs });
  return value;
}

function clear() {
  store.clear();
}

module.exports = { remember, clear };
