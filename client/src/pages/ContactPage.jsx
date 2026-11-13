import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import BookingWizard from '../components/booking/BookingWizard';
import FaqSection, { buildFaqs, faqJsonLd } from '../components/sections/FaqSection';
import Seo from '../components/common/Seo';
import PageHeader from '../components/common/PageHeader';
import { WhatsAppIcon } from '../components/common/icons';
import { useBusiness } from '../context/SiteDataContext';
import { openStatus } from '../lib/business';

const FAQ_TOPICS = ['booking', 'confirm', 'hours', 'reschedule', 'location'];

export default function ContactPage() {
  const location = useLocation();
  const biz = useBusiness();
  const status = openStatus(biz);

  const preselected = location.state?.preselectedService
    ? { id: location.state.serviceId, name: location.state.preselectedService, durationMinutes: location.state.durationMinutes }
    : null;

  return (
    <>
      <Seo
        title="Book an Appointment"
        description={`Book bridal makeup, hair treatments, facials and more at ${biz.businessName}, ${biz.shortAddress}. Open ${biz.openDaysLabel}, ${biz.hoursLabel}.`}
        path="/contact"
        jsonLd={faqJsonLd(buildFaqs(biz, FAQ_TOPICS))}
      />

      <PageHeader
        crumb="Book a visit"
        title="Book a visit"
        intro="Choose a service and a time that suits you. We'll confirm on WhatsApp or by phone, usually within a few hours."
      />

      <div className="container-x py-8 sm:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <BookingWizard preselectedService={preselected} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4" aria-label="Studio details">
            <div className="card overflow-hidden">
              <iframe
                title={`Map showing ${biz.businessName}`}
                src={biz.mapEmbedUrl}
                className="h-52 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="space-y-4 p-6">
                <p className="inline-flex items-center gap-2 font-semibold text-ink">
                  <span className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? 'bg-leaf' : 'bg-rose-accent'}`} aria-hidden="true" />
                  {status.label}
                </p>
                <p className="flex gap-3 text-ink">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" /> {biz.address}
                </p>
                <p className="flex gap-3 text-ink">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <span>
                    {biz.openDaysLabel}, {biz.hoursLabel}
                    <span className="block text-ink-soft">Closed every {biz.weeklyOffDay}</span>
                  </span>
                </p>
                <a href={biz.telHref} className="flex items-center gap-3 text-ink hover:text-wine">
                  <Phone className="h-5 w-5 text-gold" /> {biz.phoneDisplay}
                </a>
                <a href={biz.mailHref} className="flex items-center gap-3 text-ink [overflow-wrap:anywhere] hover:text-wine">
                  <Mail className="h-5 w-5 shrink-0 text-gold" /> {biz.email}
                </a>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a href={biz.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm">Directions</a>
                  <a href={biz.wa('Hello Preeti Makeover! I have a question about your services.')} target="_blank" rel="noopener noreferrer" className="btn-wa btn-sm">
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <p className="rounded-card bg-rose-light p-5 text-small text-ink-soft">
              <strong className="block text-base font-semibold text-ink">Clean, every single time</strong>
              Disposable capes, fresh single-use sponges and sanitised tools for every client.
            </p>
          </aside>
        </div>
      </div>

      <FaqSection topics={FAQ_TOPICS} className="border-t border-line" />
    </>
  );
}
