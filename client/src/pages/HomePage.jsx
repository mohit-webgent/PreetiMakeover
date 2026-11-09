import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import BrandsShowcase from '../components/sections/BrandsShowcase';
import PromiseRibbon from '../components/sections/PromiseRibbon';
import TestimonialsSection from '../components/sections/TestimonialsSection';

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
  Eye,
  Star,
  Award,
  Crown,
  Heart
} from 'lucide-react';

export default function HomePage({ categories = [], testimonials = [], galleryImages = [], onSelectService, siteContent = {} }) {
  // Highlighted signature treatments
  const signatureTreatments = [
    {
      name: 'Signature Bridal HD Makeover',
      category: 'Bridal Studio',
      desc: 'Flawless high-definition bridal glam with bespoke hair draping and long-wear waterproof skin prep.',
      badge: 'Most Requested',
      highlight: 'Waterproof HD Finish',
      link: '/bridal-makeup',
      image: '/signature-bridal.jpg'
    },
    {
      name: 'Casmara Luxury Algae Facial',
      category: 'Clinical Skincare',
      desc: 'Spanish peel-off algae mask delivering intense hydration, firming and luminous radiance.',
      badge: 'Skin Glow',
      highlight: 'Spanish Algae Peel',
      link: '/services',
      image: '/signature-facial.jpg'
    },
    {
      name: 'Hair Botox & Nanoplastia Restoration',
      category: 'Hair Treatments',
      desc: 'Advanced structural realignment and keratin sealing for mirror-shine, frizz-free hair.',
      badge: 'Restorative',
      highlight: 'Mirror-Shine Keratin',
      link: '/services',
      image: '/signature-hair.jpg'
    },
    {
      name: 'Italian Rica Liposoluble Waxing',
      category: 'Hygienic Care',
      desc: 'Gentle, 98% natural origin colophony-free wax designed for sensitive and delicate skin.',
      badge: 'Painless Care',
      highlight: '98% Natural Origin',
      link: '/services',
      image: '/signature-waxing.jpg'
    }
  ];

  // Dynamic Ribbon Commitments
  const ribbonCards = [
    {
      icon: ShieldCheck,
      title: siteContent?.ribbon?.item1Title || '100% Genuine Brands',
      desc: siteContent?.ribbon?.item1Desc || 'Sealed L’Oréal, Casmara & Rica',
    },
    {
      icon: HeartHandshake,
      title: siteContent?.ribbon?.item2Title || 'Preeti Mandal Direct Care',
      desc: siteContent?.ribbon?.item2Desc || 'Diagnostic personal consultations',
    },
    {
      icon: Sparkles,
      title: siteContent?.ribbon?.item3Title || 'Hospital-Grade Clean',
      desc: siteContent?.ribbon?.item3Desc || 'Sanitized instruments every client',
    },
    {
      icon: Clock,
      title: siteContent?.ribbon?.item4Title || '10:00 AM – 9:00 PM',
      desc: siteContent?.ribbon?.item4Desc || 'Open 6 Days (Closed Tuesday)',
    },
  ];

  // Social Proof Stats
  const salonStats = [
    { number: '10+', label: 'Years Experience', sub: 'Founded by Preeti Mandal', icon: Award },
    { number: '1,200+', label: 'Happy Brides', sub: 'Signature HD Glamour', icon: Crown },
    { number: '27+', label: 'Salon Services', sub: 'Hair, Skin & Bridal', icon: Sparkles },
    { number: '4.9★', label: 'Client Rating', sub: 'Google & Direct Reviews', icon: Star },
  ];

  // Dynamic Signature / Most Loved Services
  const activeSignatureItems = (Array.isArray(siteContent?.signature?.items) && siteContent.signature.items.length > 0)
    ? siteContent.signature.items
    : signatureTreatments;
  
  const signatureEyebrow = siteContent?.signature?.eyebrow && siteContent.signature.eyebrow !== '{signatureEyebrow}'
    ? siteContent.signature.eyebrow
    : 'CLIENT FAVORITES & SIGNATURE CARE';
    
  const signatureMainTitle = siteContent?.signature?.title && siteContent.signature.title !== '{signatureMainTitle}'
    ? siteContent.signature.title
    : 'Our Most Loved Services';

  return (
    <div className="space-y-0 text-salon-text">
      {/* 1. Cinematic Hero Section */}
      <Hero content={siteContent?.hero} stats={salonStats} />

      {/* 2. Promise ribbon (stats now live inside the hero) */}
      <PromiseRibbon promises={ribbonCards} />

      {/* 4. Curated Signature Offerings Section (Re-imagined with Modern Rounded Glass Cards) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF4F7] via-[#FFF9FB] to-[#FCEEF3] relative overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-salon-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-salon-rose/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-salon-gold-dark font-bold block mb-1.5">
                {signatureEyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-salon-maroon tracking-tight">
                {signatureMainTitle}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {activeSignatureItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-salon-gold/30 hover:border-salon-gold shadow-luxury hover:shadow-luxury-lg p-5 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 cursor-pointer block select-none bg-black/10"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />

                {/* Refined Modern Gradient Overlay (Clean & Visible Photography) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A0D2C]/95 via-[#3A0D2C]/55 to-transparent transition-colors duration-500 group-hover:from-[#3A0D2C]/95 group-hover:via-[#220412]/45 pointer-events-none"></div>

                {/* Ambient Gold Radial Glow on Card Corner */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-salon-gold/20 rounded-full blur-2xl pointer-events-none group-hover:bg-salon-gold/35 transition-all duration-500"></div>

                {/* Top Badge & Number */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-sm">
                    {item.badge}
                  </span>
                  <span className="font-cinzel text-xs font-bold tracking-widest text-salon-gold-light drop-shadow-sm">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom Content & Action */}
                <div className="relative z-10 space-y-1.5">
                  <span className="text-[9.5px] uppercase tracking-[0.2em] font-cinzel font-bold text-salon-gold block drop-shadow-sm">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white leading-snug group-hover:text-salon-gold-light transition-colors drop-shadow-md">
                    {item.name}
                  </h3>
                  <p className="text-xs text-white/80 font-sans font-light leading-relaxed line-clamp-2 drop-shadow-sm">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs font-cinzel font-semibold tracking-wider text-salon-gold-light group-hover:text-white transition-colors">
                    <span>Explore & Book</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-salon-gold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dedicated Bridal Feature Spotlight (Elevated High-Fashion Editorial Card) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FCEEF3] to-[#FAF4F7]">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="rounded-[40px] bg-gradient-to-br from-[#3A0D2C] via-[#5A1745] to-[#200410] text-salon-blush p-8 sm:p-14 relative overflow-hidden shadow-luxury-lg border border-salon-gold/40">
            {/* Ambient Gold & Rose Atmosphere */}
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-salon-gold/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-salon-rose/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-salon-gold/30 text-[10px] uppercase tracking-[0.2em] text-salon-gold font-bold">
                  <Crown className="w-3.5 h-3.5 text-salon-gold" />
                  <span>The Bridal Couture Experience</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  {siteContent?.bridal?.title || 'High-Definition Bridal Artistry'}
                </h2>

                <p className="text-salon-blush/85 text-base sm:text-lg font-light leading-relaxed max-w-2xl font-sans">
                  {siteContent?.bridal?.description || 'From deep pre-bridal skin therapy to camera-ready HD makeup and custom saree draping, crafted by Preeti Mandal for your most memorable celebration.'}
                </p>

                {/* 4 Feature Glass Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    siteContent?.bridal?.feature1 || 'Pre-Bridal Clinical Glow Care Package',
                    siteContent?.bridal?.feature2 || 'Signature Waterproof HD Bridal Makeup',
                    siteContent?.bridal?.feature3 || 'Bespoke Hairstyling & Extensions',
                    siteContent?.bridal?.feature4 || 'Designer Saree & Dupatta Draping'
                  ].map((feat, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-salon-gold/40 hover:bg-white/10 transition-all text-xs sm:text-sm text-salon-blush"
                    >
                      <span className="w-6 h-6 rounded-full bg-salon-gold/25 text-salon-gold flex items-center justify-center shrink-0 border border-salon-gold/30">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
                <Link
                  to="/bridal-makeup"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-salon-maroon bg-gradient-to-r from-salon-gold-light via-salon-gold to-salon-gold-dark hover:brightness-105 shadow-luxury transition-all transform hover:-translate-y-0.5 border border-salon-gold/40"
                >
                  <Calendar className="w-4 h-4 text-salon-maroon" />
                  <span>Explore Bridal Studio</span>
                </Link>

                <p className="text-xs text-salon-blush/70 italic text-left lg:text-right">
                  {siteContent?.bridal?.bookingNote || 'Advance bookings recommended 3–6 weeks prior • Private sanitized suite'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Certified Brands Showcase */}
      <BrandsShowcase content={siteContent?.brands} />

      {/* 7. Portfolio Preview Section (Editorial Fashion Gallery) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF4F7] via-[#FFF9FB] to-[#FCEEF3] relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-salon-gold-dark font-bold block mb-1.5">
                PORTFOLIO SNAPSHOT
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-salon-maroon tracking-tight">
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

          {/* Visual Transformation Photo Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-salon-gold/30 hover:border-salon-gold shadow-md hover:shadow-luxury-lg transition-all duration-500 hover:-translate-y-1.5 block select-none bg-black/10"
              >
                {/* Full-Bleed Photograph with Smooth Zoom */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />

                {/* Subtle Contrast Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 pointer-events-none"></div>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/25 text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-wider text-white shadow-sm">
                    {p.category}
                  </span>
                </div>

                {/* Bottom Title & Eye Icon Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-end justify-between gap-2 pointer-events-none">
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-white leading-tight drop-shadow-md line-clamp-2 group-hover:text-salon-gold-light transition-colors">
                    {p.title}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shrink-0 group-hover:bg-salon-maroon group-hover:border-salon-gold group-hover:text-salon-gold transition-all duration-300 shadow-sm">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Client Reviews / Satisfaction Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 9. Studio Story & Values Teaser (Refined Editorial Split Layout) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FCEEF3] to-[#FAF4F7] border-t border-salon-babypink/60 relative overflow-hidden">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Signature Founder Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[36px] bg-gradient-to-br from-salon-maroon via-salon-maroon-deep to-[#2A0515] text-salon-blush p-8 sm:p-10 shadow-luxury-lg border border-salon-gold/40">
                <span className="text-[10px] uppercase tracking-widest text-salon-gold font-bold block mb-2">
                  {siteContent?.about?.essenceTag || 'OUR ESSENCE'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                  {siteContent?.about?.quote || '“Your Beauty Is Our Duty.”'}
                </h3>
                <p className="text-xs sm:text-sm text-salon-blush/85 leading-relaxed font-light mb-6">
                  {siteContent?.about?.essenceStory || 'Founded by Preeti Mandal in Harinagar, Badarpur, Preeti Makeover was built to provide women with a reliable, clinical and luxury parlour experience close to home.'}
                </p>
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-salon-blush/80">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Prince Colony, Harinagar, Badarpur, New Delhi</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-salon-gold shrink-0" />
                    <span>Open 10 AM – 9 PM (Closed Tuesdays)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Founder Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-salon-gold-dark font-bold block mb-1.5">
                  MEET PREETI MANDAL
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-salon-maroon tracking-tight mb-3 leading-tight">
                  {siteContent?.about?.heading || 'Passionate Artistry & Personal Consultation'}
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-salon-gold to-salon-gold-light mb-4"></div>
                <p className="text-sm sm:text-base text-salon-text/80 font-light leading-relaxed">
                  {siteContent?.about?.description || 'Every face, hair type and skin tone has distinct requirements. We take time to diagnose before recommending any facial, treatment or makeup drape, ensuring healthy, radiant and long-lasting results.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-salon-maroon bg-white hover:bg-salon-babypink/30 border border-salon-rose/30 shadow-sm transition-all"
                >
                  <span>Read Salon Story & Values</span>
                  <ArrowRight className="w-3.5 h-3.5 text-salon-gold-dark" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-sm transition-all"
                >
                  <span>Book Visit</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Grand Booking Call-to-Action Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4A0E30] via-[#6B1442] to-[#A3245E] text-white py-14 sm:py-18 border-t border-salon-gold/30">
        {/* Full-width Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-64 bg-salon-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-salon-rose/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-salon-gold/30 text-[10px] uppercase tracking-[0.2em] text-salon-gold font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-salon-gold" />
            <span>Instant Salon Booking</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            {siteContent?.cta?.title || 'Ready for Your Transformation?'}
          </h2>

          <p className="text-sm sm:text-base text-white/80 font-light max-w-xl mx-auto mb-7 leading-relaxed">
            {siteContent?.cta?.subtext || 'Book your appointment online in seconds, or contact directly on WhatsApp for personal bridal guidance.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-salon-maroon bg-gradient-to-r from-[#FFE4EE] via-[#F2A9C4] to-[#FFE4EE] hover:shadow-luxury-gold hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-luxury"
            >
              <Calendar className="w-4 h-4 text-salon-maroon" />
              <span>{siteContent?.cta?.buttonText || 'Book Appointment Online'}</span>
            </Link>

            <a
              href={`https://wa.me/${siteContent?.cta?.whatsappNumber || '918810359438'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-emerald-400/60 backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-sm"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{siteContent?.cta?.whatsappText || 'Message on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
