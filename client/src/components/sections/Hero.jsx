import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';



export default function Hero({ content = {} }) {
  const headingLine1 = content?.headingLine1 || 'Look good.';
  const headingLine2 = content?.headingLine2 || 'Feel even better.';
  const description = content?.description || 'Hair, skin, makeup, and bespoke bridal looks — crafted with meticulous care by Preeti Mandal. Premium products, hospital-grade hygiene, and a personal touch for every client.';
  const tagline = content?.tagline || '{tagline}';
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
      className="relative pt-22 sm:pt-24 pb-14 sm:pb-16 md:pb-16 overflow-hidden bg-gradient-to-br from-[#FCEBF1] via-[#FCE3EC] to-[#FDF2F7]"
    >
      {/* ── Soft Background ── */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(197,161,90,0.1)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(217,140,163,0.12)_0%,transparent_55%)] pointer-events-none"></div>

            {/* Top/Bottom gold lines */}
      <div className="absolute top-0 left-[6%] right-[6%] flex items-center pointer-events-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/18 to-transparent"></div>
        <div className="w-1.5 h-1.5 border border-salon-gold/18 rotate-45 mx-2"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/18 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-[6%] right-[6%] flex items-center pointer-events-none">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/18 to-transparent"></div>
        <div className="w-1.5 h-1.5 border border-salon-gold/18 rotate-45 mx-2"></div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-salon-gold/18 to-transparent"></div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Column */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 space-y-4 text-center lg:text-left"
          >
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[62px] font-serif font-bold text-salon-maroon leading-[1.06] tracking-tight">
              <span className="hero-heading-line block opacity-0">{headingLine1}</span>
              <span className="hero-heading-line block opacity-0">
                {headingLine2}
              </span>
            </h1>

            {/* Description */}
            <p className="hero-desc opacity-0 text-[15px] sm:text-base text-salon-text/75 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
              {description}
            </p>

            {/* Tagline */}
            <div className="hero-tagline opacity-0 inline-block border-l-2 border-salon-gold pl-3 py-0.5 text-[11px] uppercase tracking-[0.18em] text-salon-gold-dark font-medium">
              "Your Beauty Is Our Duty."
            </div>

            {/* Quick Info Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[12px] text-salon-text/65 font-medium">
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-salon-gold" />
                <span>{quickLocation}</span>
              </div>
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-salon-gold" />
                <span>{quickHours}</span>
              </div>
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-salon-gold" />
                <span>{quickPhone}</span>
              </div>
            </div>

            {/* CTA Buttons - Single row on mobile & desktop */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1 w-full max-w-md mx-auto lg:mx-0">
              <motion.div
                className="hero-cta opacity-0 flex-1 sm:flex-initial"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-salon-maroon to-salon-maroon-light hover:from-salon-maroon-deep hover:to-salon-maroon shadow-luxury hover:shadow-luxury-lg transition-all border border-salon-gold/25 whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-salon-gold shrink-0" />
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-salon-maroon bg-white hover:bg-salon-babypink/20 border border-salon-rose/25 shadow-sm transition-all whitespace-nowrap"
                >
                  <span>{btnServices}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-salon-gold-dark shrink-0" />
                </Link>
              </motion.div>
            </div>


          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            style={{ y: isDesktop ? imageY : 0 }}
            className="lg:col-span-5 flex justify-center lg:justify-center pb-8 sm:pb-10 lg:pb-0"
          >
            <div className="hero-image-container opacity-0 relative w-full max-w-[380px] sm:max-w-[420px]">

              {/* Glow behind image */}
              <div className="hero-image-glow absolute inset-0 -inset-x-6 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(197,161,90,0.15)_0%,rgba(217,140,163,0.08)_40%,transparent_70%)] pointer-events-none blur-xl opacity-0"></div>

              {/* Decorative arch border */}
              <div className="absolute -inset-3 rounded-t-[195px] rounded-b-3xl border border-salon-gold/30 pointer-events-none"></div>

              {/* Main Image Container with Rich Luxury Box Shadow */}
              <motion.div
                className="relative rounded-t-[185px] rounded-b-3xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(71,18,34,0.38),0_12px_28px_-8px_rgba(0,0,0,0.22)] border border-salon-gold/35 ring-1 ring-salon-gold/20"
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <img
                  src={modelImage}
                  alt="Stunning HD bridal makeover by Preeti Makeover salon"
                  className="w-full h-[480px] sm:h-[550px] object-cover object-top"
                  loading="eager"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-salon-maroon-deep/75 via-salon-maroon/15 to-transparent"></div>

                {/* Text overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.7 }}
                  >
                    <span className="text-[9px] uppercase tracking-[0.2em] text-salon-gold font-semibold block mb-0.5">
                      {badgeTitle}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                      {badgeService}
                    </h3>
                    <p className="text-[11px] text-white/65 mt-0.5 font-light">
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
