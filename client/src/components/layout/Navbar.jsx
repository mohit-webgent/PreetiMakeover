import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, MessageCircle, Phone, Menu, X } from 'lucide-react';

export default function Navbar({ onBookClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Bridal', href: '#bridal' },
    { label: 'Brands', href: '#brands' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-luxury py-3 border-b border-brand-blush/60' 
          : 'bg-white/80 backdrop-blur-sm py-5 border-b border-brand-blush/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-plum to-brand-plum-deep text-brand-gold flex items-center justify-center font-serif text-xl font-bold shadow-md group-hover:scale-105 transition-transform duration-300">
              P
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-plum block leading-tight">
                Preeti Makeover
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-gold-dark font-medium block">
                Your Beauty Is Our Duty.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-brand-plum/80 hover:text-brand-gold-dark transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-brand-plum to-brand-plum-light hover:from-brand-plum-deep hover:to-brand-plum shadow-md hover:shadow-luxury transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onBookClick}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-brand-plum"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-plum hover:bg-brand-blush/30 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-brand-blush shadow-luxury px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-brand-plum font-medium hover:text-brand-gold-dark transition-colors py-1 border-b border-brand-blush/30"
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="https://wa.me/918810359438"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+918810359438"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-brand-ivory text-brand-plum border border-brand-blush"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call +91 88103 59438</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
