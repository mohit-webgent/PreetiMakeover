import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Photo from '../components/common/Photo';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import { WhatsAppIcon } from '../components/common/icons';
import { useBusiness, useSiteData } from '../context/SiteDataContext';

// Mood photos bundled with the site, shown only until the owner uploads the real portfolio
// in Admin → Gallery. The wording changes accordingly (no "real clients" claim on stock imagery).
const STUDIO_PHOTOS = [
  { id: 's1', title: 'Bridal HD glam', category: 'Bridal', imageUrl: '/hero-bridal.jpg', w: 896, h: 1200 },
  { id: 's3', title: 'Soft waves & hair spa', category: 'Hair', imageUrl: '/gallery-hair.jpg', w: 800, h: 1424 },
  { id: 's4', title: 'Casmara algae facial', category: 'Facials', imageUrl: '/signature-facial.jpg', w: 800, h: 533 },
  { id: 's2', title: 'Occasion lehenga look', category: 'Bridal', imageUrl: '/signature-bridal.jpg', w: 800, h: 1000 },
  { id: 's6', title: 'Traditional saree look', category: 'Bridal', imageUrl: '/bridal-feature-detail.jpg', w: 700, h: 1050 },
  { id: 's7', title: 'Gel nail extensions', category: 'Nails', imageUrl: '/gallery-nails.jpg', w: 800, h: 533 },
  { id: 's8', title: 'Mirror-shine hair restoration', category: 'Hair', imageUrl: '/signature-hair.jpg', w: 800, h: 534 },
  { id: 's9', title: 'Rica gentle waxing', category: 'Waxing', imageUrl: '/signature-waxing.jpg', w: 800, h: 533 }
];

export default function GalleryPage() {
  const { gallery, galleryLoaded } = useSiteData();
  const biz = useBusiness();
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [index, setIndex] = useState(-1);
  const touchX = useRef(null);

  const hasPortfolio = gallery.length > 0;
  const items = hasPortfolio ? gallery : STUDIO_PHOTOS;
  const categories = useMemo(() => ['All', ...new Set(items.map((i) => i.category).filter(Boolean))], [items]);
  const shown = useMemo(() => (category === 'All' ? items : items.filter((i) => i.category === category)), [items, category]);

  const active = index >= 0 ? shown[index] : null;
  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback((dir) => setIndex((i) => (i + dir + shown.length) % shown.length), [shown.length]);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  return (
    <>
      <Seo
        title="Gallery: Bridal, Hair & Beauty Looks"
        description={`Bridal makeovers, hair treatments, facials and nail art at ${biz.businessName}, ${biz.shortAddress}.`}
        path="/gallery"
      />

      <PageHeader
        crumb="Gallery"
        title={hasPortfolio ? 'Recent work from the studio' : 'Looks we love to create'}
        intro="Bridal glam, healthy hair and glowing skin. Tap a photo to see it full screen."
      />

      {categories.length > 2 && (
        <div className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-sm lg:top-[76px]">
          <div className="container-x">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 scrollbar-none fade-edge-x sm:mx-0 sm:px-0" role="group" aria-label="Filter photos">
              {categories.map((c) => (
                <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container-x py-10 sm:py-14">
        {!galleryLoaded && !hasPortfolio ? (
          <div className="columns-2 gap-4 lg:columns-3" aria-label="Loading photos">
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className={`mb-4 animate-pulse rounded-card bg-rose ${i % 3 === 0 ? 'h-72' : 'h-52'}`} />)}
          </div>
        ) : (
          <ul className="columns-2 gap-4 sm:gap-6 lg:columns-3">
            {shown.map((item, i) => (
              <li key={item.id} className="mb-6 break-inside-avoid">
                <button type="button" onClick={() => setIndex(i)} className="group block w-full text-left" aria-label={`View ${item.title} full screen`}>
                  <span className="block overflow-hidden rounded-card bg-rose">
                    <Photo
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      width={item.w}
                      height={item.h}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-2.5 block font-semibold leading-snug text-ink">{item.title}</span>
                  <span className="block text-small text-ink-soft">{item.category}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 rounded-block bg-rose px-6 py-10 text-center sm:px-12">
          <h2 className="title">Have a look you love?</h2>
          <p className="lead mx-auto mt-3">
            Send us a reference photo on WhatsApp and {biz.ownerName.split(' ')[0]} will tell you how to adapt it to your skin, hair and occasion.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={biz.wa('Hello Preeti Makeover! I have a reference look I would love to try.')} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsAppIcon className="h-5 w-5" /> Send a reference photo
            </a>
            <Link to="/contact" className="btn-secondary">Book a consultation</Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-ink/95"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-small text-white/70">{index + 1} of {shown.length}</span>
              <button type="button" onClick={close} aria-label="Close" className="btn-icon bg-white/10 text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" onClick={close}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex max-h-full max-w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Photo src={active.imageUrl} alt={active.altText || active.title} priority sizes="100vw" className="max-h-[70vh] w-auto max-w-full rounded-card object-contain" />
                </motion.div>
              </AnimatePresence>
              {shown.length > 1 && (
                <>
                  <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="btn-icon absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 sm:inline-flex">
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="btn-icon absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 bg-white/10 text-white hover:bg-white/20 sm:inline-flex">
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-white sm:flex-row">
              <div className="text-center sm:text-left">
                <p className="font-display text-2xl">{active.title}</p>
                <p className="text-small text-white/70">{active.category}{shown.length > 1 ? '. Swipe for more.' : ''}</p>
              </div>
              <button
                type="button"
                onClick={() => { close(); navigate('/contact', { state: { preselectedService: active.category === 'Bridal' ? 'Signature HD bridal makeup' : undefined } }); }}
                className="btn bg-white text-wine hover:bg-rose"
              >
                Book this look
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
