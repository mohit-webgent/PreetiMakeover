import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Lock, 
  CalendarX, 
  Sparkles, 
  Heart,
  ChevronRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#FFF4F8] via-[#FDE6EF] to-[#EFE6FD] text-salon-text overflow-hidden">
      {/* Top Luxury Golden Divider Line to strongly separate from the dark section above */}
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-10 sm:h-14 text-white/80">
        <path fill="currentColor" d="M0,32 C240,64 480,0 720,24 C960,48 1200,8 1440,30 L1440,0 L0,0 Z" />
      </svg>
      <p className="text-center font-script text-3xl sm:text-4xl text-salon-rose-dark pt-6 relative z-10">Stay beautiful, always ♡</p>

      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-salon-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-salon-rose/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-14 pb-28 md:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-salon-maroon/10">
          
          {/* Brand Column (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md border border-salon-gold/30 flex items-center justify-center group-hover:shadow-luxury-gold group-hover:scale-105 transition-all duration-300">
                <img
                  src="/pm_logo.png"
                  alt="Preeti Makeover Crest"
                  className="h-full w-auto object-contain filter drop-shadow-sm"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.04em] text-salon-maroon block leading-tight group-hover:text-salon-maroon-deep transition-colors">
                  Preeti Makeover
                </span>
                <span className="text-[9.5px] uppercase tracking-[0.2em] text-salon-gold-dark font-bold block mt-0.5">
                  Beauty Salon & Makeover Studio
                </span>
              </div>
            </Link>

            <p className="text-xs text-salon-text/80 leading-relaxed font-normal max-w-sm">
              A bespoke beauty parlour and makeover studio in Badarpur, New Delhi, founded and led by <strong className="text-salon-maroon font-semibold">Preeti Mandal</strong>. Specializing in high-definition bridal artistry, restorative clinical hair treatments, and luxury facials.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-salon-maroon hover:bg-salon-maroon-deep text-salon-gold-light hover:text-white border border-salon-gold/40 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-salon-gold" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

          {/* Quick Links Column (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cinzel text-xs font-bold text-salon-maroon tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-salon-gold shrink-0"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { to: '/', label: 'Home Overview' },
                { to: '/services', label: 'Salon Services (All 27)' },
                { to: '/bridal-makeup', label: 'Bridal & Occasion Makeup' },
                { to: '/gallery', label: 'Salon Work Portfolio' },
                { to: '/about', label: 'Our Story & Commitments' },
                { to: '/contact', label: 'Book an Appointment' },
              ].map((item) => (
                <li key={item.to}>
                  <Link 
                    to={item.to} 
                    className="group flex items-center gap-2 text-salon-text-muted hover:text-salon-maroon font-medium py-0.5 transition-all duration-200"
                  >
                    <ChevronRight className="w-3 h-3 text-salon-gold-dark/60 group-hover:text-salon-maroon group-hover:translate-x-0.5 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}

              <li className="pt-2 border-t border-salon-maroon/10">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-salon-maroon/5 hover:bg-salon-maroon text-salon-maroon hover:text-salon-gold text-[11px] font-semibold border border-salon-maroon/15 transition-all"
                >
                  <Lock className="w-3 h-3" />
                  <span>Salon Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact & Hours Column (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-cinzel text-xs font-bold text-salon-maroon tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-salon-gold shrink-0"></span>
              Studio Location & Timings
            </h4>

            <div className="space-y-3 text-xs">
              {/* Address */}
              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/60 border border-salon-babypink hover:border-salon-gold/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-salon-gold/15 text-salon-gold-dark flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-salon-maroon block mb-0.5">Studio Address</span>
                  <span className="text-salon-text/80 leading-snug block">
                    D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044
                  </span>
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                <a 
                  href="tel:+918810359438"
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/60 border border-salon-babypink hover:border-salon-gold/40 hover:bg-white transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-salon-rose/20 text-salon-maroon flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-salon-text-muted block">Direct Call</span>
                    <span className="font-semibold text-salon-maroon group-hover:text-salon-gold-dark transition-colors">
                      +91 88103 59438
                    </span>
                  </div>
                </a>

                <a 
                  href="mailto:preetimakeoverpm@gmail.com"
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/60 border border-salon-babypink hover:border-salon-gold/40 hover:bg-white transition-all group"
                >
                  <div className="w-8 h-8 rounded-xl bg-salon-gold/15 text-salon-gold-dark flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-salon-text-muted block">Email Studio</span>
                    <span className="font-medium text-salon-maroon text-[11px] truncate block group-hover:text-salon-gold-dark transition-colors">
                      preetimakeoverpm@gmail.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/60 border border-salon-babypink">
                <div className="w-8 h-8 rounded-xl bg-salon-maroon/10 text-salon-maroon flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Clock className="w-4 h-4 text-salon-gold-dark" />
                </div>
                <div>
                  <div className="font-semibold text-salon-maroon">Wednesday – Monday: 10:00 AM – 9:00 PM</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-100/90 text-rose-800 border border-rose-200">
                      <CalendarX className="w-3 h-3 text-rose-600" />
                      Weekly off: Tuesday (Strictly Closed)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-salon-text-muted font-normal">
          <div>
            © {currentYear} <strong className="font-semibold text-salon-maroon">Preeti Makeover</strong>. All rights reserved. Owned & operated by Preeti Mandal.
          </div>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-salon-rose fill-salon-rose" />
            <span>for Preeti Makeover Studio</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
