import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CalendarHeart } from 'lucide-react';

export default function MobileQuickBar() {
  return (
    <aside
      aria-label="Quick contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] bg-white/85 backdrop-blur-xl border-t border-salon-rose/20 shadow-[0_-10px_30px_-12px_rgba(163,36,94,0.3)]"
    >
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2 max-w-md mx-auto">
        <a
          href="tel:+918810359438"
          className="min-h-[48px] flex flex-col items-center justify-center rounded-2xl text-[11px] font-semibold text-salon-maroon bg-salon-babypink-light border border-salon-rose/20 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          Call
        </a>
        <a
          href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] flex flex-col items-center justify-center rounded-2xl text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 mb-0.5" />
          WhatsApp
        </a>
        <Link to="/contact" className="btn-primary min-h-[48px] !rounded-2xl !px-2 !py-0 !text-[13px]">
          <CalendarHeart className="w-4 h-4" />
          Book Now
        </Link>
      </div>
    </aside>
  );
}
