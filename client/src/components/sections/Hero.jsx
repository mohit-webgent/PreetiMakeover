import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef(null);

  // Parallax on scroll
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
      className="relative pt-24 pb-14 md:pt-22 md:pb-20 overflow-hidden bg-gradient-to-br from-salon-blush via-salon-babypink-light to-[#FBF3E8]"
    >
      {/* ── Soft Background ── */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(197,161,90,0.1)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(217,140,163,0.12)_0%,transparent_55%)] pointer-events-none"></div>

      {/* Corner flourishes */}
      <svg className="absolute top-3 left-3 w-16 h-16 md:w-24 md:h-24 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M5 65 Q5 5 65 5" stroke="#C5A15A" strokeWidth="1.5" opacity="0.2" fill="none" />
        <path d="M5 45 Q5 15 45 15" stroke="#C5A15A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <circle cx="65" cy="5" r="2" fill="#C5A15A" opacity="0.2" />
        <circle cx="5" cy="65" r="2" fill="#C5A15A" opacity="0.2" />
      </svg>
      <svg className="absolute top-3 right-3 w-16 h-16 md:w-24 md:h-24 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M95 65 Q95 5 35 5" stroke="#C5A15A" strokeWidth="1.5" opacity="0.2" fill="none" />
        <path d="M95 45 Q95 15 55 15" stroke="#C5A15A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <circle cx="35" cy="5" r="2" fill="#C5A15A" opacity="0.2" />
        <circle cx="95" cy="65" r="2" fill="#C5A15A" opacity="0.2" />
      </svg>
      <svg className="absolute bottom-3 left-3 w-16 h-16 md:w-24 md:h-24 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M5 35 Q5 95 65 95" stroke="#C5A15A" strokeWidth="1.5" opacity="0.2" fill="none" />
        <circle cx="65" cy="95" r="2" fill="#C5A15A" opacity="0.2" />
        <circle cx="5" cy="35" r="2" fill="#C5A15A" opacity="0.2" />
      </svg>
      <svg className="absolute bottom-3 right-3 w-16 h-16 md:w-24 md:h-24 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M95 35 Q95 95 35 95" stroke="#C5A15A" strokeWidth="1.5" opacity="0.2" fill="none" />
        <circle cx="35" cy="95" r="2" fill="#C5A15A" opacity="0.2" />
        <circle cx="95" cy="35" r="2" fill="#C5A15A" opacity="0.2" />
      </svg>

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* Left Column */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 space-y-4 text-center lg:text-left"
          >
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[62px] font-serif font-bold text-salon-maroon leading-[1.06] tracking-tight">
              <span className="hero-heading-line block opacity-0">Look good.</span>
              <span className="hero-heading-line block opacity-0 italic font-normal text-salon-gold-dark">
                Feel even better.
              </span>
            </h1>

            {/* Description */}
            <p className="hero-desc opacity-0 text-[15px] sm:text-base text-salon-text/75 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans">
              Hair, skin, makeup, and bespoke bridal looks — crafted with meticulous care by{' '}
              <strong className="font-semibold text-salon-maroon">Preeti Mandal</strong>.
              Premium products, hospital-grade hygiene, and a personal touch for every client.
            </p>

            {/* Tagline */}
            <div className="hero-tagline opacity-0 inline-block border-l-2 border-salon-gold pl-3 py-0.5 text-[11px] uppercase tracking-[0.18em] text-salon-gold-dark font-medium">
              "Your Beauty Is Our Duty."
            </div>

            {/* Quick Info Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[12px] text-salon-text/65 font-medium">
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-salon-gold" />
                <span>Prince Colony, Badarpur</span>
              </div>
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-salon-gold" />
                <span>10 AM – 9 PM</span>
              </div>
              <div className="hero-info-item opacity-0 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-salon-gold" />
                <span>+91 8810359438</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <motion.div
                className="hero-cta opacity-0 w-full sm:w-auto"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-salon-maroon to-salon-maroon-light hover:from-salon-maroon-deep hover:to-salon-maroon shadow-luxury hover:shadow-luxury-lg transition-all border border-salon-gold/25"
                >
                  <Calendar className="w-4 h-4 text-salon-gold" />
                  <span>Book Appointment</span>
                </Link>
              </motion.div>

              <motion.div
                className="hero-cta opacity-0 w-full sm:w-auto"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-salon-maroon bg-white hover:bg-salon-babypink/20 border border-salon-rose/25 shadow-sm transition-all"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4 text-salon-gold-dark" />
                </Link>
              </motion.div>

              <motion.div
                className="hero-cta opacity-0 w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="https://wa.me/918810359438?text=Hello%20Preeti%20Makeover,%20I%20would%20like%20to%20enquire%20about%20salon%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </motion.div>
            </div>


          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="hero-image-container opacity-0 relative w-full max-w-[380px] sm:max-w-[420px]">

              {/* Glow behind image */}
              <div className="hero-image-glow absolute inset-0 -inset-x-6 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(197,161,90,0.15)_0%,rgba(217,140,163,0.08)_40%,transparent_70%)] pointer-events-none blur-xl opacity-0"></div>

              {/* Decorative arch border */}
              <div className="absolute -inset-3 rounded-t-[195px] rounded-b-3xl border border-salon-gold/20 pointer-events-none"></div>

              {/* Main Image Container */}
              <motion.div
                className="relative rounded-t-[185px] rounded-b-3xl overflow-hidden shadow-luxury-lg border border-salon-gold/20"
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <img
                  src="/hero-bridal.jpg"
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
                      Signature Service
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                      HD Bridal Makeover
                    </h3>
                    <p className="text-[11px] text-white/65 mt-0.5 font-light">
                      Camera-ready perfection by Preeti Mandal
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
