import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle, ArrowLeft, ArrowRight, CalendarCheck, CalendarPlus, Check, CheckCircle2,
  Clock, MessageCircle, Navigation, Search, Sparkles, User
} from 'lucide-react';
import { api } from '../../services/api';
import { useBusiness, useSiteData } from '../../context/SiteDataContext';
import {
  availableSlots, downloadIcs, formatLongDate, getBookableDays, getTimeSlots, googleCalendarUrl, groupSlots
} from '../../lib/booking';

const STEPS = [
  { id: 1, label: 'Service', icon: Sparkles },
  { id: 2, label: 'Date & time', icon: CalendarCheck },
  { id: 3, label: 'Your details', icon: User }
];
const GENERAL = { id: '', name: 'General Beauty Consultation', durationMinutes: 30 };
const DRAFT_KEY = 'pm_booking_draft';
const DAYS_AHEAD = 30;

function loadDraft() {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null');
  } catch {
    return null;
  }
}

function priceLabel(service) {
  if (!service?.startingPrice) return 'Price on consultation';
  return `From ₹${Number(service.startingPrice).toLocaleString('en-IN')}`;
}

/**
 * Three-step booking request: service → date & time → contact details.
 * Creates a PENDING request (never auto-confirmed) and hands off to WhatsApp.
 */
