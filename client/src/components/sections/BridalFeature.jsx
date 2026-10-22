import React from 'react';
import { Sparkles, Calendar, Heart, ShieldCheck, Check } from 'lucide-react';

export default function BridalFeature({ onBridalEnquiry }) {
  const bridalOfferings = [
    'Pre-Bridal Clinical Skin Glow Prep',
    'High-Definition (HD) Waterproof Makeup',
    'Custom Bridal Hairstyling & Extensions',
    'Designer Saree & Dupatta Draping',
    'On-Time Salon or Venue Preparation'
  ];

  return (
    <section id="bridal" className="py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Plum Editorial Banner matching PDF Page 1 */}
        <div className="rounded-[32px] bg-gradient-to-br from-brand-plum-deep via-brand-plum to-brand-plum-light text-brand-ivory p-8 sm:p-14 relative overflow-hidden shadow-luxury-lg border border-brand-blush/20">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Specialized Bridal Studio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                Bridal Makeover Packages
              </h2>

              <p className="text-brand-ivory/85 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                Pre-bridal care, bridal makeup, and signature hairstyling — all meticulously planned around your wedding timeline by <strong className="font-semibold text-white">Preeti Mandal</strong>.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                {bridalOfferings.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-brand-ivory/90">
                    <span className="w-4 h-4 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-brand-gold" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: CTA */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
              <button
                onClick={onBridalEnquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-brand-plum bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-dark hover:brightness-105 shadow-luxury transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-brand-plum" />
                <span>Enquire for Bridal</span>
              </button>

              <p className="text-xs text-brand-ivory/60 italic text-left lg:text-right">
                Consultations available by appointment. We advise booking 3–6 weeks in advance.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
