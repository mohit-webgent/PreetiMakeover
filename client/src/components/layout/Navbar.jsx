import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight, 
  MessageCircle
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Bridal Makeup', path: '/bridal-makeup' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact & Book', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 lg:top-3.5 left-0 right-0 z-50 px-0 lg:px-6 pointer-events-none transition-all duration-300">
        {/* Floating Island Container - Constrained Width & Rounded Pill on Desktop */}
        <div className="w-full lg:max-w-6xl mx-auto pointer-events-auto">
          <div className="bg-[#2B0B1A]/95 backdrop-blur-xl border-b border-salon-gold/25 lg:border lg:border-salon-gold/35 shadow-[0_4px_20px_rgba(0,0,0,0.4)] lg:shadow-[0_12px_35px_rgba(0,0,0,0.5)] rounded-none lg:rounded-full px-3.5 sm:px-5 py-2.5 sm:py-2.5 transition-all duration-300">
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

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `px-3.5 py-1.5 text-[11px] xl:text-xs uppercase tracking-wider font-medium transition-all duration-200 rounded-full ${
                        isActive
                          ? 'text-salon-gold font-bold bg-white/10 border border-salon-gold/30'
                          : 'text-salon-blush/80 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-bold text-salon-maroon-deep bg-gradient-to-r from-[#D4AF37] via-[#E5C583] to-[#C5A15A] hover:from-[#E5C583] hover:to-[#D4AF37] shadow-[0_4px_16px_rgba(197,161,90,0.35)] hover:shadow-[0_6px_22px_rgba(197,161,90,0.55)] transition-all transform hover:-translate-y-0.5 border border-salon-gold-light group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-salon-maroon-deep" />
                  <span>Book Now</span>
                </Link>
              </div>

              {/* Mobile Controls (Book + Hamburger) */}
              <div className="lg:hidden flex items-center gap-2">
                <Link
                  to="/contact"
                  className="sm:hidden px-3.5 py-1.5 rounded-full text-[11px] font-bold text-salon-maroon bg-gradient-to-r from-salon-gold-light via-salon-gold to-salon-gold-dark shadow-sm active:scale-95"
                >
                  Book
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl text-salon-gold bg-white/10 hover:bg-white/15 active:scale-95 focus:outline-none transition-all border border-salon-gold/40 shadow-sm"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay - 100% Solid, High Contrast, No Borders, Non-Scrollable */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#16020E] z-[100] flex flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 overflow-hidden select-none animate-fade-in">
          
          {/* Top Bar: Brand Crest + Close Button (X) */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
              <img
                src="/pm_logo.png"
                alt="Preeti Makeover Logo"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
              />
              <div>
                <span className="font-cinzel text-base font-bold tracking-wider text-white block leading-tight">
                  PREETI MAKEOVER
                </span>
                <span className="text-[9px] uppercase tracking-widest text-salon-gold font-medium block mt-0.5">
                  Luxury Salon & Studio
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 text-white hover:text-salon-gold flex items-center justify-center active:scale-95 transition-all"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links - Solid Bold White / Gold, Cinzel Luxury Font, No Borders, Clean Spacing */}
          <nav className="flex flex-col space-y-2.5 sm:space-y-3.5 my-auto py-2" aria-label="Mobile Navigation">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center justify-between py-2.5 text-left transition-all duration-200 border-none outline-none ${
                    isActive
                      ? 'text-salon-gold'
                      : 'text-white/95 hover:text-salon-gold-light'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3.5">
                      <span className={`font-cinzel text-xs tracking-widest ${
                        isActive ? 'text-salon-gold font-bold' : 'text-salon-gold/50 font-medium'
                      }`}>
                        0{idx + 1}
                      </span>
                      <span className={`font-cinzel tracking-[0.08em] uppercase transition-colors ${
                        isActive 
                          ? 'font-bold text-lg sm:text-xl text-salon-gold' 
                          : 'font-semibold text-base sm:text-lg text-white group-hover:text-salon-gold-light'
                      }`}>
                        {link.label}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? 'text-salon-gold translate-x-1' : 'text-white/30 group-hover:text-salon-gold/70'
                        }`}
                      />
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions - Clear & Direct (No Scroll Needed) */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full text-center font-cinzel font-bold text-xs sm:text-sm tracking-[0.12em] uppercase text-salon-maroon bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury-gold shadow-luxury transition-all active:scale-95"
            >
              Book an Appointment
            </Link>

            <div className="flex items-center justify-between text-xs text-white/80 pt-1">
              <a
                href="tel:+918810359438"
                className="flex items-center gap-1.5 text-white hover:text-salon-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-salon-gold" />
                <span>+91 8810359438</span>
              </a>

              <a
                href="https://wa.me/918810359438"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Chat</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/50 pt-1 font-sans">
              <span>Prince Colony, Harinagar, Badarpur</span>
              <span className="text-salon-gold">Open 10 AM – 9 PM</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
