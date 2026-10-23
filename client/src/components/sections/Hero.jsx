import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, ArrowRight, MapPin, Clock, Phone } from 'lucide-react';



export default function Hero() {
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

      {/* ── Botanical Leaf Outlines (Soft Watermark Outline - Corner Framing Only) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* 1. Top-Left: Delicate Eucalyptus Branch (Tucked in top corner away from heading) */}
        <div className="absolute -top-6 -left-6 sm:-top-2 sm:-left-2 w-56 h-56 sm:w-72 sm:h-72 text-salon-gold opacity-[0.22]">
          <svg viewBox="0 0 360 360" fill="none" className="w-full h-full">
            {/* Main stem with natural organic curve */}
            <path
              d="M10 10 C50 40, 85 90, 130 150 C170 205, 220 260, 310 320"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Node 1 - Upper Left Leaf */}
            <path d="M55 52 C45 48, 38 42, 32 38" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M32 38 C20 22, 6 28, 2 38 C-2 52, 14 62, 32 38 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M32 38 C18 34, 10 35, 2 38" stroke="currentColor" strokeWidth="0.7" />
            <path d="M24 36 C20 30, 16 28, 14 26" stroke="currentColor" strokeWidth="0.5" />
            <path d="M20 37 C18 43, 14 47, 10 49" stroke="currentColor" strokeWidth="0.5" />

            {/* Node 1 - Opposite Leaf (Right) */}
            <path d="M68 68 C80 62, 90 58, 98 56" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M98 56 C115 45, 130 52, 134 65 C136 78, 118 84, 98 56 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M98 56 C114 60, 126 62, 134 65" stroke="currentColor" strokeWidth="0.7" />
            <path d="M108 58 C112 52, 118 50, 124 50" stroke="currentColor" strokeWidth="0.5" />
            <path d="M116 61 C118 68, 122 72, 126 74" stroke="currentColor" strokeWidth="0.5" />

            {/* Node 2 - Leaf Left */}
            <path d="M98 108 C85 100, 72 96, 60 92" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M60 92 C40 76, 22 84, 16 98 C12 114, 34 122, 60 92 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M60 92 C38 92, 26 95, 16 98" stroke="currentColor" strokeWidth="0.7" />
            <path d="M48 92 C42 84, 35 82, 28 82" stroke="currentColor" strokeWidth="0.5" />
            <path d="M38 94 C34 102, 28 108, 22 110" stroke="currentColor" strokeWidth="0.5" />

            {/* Node 2 - Leaf Right */}
            <path d="M118 132 C132 124, 146 118, 158 116" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M158 116 C180 102, 198 110, 204 124 C206 140, 184 146, 158 116 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M158 116 C180 120, 194 122, 204 124" stroke="currentColor" strokeWidth="0.7" />
            <path d="M172 118 C178 110, 186 108, 192 108" stroke="currentColor" strokeWidth="0.5" />
            <path d="M182 121 C186 128, 192 133, 196 135" stroke="currentColor" strokeWidth="0.5" />

            {/* Node 3 - Leaf Left */}
            <path d="M152 178 C135 168, 120 162, 105 158" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M105 158 C80 140, 62 148, 54 164 C48 182, 74 192, 105 158 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M105 158 C80 160, 66 162, 54 164" stroke="currentColor" strokeWidth="0.7" />

            {/* Node 3 - Leaf Right */}
            <path d="M178 206 C195 196, 212 190, 226 188" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M226 188 C252 172, 274 182, 280 198 C282 216, 256 222, 226 188 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M226 188 C252 194, 268 196, 280 198" stroke="currentColor" strokeWidth="0.7" />

            {/* Node 4 - Leaf Left */}
            <path d="M218 252 C200 242, 185 238, 172 235" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M172 235 C150 218, 134 225, 126 240 C120 256, 144 265, 172 235 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M172 235 C150 236, 138 238, 126 240" stroke="currentColor" strokeWidth="0.7" />

            {/* Node 4 - Leaf Right */}
            <path d="M248 276 C264 266, 278 262, 290 260" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M290 260 C314 246, 332 254, 338 268 C340 282, 318 288, 290 260 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M290 260 C312 264, 326 266, 338 268" stroke="currentColor" strokeWidth="0.7" />

            {/* Terminal Leaf */}
            <path d="M310 320 C324 330, 334 338, 330 342 C320 345, 308 335, 310 320 Z" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </div>

        {/* 2. Top-Right: Realistic Arching Palm Frond (Framing portrait) */}
        <div className="absolute -top-12 right-[-6%] sm:right-[0%] lg:right-[2%] w-80 h-[440px] sm:w-[420px] sm:h-[500px] text-salon-gold opacity-[0.24] rotate-[20deg]">
          <svg viewBox="0 0 380 500" fill="none" className="w-full h-full">
            <path
              d="M30 480 C100 360, 180 220, 270 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Left Leaflets */}
            <path d="M50 440 C20 410, 8 380, 2 350 C24 370, 48 395, 74 415" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M74 415 L2 350" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M78 392 C38 358, 16 325, 10 290 C34 315, 66 348, 98 368" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M98 368 L10 290" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M106 342 C56 302, 28 265, 20 225 C48 252, 84 290, 122 314" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M122 314 L20 225" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M136 290 C78 245, 48 205, 42 165 C68 195, 110 238, 148 260" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M148 260 L42 165" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M166 236 C112 188, 80 148, 76 108 C102 138, 142 182, 176 206" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M176 206 L76 108" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M196 180 C150 132, 120 95, 122 55 C142 85, 176 128, 204 150" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M204 150 L122 55" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M226 124 C190 80, 170 48, 178 15 C190 45, 214 82, 234 100" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M248 70 C228 35, 218 12, 224 2 C234 22, 248 45, 258 55" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />

            {/* Right Leaflets */}
            <path d="M72 448 C118 440, 160 428, 192 410 C162 426, 124 440, 92 436" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M92 436 L192 410" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M102 398 C158 386, 206 368, 242 344 C204 366, 156 384, 122 390" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M122 390 L242 344" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M132 344 C192 328, 246 304, 286 272 C246 298, 194 322, 150 332" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M150 332 L286 272" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M164 288 C226 268, 276 238, 314 200 C274 232, 222 260, 180 274" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M180 274 L314 200" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M196 230 C254 205, 300 170, 332 128 C298 162, 250 194, 210 210" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M210 210 L332 128" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M224 170 C270 142, 308 106, 330 68 C304 98, 266 128, 234 148" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M246 112 C280 84, 308 52, 320 18 C300 46, 272 74, 252 92" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
            <path d="M260 58 C280 32, 298 10, 302 0 C292 20, 276 40, 264 50" stroke="currentColor" strokeWidth="1.0" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 3. Bottom-Left: Monstera Watermark (Lower edge below buttons) */}
        <div className="absolute -bottom-14 -left-4 sm:bottom-[-20px] sm:left-[2%] w-52 h-64 sm:w-64 sm:h-76 text-salon-rose-dark opacity-[0.18] -rotate-[14deg]">
          <svg viewBox="0 0 280 340" fill="none" className="w-full h-full">
            <path
              d="M140 330 C138 270, 139 160, 140 25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M140 25
                 C160 30, 185 45, 210 70
                 C190 82, 170 85, 155 82
                 C175 95, 215 105, 235 130
                 C208 138, 185 132, 168 126
                 C192 145, 232 165, 245 200
                 C218 202, 195 190, 178 180
                 C200 205, 228 238, 220 270
                 C205 285, 180 288, 162 278
                 C170 295, 162 315, 140 325
                 C118 315, 110 295, 118 278
                 C100 288, 75 285, 60 270
                 C52 238, 80 205, 102 180
                 C85 190, 62 202, 35 200
                 C48 165, 88 145, 112 126
                 C95 132, 72 138, 45 130
                 C65 105, 105 95, 125 82
                 C110 85, 90 82, 70 70
                 C95 45, 120 30, 140 25 Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M152 105 C158 100, 162 106, 160 115 C156 122, 150 118, 152 105 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M128 105 C122 100, 118 106, 120 115 C124 122, 130 118, 128 105 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M155 152 C164 146, 170 155, 166 168 C160 178, 152 170, 155 152 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M125 152 C116 146, 110 155, 114 168 C120 178, 128 170, 125 152 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M152 215 C160 208, 166 218, 162 230 C156 238, 148 230, 152 215 Z" stroke="currentColor" strokeWidth="0.8" />
            <path d="M128 215 C120 208, 114 218, 118 230 C124 238, 132 230, 128 215 Z" stroke="currentColor" strokeWidth="0.8" />

            <path d="M140 75 C165 78, 190 75, 210 70" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 75 C115 78, 90 75, 70 70" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 120 C175 125, 205 125, 235 130" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 120 C105 125, 75 125, 45 130" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 175 C180 180, 215 188, 245 200" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 175 C100 180, 65 188, 35 200" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 235 C170 245, 195 255, 220 270" stroke="currentColor" strokeWidth="0.8" />
            <path d="M140 235 C110 245, 85 255, 60 270" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>

        {/* 4. Bottom-Right: Soft Peony Foliage Sprig (Bottom corner) */}
        <div className="absolute -bottom-8 -right-6 sm:bottom-0 sm:right-2 w-56 h-56 sm:w-72 sm:h-72 text-salon-rose-dark opacity-[0.20] rotate-[-18deg]">
          <svg viewBox="0 0 280 280" fill="none" className="w-full h-full">
            <path d="M250 250 C180 170, 120 110, 30 50" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M205 205 C185 180, 170 168, 150 162" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M150 162
                 C128 138, 105 136, 85 142
                 C82 165, 102 185, 125 192
                 C135 190, 145 178, 150 162 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M150 162 C125 152, 105 146, 85 142" stroke="currentColor" strokeWidth="0.7" />
            <path d="M210 215 C218 190, 230 175, 245 165" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M245 165
                 C262 142, 280 140, 292 148
                 C290 170, 272 188, 252 192
                 C248 182, 246 172, 245 165 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M245 165 C264 158, 280 152, 292 148" stroke="currentColor" strokeWidth="0.7" />
            <path d="M152 145 C132 122, 120 112, 102 105" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M102 105
                 C80 84, 60 85, 45 92
                 C46 112, 65 128, 86 132
                 C94 126, 100 116, 102 105 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M102 105 C80 98, 62 94, 45 92" stroke="currentColor" strokeWidth="0.7" />
            <path d="M160 155 C175 135, 190 122, 205 115" stroke="currentColor" strokeWidth="0.9" />
            <path
              d="M205 115
                 C225 95, 245 96, 258 104
                 C255 124, 238 138, 218 140
                 C212 130, 208 122, 205 115 Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M205 115 C226 110, 244 106, 258 104" stroke="currentColor" strokeWidth="0.7" />
            <path d="M30 50 C18 36, 10 24, 12 18 C20 18, 28 28, 30 50 Z" stroke="currentColor" strokeWidth="1.1" />
            <path d="M30 50 L12 18" stroke="currentColor" strokeWidth="0.6" />
          </svg>
        </div>
      </div>

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
              <span className="hero-heading-line block opacity-0">Look good.</span>
              <span className="hero-heading-line block opacity-0">
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
                  <span>Book Appointment</span>
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
                  <span>View Services</span>
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
