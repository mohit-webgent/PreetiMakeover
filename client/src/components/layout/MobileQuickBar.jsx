import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export default function MobileQuickBar({ onBookClick }) {
  return (
    <aside 
      aria-label="Quick contact actions" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-blush/80 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href="tel:+918810359438"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-medium text-brand-plum bg-brand-ivory hover:bg-brand-blush/40 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-brand-gold-dark mb-0.5" />
          <span>Call Salon</span>
        </a>

        <a
          href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20an%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition-all"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onBookClick}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep active:scale-95 transition-all shadow-sm"
        >
          <Calendar className="w-4 h-4 text-brand-gold mb-0.5" />
          <span>Book Now</span>
        </button>
      </div>
    </aside>
  );
}
