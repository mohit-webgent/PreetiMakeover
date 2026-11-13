import React from 'react';

/**
 * Mughal jharokha (multifoil, pointed) arch — the site's signature frame.
 * Path is in objectBoundingBox units (0–1), so it scales to any element size.
 */
export const ARCH_PATH =
  'M0,1 L0,0.42 Q-0.0062,0.3529 0.0357,0.3 Q0.0634,0.2238 0.1383,0.1928 Q0.1991,0.1067 0.3037,0.0933 ' +
  'Q0.3925,0.027 0.5,0 Q0.6075,0.027 0.6963,0.0933 Q0.8009,0.1067 0.8617,0.1928 Q0.9366,0.2238 0.9643,0.3 ' +
  'Q1.0062,0.3529 1,0.42 L1,1 Z';

/** Render once (in App). Defines the clip path used by `.arch-clip`. */
export function ArchDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <clipPath id="jharokha-arch" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * Photo (or any content) inside the arch, with an optional fine gold outline
 * drawn slightly larger behind it, like the carved frame of a palace window.
 */
export default function ArchFrame({ children, outline = true, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {outline && (
        <svg
          aria-hidden="true"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          className="absolute -inset-2.5 sm:-inset-3.5 h-[calc(100%+1.25rem)] w-[calc(100%+1.25rem)] sm:h-[calc(100%+1.75rem)] sm:w-[calc(100%+1.75rem)] overflow-visible text-gold"
        >
          <path d={ARCH_PATH} fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      <div className="arch-clip relative h-full w-full overflow-hidden bg-rose">{children}</div>
    </div>
  );
}
