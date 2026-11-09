import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import HeroStats from './HeroStats';
import { 
  Calendar, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Phone,
  Star,
  ShieldCheck,
  Sparkles,
  Heart
} from 'lucide-react';

export default function Hero({ content = {}, stats = [] }) {
  const headingLine1 = content?.headingLine1 || 'Look good.';
  const headingLine2 = content?.headingLine2 || 'Feel even better.';
  const description = content?.description || 'Hair, skin, makeup, and bespoke bridal looks — crafted with meticulous care by Preeti Mandal. Premium products, hospital-grade hygiene, and a personal touch for every client.';
  const tagline = content?.tagline && content.tagline !== '{tagline}' ? content.tagline : '"Your Beauty Is Our Duty."';
  const modelImage = content?.modelImage || '/hero-bridal.jpg';
  const badgeTitle = content?.badgeTitle || 'Signature Service';
  const badgeService = content?.badgeService || 'HD Bridal Makeover';
  const badgeSubtitle = content?.badgeSubtitle || 'Camera-ready perfection by Preeti Mandal';
  const quickLocation = content?.quickLocation || 'Prince Colony, Badarpur';
  const quickHours = content?.quickHours || '10 AM – 9 PM';
  const quickPhone = content?.quickPhone || '+91 8810359438';
  const btnAppointment = content?.btnAppointment || 'Book Appointment';
  const btnServices = content?.btnServices || 'View Services';
  const heroRef = useRef(null);

  // Parallax on scroll (desktop only to prevent mobile image collision)
  const [isDesktop, setIsDesktop] = React.useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 60]);
  const textY = useTransform(scrollY, [0, 500], [0, -30]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Heading lines
      tl.fromTo(
        '.hero-heading-line',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
        0.2
      );

      // Description
      tl.fromTo(
        '.hero-desc',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.7
      );

      // Tagline
      tl.fromTo(
        '.hero-tagline',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.9
      );

      // Quick info items
      tl.fromTo(
        '.hero-info-item',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        1.0
      );

      // CTA buttons
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.15
      );

      // Image
      tl.fromTo(
        '.hero-image-container',
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
        0.3
      );

      // Image glow
      tl.fromTo(
        '.hero-image-glow',
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden bg-petal-gradient"
    >
      {/* ── Ambient Radial Atmosphere ── */}
      <div className="absolute top-0 right-[-10%] w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(229,143,176,0.14)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(217,140,163,0.18)_0%,transparent_55%)] pointer-events-none"></div>

      {/* Decorative Golden Divider Accents */}
      <div className="absolute top-0 left-[6%] right-[6%] flex items-center pointer-events-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/30 to-transparent"></div>
        <div className="w-1.5 h-1.5 border border-salon-gold/40 rotate-45 mx-2"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/30 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-[6%] right-[6%] flex items-center pointer-events-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/30 to-transparent"></div>
        <div className="w-1.5 h-1.5 border border-salon-gold/40 rotate-45 mx-2"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/30 to-transparent"></div>
      </div>

      {/* ── Main Content (Full-Width Responsive) ── */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column */}
          <motion.div
            style={{ y: isDesktop ? textY : 0 }}
            className="lg:col-span-7 space-y-4 text-center lg:text-left"
          >
            {/* Luxury Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-salon-gold/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-salon-maroon shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-salon-gold-dark" />
              <span>Bespoke Beauty & Bridal Studio</span>
            </div>

            {/* Main Heading */}
            <p className="hero-tagline opacity-0 font-script text-3xl sm:text-4xl text-salon-rose-dark leading-none">Hello, gorgeous</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-salon-maroon leading-[1.05] tracking-tight">
              <span className="hero-heading-line block opacity-0 text-salon-text">{headingLine1}</span>
              <span className="hero-heading-line block opacity-0 italic text-gradient-rose pb-2">
                {headingLine2}
              </span>
            </h1>

            {/* Description */}
            <p className="hero-desc opacity-0 text-sm sm:text-[15px] text-salon-text/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {description}
            </p>

            {/* Tagline */}
            <div className="hero-tagline opacity-0 inline-flex items-center gap-2 border-l-2 border-salon-gold pl-3 py-1 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-salon-gold-dark font-bold">
              <span>{tagline}</span>
            </div>

            {/* Quick Info Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[12px] text-salon-text-muted font-medium pt-1">
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>{quickLocation}</span>
              </div>
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>{quickHours}</span>
              </div>
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>{quickPhone}</span>
              </div>
            </div>

            {/* CTA Buttons - Single row on mobile & desktop with gold shimmer */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto lg:mx-0">
              <motion.div
                className="hero-cta opacity-0 flex-1 sm:flex-initial"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="btn-primary w-full sm:w-auto !px-5 sm:!px-7 !py-3.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{btnAppointment}</span>
                </Link>
              </motion.div>

              <motion.div
                className="hero-cta opacity-0 flex-1 sm:flex-initial"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/services"
                  className="btn-soft w-full sm:w-auto !px-4 sm:!px-6 !py-3.5"
                >
                  <span>{btnServices}</span>
                  <ArrowRight className="w-4 h-4 text-salon-gold-dark" />
                </Link>
              </motion.div>
            </div>
            {stats.length > 0 && <HeroStats stats={stats} />}
          </motion.div>

          {/* Right Column: Hero Image with Floating Badges */}
          <motion.div
            style={{ y: isDesktop ? imageY : 0 }}
            className="lg:col-span-5 flex justify-center lg:justify-center pb-8 sm:pb-10 lg:pb-0 relative"
          >
            <div className="hero-image-container opacity-0 relative w-full max-w-[360px] sm:max-w-[400px]">

              {/* Floating Social Proof Badge 1: 4.9 Star Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: -15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="animate-float absolute -top-3 -left-3 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-luxury-lg border border-salon-gold/40 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 shadow-sm border border-amber-200/50">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-left pr-1">
                  <div className="flex items-center gap-1 font-cinzel font-bold text-xs text-salon-maroon">
                    <span>4.9 / 5.0</span>
                    <span className="text-[10px] text-salon-gold-dark font-sans font-semibold">★ Rating</span>
                  </div>
                  <p className="text-[9.5px] text-salon-text-muted">500+ Happy Brides</p>
                </div>
              </motion.div>

              {/* Floating Social Proof Badge 2: 100% Genuine Brands */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="animate-float [animation-delay:-3s] absolute -bottom-3 -right-3 sm:-right-5 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-luxury-lg border border-salon-gold/40 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-200/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-left pr-1">
                  <span className="font-cinzel font-bold text-xs text-salon-maroon block leading-tight">100% Genuine</span>
                  <span className="text-[9.5px] text-salon-text-muted">L'Oréal, Casmara & Rica</span>
                </div>
              </motion.div>

              {/* Twinkling sparkles */}
              <Sparkles className="absolute -top-6 right-6 w-6 h-6 text-salon-rose animate-twinkle z-20" />
              <Heart className="absolute top-1/3 -left-8 w-5 h-5 text-salon-rose-dark fill-salon-rose/60 animate-float z-20 hidden sm:block" />
              <Sparkles className="absolute bottom-24 -right-7 w-5 h-5 text-salon-lavender-dark animate-twinkle [animation-delay:-1.5s] z-20 hidden sm:block" />

              {/* Glow behind image */}
              <div className="hero-image-glow absolute inset-0 -inset-x-6 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(229,143,176,0.2)_0%,rgba(217,140,163,0.12)_40%,transparent_70%)] pointer-events-none blur-xl opacity-0"></div>

              {/* Decorative arch border */}
              <div className="absolute -inset-3 rounded-t-[195px] rounded-b-3xl bg-gradient-to-br from-salon-rose/40 via-salon-lavender/40 to-salon-peach/50 -z-10 blur-[2px]"></div>

              {/* Main Image Container with Rich Luxury Box Shadow */}
              <motion.div
                className="relative rounded-t-[185px] rounded-b-3xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(90,23,69,0.35),0_12px_28px_-8px_rgba(0,0,0,0.18)] border border-salon-gold/35 ring-1 ring-salon-gold/20"
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <img
                  src={modelImage}
                  alt="Stunning HD bridal makeover by Preeti Makeover salon"
                  className="w-full h-[460px] sm:h-[530px] object-cover object-top"
                  loading="eager"
                />

                {/* Subtle gradient overlay at bottom for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A0D2C]/85 via-[#3A0D2C]/20 to-transparent"></div>

                {/* Text overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.7 }}
                  >
                    <span className="text-[9px] uppercase tracking-[0.2em] text-salon-gold font-bold block mb-0.5">
                      {badgeTitle}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                      {badgeService}
                    </h3>
                    <p className="text-[11px] text-white/75 mt-0.5 font-light">
                      {badgeSubtitle}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
