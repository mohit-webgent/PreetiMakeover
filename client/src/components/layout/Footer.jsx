import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Lock, CalendarX } from 'lucide-react';

export default function Footer({ onAdminClick }) {
  return (
    <footer className="bg-brand-plum-deep text-brand-ivory border-t border-brand-blush/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-plum text-brand-gold flex items-center justify-center font-serif text-xl font-bold border border-brand-gold/40 shadow-sm">
                P
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-tight">
                  Preeti Makeover
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium block">
                  Your Beauty Is Our Duty.
                </span>
              </div>
            </div>

            <p className="text-xs text-brand-ivory/70 leading-relaxed font-light max-w-sm pt-2">
              A premium beauty parlour and makeover studio in Badarpur, New Delhi, owned by Preeti Mandal. Specialized in HD bridal makeup, hair rejuvenation treatments, and clinical skincare.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-brand-ivory/70">
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Salon Services & Treatments</a></li>
              <li><a href="#bridal" className="hover:text-brand-gold transition-colors">Bridal & HD Makeover Packages</a></li>
              <li><a href="#brands" className="hover:text-brand-gold transition-colors">Certified Professional Brands</a></li>
              <li><a href="#gallery" className="hover:text-brand-gold transition-colors">Salon Work Portfolio</a></li>
              <li><a href="#reviews" className="hover:text-brand-gold transition-colors">Client Satisfaction Standards</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Book an Appointment</a></li>
              <li className="pt-2 border-t border-white/10">
                <button
                  onClick={onAdminClick}
                  className="flex items-center gap-1.5 text-brand-gold/80 hover:text-brand-gold transition-colors text-left"
                >
                  <Lock className="w-3 h-3" />
                  <span>Salon Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Studio Location & Timings
            </h4>
            <div className="space-y-2.5 text-xs text-brand-ivory/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+918810359438" className="hover:text-brand-gold transition-colors">+91 88103 59438</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:preetimakeoverpm@gmail.com" className="hover:text-brand-gold transition-colors">preetimakeoverpm@gmail.com</a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <div>Wednesday – Monday: 10:00 AM – 9:00 PM</div>
                  <div className="text-rose-300 font-medium flex items-center gap-1 mt-0.5">
                    <CalendarX className="w-3 h-3" />
                    <span>Weekly off: Tuesday (Closed)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching PDF */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-ivory/60 gap-4">
          <p>
            © {new Date().getFullYear()} Preeti Makeover. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-brand-ivory/50">
            <span>Designed & Developed as a live portfolio product by</span>
            <span className="font-semibold text-brand-gold">Webgent</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
