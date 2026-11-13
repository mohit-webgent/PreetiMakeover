import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { useBusiness } from '../../context/SiteDataContext';

/** Common questions, phrased from live business settings so answers never go stale. */
export function buildFaqs(biz, topics = ['booking', 'confirm', 'hours', 'bridal', 'products', 'pricing', 'location', 'reschedule']) {
  const all = {
    booking: {
      q: 'How do I book an appointment?',
      a: `Use the online booking on our Contact page: choose a service, pick a day and time, and leave your number. You can also call ${biz.phoneDisplay} or message us on WhatsApp.`
    },
    confirm: {
      q: 'Is my appointment confirmed as soon as I submit the form?',
      a: 'Your online booking is a request. Our team checks the calendar and confirms with you on WhatsApp or by phone, usually within a few hours during studio hours.'
    },
    hours: {
      q: 'What are your opening hours?',
      a: `We are open ${biz.openDaysLabel}, ${biz.hoursLabel}. The studio is closed every ${biz.weeklyOffDay}.`
    },
    bridal: {
      q: 'How early should I book my bridal makeup?',
      a: 'We recommend booking 3–6 weeks before your wedding, and earlier during the wedding season, so we can plan your pre-bridal skin care and lock your date.'
    },
    products: {
      q: 'Which products do you use?',
      a: "We use genuine, sealed professional products from brands such as L'Oréal Professionnel, Casmara and Rica, opened in front of you."
    },
    pricing: {
      q: 'Why do some services say “Price on consultation”?',
      a: 'Treatments like keratin, nanoplastia and bridal looks depend on hair length, skin type and the look you want. We give you an exact price after a quick consultation, with no surprises at the counter.'
    },
    location: {
      q: 'Where is the studio?',
      a: `${biz.address}. Tap “Get directions” anywhere on this site to open Google Maps.`
    },
    reschedule: {
      q: 'Can I reschedule or cancel?',
      a: `Of course. Call ${biz.phoneDisplay} or send us a WhatsApp message with your reference number and we'll move your slot.`
    }
  };
  return topics.map((t) => all[t]).filter(Boolean);
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };
}

export default function FaqSection({ title = 'Questions, answered', topics, className = '' }) {
  const biz = useBusiness();
  const faqs = buildFaqs(biz, topics);
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section className={`section ${className}`} aria-labelledby={`${baseId}-title`}>
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id={`${baseId}-title`} className="title">{title}</h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Still have a question?{' '}
              <a href={biz.wa('Hello Preeti Makeover! I have a question.')} target="_blank" rel="noopener noreferrer" className="link">
                Ask us on WhatsApp
              </a>
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[1.125rem] font-semibold leading-snug text-ink">{f.q}</span>
                      <Plus className={`w-5 h-5 shrink-0 text-wine transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <p className="overflow-hidden pr-8 text-ink-soft">
                      <span className="block pb-5">{f.a}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
