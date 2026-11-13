import React from 'react';

/**
 * Responsive image. For bundled photos in /public (e.g. "/hero-bridal.jpg") it serves the
 * WebP versions produced by `npm run images`; uploaded/external URLs render as a plain <img>.
 */
export default function Photo({ src, alt, sizes = '100vw', priority = false, className = '', width, height, ...rest }) {
  const local = typeof src === 'string' && /^\/[^/][\w-]*\.jpe?g$/i.test(src);
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      className={className}
      {...rest}
    />
  );
  if (!local) return img;

  const base = src.replace(/\.jpe?g$/i, '');
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}.webp 1000w`} sizes={sizes} />
      {img}
    </picture>
  );
}
