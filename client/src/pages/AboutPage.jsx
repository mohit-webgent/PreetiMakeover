import React from 'react';
import { Link } from 'react-router-dom';
import { Award, HeartHandshake, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import { WhatsAppIcon } from '../components/common/icons';
import { useBusiness } from '../context/SiteDataContext';
import { openStatus } from '../lib/business';

export default function AboutPage() {
  const biz = useBusiness();
  const status = openStatus(biz);
  const first = biz.ownerName.split(' ')[0];

  const values = [
    {
      icon: Award,
      title: 'Genuine, sealed products',
      text: "No duplicates or loose mixtures. Every L'Oréal colour, Casmara mask, O3+ facial and Rica wax is genuine and opened in front of you."
    },
    {
      icon: ShieldCheck,
      title: 'Careful hygiene',
      text: 'Scissors, combs and tools are sanitised between clients, with disposable sheets, wax strips and single-use facial sponges.'
    },
    {
      icon: HeartHandshake,
      title: 'Honest advice',
      text: `${first} looks at your skin and hair before suggesting anything, and never pushes treatments you don't need.`
    },
    {
      icon: Sparkles,
      title: 'A calm, women-only space',
      text: 'A comfortable, private studio where you get unhurried, personal attention on every visit.'
    }
  ];

  return (
    <>
      <Seo
        title={`About ${biz.ownerName} & the Studio`}
        description={`Meet ${biz.ownerName}, founder of ${biz.businessName} in ${biz.shortAddress}: genuine products, careful hygiene and honest, personal consultations.`}
        path="/about"
      />

      <PageHeader
        crumb="About"
        title={`Meet ${biz.ownerName}`}
        intro={`${biz.businessName} is a personal beauty studio in Badarpur, New Delhi. ${first} started it so women nearby could get genuine products, careful hygiene and real attention, close to home.`}
      />

      {/* Story */}
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <figure className="rounded-block bg-rose p-8 sm:p-10 lg:col-span-5 lg:self-start">
            <img src="/pm_logo.png" alt="" width="64" height="64" className="h-16 w-16 object-contain" />
            <blockquote className="mt-6 text-[1.3125rem] font-medium leading-relaxed text-wine sm:text-[1.4375rem]">
              “Women in our community should never have to compromise on genuine products or hygiene. Every look we create is built on respect and care.”
            </blockquote>
            <figcaption className="mt-5 text-small text-ink-soft">{biz.ownerName}, founder</figcaption>
          </figure>

          <div className="max-w-prose space-y-5 text-lead text-ink-soft lg:col-span-7">
            <p>
              At {biz.businessName}, beauty is never an assembly line. In our studio in Prince Colony, Harinagar, every client gets
              {` ${first}'s`} individual attention, from the first consultation to the final touch.
            </p>
            <p>
              Whether you come in for a hair botox treatment, an O3+ brightening facial, gentle Rica waxing or your wedding day,
              we put the long-term health of your skin and hair first.
            </p>
            <p>
              We believe beauty shines brightest when it's backed by authentic products and careful hygiene. That's why we sanitise
              every tool between clients and close every {biz.weeklyOffDay} for a full deep clean.
            </p>
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <Link to="/services" className="btn-secondary">See services & prices</Link>
              <Link to="/contact" className="btn-primary">Book a visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section border-y border-line bg-rose-light">
        <div className="container-x">
          <h2 className="title max-w-2xl">What you can count on</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-x-14">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-gold"><Icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-2 text-ink-soft">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit */}
      <section className="section">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="title">Visit the studio</h2>
            <p className="mt-4 flex gap-3 text-lead text-ink">
              <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-gold" /> {biz.address}
            </p>
            <p className="mt-3 text-ink-soft">Easy to reach from Badarpur border, Jaitpur and nearby South Delhi areas.</p>
            <p className="mt-5 text-ink">
              {biz.openDaysLabel}, {biz.hoursLabel}
              <span className="block text-ink-soft">Closed every {biz.weeklyOffDay}</span>
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-small font-semibold text-ink">
              <span className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? 'bg-leaf' : 'bg-rose-accent'}`} aria-hidden="true" />
              {status.label}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={biz.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
              <a href={biz.wa('Hello Preeti Makeover! Could you share directions to the studio?')} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <WhatsAppIcon className="h-5 w-5 text-wa" /> Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-block border border-line lg:col-span-7">
            <iframe
              title={`Map showing ${biz.businessName}`}
              src={biz.mapEmbedUrl}
              className="h-72 w-full border-0 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
