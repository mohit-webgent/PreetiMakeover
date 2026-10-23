import BotanicalLeaves from '../components/common/BotanicalLeaves';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  CalendarX, 
  Phone, 
  Calendar,
  MessageCircle,
  Scissors
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      title: 'Genuine Sealed Formulations',
      desc: 'We strictly reject counterfeit or unbranded duplicates. Every tube of L’Oréal color, Casmara algae peel, O3+ facial, and Italian Rica wax is verified and genuine.',
      icon: Award
    },
    {
      title: 'Hospital-Grade Salon Hygiene',
      desc: 'All stainless-steel tools, scissors, and combs are sanitized between clients. We use disposable sheets, wax strips, and single-use facial sponges for complete safety.',
      icon: ShieldCheck
    },
    {
      title: 'Honest Diagnostic Consultations',
      desc: 'We never upsell unnecessary treatments. Preeti Mandal directly analyzes your skin barrier and hair porosity, setting realistic expectations and timelines.',
      icon: Heart
    },
    {
      title: 'Warm & Safe Women’s Haven',
      desc: 'A comfortable, dignified, and relaxing studio environment where every client is treated like family with undivided attention and care.',
      icon: Sparkles
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-salon-blush min-h-screen">
      
      {/* 1. Page Header */}
      <div className="bg-salon-blush border-b border-salon-babypink/60 py-14 relative overflow-hidden">
        <BotanicalLeaves variant="top-right" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs text-salon-text/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-salon-maroon transition-colors">Home</Link>
            <span>/</span>
            <span className="text-salon-maroon font-semibold">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-babypink/70 text-salon-maroon text-xs font-semibold uppercase tracking-wider mb-3 border border-salon-rose/30">
              <Sparkles className="w-3.5 h-3.5 text-salon-gold-dark" />
              <span>Our Story & Philosophy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
              About Preeti Makeover
            </h1>
            <p className="text-base sm:text-lg text-salon-text/80 font-light mt-3 leading-relaxed">
              Founded and led by <strong>Preeti Mandal</strong>, Preeti Makeover is a trusted beauty parlour and makeover studio in Badarpur, New Delhi, dedicated to personalized care, uncompromising hygiene, and artistic excellence.
            </p>
          </div>

        </div>
      </div>

      {/* 2. The Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        <BotanicalLeaves variant="top-right" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Story Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-salon-maroon text-salon-blush p-8 sm:p-10 shadow-luxury-lg border border-salon-gold/30 space-y-6">
              <div className="w-16 h-16 rounded-2xl border border-salon-gold/40 bg-salon-maroon-deep/80 flex items-center justify-center p-1.5 shadow-md">
                <img
                  src="/pm_logo.png"
                  alt="Preeti Makeover Crest"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(197,161,90,0.5)]"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-salon-gold font-bold block mb-1">
                  Studio Founder & Master Stylist
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Preeti Mandal
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-salon-blush/85 leading-relaxed font-light">
                “When I started Preeti Makeover in Prince Colony, my goal was clear: women in our community should never have to compromise on genuine salon products or hygienic standards. Every look we create is built on respect, care, and quality.”
              </p>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-salon-blush/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-salon-gold shrink-0" />
                  <span>D/109, Gali No. 5, Prince Colony, Harinagar, Badarpur</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-salon-gold shrink-0" />
                  <span>Open 10:00 AM – 9:00 PM (Wednesday – Monday)</span>
                </div>
                <div className="flex items-center gap-2 text-salon-rose-light font-medium">
                  <CalendarX className="w-4 h-4 text-salon-rose shrink-0" />
                  <span>Tuesday: Weekly Off (Closed)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
                AUTHENTIC LOCAL EXCELLENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salon-maroon tracking-tight mb-4">
                Beauty Grounded in Trust, Hygiene & Quality
              </h2>
              <div className="w-16 h-0.5 bg-salon-gold mb-4"></div>
              
              <div className="space-y-4 text-sm text-salon-text/80 font-light leading-relaxed">
                <p>
                  At Preeti Makeover, beauty is never treated as an assembly line. Located in Prince Colony, Harinagar, Jaitpur, Badarpur, we take immense pride in offering an intimate, comfortable studio where each client receives individual attention from Preeti Mandal.
                </p>
                <p>
                  Whether you are visiting for a restorative Hair Botox treatment, an O3+ brightening facial, gentle Italian Rica waxing, or your once-in-a-lifetime bridal ceremony, our priority is always the long-term health of your hair and skin.
                </p>
                <p>
                  We believe that true beauty shines brightest when backed by authentic products and hospital-grade sanitization. That is why we maintain strict sterilization routines and close every Tuesday for full-studio hygiene maintenance.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-salon-maroon bg-white hover:bg-salon-babypink/40 border border-salon-rose/30 shadow-sm transition-all"
              >
                <Scissors className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>Explore Services</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-sm transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-salon-gold" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

        </div>

        {/* 3. The 4 Commitments Pillars */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
              OUR UNWAVERING PROMISE
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-salon-maroon">
              The 4 Preeti Makeover Pillars
            </h3>
            <div className="w-16 h-0.5 bg-salon-gold mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-salon-babypink/80 shadow-sm hover:shadow-luxury transition-all space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center">
                    <IconComp className="w-6 h-6 text-salon-gold-dark" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-salon-maroon">
                    {item.title}
                  </h4>
                  <p className="text-xs text-salon-text/75 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Studio Location & Map Banner */}
        <div className="mt-20 rounded-3xl bg-white p-8 sm:p-12 border border-salon-babypink shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-bold">
                VISIT THE SALON
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-salon-maroon">
                Located in Prince Colony, Harinagar, Badarpur
              </h3>
              <p className="text-xs sm:text-sm text-salon-text/75 font-light leading-relaxed">
                Address: D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044. Easily accessible from Badarpur border, Jaitpur, and surrounding South Delhi areas.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-salon-maroon">
                <a href="tel:+918810359438" className="hover:text-salon-gold-dark transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-salon-gold-dark" />
                  <span>+91 88103 59438</span>
                </a>
                <span>•</span>
                <span className="text-salon-rose-dark">Closed Tuesdays</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="https://maps.google.com/?q=D/109+Prince+Colony+Harinagar+Jaitpur+Badarpur+New+Delhi+110044"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-salon-maroon bg-salon-babypink/70 hover:bg-salon-babypink border border-salon-rose/30 shadow-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-salon-gold-dark" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
