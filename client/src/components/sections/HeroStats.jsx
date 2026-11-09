import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

/** Counts from 0 to the numeric part of `value` ("1,200+", "4.9★") once visible. */
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const match = String(value).match(/[\d,.]+/);
  const target = match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  const decimals = match && match[0].includes('.') ? match[0].split('.')[1].length : 0;
  const suffix = match ? String(value).slice(match.index + match[0].length) : String(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !match) return undefined;
    const controls = animate(0, target, { duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref}>
      {match ? display.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : ''}
      <span className="text-[#EE7FA8]">{suffix}</span>
    </span>
  );
}

/** Compact glass stat strip, designed to sit inside the hero under the CTAs. */
export default function HeroStats({ stats = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mt-6 w-full max-w-xl mx-auto lg:mx-0 grid grid-cols-4 rounded-2xl p-1.5 bg-gradient-to-r from-[#FDE1EC]/80 via-[#FBE6F1]/70 to-[#EEE4FD]/80 backdrop-blur-md border border-[#F8BCD2]/60 shadow-[0_12px_30px_-16px_rgba(163,36,94,0.45)]"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`group relative flex flex-col items-center justify-center px-1 py-2.5 sm:py-3 rounded-xl hover:bg-white/60 transition-colors ${
              i < stats.length - 1 ? 'after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-px after:bg-[#EE7FA8]/30' : ''
            }`}
            title={stat.sub}
          >
            <div className="flex items-center gap-1">
              <Icon className="hidden sm:block w-3.5 h-3.5 text-[#D9578A] group-hover:scale-125 transition-transform" />
              <span className="font-serif text-lg sm:text-2xl font-bold leading-none text-gradient-rose">
                <CountUp value={stat.number} />
              </span>
            </div>
            <span className="mt-1 text-[9.5px] sm:text-[11px] font-medium text-[#765669] leading-tight text-center">
              {stat.label}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

