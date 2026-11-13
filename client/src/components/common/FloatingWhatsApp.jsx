import React from 'react';
import { useBusiness } from '../../context/SiteDataContext';
import { WhatsAppIcon } from './icons';

/** Desktop-only WhatsApp shortcut (phones have it in the header). */
export default function FloatingWhatsApp() {
  const biz = useBusiness();
  return (
    <a
      href={biz.wa('Hello Preeti Makeover! I would like to enquire about your salon services.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Preeti Makeover on WhatsApp"
      className="hidden lg:flex fixed bottom-6 right-6 z-40 h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-float transition-colors hover:bg-wa-deep"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
