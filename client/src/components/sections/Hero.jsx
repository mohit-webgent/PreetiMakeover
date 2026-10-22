import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';

export default function Hero({ onBookClick }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF7F2]">
      {/* Background Subtle Luxury Ambience */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-brand-blush/40 to-brand-gold/10 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-brand-blush/30 to-transparent rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Category Pre-heading */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blush/50 border border-brand-blush text-brand-plum text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
              <span>Beauty Salon & Makeover Studio</span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-serif font-bold text-brand-plum leading-[1.1] tracking-tight">
              Look good. <br />
              <span className="italic font-normal text-brand-gold-dark">Feel even better.</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-brand-plum/80 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hair, skin, makeup, and bespoke bridal looks, crafted with meticulous care by <strong className="font-semibold text-brand-plum">Preeti Mandal</strong>. Authentic beauty transformations anchored in hygiene and international products.
            </p>

            {/* Tagline Badge */}
            <div className="inline-block border-l-2 border-brand-gold pl-3 py-0.5 text-xs uppercase tracking-widest text-brand-gold-dark font-medium">
              “Your Beauty Is Our Duty.”
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-brand-plum to-brand-plum-light hover:from-brand-plum-deep hover:to-brand-plum shadow-luxury hover:shadow-luxury-lg transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>Book Appointment</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-brand-plum bg-white hover:bg-brand-blush/30 border border-brand-blush/80 shadow-sm transition-all"
              >
                <span>View Services</span>
                <ArrowRight className="w-4 h-4 text-brand-gold-dark" />
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-8 grid grid-cols-3 gap-3 border-t border-brand-blush/60 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-brand-plum font-serif text-lg font-bold">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>100%</span>
                </div>
                <p className="text-[11px] text-brand-plum/70 font-medium">Genuine Brands</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-brand-plum font-serif text-lg font-bold">
                  <Award className="w-4 h-4 text-brand-gold" />
                  <span>HD Bridal</span>
                </div>
                <p className="text-[11px] text-brand-plum/70 font-medium">Expert Makeover</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-brand-plum font-serif text-lg font-bold">
                  <Heart className="w-4 h-4 text-brand-gold" />
                  <span>Hygienic</span>
                </div>
                <p className="text-[11px] text-brand-plum/70 font-medium">Sanitized Studio</p>
              </div>
            </div>
          </div>

          {/* Right Column: PDF Arch Frame Beauty Composition */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              
              {/* Decorative Arch Border Background */}
              <div className="absolute -inset-2.5 rounded-t-[180px] rounded-b-3xl border border-brand-gold/40 -rotate-1 pointer-events-none"></div>

              {/* Main Arch Container */}
              <div className="relative rounded-t-[175px] rounded-b-3xl overflow-hidden bg-gradient-to-b from-brand-plum to-brand-plum-deep text-brand-ivory shadow-luxury-lg border border-brand-blush/40 p-6 sm:p-8 flex flex-col justify-between min-h-[480px]">
                
                {/* Visual Backdrop Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Arch Top Monogram */}
                <div className="relative z-10 flex flex-col items-center text-center pt-8">
                  <div className="w-16 h-16 rounded-full border border-brand-gold/60 bg-brand-plum-deep/80 flex items-center justify-center mb-4 shadow-gold-glow">
                    <span className="font-serif text-2xl font-bold text-brand-gold">PM</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-brand-gold font-medium">
                    Preeti Makeover Studio
                  </span>
                  <p className="font-serif text-2xl font-bold text-white mt-1">
                    Signature Beauty
                  </p>
                </div>

                {/* Editorial Visual Pillar Box */}
                <div className="relative z-10 my-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
                    <span className="text-xs font-semibold text-brand-ivory tracking-wide">
                      Badarpur, New Delhi Studio
                    </span>
                  </div>
                  <p className="text-xs text-brand-ivory/80 leading-relaxed font-light">
                    Specialized in Clinical Hair Rejuvenation (Botox, Keratin, Nanoplastia), Casmara & O3+ Luxury Facials, and Signature Bridal HD Artistry.
                  </p>
                </div>

                {/* Bottom Card Footer with Hours & Owner */}
                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-brand-ivory/80">
                  <div>
                    <span className="block text-[10px] uppercase text-brand-gold font-medium">Studio Lead</span>
                    <span className="font-serif font-bold text-sm text-white">Preeti Mandal</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase text-brand-gold font-medium">Daily Hours</span>
                    <span className="font-medium text-white">10 AM – 9 PM</span>
                  </div>
                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-luxury border border-brand-blush flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blush/60 text-brand-plum flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <span className="block text-xs font-bold text-brand-plum">Certified Brands</span>
                  <span className="block text-[10px] text-brand-plum/70">L’Oréal • Casmara • Rica</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
