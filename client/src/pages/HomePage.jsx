import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import BrandsShowcase from '../components/sections/BrandsShowcase';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { 
  Sparkles, 
  ArrowRight, 
  Scissors, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Calendar,
  Phone,
  Eye,
  Camera
} from 'lucide-react';

export default function HomePage({ categories = [], testimonials = [], galleryImages = [], onSelectService }) {
  // Highlighted signature treatments
  const signatureTreatments = [
    {
      name: 'Signature Bridal HD Makeover',
      category: 'Bridal Studio',
      desc: 'Flawless high-definition bridal glam with bespoke hair draping and long-wear waterproof skin prep.',
      badge: 'Most Requested',
      link: '/bridal-makeup'
    },
    {
      name: 'Casmara Luxury Algae Facial',
      category: 'Clinical Skincare',
      desc: 'Spanish peel-off algae mask delivering intense hydration, firming and luminous radiance.',
      badge: 'Skin Glow',
      link: '/services'
    },
    {
      name: 'Hair Botox & Nanoplastia Restoration',
      category: 'Hair Treatments',
      desc: 'Advanced structural realignment and keratin sealing for mirror-shine, frizz-free hair.',
      badge: 'Restorative',
      link: '/services'
    },
    {
      name: 'Italian Rica Liposoluble Waxing',
      category: 'Hygienic Care',
      desc: 'Gentle, 98% natural origin colophony-free wax designed for sensitive and delicate skin.',
      badge: 'Painless Care',
      link: '/services'
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Philosophy & Commitments Ribbon */}
      <section className="bg-salon-maroon text-white py-8 border-y border-salon-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-salon-gold">100% Genuine Brands</h4>
                <p className="text-[11px] text-salon-blush/80">Sealed L’Oréal, Casmara & Rica</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-salon-gold">Preeti Mandal Direct Care</h4>
                <p className="text-[11px] text-salon-blush/80">Diagnostic personal consultations</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-salon-gold">Hospital-Grade Clean</h4>
                <p className="text-[11px] text-salon-blush/80">Sanitized instruments every client</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-salon-gold">10:00 AM – 9:00 PM</h4>
                <p className="text-[11px] text-salon-rose-light">Open 6 Days (Closed Tuesday)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Signature Offerings Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
                EXQUISITE CRAFTSMANSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
                Signature Transformations
              </h2>
              <div className="w-16 h-0.5 bg-salon-gold mt-3"></div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-salon-maroon hover:text-salon-gold-dark transition-colors group"
            >
              <span>Explore All 27 Salon Services</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureTreatments.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-salon-blush rounded-3xl p-7 border border-salon-babypink/70 hover:border-salon-gold/60 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-salon-babypink text-salon-maroon border border-salon-rose/30">
                      {item.badge}
                    </span>
                    <span className="text-xs font-serif text-salon-gold-dark">0{idx + 1}</span>
                  </div>

                  <span className="text-[11px] uppercase tracking-widest text-salon-gold-dark font-medium block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-salon-maroon mb-2.5 leading-snug group-hover:text-salon-maroon-light transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-salon-text/75 font-light leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-salon-babypink/60 text-xs font-semibold text-salon-maroon group-hover:text-salon-gold-dark transition-colors"
                >
                  <span>Learn Details & Book</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dedicated Bridal Feature Spotlight */}
      <section className="py-20 bg-salon-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-br from-salon-maroon-deep via-salon-maroon to-salon-maroon-light text-salon-blush p-8 sm:p-14 relative overflow-hidden shadow-luxury-lg border border-salon-gold/30">
            <div className="absolute right-0 top-0 w-96 h-96 bg-salon-gold/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-gold/20 border border-salon-gold/30 text-salon-gold text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Specialized Bridal & Occasion Studio</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                  High-Definition Bridal Artistry
                </h2>

                <p className="text-salon-blush/85 text-base sm:text-lg font-light leading-relaxed max-w-2xl font-sans">
                  From deep pre-bridal skin therapy to camera-ready HD makeup and custom saree draping, crafted by <strong className="text-white font-medium">Preeti Mandal</strong> for your most memorable celebration.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    'Pre-Bridal Clinical Glow Care Package',
                    'Signature Waterproof HD Bridal Makeup',
                    'Bespoke Hairstyling & Extensions',
                    'Designer Saree & Dupatta Draping'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-salon-blush/90">
                      <span className="w-4 h-4 rounded-full bg-salon-gold/20 text-salon-gold flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
                <Link
                  to="/bridal-makeup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-salon-maroon bg-gradient-to-r from-salon-gold-light via-salon-gold to-salon-gold-dark hover:brightness-105 shadow-luxury transition-all transform hover:-translate-y-0.5 border border-salon-gold/40"
                >
                  <Calendar className="w-4 h-4 text-salon-maroon" />
                  <span>Explore Bridal Studio</span>
                </Link>

                <p className="text-xs text-salon-blush/60 italic text-left lg:text-right">
                  Advance bookings recommended 3–6 weeks prior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Certified Brands Showcase */}
      <BrandsShowcase />

      {/* 6. Portfolio Preview Section */}
      <section className="py-24 bg-salon-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
                PORTFOLIO SNAPSHOT
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
                Salon Work Gallery
              </h2>
              <div className="w-16 h-0.5 bg-salon-gold mt-3"></div>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-salon-maroon hover:text-salon-gold-dark transition-colors group"
            >
              <span>View Full Gallery With Filter & Zoom</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Royal Indian Bridal HD Glam',
                category: 'Bridal Makeover',
                desc: 'Flawless foundation with gold accents and bespoke floral hairdo.'
              },
              {
                title: 'Nanoplastia & Hair Botox Glow',
                category: 'Hair Treatments',
                desc: 'Mirror shine, silk smooth rejuvenation with Schwarzkopf therapy.'
              },
              {
                title: 'Cocktail & Evening Glam Makeup',
                category: 'Occasion Artistry',
                desc: 'Smokey sculpted eyes with soft contour and nude lip finish.'
              },
              {
                title: 'Bespoke Gel Nail Extensions',
                category: 'Nail Artistry',
                desc: 'Elegant French almond tips with subtle chrome shimmer.'
              }
            ].map((p, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white border border-salon-babypink/70 shadow-sm hover:shadow-luxury transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Camera className="w-6 h-6 text-salon-gold-dark" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-salon-gold-dark font-bold block mb-1">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-salon-maroon mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-salon-text/70 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-salon-babypink/50">
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-salon-maroon hover:text-salon-gold-dark transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in Lightbox</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Client Reviews / Satisfaction Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8. Studio Story & Values Teaser */}
      <section className="py-20 bg-salon-blush border-t border-salon-babypink/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-salon-maroon text-salon-blush p-8 sm:p-10 shadow-luxury-lg border border-salon-gold/30">
                <span className="text-[10px] uppercase tracking-widest text-salon-gold font-bold block mb-2">
                  OUR ESSENCE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                  “Your Beauty Is Our Duty.”
                </h3>
                <p className="text-xs sm:text-sm text-salon-blush/80 leading-relaxed font-light mb-6">
                  Founded by <strong className="text-white font-medium">Preeti Mandal</strong> in Harinagar, Badarpur, Preeti Makeover was built to provide women with a reliable, clinical and luxury parlour experience close to home.
                </p>
                <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-salon-blush/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Prince Colony, Harinagar, Badarpur, New Delhi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Open 10 AM – 9 PM (Closed Tuesdays)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-semibold block mb-2">
                  MEET PREETI MANDAL
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salon-maroon tracking-tight mb-4">
                  Passionate Artistry & Personal Consultation
                </h2>
                <div className="w-16 h-0.5 bg-salon-gold mb-4"></div>
                <p className="text-sm sm:text-base text-salon-text/80 font-light leading-relaxed">
                  Every face, hair type and skin tone has distinct requirements. We take time to diagnose before recommending any facial, treatment or makeup drape, ensuring healthy, radiant and long-lasting results.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-salon-maroon bg-white hover:bg-salon-babypink/30 border border-salon-rose/30 shadow-sm transition-all"
                >
                  <span>Read Salon Story & Values</span>
                  <ArrowRight className="w-3.5 h-3.5 text-salon-gold-dark" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-sm transition-all"
                >
                  <span>Book Visit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Grand Booking Call-to-Action Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-[36px] bg-gradient-to-r from-salon-babypink/80 via-salon-blush to-salon-babypink/60 border border-salon-rose/30 p-10 sm:p-14 shadow-luxury">
            <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-bold block mb-2">
              RESERVE YOUR TIME
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight mb-4">
              Ready for Your Transformation?
            </h2>
            <p className="text-sm sm:text-base text-salon-text/75 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Book online in seconds, or contact Preeti Mandal directly on WhatsApp for custom bridal and consultation queries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-luxury transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-salon-gold" />
                <span>Book Appointment Online</span>
              </Link>

              <a
                href="https://wa.me/918810359438"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-200 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
