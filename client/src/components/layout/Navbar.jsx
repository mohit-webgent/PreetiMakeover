import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Phone,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Home,
  Scissors,
  Crown,
  Images,
  Heart,
  CalendarHeart
} from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Services', path: '/services', icon: Scissors },
  { label: 'Bridal', path: '/bridal-makeup', icon: Crown },
  { label: 'Gallery', path: '/gallery', icon: Images },
  { label: 'About', path: '/about', icon: Heart },
  { label: 'Contact', path: '/contact', icon: CalendarHeart }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-0 lg:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto mx-auto transition-all duration-500 ${
            scrolled ? 'lg:mt-2 lg:max-w-6xl' : 'lg:mt-4 lg:max-w-7xl'
          }`}
        >
          <div
            className={`border-b lg:border border-white/70 backdrop-blur-xl lg:rounded-full px-4 sm:px-6 lg:px-5 transition-all duration-500 ${
              scrolled
                ? 'bg-white/85 py-2 shadow-[0_12px_40px_-12px_rgba(163,36,94,0.28)]'
                : 'bg-white/60 py-2.5 sm:py-3 shadow-[0_8px_30px_-15px_rgba(163,36,94,0.2)]'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Brand */}
              <Link to="/" className="flex items-center gap-2.5 group select-none shrink-0">
                <motion.img
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  src="/pm_logo.png"
                  alt="Preeti Makeover"
                  className="h-9 sm:h-10 w-auto object-contain drop-shadow-[0_4px_10px_rgba(238,127,168,0.45)]"
                />
                <div className="leading-none">
                  <span className="block font-serif text-[15px] sm:text-lg font-bold text-salon-maroon tracking-wide">
                    Preeti <span className="italic text-gradient-rose">Makeover</span>
                  </span>
                  <span className="block font-script text-[15px] sm:text-base text-salon-rose-dark -mt-0.5">
                    beauty is our duty
                  </span>
                </div>
              </Link>

              {/* Desktop links with sliding pill */}
              <nav className="hidden lg:flex items-center gap-1 rounded-full bg-salon-babypink-light/70 p-1 border border-salon-rose/15" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} end={link.path === '/'} className="relative">
                    {({ isActive }) => (
                      <span
                        className={`relative z-10 block px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-salon-text-muted hover:text-salon-maroon'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-salon-maroon via-salon-rose-dark to-salon-rose shadow-luxury-gold"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        {link.label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* CTAs */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:+918810359438"
                  className="hidden xl:inline-flex items-center gap-1.5 text-[13px] font-medium text-salon-maroon hover:text-salon-rose-dark transition-colors pr-1"
                >
                  <Phone className="w-4 h-4" /> 88103 59438
                </a>
                <Link to="/contact" className="btn-primary !px-4 sm:!px-5 !py-2 sm:!py-2.5 !text-xs sm:!text-[13px]">
                  <Sparkles className="w-4 h-4" />
                  <span>Book<span className="hidden sm:inline"> Now</span></span>
                </Link>
                <button
                  onClick={() => setOpen(true)}
                  className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-white text-salon-maroon border border-salon-rose/30 shadow-sm active:scale-90 transition"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 z-[90] bg-salon-maroon-subtle/40 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-[100] w-[86%] max-w-sm bg-petal-gradient shadow-2xl flex flex-col overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-salon-rose/25 blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 -left-16 w-56 h-56 rounded-full bg-salon-lavender/40 blur-3xl pointer-events-none" />

              <div className="relative flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <p className="font-serif text-xl font-bold text-salon-maroon">
                    Preeti <span className="italic text-gradient-rose">Makeover</span>
                  </p>
                  <p className="font-script text-lg text-salon-rose-dark -mt-1">beauty is our duty</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-white text-salon-maroon shadow flex items-center justify-center active:scale-90 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="relative flex-1 px-4 py-2 space-y-1.5">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive }) =>
                          `group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-salon-maroon to-salon-rose-dark text-white shadow-luxury-gold'
                              : 'bg-white/70 text-salon-text hover:bg-white'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-salon-babypink text-salon-maroon'}`}>
                              <Icon className="w-[18px] h-[18px]" />
                            </span>
                            <span className="flex-1 font-medium">{link.label === 'Bridal' ? 'Bridal Makeup' : link.label}</span>
                            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-salon-rose'}`} />
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="relative p-5 space-y-3">
                <Link to="/contact" className="btn-primary w-full !py-3.5">
                  <CalendarHeart className="w-4 h-4" /> Book an Appointment
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:+918810359438" className="btn-soft !px-3 !py-2.5 !text-xs">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href="https://wa.me/918810359438" target="_blank" rel="noopener noreferrer" className="btn-soft !px-3 !py-2.5 !text-xs !text-emerald-700">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
                <p className="text-center text-[11px] text-salon-text-muted">Open 10 AM – 9 PM · Closed Tuesdays</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
