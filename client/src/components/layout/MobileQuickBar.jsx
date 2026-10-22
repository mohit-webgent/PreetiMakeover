import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export default function MobileQuickBar() {
  return (
    <aside 
      aria-label="Quick contact actions" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#250816]/98 backdrop-blur-xl border-t border-salon-gold/30 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href="tel:+918810359438"
          className="min-h-[46px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10.5px] uppercase tracking-wider font-semibold text-salon-gold bg-white/10 hover:bg-white/15 active:scale-95 transition-all border border-salon-gold/25"
        >
          <Phone className="w-4 h-4 text-salon-gold mb-0.5" />
          <span>Call Studio</span>
        </a>

        <a
          href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[46px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10.5px] uppercase tracking-wider font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900/90 active:scale-95 transition-all border border-emerald-500/40"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/contact"
          className="min-h-[46px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[10.5px] uppercase tracking-wider font-bold text-salon-maroon-deep bg-gradient-to-r from-[#D4AF37] via-[#E5C583] to-[#C5A15A] hover:brightness-105 active:scale-95 transition-all shadow-md border border-salon-gold-light"
        >
          <Calendar className="w-4 h-4 text-salon-maroon-deep mb-0.5" />
          <span>Book Now</span>
        </Link>
      </div>
    </aside>
  );
}
