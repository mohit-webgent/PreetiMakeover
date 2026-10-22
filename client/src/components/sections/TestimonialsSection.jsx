import React from 'react';
import { Sparkles, Star, MessageSquare, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  const hasApprovedReviews = Array.isArray(testimonials) && testimonials.length > 0;

  // Genuine Client Care Standards (displayed when no approved reviews exist in database yet)
  const clientCarePillars = [
    {
      num: '01',
      title: 'Personalized Diagnostic Care',
      subtitle: 'By Preeti Mandal',
      desc: 'No generic packages. Every facial, hair rejuvenation, and bridal look is tailored directly to your skin type, hair texture, and event aesthetic.',
      icon: HeartHandshake
    },
    {
      num: '02',
      title: 'Clinical Hygiene & Sanitization',
      subtitle: 'Safety First at Prince Colony',
      desc: 'Single-use disposable applicators, sterilized stainless-steel tools, and sanitized treatment stations for every client visit.',
      icon: ShieldCheck
    },
    {
      num: '03',
      title: 'Zero-Counterfeit Formulation',
      subtitle: 'Sealed & Authentic Products',
      desc: 'We strictly refuse unbranded dupes. Only sealed products from Casmara, L’Oréal, O3+ Professional, and Italian Rica are used on your skin and hair.',
      icon: Award
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-white border-t border-brand-blush/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching PDF Page 2 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold block mb-2">
            CLIENT SATISFACTION & EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum tracking-tight mb-4">
            Happy Clients
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-brand-plum/70 font-light leading-relaxed">
            {hasApprovedReviews 
              ? 'Verified reviews from clients who experienced Preeti Makeover transformations.'
              : 'Our uncompromising commitment to genuine products, personalized consultation, and hygienic beauty care.'}
          </p>
        </div>

        {/* 3 Cards Grid matching PDF Page 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hasApprovedReviews ? (
            testimonials.map((t, idx) => (
              <div
                key={t.id || idx}
                className="bg-[#FAF7F2] rounded-3xl p-8 border border-brand-blush/60 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-brand-gold mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-plum/80 italic leading-relaxed mb-6">
                    “{t.reviewText}”
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-blush/60 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-plum">
                      {t.clientName}
                    </h4>
                    {t.serviceName && (
                      <span className="text-[11px] text-brand-plum/60 font-medium">
                        {t.serviceName}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Verified
                  </span>
                </div>
              </div>
            ))
          ) : (
            clientCarePillars.map((pillar) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="bg-[#FAF7F2] rounded-3xl p-8 border border-brand-blush/60 hover:border-brand-gold/60 shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-2xl font-bold text-brand-gold-dark">
                        {pillar.num}
                      </span>
                      <span className="w-10 h-10 rounded-2xl bg-white text-brand-plum flex items-center justify-center shadow-sm">
                        <IconComp className="w-5 h-5 text-brand-gold-dark" />
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-brand-plum mb-1">
                      {pillar.title}
                    </h3>
                    <span className="block text-[11px] uppercase tracking-wider font-semibold text-brand-gold-dark mb-4">
                      {pillar.subtitle}
                    </span>

                    <p className="text-sm text-brand-plum/70 font-light leading-relaxed mb-6">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-blush/50 flex items-center justify-between text-xs text-brand-plum/70">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Studio Standard</span>
                    </span>
                    <span className="font-medium text-brand-plum">Preeti Mandal</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Client Feedback Invitation Callout */}
        <div className="mt-14 max-w-xl mx-auto rounded-2xl bg-brand-ivory p-6 border border-brand-blush/60 text-center">
          <MessageSquare className="w-6 h-6 text-brand-gold mx-auto mb-2" />
          <h4 className="font-serif font-bold text-sm text-brand-plum mb-1">
            Visited Preeti Makeover Recently?
          </h4>
          <p className="text-xs text-brand-plum/70 mb-3">
            Your honest experience helps us maintain high beauty and hygiene standards. All reviews are approved by salon management before appearing on our website.
          </p>
          <a
            href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20share%20my%20salon%20feedback."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 transition-colors"
          >
            <span>Share Feedback on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
