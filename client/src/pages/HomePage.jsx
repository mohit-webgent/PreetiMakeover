import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import BrandsShowcase from '../components/sections/BrandsShowcase';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import BotanicalLeaves from '../components/common/BotanicalLeaves';
import {
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Clock,
  MapPin,
  ShieldCheck,
  Check,
  Calendar,
  Phone,
  Eye
} from 'lucide-react';

export default function HomePage({ categories = [], testimonials = [], galleryImages = [], onSelectService }) {
  // Highlighted signature treatments
  const signatureTreatments = [
    {
      name: 'Signature Bridal HD Makeover',
      category: 'Bridal Studio',
      desc: 'Flawless high-definition bridal glam with bespoke hair draping and long-wear waterproof skin prep.',
      badge: 'Most Requested',
      link: '/bridal-makeup',
      image: '/signature-bridal.jpg'
    },
    {
      name: 'Casmara Luxury Algae Facial',
      category: 'Clinical Skincare',
      desc: 'Spanish peel-off algae mask delivering intense hydration, firming and luminous radiance.',
      badge: 'Skin Glow',
      link: '/services',
      image: '/signature-facial.jpg'
    },
    {
      name: 'Hair Botox & Nanoplastia Restoration',
      category: 'Hair Treatments',
      desc: 'Advanced structural realignment and keratin sealing for mirror-shine, frizz-free hair.',
      badge: 'Restorative',
      link: '/services',
      image: '/signature-hair.jpg'
    },
    {
      name: 'Italian Rica Liposoluble Waxing',
      category: 'Hygienic Care',
      desc: 'Gentle, 98% natural origin colophony-free wax designed for sensitive and delicate skin.',
      badge: 'Painless Care',
      link: '/services',
      image: '/signature-waxing.jpg'
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Philosophy & Commitments Ribbon */}
      <section className="bg-salon-maroon text-white py-3.5 sm:py-4 md:py-5 border-y border-salon-gold/30 overflow-hidden relative">
        {/* Edge Gradient Fades for Mobile Ticker */}
        <div className="md:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-salon-maroon to-transparent z-10" />
        <div className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-salon-maroon to-transparent z-10" />

        {/* Desktop View: Clean 4-Column Grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-6 text-left">
            {[
              {
                icon: ShieldCheck,
                title: '100% Genuine Brands',
                desc: 'Sealed L’Oréal, Casmara & Rica',
              },
              {
                icon: HeartHandshake,
                title: 'Preeti Mandal Direct Care',
                desc: 'Diagnostic personal consultations',
              },
              {
                icon: Sparkles,
                title: 'Hospital-Grade Clean',
                desc: 'Sanitized instruments every client',
              },
              {
                icon: Clock,
                title: '10:00 AM – 9:00 PM',
                desc: 'Open 6 Days (Closed Tuesday)',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-salon-gold">{item.title}</h4>
                  <p className="text-[11px] text-salon-blush/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Single Row Auto-Scrolling Mode (Right to Left) */}
        <div className="md:hidden flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center py-1">
            {[
              {
                icon: ShieldCheck,
                title: '100% Genuine Brands',
                desc: 'Sealed L’Oréal, Casmara & Rica',
              },
              {
                icon: HeartHandshake,
                title: 'Preeti Mandal Direct Care',
                desc: 'Diagnostic personal consultations',
              },
              {
                icon: Sparkles,
                title: 'Hospital-Grade Clean',
                desc: 'Sanitized instruments every client',
              },
              {
                icon: Clock,
                title: '10:00 AM – 9:00 PM',
                desc: 'Open 6 Days (Closed Tuesday)',
              },
              {
                icon: ShieldCheck,
                title: '100% Genuine Brands',
                desc: 'Sealed L’Oréal, Casmara & Rica',
              },
              {
                icon: HeartHandshake,
                title: 'Preeti Mandal Direct Care',
                desc: 'Diagnostic personal consultations',
              },
              {
                icon: Sparkles,
                title: 'Hospital-Grade Clean',
                desc: 'Sanitized instruments every client',
              },
              {
                icon: Clock,
                title: '10:00 AM – 9:00 PM',
                desc: 'Open 6 Days (Closed Tuesday)',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 shrink-0 px-3 whitespace-nowrap">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-salon-gold shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-salon-gold leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-salon-blush/80 leading-tight mt-0.5">{item.desc}</p>
                </div>
                <span className="w-1.5 h-1.5 border border-salon-gold/40 rotate-45 ml-3 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Curated Signature Offerings Section */}
      <section className="py-14 sm:py-18 bg-salon-blush relative overflow-hidden">
        <BotanicalLeaves variant="corners" />
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-salon-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-salon-babypink/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
            <div>
              <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.25em] text-salon-gold-dark font-bold block mb-2">
                CLIENT FAVORITES & TOP PICKS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
                Our Most Loved Services
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-salon-gold to-salon-gold-light mt-3.5"></div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-cinzel font-semibold tracking-wider text-salon-maroon hover:text-salon-gold-dark transition-colors group"
            >
              <span>Explore All 27 Salon Services</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-salon-gold-dark" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-3">
            {signatureTreatments.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group relative aspect-square rounded-none overflow-hidden border border-salon-gold/30 hover:border-salon-gold shadow-luxury hover:shadow-luxury-lg p-3 sm:p-4 lg:p-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 cursor-pointer block select-none"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />

                {/* Luxury Gradient Dark Overlay for Ultra Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A030D]/95 via-[#2A0617]/75 to-[#1A030D]/40 transition-colors duration-500 group-hover:from-[#14020A]/98 group-hover:via-[#220412]/70 pointer-events-none"></div>

                {/* Ambient Gold Radial Glow on Card Corner */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-salon-gold/15 rounded-full blur-2xl pointer-events-none group-hover:bg-salon-gold/30 transition-all duration-500"></div>

                {/* Top Badge & Number */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-1.5 sm:px-2.5 py-0.5 rounded-none text-[8px] sm:text-[9.5px] font-sans font-bold uppercase tracking-wider bg-black/45 backdrop-blur-md text-salon-gold-light border border-salon-gold/35 shadow-sm">
                    {item.badge}
                  </span>
                  <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-widest text-salon-gold/85 drop-shadow-sm">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom Content & Action */}
                <div className="relative z-10">
                  <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-cinzel font-bold text-salon-gold block mb-0.5 sm:mb-1 drop-shadow-sm">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-[11.5px] sm:text-[14px] lg:text-[16px] font-bold text-white mb-0.5 sm:mb-1 leading-snug group-hover:text-salon-gold-light transition-colors line-clamp-2 drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-[9.5px] sm:text-[11px] text-white/75 font-sans font-light leading-snug line-clamp-1 sm:line-clamp-2 mb-1.5 sm:mb-2.5 drop-shadow-sm">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-white/15 text-[9px] sm:text-[10.5px] lg:text-[11px] font-cinzel font-semibold tracking-wider text-salon-gold group-hover:text-white transition-colors">
                    <span>Explore & Book</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-salon-gold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dedicated Bridal Feature Spotlight */}
      <section className="py-12 sm:py-16 bg-salon-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-br from-salon-maroon-deep via-salon-maroon to-salon-maroon-light text-salon-blush p-8 sm:p-14 relative overflow-hidden shadow-luxury-lg border border-salon-gold/30">
            <div className="absolute right-0 top-0 w-96 h-96 bg-salon-gold/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
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
      <section className="py-14 sm:py-18 bg-salon-blush relative overflow-hidden">
        <BotanicalLeaves variant="right" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-salon-gold-dark font-semibold block mb-2">
                PORTFOLIO SNAPSHOT
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
                Salon Work Gallery
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-salon-gold to-salon-gold-light mt-3"></div>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-cinzel font-semibold tracking-wider text-salon-maroon hover:text-salon-gold-dark transition-colors group"
            >
              <span>View Full Gallery With Filter & Zoom</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-salon-gold-dark" />
            </Link>
          </div>

          {/* Visual Transformation Photo Cards - Clean, Pure Photography, No Bulky Text */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              {
                title: 'Royal Indian Bridal HD Glam',
                category: 'Bridal Makeover',
                image: '/gallery-bridal.jpg'
              },
              {
                title: 'Nanoplastia & Hair Botox Glow',
                category: 'Hair Treatments',
                image: '/gallery-hair.jpg'
              },
              {
                title: 'Cocktail & Evening Glam Makeup',
                category: 'Occasion Artistry',
                image: '/gallery-makeup.jpg'
              },
              {
                title: 'Bespoke Gel Nail Extensions',
                category: 'Nail Artistry',
                image: '/gallery-nails.jpg'
              }
            ].map((p, idx) => (
              <Link
                key={idx}
                to="/gallery"
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-salon-gold/30 hover:border-salon-gold shadow-sm hover:shadow-luxury-lg transition-all duration-500 hover:-translate-y-1 block select-none bg-black/5"
              >
                {/* Full-Bleed Photograph with Smooth Zoom */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />

                {/* Subtle Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 pointer-events-none"></div>

                {/* Top Category Badge */}
                <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/25 text-[8.5px] sm:text-[9.5px] font-cinzel font-semibold uppercase tracking-wider text-white">
                    {p.category}
                  </span>
                </div>

                {/* Bottom Title & Eye Icon Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-10 flex items-end justify-between gap-2 pointer-events-none">
                  <span className="font-cinzel text-xs sm:text-[13.5px] font-bold text-white leading-tight drop-shadow-md line-clamp-2 group-hover:text-salon-gold-light transition-colors">
                    {p.title}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 group-hover:bg-salon-maroon group-hover:border-salon-gold group-hover:text-salon-gold transition-all duration-300 shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Client Reviews / Satisfaction Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8. Studio Story & Values Teaser */}
      <section className="py-14 sm:py-18 bg-salon-blush border-t border-salon-babypink/60 relative overflow-hidden">
        <BotanicalLeaves variant="left" />
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

      {/* 9. Grand Booking Call-to-Action Banner (Compact, Full-Width & Clean) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#230412] via-[#1A030E] to-[#2B0618] text-white py-12 sm:py-16 border-y border-salon-gold/30">
        
        {/* Full-width Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-64 bg-salon-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-salon-rose/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-2 sm:mb-3">
            Ready for Your Transformation?
          </h2>

          {/* Clean Subtext */}
          <p className="text-sm sm:text-base text-white/80 font-light max-w-xl mx-auto mb-6 sm:mb-7 leading-relaxed">
            Book your appointment online in seconds, or contact directly on WhatsApp.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-salon-maroon bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury-gold hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-luxury"
            >
              <Calendar className="w-4 h-4 text-salon-maroon" />
              <span>Book Appointment Online</span>
            </Link>

            <a
              href="https://wa.me/918810359438"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-emerald-400/60 backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-sm"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
