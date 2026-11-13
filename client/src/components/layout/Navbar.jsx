import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useBusiness } from '../../context/SiteDataContext';
import { WhatsAppIcon } from '../common/icons';

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Bridal', path: '/bridal-makeup' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

/**
 * Sticky site header.
 * Phones/tablets: logo + call + WhatsApp (navigation lives in the bottom tab bar).
 * Desktop: full text navigation + phone + Book button.
 */
export default function Navbar() {
  const biz = useBusiness();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? 'shadow-lift' : ''
      }`}
    >
      <div className={`border-b transition-colors ${scrolled ? 'border-line' : 'border-transparent'}`}>
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          <Link to="/" className="flex items-center gap-2.5 min-w-0" aria-label={`${biz.businessName}, home`}>
            <img src="/pm_logo.png" alt="" width="40" height="40" className="h-10 w-10 shrink-0 object-contain" />
            <span className="min-w-0">
              <span className="block truncate font-display text-[1.375rem] leading-none text-ink">{biz.businessName}</span>
              <span className="mt-1 hidden text-caption text-ink-soft sm:block">Beauty salon & makeover studio</span>
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="Main">
            <ul className="flex items-center gap-1">
              {LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `relative block rounded-full px-3.5 py-2 text-[1.0625rem] font-medium transition-colors ${
                        isActive ? 'text-wine' : 'text-ink-soft hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && <span aria-hidden="true" className="absolute left-1/2 bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a href={biz.telHref} className="btn-icon text-wine hover:bg-rose lg:hidden" aria-label={`Call ${biz.phoneDisplay}`}>
              <Phone className="h-5 w-5" />
            </a>
            <a
              href={biz.wa('Hello Preeti Makeover! I would like to know more about your services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon text-wa hover:bg-[#E7F3EE] lg:hidden"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-[22px] w-[22px]" />
            </a>

            <a href={biz.telHref} className="hidden lg:inline-flex items-center gap-2 px-2 text-[1.0625rem] font-medium text-ink-soft hover:text-wine">
              <Phone className="h-4 w-4" /> {biz.phoneDisplay}
            </a>
            <Link to="/contact" className="btn-primary btn-sm hidden lg:inline-flex">
              Book a visit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
