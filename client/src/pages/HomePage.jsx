import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, HeartHandshake, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import Hero from '../components/sections/Hero';
import BrandsShowcase from '../components/sections/BrandsShowcase';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import Photo from '../components/common/Photo';
import Seo from '../components/common/Seo';
import { WhatsAppIcon } from '../components/common/icons';
import { useBusiness, useSiteData, useStats } from '../context/SiteDataContext';
import { openStatus } from '../lib/business';

const SIGNATURE_DEFAULTS = [
  {
    name: 'Signature HD bridal makeover',
    category: 'Bridal',
    desc: 'High-definition, long-wear bridal makeup with skin prep, hairstyling and dupatta setting.',
    link: '/bridal-makeup',
    image: '/signature-bridal.jpg'
  },
  {
    name: 'Casmara algae facial',
    category: 'Skin',
    desc: 'A Spanish peel-off algae mask for deep hydration, firmness and an even glow.',
    link: '/services',
    image: '/signature-facial.jpg'
  },
  {
    name: 'Hair botox & nanoplastia',
    category: 'Hair',
    desc: 'Smooths frizz and restores shine with a keratin-sealing treatment.',
    link: '/services',
    image: '/signature-hair.jpg'
  },
  {
    name: 'Rica liposoluble waxing',
    category: 'Waxing',
    desc: 'Gentle, colophony-free Italian wax made for sensitive skin.',
    link: '/services',
    image: '/signature-waxing.jpg'
  }
];


const cms = (value, fallback) => (value && !/^\{.*\}$/.test(String(value).trim()) ? value : fallback);

