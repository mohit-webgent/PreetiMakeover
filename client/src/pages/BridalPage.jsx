import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Clock } from 'lucide-react';
import ArchFrame from '../components/common/Arch';
import Photo from '../components/common/Photo';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import FaqSection, { buildFaqs, faqJsonLd } from '../components/sections/FaqSection';
import { WhatsAppIcon } from '../components/common/icons';
import { useBusiness, useSiteData } from '../context/SiteDataContext';

const FAQ_TOPICS = ['bridal', 'products', 'pricing', 'confirm'];

const PACKAGES = [
  {
    name: 'Pre-bridal glow package',
    duration: 'About 4 hours',
    desc: 'Casmara algae facial, de-tan, Rica waxing, body polishing and a spa manicure and pedicure, in one visit.',
    idealFor: '2–4 days before the wedding',
    popular: true
  },
  {
    name: 'Signature HD bridal makeup',
    duration: 'About 3 hours',
    desc: 'Waterproof, high-definition bridal makeup with skin prep, contouring, eye makeup, lashes and bindi setting.',
    idealFor: 'Wedding ceremony, varmala and reception',
    popular: true
  },
  {
    name: 'Engagement & party makeup',
    duration: 'About 90 minutes',
    desc: 'A softer, luminous look for engagement, sangeet or cocktail night, and for bridesmaids and family.',
    idealFor: 'Engagement, sagan, sangeet, cocktail'
  },
  {
    name: 'Bridal hairstyling & extensions',
    duration: 'About 60 minutes',
    desc: 'Floral buns, soft waves or braids, with jewellery and maang tikka placed securely.',
    idealFor: 'Any bridal or party look'
  },
  {
    name: 'Saree & dupatta draping',
    duration: 'About 30 minutes',
    desc: 'Secure, neat pleats and dupatta setting that stay in place while you walk, dance and pose.',
    idealFor: 'Lehenga, saree or chunni'
  }
];

const STEPS = [
  {
    title: 'Consultation',
    text: 'We look at your skin, hair and event dates, and plan facials and hair care in the weeks before.'
  },
  {
    title: 'Trial and planning',
    text: 'We decide your look together: makeup finish, hairstyle, jewellery placement and dupatta setting.'
  },
  {
    title: 'Your wedding day',
    text: 'A calm, private room and an unhurried schedule, so you are ready on time and look like yourself.'
  }
];

