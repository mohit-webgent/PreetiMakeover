import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Send,
  CalendarX
} from 'lucide-react';
import { api } from '../../services/api';

export default function BookingSection({ categories = [], selectedService, onClearSelectedService }) {
  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceName: '',
    serviceId: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    // Honeypot spam trap
    website: ''
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tuesdayWarning, setTuesdayWarning] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  // Update selected service when passed from other sections
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceName: selectedService.name,
        serviceId: selectedService.id
      }));
      // Smooth scroll to form
      const el = document.getElementById('booking-form-card');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedService]);

  // Calculate today's date in YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Handle Date Change & Real-Time Tuesday Detection
  const handleDateChange = (e) => {
    const chosenDateStr = e.target.value;
    setFormData(prev => ({ ...prev, preferredDate: chosenDateStr }));

    if (!chosenDateStr) {
      setTuesdayWarning(false);
      return;
    }

    // Parse date safely
    const [year, month, day] = chosenDateStr.split('-').map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    // Day 2 is Tuesday (0=Sun, 1=Mon, 2=Tue, ...)
    if (dateObj.getUTCDay() === 2) {
      setTuesdayWarning(true);
    } else {
      setTuesdayWarning(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side quick checks
    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters).');
      return;
    }

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
      setErrorMsg('Preeti Makeover is closed on Tuesdays. Please pick another date.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.createAppointment({
        customerName: formData.customerName.trim(),
        phone: cleanPhone,
        serviceName: formData.serviceName || 'General Consultation',
        serviceId: formData.serviceId || null,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime || null,
        message: formData.message.trim() || null,
        website: formData.website || null // honeypot
      });

      if (response && response.success) {
        setSubmissionSuccess(response);
      } else {
        throw new Error(response?.message || 'Failed to submit appointment enquiry.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMsg(err.message || 'An error occurred while submitting your enquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionSuccess(null);
    setFormData({
      customerName: '',
      phone: '',
      serviceName: '',
      serviceId: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
      website: ''
    });
    setTuesdayWarning(false);
    setErrorMsg(null);
    if (onClearSelectedService) onClearSelectedService();
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Salon Details matching PDF Page 2 */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold block mb-2">
                RESERVATIONS & ENQUIRIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-plum tracking-tight mb-4">
                Book Your Appointment
              </h2>
              <div className="w-16 h-0.5 bg-brand-gold mb-4"></div>
              <p className="text-sm text-brand-plum/80 leading-relaxed font-light">
                Fill the enquiry form and our salon team will confirm your preferred timing via WhatsApp or phone call.
              </p>
            </div>

            {/* Salon Details List matching PDF */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush/60 shadow-sm space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-brand-blush/40 text-brand-plum flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-gold-dark" />
                </span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-plum mb-1">
                    Studio Address
                  </h4>
                  <p className="text-xs text-brand-plum/70 leading-relaxed">
                    D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-brand-blush/40 text-brand-plum flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-gold-dark" />
                </span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-plum mb-1">
                    Phone / WhatsApp
                  </h4>
                  <a 
                    href="tel:+918810359438" 
                    className="text-xs font-semibold text-brand-plum hover:text-brand-gold-dark transition-colors block mb-1"
                  >
                    +91 88103 59438
                  </a>
                  <p className="text-[11px] text-brand-plum/60 font-light">
                    Direct consultations & instant WhatsApp follow-ups
                  </p>
                </div>
              </div>

              {/* Hours & Weekly Off */}
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-2xl bg-brand-blush/40 text-brand-plum flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-brand-gold-dark" />
                </span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-brand-plum mb-1">
                    Salon Hours & Weekly Off
                  </h4>
                  <div className="text-xs text-brand-plum/80 space-y-1">
                    <div>Wednesday – Monday: <strong className="font-semibold text-brand-plum">10:00 AM – 9:00 PM</strong></div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold">
                      <CalendarX className="w-3 h-3" />
                      <span>Weekly Off: Tuesday (Closed)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Note */}
              <div className="pt-4 border-t border-brand-blush/50 flex items-center justify-between text-xs text-brand-plum/70">
                <span>Owner & Lead Artist:</span>
                <span className="font-serif font-bold text-brand-plum">Preeti Mandal</span>
              </div>

            </div>

            {/* Direct WhatsApp Quick Contact Box */}
            <div className="rounded-2xl bg-emerald-50/80 p-5 border border-emerald-200 flex items-center justify-between">
              <div>
                <h5 className="font-serif font-bold text-xs text-emerald-900 mb-0.5">
                  Need an Immediate Answer?
                </h5>
                <p className="text-[11px] text-emerald-700 font-light">
                  Chat directly with Preeti Makeover on WhatsApp.
                </p>
              </div>
              <a
                href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20have%20a%20quick%20question%20about%20salon%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Appointment Form matching PDF Page 2 */}
          <div className="lg:col-span-7" id="booking-form-card">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-blush/80 shadow-luxury">
              
              {/* If Submission Was Successful, Render Confirmation & WhatsApp Bridge */}
              {submissionSuccess ? (
                <div className="space-y-6 text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum">
                    Enquiry Received Successfully!
                  </h3>

                  <p className="text-sm text-brand-plum/80 max-w-md mx-auto leading-relaxed font-light">
                    {submissionSuccess.message}
                  </p>

                  <div className="bg-brand-ivory rounded-2xl p-5 border border-brand-blush/60 text-left max-w-md mx-auto text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Reference ID:</span>
                      <span className="font-mono font-bold text-brand-plum">{submissionSuccess.data?.id?.substring(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Customer Name:</span>
                      <span className="font-semibold text-brand-plum">{submissionSuccess.data?.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Selected Service:</span>
                      <span className="font-semibold text-brand-plum">{submissionSuccess.data?.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Requested Date:</span>
                      <span className="font-semibold text-brand-plum">{submissionSuccess.data?.preferredDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Status:</span>
                      <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Enquiry Pending Confirmation</span>
                    </div>
                  </div>

                  {/* WhatsApp Confirmation Action Button */}
                  {submissionSuccess.data?.whatsappUrl && (
                    <div className="pt-2">
                      <a
                        href={submissionSuccess.data.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Confirm Instantly on WhatsApp</span>
                      </a>
                      <p className="text-[11px] text-brand-plum/60 mt-2">
                        Clicking above will open a prefilled WhatsApp chat with the salon owner.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-brand-blush/40">
                    <button
                      onClick={handleResetForm}
                      className="text-xs font-semibold text-brand-plum hover:text-brand-gold-dark underline"
                    >
                      Submit Another Appointment Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form matching PDF Wireframe */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-plum">
                      Request an Appointment
                    </h3>
                    <p className="text-xs text-brand-plum/60 mt-1">
                      Please provide your details. Submitting an enquiry does not guarantee a slot until confirmed by our team.
                    </p>
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Honeypot hidden input */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex="-1"
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  </div>

                  {/* 1. Customer Name */}
                  <div>
                    <label htmlFor="customerName" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      required
                      placeholder="e.g. Anjali Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum placeholder:text-brand-plum/40 transition-colors"
                    />
                  </div>

                  {/* 2. Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                      Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 text-sm font-semibold text-brand-plum/50">
                        +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        required
                        maxLength="10"
                        placeholder="9810359438"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-14 pr-4 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum placeholder:text-brand-plum/40 transition-colors"
                      />
                    </div>
                    <span className="block text-[11px] text-brand-plum/50 mt-1">
                      10-digit Indian mobile number for WhatsApp confirmation.
                    </span>
                  </div>

                  {/* 3. Service Selection */}
                  <div>
                    <label htmlFor="serviceName" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      id="serviceName"
                      value={formData.serviceName}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ ...prev, serviceName: val, serviceId: '' }));
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum transition-colors"
                    >
                      <option value="">-- Select a Treatment / Service --</option>
                      {categories.map((cat) => (
                        <optgroup key={cat.id} label={cat.name}>
                          {cat.services.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name} {s.durationMinutes ? `(${s.durationMinutes}m)` : ''}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="General Beauty Consultation">General Beauty Consultation</option>
                    </select>
                  </div>

                  {/* 4. Preferred Date & Time Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div>
                      <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        required
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={handleDateChange}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-brand-plum transition-colors ${
                          tuesdayWarning 
                            ? 'border-rose-400 bg-rose-50/50' 
                            : 'border-brand-blush/80 bg-brand-ivory/40 focus:border-brand-gold'
                        }`}
                      />
                    </div>

                    {/* Preferred Time Slot */}
                    <div>
                      <label htmlFor="preferredTime" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        value={formData.preferredTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum transition-colors"
                      >
                        <option value="">Select Time Slot</option>
                        <option value="10:30 AM">10:30 AM (Morning)</option>
                        <option value="12:00 PM">12:00 PM (Noon)</option>
                        <option value="02:30 PM">02:30 PM (Afternoon)</option>
                        <option value="04:30 PM">04:30 PM (Evening)</option>
                        <option value="06:30 PM">06:30 PM (Late Evening)</option>
                        <option value="07:30 PM">07:30 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Real-time Tuesday Closure Warning */}
                  {tuesdayWarning && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-center gap-2">
                      <CalendarX className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        <strong>Tuesday is our Weekly Off.</strong> Preeti Makeover is closed on Tuesdays. Please choose Wednesday through Monday.
                      </span>
                    </div>
                  )}

                  {/* 5. Optional Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                      Optional Notes / Specific Requests
                    </label>
                    <textarea
                      id="message"
                      rows="3"
                      placeholder="e.g. Any skin sensitivity, specific bridal event date, or hair length notes..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum placeholder:text-brand-plum/40 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || tuesdayWarning}
                      className={`w-full py-4 rounded-xl text-sm font-semibold text-white shadow-luxury flex items-center justify-center gap-2 transition-all ${
                        loading || tuesdayWarning
                          ? 'bg-brand-plum/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-brand-plum to-brand-plum-light hover:from-brand-plum-deep hover:to-brand-plum hover:-translate-y-0.5'
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-brand-gold" />
                          <span>Request Appointment</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-brand-plum/60 mt-2 font-light">
                      We respect your privacy. Your phone number is only used to contact you regarding your booking enquiry.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
