import BotanicalLeaves from '../components/common/BotanicalLeaves';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  Check, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Camera,
  Star
} from 'lucide-react';

export default function BridalPage({ onSelectService }) {
  const navigate = useNavigate();

  const bridalPackages = [
    {
      name: 'Pre-Bridal Glow Care Package',
      duration: '240 mins (Approx. 4 hours)',
      desc: 'Complete head-to-toe clinical glow ritual: Casmara algae facial, skin de-tan therapy, Italian Rica liposoluble waxing, body polishing, and spa manicure/pedicure.',
      idealFor: 'Recommended 2 to 4 days prior to the wedding day for radiant, prepared skin.',
      featured: true,
      serviceName: 'Pre-Bridal Glow Care Package'
    },
    {
      name: 'Signature Bridal HD Makeup',
      duration: '180 mins (Approx. 3 hours)',
      desc: 'Bespoke high-definition waterproof bridal makeover. Skin prep, precision contouring, dramatic or soft-glam eye artistry, custom false lashes, and delicate bindi setting.',
      idealFor: 'Main Wedding Ceremony, Varmala & Reception.',
      featured: true,
      serviceName: 'Signature Bridal HD Makeup'
    },
    {
      name: 'Party & Engagement Glam Makeup',
      duration: '90 mins',
      desc: 'Luminous event glam tailored for brides during Engagement, Sangeet, Cocktail, or for bridesmaids and family members.',
      idealFor: 'Engagement, Sagan, Sangeet, or Cocktail Night.',
      featured: false,
      serviceName: 'Party & Engagement Glam Makeup'
    },
    {
      name: 'Designer Saree & Dupatta Draping',
      duration: '30 mins',
      desc: 'Expert bridal saree, lehenga dupatta, and chunni draping. Secure pinning and elegant pleating designed for easy walking, dancing, and perfect photography.',
      idealFor: 'Any bridal attire requiring secure, photogenic pleats and draping.',
      featured: false,
      serviceName: 'Designer Saree & Dupatta Draping'
    },
    {
      name: 'Bridal Hairstyling & Extensions',
      duration: '60 mins',
      desc: 'Intricate traditional floral bridal buns, textured Hollywood waves, or elegant braided hairstyles with secure accessory and maang tikka placement.',
      idealFor: 'Complements bridal and party makeup with structural hold.',
      featured: false,
      serviceName: 'Bridal Hairstyling & Extensions'
    }
  ];

  const handleBookPackage = (pkgName) => {
    navigate('/contact', { state: { preselectedService: pkgName } });
  };

  return (
    <div className="pt-28 pb-24 bg-salon-blush min-h-screen">
      
      {/* 1. Bridal Editorial Header */}
      <div className="bg-salon-blush border-b border-salon-babypink/60 py-16 relative overflow-hidden">
        <BotanicalLeaves variant="top-right" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs text-salon-text/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-salon-maroon transition-colors">Home</Link>
            <span>/</span>
            <span className="text-salon-maroon font-semibold">Bridal Makeup</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-salon-babypink/80 text-salon-maroon text-xs font-semibold uppercase tracking-wider border border-salon-rose/30">
                <Sparkles className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>Preeti Mandal Signature Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-salon-maroon tracking-tight leading-tight">
                Bridal & Occasion <br />
                <span className="italic font-normal text-salon-gold-dark">Makeover Artistry</span>
              </h1>

              <p className="text-base sm:text-lg text-salon-text/80 font-light leading-relaxed max-w-2xl font-sans">
                Every bride deserves a look that reflects her true personality while photographing impeccably under stage lights. At Preeti Makeover in Badarpur, each bridal transformation is customized, punctual, and crafted using high-definition, waterproof international cosmetics.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-luxury transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4 text-salon-gold" />
                  <span>Reserve Bridal Date</span>
                </Link>

                <a
                  href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20Bridal%20Makeover%20Packages."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-200 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Direct Bridal WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Studio Card */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-salon-maroon text-salon-blush p-8 shadow-luxury-lg border border-salon-gold/30 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">The Bridal Promise</h3>
                    <p className="text-xs text-salon-gold">Prince Colony Studio</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-salon-blush/85 border-t border-white/10 font-light">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Flawless HD & 4K camera compatibility</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Strictly waterproof & tear-proof formulations</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Comfortable draping designed for ease of movement</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Punctual preparation matching your wedding timeline</span>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-salon-blush/60 italic border-t border-white/10">
                  Preeti Mandal personally directs and executes your bridal transformation.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
            TAILORED CELEBRATION PACKAGES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight mb-3">
            Bridal Offerings
          </h2>
          <div className="w-16 h-0.5 bg-salon-gold mx-auto mb-3"></div>
          <p className="text-sm text-salon-text/75 font-light leading-relaxed">
            Transparent breakdown of our confirmed bridal and occasion makeup services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bridalPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                pkg.featured
                  ? 'bg-white border-2 border-salon-gold shadow-luxury relative'
                  : 'bg-white border border-salon-babypink shadow-sm hover:shadow-luxury'
              }`}
            >
              <div>
                {pkg.featured && (
                  <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-salon-maroon text-salon-gold text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Signature Choice
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-xs text-salon-gold-dark font-medium bg-salon-blush px-2.5 py-0.5 rounded-full border border-salon-babypink/60">
                    <Clock className="w-3 h-3" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-salon-maroon mb-3 leading-snug">
                  {pkg.name}
                </h3>

                <p className="text-xs text-salon-text/80 font-light leading-relaxed mb-4">
                  {pkg.desc}
                </p>

                <div className="p-3 rounded-2xl bg-salon-blush border border-salon-babypink/60 text-[11px] text-salon-maroon font-medium mb-6">
                  <span className="text-salon-gold-dark font-bold block mb-0.5">Recommended For:</span>
                  {pkg.idealFor}
                </div>
              </div>

              <div className="pt-4 border-t border-salon-babypink/60 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-salon-text/50 tracking-wider block">Price</span>
                  <span className="text-xs font-semibold text-salon-maroon">Price on Consultation</span>
                </div>

                <button
                  onClick={() => handleBookPackage(pkg.serviceName)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep transition-all shadow-sm active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5 text-salon-gold" />
                  <span>Enquire</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 3. The 3-Stage Bridal Journey */}
        <div className="mt-24 bg-white rounded-3xl p-8 sm:p-14 border border-salon-babypink shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
              SEAMLESS TIMELINE
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-salon-maroon">
              The Preeti Makeover Bridal Journey
            </h3>
            <div className="w-16 h-0.5 bg-salon-gold mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-2xl bg-salon-blush border border-salon-babypink/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-salon-maroon text-salon-gold font-serif text-lg font-bold flex items-center justify-center mx-auto">
                1
              </div>
              <h4 className="font-serif font-bold text-lg text-salon-maroon">Diagnostic Consultation</h4>
              <p className="text-xs text-salon-text/75 font-light leading-relaxed">
                We assess skin hydration, undertones, and event timing to recommend customized facials and hair prep schedules weeks in advance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-salon-blush border border-salon-babypink/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-salon-maroon text-salon-gold font-serif text-lg font-bold flex items-center justify-center mx-auto">
                2
              </div>
              <h4 className="font-serif font-bold text-lg text-salon-maroon">Trial & Attire Planning</h4>
              <p className="text-xs text-salon-text/75 font-light leading-relaxed">
                Discuss jewelry placement, dupatta weight, floral hairstyles, and makeup finish preferences so there are zero surprises.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-salon-blush border border-salon-babypink/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-salon-maroon text-salon-gold font-serif text-lg font-bold flex items-center justify-center mx-auto">
                3
              </div>
              <h4 className="font-serif font-bold text-lg text-salon-maroon">Wedding Day Radiance</h4>
              <p className="text-xs text-salon-text/75 font-light leading-relaxed">
                Relax in a calm, sanitized private environment while Preeti Mandal crafts your final HD bridal look right on schedule.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Direct Bridal WhatsApp CTA Banner */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-salon-babypink/70 via-salon-blush to-salon-babypink/50 border border-salon-rose/30 max-w-2xl w-full">
            <h4 className="font-serif text-2xl font-bold text-salon-maroon mb-2">
              Have Questions About Dates or Venue Visits?
            </h4>
            <p className="text-xs text-salon-text/75 mb-6 font-light">
              We guide brides directly via WhatsApp on available dates, pre-bridal packages, and timing estimates.
            </p>
            <a
              href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20am%20interested%20in%20discussing%20Bridal%20Makeover%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-salon-gold" />
              <span>Message Preeti Mandal on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
