import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Search, X } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import FaqSection, { buildFaqs, faqJsonLd } from '../components/sections/FaqSection';
import { WhatsAppIcon } from '../components/common/icons';
import { useBusiness, useSiteData } from '../context/SiteDataContext';
import { SITE_URL } from '../config/siteDefaults';

const FAQ_TOPICS = ['pricing', 'products', 'confirm', 'hours'];

const priceLabel = (s) =>
  s.startingPrice ? `From ₹${Number(s.startingPrice).toLocaleString('en-IN')}` : 'Price on consultation';

export default function ServicesPage() {
  const { categories, servicesLoading, servicesError } = useSiteData();
  const biz = useBusiness();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'popular' | category slug
  const [active, setActive] = useState(null);

  const total = categories.reduce((n, c) => n + (c.services?.length || 0), 0);
  const popularCount = categories.reduce((n, c) => n + (c.services || []).filter((s) => s.isFeatured).length, 0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => filter === 'all' || filter === 'popular' || c.slug === filter)
      .map((c) => ({
        ...c,
        services: (c.services || []).filter(
          (s) =>
            (filter !== 'popular' || s.isFeatured) &&
            (!q || s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q))
        )
      }))
      .filter((c) => c.services.length);
  }, [categories, filter, query]);

  const book = (s) => navigate('/contact', { state: { preselectedService: s.name, serviceId: s.id, durationMinutes: s.durationMinutes } });
  const ask = (s) => biz.wa(`Hello Preeti Makeover! I'd like to know more about "${s.name}".`);

  const catalogJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: biz.businessName,
      url: SITE_URL,
      telephone: biz.phone,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Salon services',
        itemListElement: categories.map((cat) => ({
          '@type': 'OfferCatalog',
          name: cat.name,
          itemListElement: (cat.services || []).map((sv) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: sv.name, description: sv.description || undefined },
            ...(sv.startingPrice
              ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: Number(sv.startingPrice), priceCurrency: 'INR' } }
              : {})
          }))
        }))
      }
    }),
    [categories, biz.businessName, biz.phone]
  );

  return (
    <>
      <Seo
        title="Salon Services & Prices"
        description={`Hair botox, nanoplastia, keratin, Casmara facials, Rica waxing, bridal makeup and more at ${biz.businessName}, ${biz.shortAddress}. See the full menu and book online.`}
        path="/services"
        jsonLd={[catalogJsonLd, faqJsonLd(buildFaqs(biz, FAQ_TOPICS))]}
      />

      <PageHeader
        crumb="Services"
        title="Services & prices"
        intro={`${total ? `${total} treatments` : 'Treatments'} for hair, skin, nails and bridal looks. Where the price depends on hair length or skin type, we confirm it after a quick consultation.`}
      >
        <label className="relative block max-w-xl">
          <span className="sr-only">Search services</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keratin, facial, bridal…"
            className="field pl-12 pr-12"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-soft hover:bg-rose">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </PageHeader>

      {/* Category filter, always within reach while scrolling */}
      <div className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-sm lg:top-[76px]">
        <div className="container-x">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 scrollbar-none fade-edge-x sm:mx-0 sm:px-0" role="group" aria-label="Filter services">
            <button type="button" className="chip" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All <span className="opacity-70">{total || ''}</span>
            </button>
            {popularCount > 0 && (
              <button type="button" className="chip" aria-pressed={filter === 'popular'} onClick={() => setFilter('popular')}>
                Popular <span className="opacity-70">{popularCount}</span>
              </button>
            )}
            {categories.map((c) => (
              <button key={c.slug} type="button" className="chip" aria-pressed={filter === c.slug} onClick={() => setFilter(c.slug)}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x pb-16 pt-8 sm:pb-20 sm:pt-10">
        {servicesLoading ? (
          <div className="grid gap-3 md:grid-cols-2" aria-label="Loading services">
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="h-28 animate-pulse rounded-card bg-rose" />)}
          </div>
        ) : servicesError && !categories.length ? (
          <div className="card mx-auto max-w-lg p-8 text-center">
            <h2 className="font-display text-2xl">The service menu didn't load</h2>
            <p className="mt-2 text-ink-soft">Refresh the page, or ask us on WhatsApp and we'll send the menu with prices.</p>
            <a href={biz.wa('Hello Preeti Makeover! Could you share your service menu and prices?')} target="_blank" rel="noopener noreferrer" className="btn-wa mt-6">
              <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
            </a>
          </div>
        ) : visible.length === 0 ? (
          <div className="card mx-auto max-w-lg p-8 text-center">
            <h2 className="font-display text-2xl">No treatments match “{query}”</h2>
            <p className="mt-2 text-ink-soft">Try another word, or ask us what would suit you.</p>
            <button type="button" onClick={() => { setQuery(''); setFilter('all'); }} className="btn-secondary mt-6">Show all services</button>
          </div>
        ) : (
          <div className="space-y-14">
            {visible.map((cat) => (
              <section key={cat.slug} aria-labelledby={`cat-${cat.slug}`}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h2 id={`cat-${cat.slug}`} className="font-display text-[1.75rem] leading-tight sm:text-[2rem]">{cat.name}</h2>
                  <span className="shrink-0 text-small text-ink-soft">{cat.services.length} {cat.services.length === 1 ? 'treatment' : 'treatments'}</span>
                </div>
                {cat.description && <p className="mt-3 max-w-prose text-ink-soft">{cat.description}</p>}

                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {cat.services.map((s) => (
                    <li key={s.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                      <button type="button" onClick={() => setActive(s)} className="min-w-0 flex-1 text-left" aria-label={`${s.name}: details`}>
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[1.125rem] font-semibold leading-snug text-ink">{s.name}</span>
                          {s.isFeatured && <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-caption font-semibold text-gold-deep">Popular</span>}
                        </span>
                        {s.description && <span className="mt-1 block line-clamp-2 text-small text-ink-soft">{s.description}</span>}
                        <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-small">
                          {s.durationMinutes ? (
                            <span className="inline-flex items-center gap-1.5 text-ink-soft">
                              <Clock className="h-4 w-4" /> {s.durationMinutes} min
                            </span>
                          ) : null}
                          <span className="font-semibold text-wine">{priceLabel(s)}</span>
                        </span>
                      </button>
                      <div className="flex shrink-0 items-center gap-2">
                        <button type="button" onClick={() => book(s)} className="btn-primary btn-sm flex-1 sm:flex-none">Book</button>
                        <a href={ask(s)} target="_blank" rel="noopener noreferrer" className="btn-icon border border-line text-wa hover:bg-[#E7F3EE]" aria-label={`Ask about ${s.name} on WhatsApp`}>
                          <WhatsAppIcon className="h-5 w-5" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        <div className="mt-16 grid gap-6 rounded-block bg-rose-light p-6 sm:grid-cols-3 sm:p-10">
          {[
            ['Genuine products', "Every Casmara mask, L'Oréal tube and Rica wax is sealed and opened in front of you."],
            ['Clean, every time', 'Tools are sanitised between clients, with disposable capes, strips and sponges.'],
            [`Closed ${biz.weeklyOffDay}s`, `We use the weekly off day for a deep clean and restocking. Open ${biz.openDaysLabel}, ${biz.hoursLabel}.`]
          ].map(([title, text]) => (
            <div key={title}>
              <h3 className="flex items-center gap-2 text-h3"><Check className="h-5 w-5 text-gold" /> {title}</h3>
              <p className="mt-2 text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <FaqSection topics={FAQ_TOPICS} title="Before you book" className="border-t border-line" />

      {active && <ServiceSheet service={active} onClose={() => setActive(null)} onBook={book} askHref={ask(active)} ownerName={biz.ownerName} />}
    </>
  );
}

/** Service details: a bottom sheet on phones, a centred dialog on larger screens. */
function ServiceSheet({ service, onClose, onBook, askHref, ownerName }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-sheet-title"
        className="relative max-h-[88vh] w-full animate-fade-in-up overflow-y-auto rounded-t-block bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:max-w-lg sm:rounded-block sm:p-8"
      >
        <span aria-hidden="true" className="mx-auto mb-4 block h-1 w-10 rounded-full bg-rose-deep sm:hidden" />
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="btn-icon absolute right-3 top-3 text-ink-soft hover:bg-rose">
          <X className="h-5 w-5" />
        </button>

        <h2 id="service-sheet-title" className="pr-10 font-display text-[1.75rem] leading-tight">{service.name}</h2>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-small">
          {service.durationMinutes ? (
            <span className="inline-flex items-center gap-1.5 text-ink-soft"><Clock className="h-4 w-4" /> About {service.durationMinutes} min</span>
          ) : null}
          <span className="font-semibold text-wine">{priceLabel(service)}</span>
        </p>
        <p className="mt-4 text-ink">{service.description || 'A personalised treatment using genuine professional products.'}</p>

        <h3 className="mt-6 text-small font-semibold text-ink">What to expect</h3>
        <ul className="mt-2 space-y-2 text-ink-soft">
          {[
            `A short consultation with ${ownerName} before we start`,
            'Sealed professional products, opened in front of you',
            'Freshly sanitised tools and disposable linen',
            'Aftercare advice so results last'
          ].map((t) => (
            <li key={t} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-gold" /> {t}</li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => { onClose(); onBook(service); }} className="btn-primary">Book this</button>
          <a href={askHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <WhatsAppIcon className="h-5 w-5 text-wa" /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
