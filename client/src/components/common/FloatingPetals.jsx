import React, { useMemo } from 'react';

/**
 * Ambient decorative layer: drifting blurred blobs + a few falling petals and
 * twinkling sparkles. Fixed, pointer-events-none, hidden for reduced-motion users via CSS.
 */
export default function FloatingPetals({ count = 10 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 10 + Math.round(Math.random() * 12),
        duration: 14 + Math.random() * 12,
        delay: -Math.random() * 20,
        drift: Math.round(Math.random() * 160 - 80),
        hue: i % 3
      })),
    [count]
  );

  const colors = ['#F8BCD2', '#EE7FA8', '#DCCBFA'];

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-salon-rose/20 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full bg-salon-lavender/25 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute -bottom-40 left-1/4 w-[420px] h-[420px] rounded-full bg-salon-peach/25 blur-3xl animate-blob [animation-delay:-12s]" />

      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 hidden sm:block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            background: colors[p.hue],
            borderRadius: '80% 0 80% 0',
            opacity: 0.7,
            '--drift': `${p.drift}px`,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`
          }}
        />
      ))}

      {[12, 38, 64, 86].map((left, i) => (
        <span
          key={left}
          className="absolute text-salon-rose animate-twinkle"
          style={{ left: `${left}%`, top: `${18 + i * 19}%`, animationDelay: `${i * 0.7}s`, fontSize: 12 + (i % 2) * 6 }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
