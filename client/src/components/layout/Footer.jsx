import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useBusiness, useSiteData } from '../../context/SiteDataContext';
import { openStatus } from '../../lib/business';
import { WhatsAppIcon } from '../common/icons';

export default function Footer() {
  const biz = useBusiness();
  const { categories } = useSiteData();
  const status = openStatus(biz);
  const serviceCount = categories.reduce((n, c) => n + (c.services?.length || 0), 0);

  const links = [
    { to: '/services', label: serviceCount ? `Services & prices (${serviceCount})` : 'Services & prices' },
    { to: '/bridal-makeup', label: 'Bridal makeup' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: `About ${biz.ownerName.split(' ')[0]}` },
    { to: '/contact', label: 'Book a visit' }
  ];

  return (
    <footer className="bg-night pb-24 text-white/80 lg:pb-0">
      <div className="container-x py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/pm_logo.png" alt="" width="48" height="48" className="h-12 w-12 object-contain" />
              <span className="font-display text-2xl text-white">{biz.businessName}</span>
            </Link>
            <p className="mt-5 max-w-sm text-white/70">
              A personal beauty studio in Badarpur, New Delhi, run by {biz.ownerName}. Bridal makeup, hair treatments and
              facials with genuine products.
            </p>
            <p className="mt-6 font-display text-xl text-gold-soft" lang="hi">आपकी सुंदरता, हमारी ज़िम्मेदारी</p>
            <p className="text-small text-white/60">{biz.tagline}</p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-sans text-small font-semibold text-white">Visit the studio</h2>
            <ul className="mt-4 space-y-5">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {biz.address}
                  <a
                    href={biz.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
                  >
                    Get directions
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {biz.openDaysLabel}, {biz.hoursLabel}
                  <span className="block text-white/60">Closed every {biz.weeklyOffDay}</span>
                  <span className="mt-1 inline-flex items-center gap-2 text-small font-medium text-white">
                    <span className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-rose-accent'}`} aria-hidden="true" />
                    {status.label}
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-sans text-small font-semibold text-white">Talk to us</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={biz.telHref} className="inline-flex items-center gap-3 hover:text-white">
                  <Phone className="h-4 w-4 text-gold" /> {biz.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={biz.wa('Hello Preeti Makeover!')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                  <WhatsAppIcon className="h-4 w-4 text-gold" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={biz.mailHref} className="inline-flex items-center gap-3 [overflow-wrap:anywhere] hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-gold" /> {biz.email}
                </a>
              </li>
            </ul>

            <h2 className="mt-8 font-sans text-small font-semibold text-white">Explore</h2>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-small text-white/50">
          © {new Date().getFullYear()} {biz.businessName}. Owned and run by {biz.ownerName}.
        </p>
      </div>
    </footer>
  );
}