export default function BookingWizard({ preselectedService }) {
  const biz = useBusiness();
  const { categories, servicesLoading } = useSiteData();
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  const draft = useMemo(loadDraft, []);
  const [step, setStep] = useState(draft?.step || 1);
  const [service, setService] = useState(draft?.service || null);
  const [date, setDate] = useState(draft?.date || '');
  const [time, setTime] = useState(draft?.time || '');
  const [details, setDetails] = useState(draft?.details || { customerName: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [result, setResult] = useState(null);

  // Service passed from another page (e.g. "Book this" on Services) jumps straight to date & time
  useEffect(() => {
    if (!preselectedService?.name) return;
    setService({ id: preselectedService.id || '', name: preselectedService.name, durationMinutes: preselectedService.durationMinutes });
    setStep(2);
  }, [preselectedService?.name, preselectedService?.id, preselectedService?.durationMinutes]);

  // Keep progress if the visitor refreshes or navigates away mid-booking
  useEffect(() => {
    if (result) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step, service, date, time, details }));
    } catch { /* storage unavailable */ }
  }, [step, service, date, time, details, result]);

  const days = useMemo(() => getBookableDays(DAYS_AHEAD, biz.offDayIndex), [biz.offDayIndex]);
  const allSlots = useMemo(() => getTimeSlots(biz.openMin, biz.closeMin), [biz.openMin, biz.closeMin]);
  const slots = useMemo(() => (date ? availableSlots(allSlots, date) : []), [allSlots, date]);

  // A previously chosen date/time may no longer be valid (closed day, past slot)
  useEffect(() => {
    const d = days.find((x) => x.iso === date);
    if (date && (!d || d.closed)) setDate('');
  }, [days, date]);
  useEffect(() => {
    if (time && time !== 'any' && date && !slots.includes(time)) setTime('');
  }, [slots, time, date]);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => activeCat === 'all' || c.slug === activeCat)
      .map((c) => ({
        ...c,
        services: (c.services || []).filter((s) => !q || s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q))
      }))
      .filter((c) => c.services.length);
  }, [categories, query, activeCat]);

  const scrollToTop = () => {
    const el = rootRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 110;
    if (window.scrollY > top) window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const goTo = (n) => {
    setError(null);
    setStep(n);
    scrollToTop();
  };

  const chooseService = (s) => {
    setService({ id: s.id, name: s.name, durationMinutes: s.durationMinutes, startingPrice: s.startingPrice });
    goTo(2);
  };

  const validateDetails = () => {
    const errs = {};
    if (details.customerName.trim().length < 2) errs.customerName = 'Please enter your name.';
    const phone = details.phone.replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(phone)) errs.phone = 'Enter a valid 10-digit mobile number.';
    setFieldErrors(errs);
    return { ok: !Object.keys(errs).length, phone };
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const { ok, phone } = validateDetails();
    if (!ok) return;

    setSubmitting(true);
    try {
      const res = await api.createAppointment({
        customerName: details.customerName.trim(),
        phone,
        serviceName: service?.name || GENERAL.name,
        serviceId: service?.id || null,
        preferredDate: date,
        preferredTime: time && time !== 'any' ? time : null,
        message: details.message.trim() || null,
        website: honeypot || null
      });
      setResult({ ...res, service, date, time });
      try { sessionStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      scrollToTop();
    } catch (err) {
      // Send the visitor back to the step that needs fixing
      if (err.data?.field === 'preferredDate' || err.data?.field === 'preferredTime') {
        if (err.data.field === 'preferredTime') setTime('');
        else setDate('');
        setStep(2);
      } else if (err.data?.field) {
        setFieldErrors({ [err.data.field]: err.message });
      }
      setError(err.message || 'Something went wrong. Please try again or message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setResult(null);
    setService(null);
    setDate('');
    setTime('');
    setDetails({ customerName: '', phone: '', message: '' });
    setFieldErrors({});
    setStep(1);
  };

  const anim = reduceMotion
    ? {}
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } };

  if (result) return <BookingSuccess result={result} biz={biz} onStartOver={startOver} rootRef={rootRef} />;

  // Inputs use the shared .field style; aria-invalid switches it to the error colours
  const field = () => 'field';

  return (
    <div ref={rootRef} className="bg-white rounded-block border border-line shadow-lift overflow-hidden">
      {/* Progress */}
      <ol className="grid grid-cols-3 border-b border-line bg-rose-light" aria-label="Booking progress">
        {STEPS.map((s) => {
          const done = step > s.id;
          const current = step === s.id;
          const Icon = done ? Check : s.icon;
          return (
            <li key={s.id}>
              <button
                type="button"
                disabled={s.id > step}
                onClick={() => s.id < step && goTo(s.id)}
                aria-current={current ? 'step' : undefined}
                className={`w-full flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-2 py-3.5 text-caption sm:text-small font-semibold transition-colors border-b-2 ${
                  current ? 'text-wine border-wine bg-white' : done ? 'text-wine/80 border-transparent hover:bg-white/70' : 'text-ink-faint border-transparent'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center ${current || done ? 'bg-wine text-white' : 'bg-rose text-ink-soft'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="p-5 sm:p-8">
        {error && (
          <div role="alert" className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-small flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          {/* STEP 1 — Service */}
          {step === 1 && (
            <motion.div key="step1" {...anim}>
              <h3 className="font-display text-2xl text-ink">What would you like to book?</h3>
              <p className="text-small text-ink-soft mt-1">Pick a treatment, or choose a consultation if you're not sure yet.</p>

              <div className="relative mt-5">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search facials, keratin, bridal…"
                  aria-label="Search services"
                  className={`${field(false)} pl-11`}
                />
              </div>

              {categories.length > 1 && (
                <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none fade-edge-x">
                  {[{ slug: 'all', name: 'All' }, ...categories].map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setActiveCat(c.slug)}
                      aria-pressed={activeCat === c.slug}
                      className="chip"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => chooseService(GENERAL)}
                className={`mt-5 w-full flex items-center justify-between gap-3 p-4 rounded-2xl border-2 border-dashed text-left transition-colors ${
                  service?.name === GENERAL.name ? 'border-wine bg-rose' : 'border-rose-deep hover:border-rose-deep hover:bg-rose-light'
                }`}
              >
                <span>
                  <span className="block font-semibold text-wine">Not sure? Book a consultation</span>
                  <span className="block text-small text-ink-soft">{biz.ownerName} will recommend the right treatment for you.</span>
                </span>
                <ArrowRight className="w-5 h-5 text-wine shrink-0" />
              </button>

              <div className="mt-5 space-y-6 max-h-[460px] overflow-y-auto pr-1 -mr-1">
                {servicesLoading && (
                  <div className="space-y-3" aria-label="Loading services">
                    {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-2xl bg-rose animate-pulse" />)}
                  </div>
                )}
                {!servicesLoading && filteredCategories.length === 0 && (
                  <p className="text-small text-ink-soft text-center py-6">
                    No services match “{query}”. Try another word, or book a consultation above.
                  </p>
                )}
                {filteredCategories.map((cat) => (
                  <div key={cat.id}>
                    <h4 className="mb-2 text-small font-semibold text-gold-deep">{cat.name}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cat.services.map((s) => {
                        const selected = service?.id === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => chooseService(s)}
                            aria-pressed={selected}
                            className={`text-left p-4 rounded-2xl border transition-all ${
                              selected ? 'border-wine bg-rose ring-2 ring-wine/20' : 'border-line bg-white hover:border-rose-deep hover:shadow-sm'
                            }`}
                          >
                            <span className="flex items-start justify-between gap-2">
                              <span className="font-semibold text-ink leading-snug">{s.name}</span>
                              {selected && <Check className="w-4 h-4 text-wine shrink-0 mt-0.5" />}
                            </span>
                            <span className="mt-1.5 flex items-center gap-3 text-caption text-ink-soft">
                              {s.durationMinutes ? <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.durationMinutes} min</span> : null}
                              <span className="font-medium text-wine">{priceLabel(s)}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Date & time */}
          {step === 2 && (
            <motion.div key="step2" {...anim}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl text-ink">When would you like to come?</h3>
                  <p className="text-small text-ink-soft mt-1">
                    For <strong className="text-ink">{service?.name || GENERAL.name}</strong>{' '}
                    <button type="button" onClick={() => goTo(1)} className="text-wine font-semibold underline underline-offset-2">change</button>
                  </p>
                </div>
              </div>

              <fieldset className="mt-6">
                <legend className="text-small font-semibold text-ink mb-3">Choose a day</legend>
                <div className="-mx-1 flex snap-x scroll-px-1 gap-2 overflow-x-auto px-1 pb-2 scrollbar-none fade-edge-x">
                  {days.map((d) => {
                    const selected = d.iso === date;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        disabled={d.closed}
                        onClick={() => { setDate(d.iso); setError(null); }}
                        aria-pressed={selected}
                        aria-label={`${d.weekdayLong} ${d.day} ${d.month}${d.closed ? ', closed' : ''}`}
                        className={`snap-start shrink-0 w-[68px] py-3 rounded-2xl border text-center transition-all ${
                          d.closed
                            ? 'border-dashed border-line bg-rose-light text-ink-faint cursor-not-allowed'
                            : selected
                              ? 'border-wine bg-wine text-white shadow-lift'
                              : 'border-line bg-white text-ink hover:border-rose-deep'
                        }`}
                      >
                        <span className="block text-caption font-medium uppercase tracking-wide">{d.isToday ? 'Today' : d.isTomorrow ? 'Tmrw' : d.weekday}</span>
                        <span className="block font-display text-2xl leading-tight">{d.day}</span>
                        <span className="block text-caption">{d.closed ? 'Closed' : d.month}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-caption text-ink-soft mt-1">The studio is closed every {biz.weeklyOffDay}.</p>
              </fieldset>

              {date && (
                <fieldset className="mt-6">
                  <legend className="text-small font-semibold text-ink mb-3">Preferred time on {formatLongDate(date)}</legend>
                  {slots.length === 0 ? (
                    <p className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-small">
                      No more slots today. Please pick another day.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {groupSlots(slots).map(([label, list]) => (
                        <div key={label}>
                          <p className="text-caption font-medium text-ink-soft mb-2">{label}</p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {list.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setTime(s)}
                                aria-pressed={time === s}
                                className={`py-2.5 rounded-xl border text-small font-medium transition-colors ${
                                  time === s ? 'border-wine bg-wine text-white' : 'border-line bg-white text-ink hover:border-rose-deep'
                                }`}
                              >
                                {s.replace(/^0/, '')}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setTime('any')}
                        aria-pressed={time === 'any'}
                        className={`w-full py-2.5 rounded-xl border text-small font-medium transition-colors ${
                          time === 'any' ? 'border-wine bg-wine text-white' : 'border-dashed border-rose-deep text-ink-soft hover:border-rose-deep'
                        }`}
                      >
                        I'm flexible, any time works
                      </button>
                    </div>
                  )}
                </fieldset>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button type="button" onClick={() => goTo(1)} className="btn-ghost">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="button" disabled={!date || !time} onClick={() => goTo(3)} className="btn-primary disabled:opacity-50 disabled:pointer-events-none">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Details */}
          {step === 3 && (
            <motion.form key="step3" {...anim} onSubmit={submit} noValidate>
              <h3 className="font-display text-2xl text-ink">Almost done</h3>
              <p className="text-small text-ink-soft mt-1">We'll confirm your visit on WhatsApp or by phone.</p>

              <div className="mt-5 rounded-2xl bg-rose-light border border-line p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-small">
                <SummaryItem label="Service" value={service?.name || GENERAL.name} onEdit={() => goTo(1)} />
                <SummaryItem label="Date" value={formatLongDate(date)} onEdit={() => goTo(2)} />
                <SummaryItem label="Time" value={time === 'any' ? 'Any time' : time.replace(/^0/, '')} onEdit={() => goTo(2)} />
              </div>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="text-small font-semibold text-ink">Your name <span className="text-red-700">*</span></span>
                  <input
                    autoComplete="name"
                    value={details.customerName}
                    onChange={(e) => setDetails((d) => ({ ...d, customerName: e.target.value }))}
                    aria-invalid={!!fieldErrors.customerName}
                    aria-describedby={fieldErrors.customerName ? 'err-name' : undefined}
                    placeholder="e.g. Anjali Sharma"
                    className={`${field(fieldErrors.customerName)} mt-1.5`}
                  />
                  {fieldErrors.customerName && <span id="err-name" className="text-small text-red-700 mt-1 block">{fieldErrors.customerName}</span>}
                </label>

                <label className="block">
                  <span className="text-small font-semibold text-ink">WhatsApp / mobile number <span className="text-red-700">*</span></span>
                  <span className="relative block mt-1.5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-small font-semibold text-ink-soft">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={14}
                      value={details.phone}
                      onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? 'err-phone' : 'hint-phone'}
                      placeholder="98100 00000"
                      className={`${field(fieldErrors.phone)} pl-14`}
                    />
                  </span>
                  {fieldErrors.phone
                    ? <span id="err-phone" className="text-small text-red-700 mt-1 block">{fieldErrors.phone}</span>
                    : <span id="hint-phone" className="text-caption text-ink-soft mt-1 block">Only used to confirm this booking.</span>}
                </label>

                <label className="block">
                  <span className="text-small font-semibold text-ink">Anything we should know? <span className="font-normal text-ink-soft">(optional)</span></span>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={details.message}
                    onChange={(e) => setDetails((d) => ({ ...d, message: e.target.value }))}
                    placeholder="Skin sensitivities, wedding date, hair length, number of people…"
                    className={`${field(false)} mt-1.5 resize-none`}
                  />
                </label>

                {/* Honeypot: invisible to people, filled by bots */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" aria-hidden="true" />
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button type="button" onClick={() => goTo(2)} className="btn-ghost">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="submit" disabled={submitting} className="btn-primary !px-7 disabled:opacity-60">
                  {submitting ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Sending…</>
                  ) : (
                    <>Request appointment <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
              <p className="text-caption text-ink-soft mt-4">
                This is a booking request. Your slot is confirmed once our team gets back to you.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, onEdit }) {
  return (
    <div className="flex sm:block items-center justify-between gap-2">
      <span className="block text-caption text-ink-soft">{label}</span>
      <span className="font-semibold text-ink">
        {value}{' '}
        <button type="button" onClick={onEdit} className="text-caption font-semibold text-wine underline underline-offset-2 ml-1">edit</button>
      </span>
    </div>
  );
}

function BookingSuccess({ result, biz, onStartOver, rootRef }) {
  const { data, duplicate, message } = result;
  const timeLabel = result.time && result.time !== 'any' ? result.time.replace(/^0/, '') : 'Any time';
  const event = {
    title: `${result.service?.name || 'Salon appointment'} · ${biz.businessName}`,
    description: `Booking request ${String(data?.id || '').slice(0, 8).toUpperCase()}. Awaiting confirmation from the studio. Call ${biz.phoneDisplay} to make changes.`,
    location: biz.address,
    dateIso: result.date,
    time: result.time && result.time !== 'any' ? result.time : '11:00 AM',
    durationMinutes: result.service?.durationMinutes || 60,
    uid: data?.id
  };

  return (
    <div ref={rootRef} className="bg-white rounded-block border border-line shadow-lift p-6 sm:p-10 text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
        <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-600" />
      </motion.div>
      <h3 className="font-display text-3xl text-ink mt-4">{duplicate ? 'You’re already on our list' : 'Request received'}</h3>
      <p className="text-ink-soft mt-2 max-w-md mx-auto">{message}</p>

      <dl className="mt-6 max-w-md mx-auto text-left rounded-2xl bg-rose-light border border-line divide-y divide-line text-small">
        {[
          ['Reference', String(data?.id || '').slice(0, 8).toUpperCase()],
          ['Service', data?.serviceName],
          ['Date', formatLongDate(result.date)],
          ['Time', timeLabel],
          ['Status', 'Awaiting confirmation']
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
            <dt className="text-ink-soft">{k}</dt>
            <dd className={`font-semibold text-right ${k === 'Status' ? 'text-amber-700' : 'text-ink'}`}>{v}</dd>
          </div>
        ))}
      </dl>

      {data?.whatsappUrl && (
        <a href={data.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-full text-small font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-colors">
          <MessageCircle className="w-4 h-4" /> Confirm faster on WhatsApp
        </a>
      )}

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl mx-auto">
        <button type="button" onClick={() => downloadIcs(event)} className="btn-secondary !text-caption">
          <CalendarPlus className="w-4 h-4" /> Add to calendar
        </button>
        <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="btn-secondary !text-caption">
          <CalendarCheck className="w-4 h-4" /> Google Calendar
        </a>
        <a href={biz.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !text-caption">
          <Navigation className="w-4 h-4" /> Directions
        </a>
      </div>

      <div className="mt-8 max-w-md mx-auto text-left">
        <p className="mb-3 font-semibold text-ink">What happens next</p>
        <ol className="space-y-3 text-small text-ink">
          {[
            'We check the calendar for your preferred slot.',
            `${biz.ownerName.split(' ')[0]}'s team confirms by WhatsApp or a call, usually within a few hours during studio hours.`,
            'Arrive 10 minutes early so we can start on time.'
          ].map((t, i) => (
            <li key={t} className="flex gap-3">
              <span className="w-6 h-6 shrink-0 rounded-full bg-wine text-white text-caption font-bold flex items-center justify-center">{i + 1}</span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>

      <button type="button" onClick={onStartOver} className="mt-8 text-small font-semibold text-wine underline underline-offset-4">
        Book another appointment
      </button>
    </div>
  );
}
