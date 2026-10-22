import React from 'react';
import { Heart, Sparkles, CheckCircle2, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    { title: 'Personalized Artistry', desc: 'Preeti Mandal directly oversees every bridal look and clinical treatment with diagnostic precision.' },
    { title: 'Safe & Hygienic Space', desc: 'Sanitized tools, disposable supplies, and strict salon cleanliness protocols for every guest.' },
    { title: 'Authentic Formulations', desc: 'Directly sourced L’Oréal, Casmara, O3+, and Rica products with zero compromises.' },
    { title: 'Honest Consultations', desc: 'Transparent guidance on hair recovery, skin needs, and realistic timing without false promises.' }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Story Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-brand-blush/30 -rotate-1 pointer-events-none"></div>

              <div className="relative rounded-3xl bg-gradient-to-br from-brand-plum to-brand-plum-deep text-brand-ivory p-8 sm:p-10 shadow-luxury-lg overflow-hidden border border-brand-blush/30">
                <div className="absolute right-0 top-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Studio Philosophy</span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-white leading-tight">
                    “Your Beauty Is Our Duty.”
                  </h3>

                  <p className="text-brand-ivory/80 text-sm font-light leading-relaxed">
                    Founded and led by <strong>Preeti Mandal</strong> in Prince Colony, Badarpur, Preeti Makeover was established to provide local women with a high-standard beauty haven.
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-brand-ivory/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <span>Prince Colony, Harinagar, Badarpur, New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      <span>Wednesday to Monday (Closed on Tuesdays)</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="block text-xs uppercase tracking-widest text-brand-gold font-medium mb-1">
                      Salon Owner & Makeup Specialist
                    </span>
                    <span className="font-serif text-xl font-bold text-white">
                      Preeti Mandal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Commitment */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold block mb-2">
                ABOUT PREETI MAKEOVER
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum tracking-tight mb-4">
                Dedicated Care, Refined Craftsmanship.
              </h2>
              <div className="w-16 h-0.5 bg-brand-gold mb-4"></div>
              <p className="text-base text-brand-plum/80 leading-relaxed font-light">
                At Preeti Makeover, beauty is not a one-size-fits-all formula. Whether you visit for a restorative Keratin treatment, a relaxing Casmara algae facial, or your once-in-a-lifetime bridal makeover, we treat your skin and hair with clinical attention and delicate artistry.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-brand-ivory border border-brand-blush/60 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold-dark shrink-0" />
                    <h4 className="font-serif font-bold text-sm text-brand-plum">{item.title}</h4>
                  </div>
                  <p className="text-xs text-brand-plum/70 font-light leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs text-brand-plum/70">
              <span className="inline-flex items-center gap-1.5 font-semibold text-brand-plum">
                <ShieldCheck className="w-4 h-4 text-brand-gold-dark" />
                <span>Sanitized tools after every client</span>
              </span>
              <span className="text-brand-blush">•</span>
              <span>Individual consultation</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
