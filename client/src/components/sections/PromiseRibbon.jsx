import React from 'react';

/** Tilted, infinitely scrolling promise ribbon shown right after the hero. */
export default function PromiseRibbon({ promises = [] }) {
  const loop = [...promises, ...promises, ...promises];
  return (
    <section data-no-reveal className="relative py-8 sm:py-10 overflow-x-clip">
      <div className="-rotate-[1.5deg] scale-[1.03]">
        <div className="bg-gradient-to-r from-[#A3245E] via-[#D9578A] to-[#C2477F] py-3 sm:py-3.5 shadow-[0_18px_40px_-18px_rgba(163,36,94,0.6)] overflow-hidden group">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {loop.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 px-5 sm:px-7 shrink-0 text-white">
                  <span className="w-7 h-7 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-serif text-sm sm:text-base font-semibold whitespace-nowrap">{item.title}</span>
                  <span className="hidden sm:inline text-xs text-white/75 whitespace-nowrap">— {item.desc}</span>
                  <span className="ml-3 sm:ml-5 text-[#F8BCD2]">✦</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
