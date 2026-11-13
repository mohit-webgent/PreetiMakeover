import React, { useState } from 'react';
import { Star, PenLine } from 'lucide-react';
import ReviewDialog from '../common/ReviewDialog';

/**
 * Owner-approved client reviews only (never placeholders).
 * Phones: swipeable row of cards. Desktop: grid. Nothing moves unless the visitor scrolls.
 */
export default function TestimonialsSection({ testimonials = [], loaded = true }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  if (!loaded) return null;

  const reviews = Array.isArray(testimonials) ? testimonials : [];
  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / count : 0;

  return (
    <section id="reviews" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="title">What clients say</h2>
            {count > 0 && (
              <p className="mt-3 flex items-center gap-2 text-ink-soft">
                <span className="stars" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`h-4 w-4 ${average >= n - 0.25 ? 'fill-current' : 'text-rose-deep'}`} />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-ink">{average.toFixed(1)}</strong> from {count} review{count > 1 ? 's' : ''}
                </span>
              </p>
            )}
          </div>
          {count > 0 && (
            <button type="button" onClick={() => setDialogOpen(true)} className="btn-secondary self-start sm:self-auto">
              <PenLine className="h-4 w-4" /> Write a review
            </button>
          )}
        </div>

        {count === 0 ? (
          <div className="mt-8 rounded-block border border-line bg-card px-6 py-10 text-center sm:px-10">
            <p className="font-display text-2xl text-ink">Be the first to review</p>
            <p className="mx-auto mt-2 max-w-md text-ink-soft">
              Visited the studio recently? Tell other women about your look and how you felt.
            </p>
            <button type="button" onClick={() => setDialogOpen(true)} className="btn-primary mt-6">
              <PenLine className="h-4 w-4" /> Write a review
            </button>
          </div>
        ) : (
          <ul className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 scrollbar-none sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.id} className="w-[85%] shrink-0 snap-start sm:w-auto">
                <figure className="card flex h-full flex-col p-6">
                  <span className="stars" aria-label={`${r.rating || 5} out of 5 stars`}>
                    {[...Array(r.rating || 5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </span>
                  <blockquote className="mt-4 flex-1 text-ink">“{r.reviewText}”</blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <span className="block font-semibold text-ink">{r.clientName}</span>
                    {r.serviceName && <span className="block text-small text-ink-soft">{r.serviceName}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ReviewDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </section>
  );
}
