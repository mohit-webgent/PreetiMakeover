import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useBusiness, useSiteData } from '../../context/SiteDataContext';

/** Polite notice shown only while the API is slow to wake, with a WhatsApp fallback. */
export default function ServerWakeNotice() {
  const { slow } = useSiteData();
  const biz = useBusiness();
  const [dismissed, setDismissed] = useState(false);
  const show = slow && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-x-4 bottom-24 z-[70] flex items-start gap-3 rounded-card border border-line bg-card p-4 shadow-float lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-sm"
        >
          <span className="mt-1 w-4 h-4 shrink-0 rounded-full border-2 border-rose-deep border-t-wine animate-spin" aria-hidden="true" />
          <div className="flex-1 text-small text-ink">
            <p className="font-semibold text-wine">Loading the latest from our studio…</p>
            <p className="text-ink-soft mt-0.5">
              This can take a few seconds. In a hurry?{' '}
              <a href={biz.wa('Hello Preeti Makeover! I would like to book an appointment.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-emerald-700 underline underline-offset-2">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp us
              </a>
            </p>
          </div>
          <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss" className="p-1 rounded-full text-ink-soft hover:bg-rose">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
