import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  MapPin,
  Home,
  Scissors,
  Heart,
  Camera,
  User,
  Calendar,
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
    { label: 'Home', subtitle: 'Studio Welcome & Overview', path: '/', icon: Home },
    { label: 'Services', subtitle: '27 Salon & Skin Treatments', path: '/services', icon: Scissors },
    { label: 'Bridal Makeup', subtitle: 'Royal HD Bridal Studio', path: '/bridal-makeup', icon: Heart },
    { label: 'Gallery', subtitle: 'Real Work & Transformations', path: '/gallery', icon: Camera },
    { label: 'About Us', subtitle: 'Meet Preeti & Salon Story', path: '/about', icon: User },
    { label: 'Contact & Book', subtitle: 'Studio Location & Timings', path: '/contact', icon: Calendar },
  ];

  return (
    <header className="fixed top-0 lg:top-3.5 left-0 right-0 z-50 px-0 lg:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Island Container - Constrained Width & Rounded Pill */}
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
                    `px-3.5 py-1.5 text-[11px] xl:text-xs uppercase tracking-wider font-medium transition-all duration-200 rounded-full ${isActive
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
                className="sm:hidden px-3 py-1.5 rounded-full text-[11px] font-bold text-salon-maroon bg-gradient-to-r from-salon-gold-light via-salon-gold to-salon-gold-dark shadow-sm active:scale-95"
              >
                Book
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl text-salon-gold bg-white/10 hover:bg-white/15 active:scale-95 focus:outline-none transition-all border border-salon-gold/40 shadow-sm"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer - Crystal Clear & High-End Luxury UI */}
        {mobileMenuOpen && (
          <div className="lg:hidden mx-2.5 sm:mx-4 mt-2 bg-gradient-to-b from-[#1E0410]/98 via-[#280617]/98 to-[#16020B]/98 backdrop-blur-2xl border border-salon-gold/40 rounded-[28px] p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-fade-in text-white relative overflow-hidden max-h-[85vh] overflow-y-auto">
            
            {/* Ambient Lighting Glows */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-salon-gold/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-salon-rose/15 rounded-full blur-3xl pointer-events-none" />

            {/* Drawer Header with Brand & Studio Timings */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/15 relative z-10">
              <div className="flex items-center gap-2.5">
                <img
                  src="/pm_logo.png"
                  alt="Preeti Makeover Logo"
                  className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                />
                <div>
                  <span className="font-cinzel text-sm font-bold tracking-wider text-white block leading-tight">
                    PREETI MAKEOVER
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-salon-gold font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-salon-gold" />
                    <span>Prince Colony, Badarpur</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-salon-gold bg-white/10 px-2.5 py-1 rounded-full border border-salon-gold/30">
                <Clock className="w-3 h-3 text-salon-gold" />
                <span>10 AM – 9 PM</span>
              </div>
            </div>

            {/* High-Contrast, Crystal-Clear Nav Cards */}
            <nav className="flex flex-col space-y-1.5 relative z-10" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const IconComp = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border ${
                        isActive
                          ? 'bg-gradient-to-r from-salon-gold/25 via-salon-gold/15 to-transparent border-salon-gold/70 text-salon-gold shadow-md'
                          : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 hover:border-salon-gold/40 text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/10 group-hover:bg-salon-gold/20 text-salon-gold border border-salon-gold/30 shadow-sm transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="font-serif font-bold text-sm sm:text-base tracking-wide block leading-tight text-white group-hover:text-salon-gold-light transition-colors">
                          {link.label}
                        </span>
                        <span className="text-[10.5px] text-salon-blush/80 font-sans font-light block mt-0.5">
                          {link.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-salon-gold/70 group-hover:text-salon-gold transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </NavLink>
                );
              })}
            </nav>

            {/* Quick Actions: Book Appointment + Call + WhatsApp */}
            <div className="pt-3.5 mt-3 border-t border-white/15 flex flex-col gap-2 relative z-10">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs sm:text-sm font-bold text-salon-maroon bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] shadow-luxury border border-salon-gold-light active:scale-[0.98] transition-all"
              >
                <Calendar className="w-4 h-4 text-salon-maroon" />
                <span>Book Appointment Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+918810359438"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-salon-gold" />
                  <span>Call Studio</span>
                </a>

                <a
                  href="https://wa.me/918810359438"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-emerald-400/30 active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-2.5 mt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-salon-blush/65 font-sans relative z-10">
              <span>Harinagar, Badarpur, New Delhi</span>
              <span className="text-salon-gold font-medium">Closed Tuesdays</span>
            </div>

          </div>
        )}
      </div>
    </header>
  );
}