export default function HomePage() {
  const { content, categories, testimonials, testimonialsLoaded, gallery } = useSiteData();
  const biz = useBusiness();
  const stats = useStats();
  const status = openStatus(biz);

  const serviceCount = categories.reduce((n, c) => n + (c.services?.length || 0), 0);
  const signatureItems = Array.isArray(content?.signature?.items) && content.signature.items.length ? content.signature.items : SIGNATURE_DEFAULTS;
  const galleryItems = useMemo(
    () => [...gallery.filter((g) => g.isFeatured), ...gallery.filter((g) => !g.isFeatured)].slice(0, 4),
    [gallery]
  );

  const ribbon = content?.ribbon || {};
  const promises = [
    { icon: ShieldCheck, title: cms(ribbon.item1Title, 'Genuine, sealed products'), desc: cms(ribbon.item1Desc, "L'Oréal, Casmara, Rica and other professional brands, opened in front of you.") },
    { icon: Sparkles, title: cms(ribbon.item3Title, 'Spotless hygiene'), desc: cms(ribbon.item3Desc, 'Tools sanitised between clients, with disposable capes, strips and sponges.') },
    { icon: HeartHandshake, title: cms(ribbon.item2Title, `${biz.ownerName.split(' ')[0]} looks after you`), desc: cms(ribbon.item2Desc, 'A personal consultation before every treatment, with honest advice.') }
  ];

  const bridal = content?.bridal || {};
  const about = content?.about || {};
  const cta = content?.cta || {};

  return (
    <>
      <Seo
        description={`${biz.businessName} by ${biz.ownerName} in ${biz.shortAddress}. HD bridal makeup, hair botox, nanoplastia, keratin, Casmara facials and Rica waxing. Book online.`}
        path="/"
      />

      <Hero content={content?.hero} stats={stats} />

      {/* Practical info people look for first: are you open, where are you, how do I reach you */}
      <section aria-label="Visiting information" className="container-x">
        <div className="card grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-start gap-3 p-5">
            <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${status.isOpen ? 'bg-leaf' : 'bg-rose-accent'}`} aria-hidden="true" />
            <div>
              <p className="font-semibold text-ink">{status.label}</p>
              <p className="text-small text-ink-soft">{biz.openDaysLabel}, {biz.hoursLabel}</p>
            </div>
          </div>
          <a href={biz.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-5 transition-colors hover:bg-rose-light">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <div>
              <p className="font-semibold text-ink">{cms(content?.hero?.quickLocation, 'Prince Colony, Badarpur')}</p>
              <p className="text-small font-semibold text-wine">Get directions</p>
            </div>
          </a>
          <a href={biz.telHref} className="flex items-start gap-3 p-5 transition-colors hover:bg-rose-light">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <div>
              <p className="font-semibold text-ink">{biz.phoneDisplay}</p>
              <p className="text-small text-ink-soft">Call or WhatsApp</p>
            </div>
          </a>
        </div>
      </section>

      {/* Signature services */}
      <section className="section">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="title">{cms(content?.signature?.title, 'Most-loved services')}</h2>
              <p className="lead mt-3">The treatments clients book most often.</p>
            </div>
            <Link to="/services" className="link hidden shrink-0 sm:inline">
              {serviceCount ? `All ${serviceCount} services` : 'All services'}
            </Link>
          </div>

          <ul className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {signatureItems.map((item) => (
              <li key={item.name} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <Link to={item.link || '/services'} className="group block">
                  <div className="aspect-[4/5] overflow-hidden rounded-card bg-rose">
                    <Photo
                      src={item.image}
                      alt=""
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 text-small font-medium text-gold-deep">{item.category}</p>
                  <h3 className="mt-1 text-h3 group-hover:text-wine">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-small text-ink-soft">{item.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/services" className="btn-secondary mt-6 w-full sm:hidden">
            {serviceCount ? `See all ${serviceCount} services` : 'See all services'}
          </Link>
        </div>
      </section>

      {/* Bridal: the one strong colour moment on the page */}
      <section className="bg-wine text-white">
        <div className="container-x section grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-block bg-wine-deep">
              <Photo src="/bridal-feature-detail.jpg" alt="Traditional saree look with bridal jewellery" sizes="(min-width: 1024px) 40vw, 90vw" className="h-full w-full object-cover object-top" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="title text-white">{cms(bridal.title, 'Bridal makeup for every function')}</h2>
            <p className="mt-4 max-w-prose text-lead text-white/80">
              {cms(bridal.description, `From pre-bridal skin care to your wedding-day HD look and saree draping, planned with you by ${biz.ownerName}.`)}
            </p>
            <ul className="mt-6 space-y-3">
              {[
                cms(bridal.feature1, 'Pre-bridal glow care package'),
                cms(bridal.feature2, 'Waterproof HD bridal makeup'),
                cms(bridal.feature3, 'Bridal hairstyling and extensions'),
                cms(bridal.feature4, 'Saree and dupatta draping')
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-gold-soft" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/bridal-makeup" className="btn bg-white text-wine hover:bg-rose">See bridal packages</Link>
              <p className="text-small text-white/70">{cms(bridal.bookingNote, 'Book 3–6 weeks before your date.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why clients come back + products */}
      <section className="section">
        <div className="container-x">
          <h2 className="title max-w-2xl">Why clients keep coming back</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {promises.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="border-t border-line pt-6">
                <Icon className="h-6 w-6 text-gold" />
                <h3 className="mt-4 text-h3">{title}</h3>
                <p className="mt-2 text-ink-soft">{desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <BrandsShowcase content={content?.brands} />
          </div>
        </div>
      </section>

      {/* Portfolio: shown once the owner has uploaded real work (Admin → Gallery) */}
      {gallery.length > 0 && (
      <section className="section border-y border-line bg-rose-light">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 className="title">Recent work from the studio</h2>
            <Link to="/gallery" className="link shrink-0">View gallery</Link>
          </div>
          <ul className={`mt-8 grid gap-3 sm:gap-6 ${galleryItems.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {galleryItems.map((p, i) => (
              <li key={p.id} className={galleryItems.length === 3 && i === 0 ? 'col-span-2 sm:col-span-1' : ''}>
                <Link to="/gallery" className="group block">
                  <div className={`overflow-hidden rounded-card bg-rose ${galleryItems.length === 3 && i === 0 ? 'aspect-[4/3] sm:aspect-[4/5]' : 'aspect-[4/5]'}`}>
                    <Photo
                      src={p.imageUrl}
                      alt={p.altText || p.title}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 font-semibold text-ink">{p.title}</p>
                  <p className="text-small text-ink-soft">{p.category}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      )}

      <TestimonialsSection testimonials={testimonials} loaded={testimonialsLoaded} />

      {/* Meet the founder */}
      <section className="section pt-0">
        <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="rounded-block bg-rose p-8 sm:p-10 lg:col-span-5">
            <img src="/pm_logo.png" alt="" width="64" height="64" className="h-16 w-16 object-contain" />
            <blockquote className="mt-6 font-display text-[1.75rem] leading-snug text-wine sm:text-3xl">
              {cms(about.quote, `“${biz.tagline}”`)}
            </blockquote>
            <figcaption className="mt-4 text-small text-ink-soft">{biz.ownerName}, founder</figcaption>
          </figure>
          <div className="lg:col-span-7">
            <h2 className="title">{cms(about.heading, `Meet ${biz.ownerName}`)}</h2>
            <p className="lead mt-4">
              {cms(about.description, 'Every face, hair type and skin tone is different. We take time to understand yours before recommending a facial, treatment or look, so results are healthy and last.')}
            </p>
            <p className="mt-4 max-w-prose text-ink-soft">
              {cms(about.essenceStory, `${biz.ownerName} started ${biz.businessName} in ${biz.shortAddress} so women nearby could get genuine products, careful hygiene and a personal salon experience close to home.`)}
            </p>
            <Link to="/about" className="btn-secondary mt-8">Read our story</Link>
          </div>
        </div>
      </section>

      {/* Closing booking prompt */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="rounded-block bg-rose px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="title">{cms(cta.title, 'Book your visit')}</h2>
          <p className="lead mx-auto mt-4">
            {cms(cta.subtext, 'Choose a service and time online in under a minute, or message us on WhatsApp for bridal planning.')}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">{cms(cta.buttonText, 'Book a visit')}</Link>
            <a href={biz.wa('Hello Preeti Makeover! I would like to book an appointment.')} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsAppIcon className="h-5 w-5" /> {cms(cta.whatsappText, 'Chat on WhatsApp')}
            </a>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-small text-ink-soft">
            <Clock className="h-4 w-4 text-gold" /> {biz.openDaysLabel}, {biz.hoursLabel}. Closed every {biz.weeklyOffDay}.
          </p>
        </div>
      </section>
    </>
  );
}
