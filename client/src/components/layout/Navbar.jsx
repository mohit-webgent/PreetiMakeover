import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Calendar, MessageCircle, Phone, Menu, X, Sparkles, ChevronRight, Clock, MapPin } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Bridal Makeup', path: '/bridal-makeup' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact & Book', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 lg:top-3.5 left-0 right-0 z-50 px-0 lg:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Island Container - Constrained Width & Rounded Pill */}
      <div className="w-full lg:max-w-6xl mx-auto pointer-events-auto">
        <div className="bg-[#2B0B1A]/95 backdrop-blur-xl border-b border-salon-gold/25 lg:border lg:border-salon-gold/35 shadow-[0_4px_20px_rgba(0,0,0,0.4)] lg:shadow-[0_12px_35px_rgba(0,0,0,0.5)] rounded-none lg:rounded-full px-3 sm:px-5 py-2.5 sm:py-2.5 transition-all duration-300">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo with Cinzel Luxury Typography */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none select-none">
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  src="/pm_logo.png"
                  alt="Preeti Makeover Crest"
                  className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)] group-hover:scale-105 group-hover:drop-shadow-[0_4px_12px_rgba(212,175,55,0.65)] transition-all duration-300"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-cinzel text-[13px] sm:text-base md:text-lg font-bold tracking-[0.08em] text-white group-hover:text-salon-gold-light transition-colors leading-tight">
                  PREETI MAKEOVER
                </span>
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.22em] text-salon-gold font-medium block leading-none mt-0.5">
                  Luxury Salon & Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Refined, Smaller, Cleanly Displayed */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-[11px] xl:text-xs uppercase tracking-wider font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-salon-gold font-bold bg-white/15 shadow-sm border border-salon-gold/45'
                        : 'text-salon-blush/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 shadow-xs hover:border-emerald-400/60 transition-colors"
                title="Chat on WhatsApp"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold text-salon-maroon-deep bg-gradient-to-r from-[#D4AF37] via-[#E5C583] to-[#C5A15A] hover:from-[#E5C583] hover:to-[#D4AF37] shadow-[0_4px_16px_rgba(197,161,90,0.35)] hover:shadow-[0_6px_22px_rgba(197,161,90,0.55)] transition-all transform hover:-translate-y-0.5 border border-salon-gold-light group"
              >
                <Sparkles className="w-3.5 h-3.5 text-salon-maroon-deep group-hover:rotate-12 transition-transform duration-300" />
                <span>Book Now</span>
              </Link>
            </div>

            {/* Mobile Controls (Quick WhatsApp + Book + Hamburger) */}
            <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
              <a
                href="https://wa.me/918810359438"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden p-1.5 rounded-full text-emerald-300 bg-emerald-950/70 border border-emerald-500/40"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <Link
                to="/contact"
                className="sm:hidden px-3 py-1.5 rounded-full text-[10.5px] font-bold text-salon-maroon-deep bg-gradient-to-r from-salon-gold to-salon-gold-light shadow-sm"
              >
                Book
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[36px] min-h-[36px] flex items-center justify-center p-1.5 rounded-full text-salon-gold hover:bg-white/10 active:scale-95 focus:outline-none transition-all border border-salon-gold/30"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer - Built Specifically For Mobile Users */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#220713]/98 backdrop-blur-2xl border border-salon-gold/35 rounded-3xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] animate-fade-in text-white">
            {/* Drawer Header with Brand & Studio Address */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <img
                  src="/pm_logo.png"
                  alt="Preeti Makeover Logo"
                  className="h-9 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                />
                <div>
                  <span className="font-cinzel text-sm font-bold tracking-wider text-white block leading-tight">
                    PREETI MAKEOVER
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-salon-gold font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-salon-gold" />
                    <span>Prince Colony, Badarpur</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[9px] text-salon-gold bg-white/10 px-2 py-0.5 rounded-full border border-salon-gold/30">
                <Clock className="w-3 h-3" />
                <span>10 AM – 9 PM</span>
              </div>
            </div>

            {/* Touch-Friendly Nav Links (Min 48px Touch Target) */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between min-h-[46px] px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-salon-gold font-bold border-l-4 border-salon-gold shadow-xs'
                        : 'text-salon-blush/85 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </NavLink>
              ))}
            </nav>

            {/* Mobile Actions: WhatsApp, Call, Book */}
            <div className="pt-3 mt-3 border-t border-white/15 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[46px] flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold text-salon-maroon-deep bg-gradient-to-r from-[#D4AF37] via-[#E5C583] to-[#C5A15A] shadow-md border border-salon-gold-light active:scale-[0.98] transition-transform"
              >
                <Sparkles className="w-4 h-4 text-salon-maroon-deep" />
                <span>Book an Appointment</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/918810359438"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 active:scale-95 transition-transform"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="tel:+918810359438"
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-salon-gold bg-white/10 border border-salon-gold/30 active:scale-95 transition-transform"
                >
                  <Phone className="w-3.5 h-3.5 text-salon-gold" />
                  <span>Call Studio</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