export default function BridalPage() {
  const navigate = useNavigate();
  const biz = useBusiness();
  const { gallery } = useSiteData();
  const first = biz.ownerName.split(' ')[0];

  // Owner's uploaded bridal photos when available, else the studio's own bridal shots
  const uploaded = gallery.filter((g) => /bridal|bride|wedding/i.test(`${g.category} ${g.title}`));
  const photos = uploaded.length >= 2
    ? uploaded.slice(0, 3).map((g) => ({ src: g.imageUrl, alt: g.altText || g.title }))
    : [
        { src: '/bridal-feature-detail.jpg', alt: 'Traditional saree look with bridal jewellery' },
        { src: '/signature-bridal.jpg', alt: 'Occasion look with an ivory lehenga' }
      ];

  const book = (name) => navigate('/contact', { state: { preselectedService: name } });

  return (
    <>
      <Seo
        title="Bridal Makeup Artist in Badarpur, New Delhi"
        description={`HD and waterproof bridal makeup, pre-bridal glow packages, hairstyling and saree draping by ${biz.ownerName} at ${biz.businessName}, ${biz.shortAddress}. Book your bridal date.`}
        path="/bridal-makeup"
        jsonLd={faqJsonLd(buildFaqs(biz, FAQ_TOPICS))}
      />

      <PageHeader
        crumb="Bridal makeup"
        title="Bridal makeup for every function"
        intro={`From pre-bridal skin care to your wedding-day look, ${first} plans every detail with you and does your makeup herself. Book 3–6 weeks before your date.`}
        aside={
          <ArchFrame className="mx-auto aspect-[4/5] w-[min(100%,20rem)] sm:w-[min(100%,24rem)]">
            <Photo src="/hero-bridal.jpg" alt="Indian bride in a red lehenga with HD bridal makeup" priority sizes="(min-width: 1024px) 384px, 80vw" className="h-full w-full object-cover object-top" />
          </ArchFrame>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => book('Signature HD bridal makeup')} className="btn-primary">Book a bridal consultation</button>
          <a href={biz.wa("Hello Preeti Makeover! I'd like to discuss bridal makeup for my wedding.")} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <WhatsAppIcon className="h-5 w-5 text-wa" /> Ask about dates
          </a>
        </div>
      </PageHeader>

      {/* What every bride gets, beside a pair of bridal photos */}
      <section className="section">
        <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h2 className="title max-w-2xl">What every bride gets</h2>
            <ul className="mt-8 space-y-5">
              {[
                'HD makeup that looks natural in person and on camera',
                'Waterproof, long-wear products for a long day',
                'Draping you can walk, dance and sit in comfortably',
                `${first} on time and with you through your schedule`
              ].map((t) => (
                <li key={t} className="flex gap-3 border-t border-line pt-5 text-lead text-ink">
                  <Check className="mt-1.5 h-5 w-5 shrink-0 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <ul aria-label="Bridal looks" className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-6">
            {photos.slice(0, 2).map((p, i) => (
              <li key={p.src} className={i === 1 ? 'mt-10' : ''}>
                <Link to="/gallery" className="block aspect-[3/4] overflow-hidden rounded-card bg-rose">
                  <Photo src={p.src} alt={p.alt} sizes="(min-width: 1024px) 25vw, 45vw" className="h-full w-full object-cover object-top" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <div className="container-x">
          <h2 className="title">Bridal packages</h2>
          <p className="lead mt-3">Prices depend on your look and the number of functions, so we confirm them after a consultation.</p>

          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <li key={p.name} className="card flex flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-h3">{p.name}</h3>
                  {p.popular && <span className="shrink-0 rounded-full bg-gold-soft px-2.5 py-0.5 text-caption font-semibold text-gold-deep">Most booked</span>}
                </div>
                <p className="mt-1 inline-flex items-center gap-1.5 text-small text-ink-soft"><Clock className="h-4 w-4" /> {p.duration}</p>
                <p className="mt-3 flex-1 text-ink-soft">{p.desc}</p>
                <p className="mt-4 text-small"><span className="font-semibold text-ink">Best for:</span> <span className="text-ink-soft">{p.idealFor}</span></p>
                <button type="button" onClick={() => book(p.name)} className="btn-secondary btn-sm mt-5 self-start">Book this</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The journey: a real sequence, so the steps are numbered */}
      <section className="section bg-rose-light border-y border-line">
        <div className="container-x">
          <h2 className="title">How we plan your bridal look</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-5 md:block">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine font-display text-xl text-white">{i + 1}</span>
                <div>
                  <h3 className="text-h3 md:mt-5">{s.title}</h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection topics={FAQ_TOPICS} title="Bridal questions" />

      <section className="container-x pb-16 sm:pb-24">
        <div className="rounded-block bg-wine px-6 py-12 text-center text-white sm:px-12 sm:py-14">
          <h2 className="title text-white">Talk to {first} about your dates</h2>
          <p className="mx-auto mt-4 max-w-prose text-lead text-white/80">
            Share your wedding dates and venue on WhatsApp. We'll reply with availability and a plan for your functions.
          </p>
          <a href={biz.wa("Hello Preeti Makeover! I'd like to discuss bridal makeup for my wedding.")} target="_blank" rel="noopener noreferrer" className="btn mt-8 bg-white text-wine hover:bg-rose">
            <WhatsAppIcon className="h-5 w-5 text-wa" /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
