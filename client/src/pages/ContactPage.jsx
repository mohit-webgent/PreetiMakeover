import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle2, 
  CalendarX, 
  Sparkles, 
  Send,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

export default function ContactPage({ categories = [], selectedService, onClearSelectedService }) {
  const location = useLocation();

  // Initial preselected service from route state or props
  const preselected = location.state?.preselectedService || selectedService?.name || '';
  const preselectedId = location.state?.serviceId || selectedService?.id || '';

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceName: preselected,
    serviceId: preselectedId,
    preferredDate: '',
    preferredTime: '11:00 AM',
    message: '',
    website: '' // honeypot
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tuesdayWarning, setTuesdayWarning] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  useEffect(() => {
    if (preselected) {
      setFormData(prev => ({
        ...prev,
        serviceName: preselected,
        serviceId: preselectedId
      }));
    }
  }, [preselected, preselectedId]);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const chosenDateStr = e.target.value;
    setFormData(prev => ({ ...prev, preferredDate: chosenDateStr }));

    if (!chosenDateStr) {
      setTuesdayWarning(false);
      return;
    }

    const [year, month, day] = chosenDateStr.split('-').map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    // Day 2 is Tuesday (0=Sun, 1=Mon, 2=Tue)
    if (dateObj.getUTCDay() === 2) {
      setTuesdayWarning(true);
    } else {
      setTuesdayWarning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate name
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

    // Validate 10-digit Indian mobile number
    const cleanPhone = formData.phone.trim().replace(/[\s\-\(\)]/g, '').replace(/^\+91/, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number (e.g., 9810359438).');
      return;
    }

    if (!formData.preferredDate) {
      setErrorMsg('Please select your preferred appointment date.');
      return;
    }

    if (tuesdayWarning) {
      setErrorMsg('Preeti Makeover is strictly closed on Tuesdays. Please choose another date.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        customerName: formData.customerName.trim(),
        phone: cleanPhone,
        serviceName: formData.serviceName.trim() || 'General Salon Consultation',
        serviceId: formData.serviceId || null,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message.trim(),
        website: formData.website // honeypot
      };

      const res = await api.createAppointment(payload);

      if (res?.success) {
        setSubmissionSuccess(res.data);
        setFormData({
          customerName: '',
          phone: '',
          serviceName: '',
          serviceId: '',
          preferredDate: '',
          preferredTime: '11:00 AM',
          message: '',
          website: ''
        });
        if (onClearSelectedService) onClearSelectedService();

        // Optionally open WhatsApp bridge
        if (res.data?.whatsappUrl) {
          window.open(res.data.whatsappUrl, '_blank');
        }
      } else {
        setErrorMsg(res?.message || 'Unable to submit enquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error submitting appointment. Please try again or WhatsApp us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-salon-blush min-h-screen">
      
      {/* 1. Page Header */}
      <div className="bg-white border-b border-salon-babypink/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs text-salon-text/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-salon-maroon transition-colors">Home</Link>
            <span>/</span>
            <span className="text-salon-maroon font-semibold">Contact & Book</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-babypink/70 text-salon-maroon text-xs font-semibold uppercase tracking-wider mb-3 border border-salon-rose/30">
              <Calendar className="w-3.5 h-3.5 text-salon-gold-dark" />
              <span>Direct Appointments</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
              Book Your Appointment & Visit Us
            </h1>
            <p className="text-base sm:text-lg text-salon-text/80 font-light mt-3 leading-relaxed">
              Reserve your spot online in seconds. Once submitted, you can instantly message Preeti Mandal directly on WhatsApp to confirm timing.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Main Form & Location Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-salon-babypink/80 shadow-luxury">
              
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-bold block mb-1">
                  RESERVATION FORM
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-salon-maroon">
                  Schedule Your Salon Visit
                </h2>
                <p className="text-xs text-salon-text/70 font-light mt-1">
                  Fill in your preferred date and treatment. We review requests promptly.
                </p>
              </div>

              {/* Success Alert */}
              {submissionSuccess && (
                <div className="mb-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 font-serif font-bold text-base text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Appointment Request Received!</span>
                  </div>
                  <p className="text-xs leading-relaxed text-emerald-800/90 font-light">
                    Thank you, <strong className="font-semibold">{submissionSuccess.customerName}</strong>. Your appointment enquiry for <strong className="font-semibold">{submissionSuccess.serviceName}</strong> has been logged.
                  </p>
                  {submissionSuccess.whatsappUrl && (
                    <div className="pt-2">
                      <a
                        href={submissionSuccess.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Confirmation on WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-2.5 text-xs animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-salon-maroon mb-1.5">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-salon-babypink text-xs text-salon-text bg-salon-blush/40 focus:outline-none focus:border-salon-gold shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-salon-maroon mb-1.5">
                      10-Digit Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9810359438"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-salon-babypink text-xs text-salon-text bg-salon-blush/40 focus:outline-none focus:border-salon-gold shadow-sm"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-salon-maroon mb-1.5">
                    Select Desired Treatment / Service
                  </label>
                  <select
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-salon-babypink text-xs text-salon-text bg-salon-blush/40 focus:outline-none focus:border-salon-gold shadow-sm"
                  >
                    <option value="">General Salon Consultation</option>
                    {categories.map((cat) => (
                      <optgroup key={cat.id || cat.name} label={cat.name}>
                        {cat.services?.map((s) => (
                          <option key={s.id || s.name} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-salon-maroon mb-1.5">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={handleDateChange}
                      className="w-full px-4 py-3 rounded-xl border border-salon-babypink text-xs text-salon-text bg-salon-blush/40 focus:outline-none focus:border-salon-gold shadow-sm"
                    />
                    {tuesdayWarning && (
                      <p className="mt-1.5 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                        <CalendarX className="w-3.5 h-3.5 shrink-0" />
                        <span>Closed on Tuesdays. Please pick another day.</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-salon-maroon mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-salon-babypink text-xs text-salon-text bg-salon-blush/40 focus:outline-none focus:border-salon-gold shadow-sm"
                    >
                      <option value="10:30 AM">10:30 AM (Morning Slot)</option>
                      <option value="11:30 AM">11:30 AM (Morning Slot)</option>
                      <option value="01:00 PM">01:00 PM (Afternoon Slot)</option>
                      <option value="03:00 PM">03:00 PM (Afternoon Slot)</option>
                      <option value="05:00 PM">05:00 PM (Evening Slot)</option>
                      <option value="07:00 PM">07:00 PM (Evening Slot)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Consultation Notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-salon-maroon mb-1.5">
                    Special Notes or Hair/Skin Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Sensitive skin, bridal enquiry, or previous keratin history..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-salon-babypink text-xs text-salon-text bg-salon-blush/40 focus:outline-none focus:border-salon-gold shadow-sm"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || tuesdayWarning}
                    className="w-full py-4 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-luxury disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-salon-gold" />
                        <span>Submit Appointment Request</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-salon-text/50 text-center mt-2.5 font-light">
                    No advance payment required for general consultations. WhatsApp confirmation sent upon submission.
                  </p>
                </div>

              </form>

            </div>
          </div>

          {/* Right Column: Studio Information & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Studio Address Card */}
            <div className="bg-white rounded-3xl p-8 border border-salon-babypink/80 shadow-sm space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-bold block mb-1">
                  FIND US
                </span>
                <h3 className="font-serif text-2xl font-bold text-salon-maroon">
                  Preeti Makeover Studio
                </h3>
              </div>

              <div className="space-y-4 text-xs text-salon-text/80">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-salon-gold-dark" />
                  </div>
                  <div>
                    <strong className="text-salon-maroon block font-semibold mb-0.5">Physical Studio Address</strong>
                    <span>D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-salon-gold-dark" />
                  </div>
                  <div>
                    <strong className="text-salon-maroon block font-semibold mb-0.5">Direct Phone</strong>
                    <a href="tel:+918810359438" className="hover:text-salon-gold-dark transition-colors font-medium">
                      +91 88103 59438
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <strong className="text-salon-maroon block font-semibold mb-0.5">WhatsApp Consultation</strong>
                    <a 
                      href="https://wa.me/918810359438" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-salon-gold-dark transition-colors text-emerald-800 font-medium"
                    >
                      +91 88103 59438 (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-salon-gold-dark" />
                  </div>
                  <div>
                    <strong className="text-salon-maroon block font-semibold mb-0.5">Studio Operating Hours</strong>
                    <span>Wednesday – Monday: 10:00 AM – 9:00 PM</span>
                    <span className="text-rose-600 font-medium block mt-0.5">Tuesday: Weekly Off (Strictly Closed)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-salon-babypink/60 flex flex-col gap-2.5">
                <a
                  href="https://maps.google.com/?q=D/109+Prince+Colony+Harinagar+Jaitpur+Badarpur+New+Delhi+110044"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-salon-maroon bg-salon-babypink/60 hover:bg-salon-babypink border border-salon-rose/30 transition-all shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-salon-gold-dark" />
                  <span>Open Directions in Google Maps</span>
                </a>

                <a
                  href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20ask%20a%20question%20about%20salon%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>

            </div>

            {/* Hygiene Assurance */}
            <div className="bg-salon-blush rounded-3xl p-6 border border-salon-babypink/80 flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-salon-gold-dark shrink-0" />
              <div className="text-xs text-salon-text/80">
                <span className="font-serif font-bold text-salon-maroon block mb-0.5">Hospital-Grade Sterilization</span>
                <span>Disposable capes, fresh single-use sponges, and sanitized instruments for every client.</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
