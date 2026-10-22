import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, Lock, CalendarX, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-salon-maroon-deep text-salon-blush border-t border-salon-gold/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3.5 group">
              <img
                src="/pm_logo.png"
                alt="Preeti Makeover Crest"
                className="h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(197,161,90,0.4)] group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-tight">
                  Preeti Makeover
                </span>
                <span className="text-[10px] uppercase tracking-widest text-salon-gold font-medium block">
                  Beauty Salon & Makeover Studio
                </span>
              </div>
            </Link>

            <p className="text-xs text-salon-blush/80 leading-relaxed font-light max-w-sm pt-2">
              A bespoke beauty parlour and makeover studio in Badarpur, New Delhi, founded and led by <strong className="text-white font-medium">Preeti Mandal</strong>. Specializing in high-definition bridal artistry, restorative clinical hair treatments, and luxury facials.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-salon-maroon text-salon-gold hover:text-white border border-salon-gold/30 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-salon-gold" />
                <span>Book Service</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-salon-blush/80">
              <li>
                <Link to="/" className="hover:text-salon-gold transition-colors block py-0.5">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-salon-gold transition-colors block py-0.5">
                  Salon Services (All 27)
                </Link>
              </li>
              <li>
                <Link to="/bridal-makeup" className="hover:text-salon-gold transition-colors block py-0.5">
                  Bridal & Occasion Makeup
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-salon-gold transition-colors block py-0.5">
                  Salon Work Portfolio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-salon-gold transition-colors block py-0.5">
                  Our Story & Commitments
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-salon-gold transition-colors block py-0.5">
                  Book an Appointment
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 text-salon-gold/80 hover:text-salon-gold transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Salon Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Studio Location & Timings
            </h4>
            <div className="space-y-2.5 text-xs text-salon-blush/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-salon-gold shrink-0 mt-0.5" />
                <span>D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-salon-gold shrink-0" />
                <a href="tel:+918810359438" className="hover:text-salon-gold transition-colors">
                  +91 88103 59438
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-salon-gold shrink-0" />
                <a href="mailto:preetimakeoverpm@gmail.com" className="hover:text-salon-gold transition-colors">
                  preetimakeoverpm@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-salon-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">Wednesday – Monday: 10:00 AM – 9:00 PM</div>
                  <div className="text-salon-rose-light font-medium flex items-center gap-1 mt-0.5">
                    <CalendarX className="w-3 h-3 text-salon-rose" />
                    <span>Weekly off: Tuesday (Strictly Closed)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-salon-blush/60 font-light">
          <div>
            © {new Date().getFullYear()} Preeti Makeover. All rights reserved. Owned by Preeti Mandal.
          </div>
          <div className="flex items-center gap-3">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-salon-rose fill-salon-rose" />
            <span>for Preeti Makeover</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
