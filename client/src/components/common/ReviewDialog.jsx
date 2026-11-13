import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

/** Modal form for clients to submit a review. Reviews are held for owner approval. */
export default function ReviewDialog({ open, onClose }) {
  const [form, setForm] = useState({ clientName: '', serviceName: '', rating: 5, reviewText: '', website: '' });
  const [hover, setHover] = useState(0);
  const [state, setState] = useState({ loading: false, error: null, done: false });
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, error: null, done: false });
    try {
      await api.submitTestimonial(form);
      setState({ loading: false, error: null, done: true });
    } catch (err) {
      setState({ loading: false, error: err.message, done: false });
    }
  };

  const close = () => {
    onClose();
    if (state.done) {
      setForm({ clientName: '', serviceName: '', rating: 5, reviewText: '', website: '' });
      setState({ loading: false, error: null, done: false });
    }
  };

  const field = 'field';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40" onClick={close} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-dialog-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-block bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-float sm:max-w-lg sm:rounded-block sm:p-8"
          >
            <button type="button" onClick={close} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-ink-soft hover:bg-rose">
              <X className="w-5 h-5" />
            </button>

            {state.done ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-600" />
                <h2 id="review-dialog-title" className="font-display text-2xl text-ink mt-4">Thank you!</h2>
                <p className="text-small text-ink-soft mt-2">Your review has been sent to the studio and will appear once approved.</p>
                <button type="button" onClick={close} className="btn-primary mt-6">Done</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <h2 id="review-dialog-title" className="font-display text-2xl text-ink">Share your experience</h2>
                  <p className="text-small text-ink-soft mt-1">Your words help other women choose with confidence.</p>
                </div>

                {state.error && (
                  <p className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-small">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {state.error}
                  </p>
                )}

                <fieldset>
                  <legend className="text-small font-semibold text-ink mb-2">Your rating</legend>
                  <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, rating: n }))}
                        onMouseEnter={() => setHover(n)}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        aria-pressed={form.rating === n}
                        className="p-1 rounded-lg"
                      >
                        <Star className={`w-8 h-8 transition-colors ${(hover || form.rating) >= n ? 'fill-amber-400 text-amber-400' : 'text-rose-deep'}`} />
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-small font-semibold text-ink">Your name</span>
                    <input ref={firstFieldRef} required minLength={2} maxLength={100} value={form.clientName} onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))} className={`${field} mt-1.5`} placeholder="e.g. Anjali S." />
                  </label>
                  <label className="block">
                    <span className="text-small font-semibold text-ink">Service (optional)</span>
                    <input maxLength={100} value={form.serviceName} onChange={(e) => setForm((f) => ({ ...f, serviceName: e.target.value }))} className={`${field} mt-1.5`} placeholder="e.g. Bridal makeup" />
                  </label>
                </div>

                <label className="block">
                  <span className="text-small font-semibold text-ink">Your review</span>
                  <textarea required minLength={10} maxLength={1000} rows={4} value={form.reviewText} onChange={(e) => setForm((f) => ({ ...f, reviewText: e.target.value }))} className={`${field} mt-1.5 resize-none`} placeholder="What did you love about your visit?" />
                </label>

                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className="hidden" aria-hidden="true" />

                <button type="submit" disabled={state.loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
                  {state.loading ? 'Sending…' : 'Submit review'}
                </button>
                <p className="text-caption text-ink-soft text-center">Reviews are checked by the studio before they are published.</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
