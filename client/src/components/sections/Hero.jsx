import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-salon-blush">
      {/* Background Subtle Luxury Ambience */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-salon-babypink/60 to-salon-gold/15 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28"></div>
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-gradient-to-tr from-salon-babypink/50 to-transparent rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in-up">
            
            {/* Category Pre-heading */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-salon-babypink/70 border border-salon-rose/30 text-salon-maroon text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-salon-gold-dark" />
              <span>Beauty Salon & Makeover Studio</span>
            </div>

            {/* Main Editorial Heading (Preserved Typography) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-serif font-bold text-salon-maroon leading-[1.1] tracking-tight">
              Look good. <br />
              <span className="italic font-normal text-salon-gold-dark">Feel even better.</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-salon-text/80 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Hair, skin, makeup, and bespoke bridal looks, crafted with meticulous care by <strong className="font-semibold text-salon-maroon">Preeti Mandal</strong>. Authentic beauty transformations anchored in hospital-grade hygiene and international formulations.
            </p>

            {/* Tagline Badge */}
            <div className="inline-block border-l-2 border-salon-gold pl-3 py-0.5 text-xs uppercase tracking-widest text-salon-gold-dark font-medium">
              “Your Beauty Is Our Duty.”
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-salon-maroon to-salon-maroon-light hover:from-salon-maroon-deep hover:to-salon-maroon shadow-luxury hover:shadow-luxury-lg transition-all transform hover:-translate-y-0.5 border border-salon-gold/30"
              >
                <Calendar className="w-4 h-4 text-salon-gold" />
                <span>Book Appointment</span>
              </Link>

              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-salon-maroon bg-white hover:bg-salon-babypink/30 border border-salon-rose/30 shadow-sm transition-all"
              >
                <span>View All 27 Services</span>
                <ArrowRight className="w-4 h-4 text-salon-gold-dark" />
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-8 grid grid-cols-3 gap-3 border-t border-salon-babypink/70 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-salon-maroon font-serif text-lg font-bold">
                  <ShieldCheck className="w-4 h-4 text-salon-gold" />
                  <span>100%</span>
                </div>
                <p className="text-[11px] text-salon-text/70 font-medium">Genuine Brands</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-salon-maroon font-serif text-lg font-bold">
                  <Award className="w-4 h-4 text-salon-gold" />
                  <span>HD Bridal</span>
                </div>
                <p className="text-[11px] text-salon-text/70 font-medium">Expert Makeover</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-salon-maroon font-serif text-lg font-bold">
                  <Heart className="w-4 h-4 text-salon-gold" />
                  <span>Hygienic</span>
                </div>
                <p className="text-[11px] text-salon-text/70 font-medium">Sanitized Studio</p>
              </div>
            </div>
          </div>

          {/* Right Column: PDF Arch Frame Beauty Composition */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
              
              {/* Decorative Arch Border Background */}
              <div className="absolute -inset-2.5 rounded-t-[180px] rounded-b-3xl border border-salon-gold/40 -rotate-1 pointer-events-none"></div>

              {/* Main Arch Container */}
              <div className="relative rounded-t-[175px] rounded-b-3xl overflow-hidden bg-gradient-to-b from-salon-maroon to-salon-maroon-deep text-salon-blush shadow-luxury-lg border border-salon-gold/30 p-6 sm:p-8 flex flex-col justify-between min-h-[480px]">
                
                {/* Visual Backdrop Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A15A_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Arch Top Monogram */}
                <div className="relative z-10 flex flex-col items-center text-center pt-8">
                  <div className="w-16 h-16 rounded-full border border-salon-gold/60 bg-salon-maroon-deep/90 flex items-center justify-center mb-4 shadow-gold-glow">
                    <span className="font-serif text-2xl font-bold text-salon-gold">PM</span>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-salon-gold font-semibold">
                    Preeti Mandal Signature
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                    Salon & Makeover
                  </h3>
                </div>

                {/* Arch Center Feature Points */}
                <div className="relative z-10 space-y-3 py-6 border-y border-white/10 text-xs text-salon-blush/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>L’Oréal, Schwarzkopf & Casmara Care</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Nanoplastia, Hair Botox & Keratin Spa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>High-Definition Bridal & Saree Draping</span>
                  </div>
                </div>

                {/* Arch Bottom Badges */}
                <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-salon-blush/70">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-salon-gold tracking-widest">Location</span>
                    <span className="font-medium text-white">Badarpur, New Delhi</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] uppercase text-salon-gold tracking-widest">Hours</span>
                    <span className="font-medium text-white">10 AM – 9 PM</span>
                  </div>
                </div>

              </div>

              {/* Floating Decorative Gold Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-luxury border border-salon-gold/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-salon-babypink text-salon-maroon flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-salon-gold-dark" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-salon-gold-dark font-bold block">
                    Certified Salon
                  </span>
                  <span className="text-xs font-serif font-bold text-salon-maroon">
                    Prince Colony, Harinagar
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
