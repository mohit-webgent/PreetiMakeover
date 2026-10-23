import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Reusable Matisse-style Abstract Continuous Line-Art Face with Organic Blobs
function FaceArtSvg({ className = "w-full h-full" }) {
  return (
    <svg
      viewBox="0 0 500 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blob 1: Top-Left Warm Ochre / Peach */}
      <path
        d="M100 30 C190 -10, 230 80, 215 190 C200 290, 120 330, 60 260 C0 180, 10 70, 100 30 Z"
        fill="#F2AA72"
      />

      {/* Blob 2: Center-Right Warm Terracotta / Coral */}
      <path
        d="M200 160 C320 120, 420 190, 395 300 C370 410, 270 440, 190 370 C130 300, 120 200, 200 160 Z"
        fill="#EB6E4B"
      />

      {/* Blob 3: Bottom-Left Dusky Rose / Earthy Clay */}
      <path
        d="M40 330 C130 290, 230 340, 240 435 C250 530, 140 550, 45 500 C-35 450, -30 370, 40 330 Z"
        fill="#B07565"
      />

      {/* Black Continuous Line-Art Face */}
      {/* Upper Eyelid / Brow Arch */}
      <path
        d="M100 135 C130 110, 165 118, 185 145"
        stroke="#14020A"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Eye Crease / Lash curve */}
      <path
        d="M115 158 C135 172, 160 168, 175 148"
        stroke="#14020A"
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* Elegant Continuous Profile Line (Forehead -> Nose Bridge -> Tip -> Nostril) */}
      <path
        d="M185 70 C182 150, 208 240, 198 298 C192 318, 205 332, 222 328 C238 322, 246 308, 238 290 C232 280, 218 280, 218 290"
        stroke="#14020A"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bold Outer Cheek and Jawline Sweep down to Chin */}
      <path
        d="M50 205 C40 320, 46 425, 110 480 C160 525, 235 515, 285 435 C310 395, 335 425, 350 455"
        stroke="#14020A"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Signature Beauty Spots / Freckles on cheek */}
      <circle cx="85" cy="290" r="5" fill="#14020A" />
      <circle cx="115" cy="275" r="5.5" fill="#14020A" />
      <circle cx="138" cy="265" r="4.5" fill="#14020A" />
      <circle cx="148" cy="290" r="5" fill="#14020A" />
      <circle cx="105" cy="305" r="4" fill="#14020A" />

      {/* Full Sensual Lips */}
      {/* Upper Lip Contour with Cupid's Bow */}
      <path
        d="M135 375 C158 355, 175 365, 185 375 C195 365, 212 355, 245 380"
        stroke="#14020A"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mouth Parting Line */}
      <path
        d="M135 375 C168 395, 210 395, 245 380"
        stroke="#14020A"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Lower Lip Contour */}
      <path
        d="M142 380 C165 432, 215 432, 238 380"
        stroke="#14020A"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Salon Woman Silhouette Logo
function WomanSilhouetteLogo({ className = "w-16 h-12 text-salon-maroon" }) {
  return (
    <svg
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M32 18 C38 12, 48 10, 56 12 C64 14, 70 20, 72 26 C75 22, 80 20, 86 21 C92 22, 98 26, 96 32 C93 36, 86 38, 80 37 C85 41, 88 47, 85 52 C81 57, 72 56, 68 50 C66 54, 62 58, 56 59 C54 53, 55 46, 52 42 C50 44, 48 48, 45 49 C42 45, 43 38, 44 32 C41 34, 38 36, 35 35 C38 31, 41 27, 45 25 C40 26, 34 27, 28 26 C22 25, 17 21, 20 18 C23 15, 28 17, 32 18 Z"
        fill="currentColor"
      />
      <path
        d="M52 26 C54 28, 57 29, 60 29 C63 29, 65 27, 66 25 C64 24, 61 24, 58 24 C55 24, 53 25, 52 26 Z"
        fill="white"
      />
      <path
        d="M62 31 C63 32, 65 33, 67 33 C68 33, 67 31, 65 31 Z"
        fill="white"
      />
    </svg>
  );
}

export default function TestimonialsSection({ testimonials = [] }) {
  // Curated authentic reviews (fallback + reference styling)
  const defaultTestimonials = [
    {
      id: '1',
      clientName: 'Lorraine Toledo',
      serviceName: 'Hair Rejuvenation & Styling',
      rating: 5,
      reviewText: "Best salon I've ever been to, awesome shampoo and the stylist is not only professional, quality beautician but a wonderful person. Bravo!"
    },
    {
      id: '2',
      clientName: 'Pooja Sharma',
      serviceName: 'Royal HD Bridal Makeover',
      rating: 5,
      reviewText: "Preeti di gave me my dream bridal look! The HD makeup stayed completely fresh and radiant for 14+ hours through all rituals. Everyone kept asking where I got my makeup done."
    },
    {
      id: '3',
      clientName: 'Ananya Roy',
      serviceName: 'Casmara Luxury Golden Glow',
      rating: 5,
      reviewText: "The hygiene standards and personalized skin diagnosis here are exceptional. Sealed authentic products, gentle hands, and noticeable instant radiance. Truly 5-star experience!"
    },
    {
      id: '4',
      clientName: 'Sneha Mukherjee',
      serviceName: 'Nanoplastia & Hair Botoplex',
      rating: 5,
      reviewText: "Transformed my dry, frizzy hair into silky, glossy locks without any harsh chemical fumes. Preeti explained every single step with such patience. My hair has never felt healthier!"
    },
    {
      id: '5',
      clientName: 'Riya Sengupta',
      serviceName: 'Signature Hydra Facial & Care',
      rating: 5,
      reviewText: "From pain-free gentle waxing to the most soothing hydrating facial massage, Preeti Makeover is unmatched in hygiene and care. Love visiting every month!"
    }
  ];

  // Use props if provided and non-empty, otherwise use default reviews
  const reviewsList = Array.isArray(testimonials) && testimonials.length > 0
    ? testimonials
    : defaultTestimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play: Rotate testimonials continuously every 4.5 seconds
  useEffect(() => {
    if (isPaused || reviewsList.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 250);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, reviewsList.length]);

  // Manual navigation handlers
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 250);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 250);
  };

  const activeReview = reviewsList[currentIndex] || reviewsList[0];

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-salon-blush/40 relative overflow-hidden border-t border-salon-babypink/60">

      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-salon-babypink/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-salon-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Section Container with wider max-width for large screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Customer-friendly Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-salon-gold font-bold block mb-2">
            HEARTFELT EXPERIENCES • REAL STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-salon-maroon tracking-tight mb-4">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Artistic Editorial Testimonial Card */}
        {/* Wider on larger screens: max-w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="max-w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white rounded-3xl shadow-luxury-lg border border-salon-gold/25 p-5 sm:p-8 md:p-10 lg:p-12 relative transition-all duration-300 group overflow-hidden"
        >

          {/* Subtle Live Auto-rotate Pulse badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-salon-maroon/50 bg-salon-blush/60 px-2.5 py-1 rounded-full border border-salon-gold/20 select-none z-20">
            <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
            <span className="hidden sm:inline">{isPaused ? 'Paused' : 'Auto Playing'}</span>
          </div>

          {/* Faint luxury background watermark on mobile only */}
          <div className="absolute -right-10 -bottom-10 w-56 h-56 opacity-10 pointer-events-none md:hidden select-none">
            <FaceArtSvg />
          </div>

          {/* Mobile Screen Header: Feedback First! Logo + Salon Name + Stars */}
          <div className="flex md:hidden items-center justify-between border-b border-salon-gold/20 pb-3.5 mb-5 relative z-10 pr-20">
            <div className="flex items-center gap-3">
              {/* Mini Artistic Face Emblem */}
              <div className="w-12 h-12 rounded-2xl bg-salon-blush/60 border border-salon-gold/30 p-1 flex-shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
                <FaceArtSvg className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-salon-maroon leading-tight">
                  Preeti Makeover
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-salon-maroon/60 font-medium block">
                  Beauty Salon & Studio
                </span>
              </div>
            </div>
          </div>

          {/* Grid Layout for Tablet and Large Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 xl:gap-16 items-center relative z-10">

            {/* Left Column on Desktop (hidden on mobile, visible md:flex) */}
            {/* Shows full grand artistic Matisse face illustration */}
            <div className="hidden md:flex md:col-span-5 items-center justify-center relative">
              <div className="w-full max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] aspect-square relative select-none flex items-center justify-center">
                <FaceArtSvg className="w-full h-full object-contain filter drop-shadow-sm" />
              </div>
            </div>

            {/* Right Column: Editorial Salon Branding & Client Review */}
            <div className="md:col-span-7 flex flex-col items-center text-center px-1 sm:px-4 lg:px-6">

              {/* Desktop Salon Logo Emblem (Hidden on mobile since mobile has compact top bar) */}
              <div className="hidden md:flex mb-3 flex-col items-center">
                <WomanSilhouetteLogo className="w-16 h-12 lg:w-20 lg:h-14 text-salon-maroon" />

                {/* Salon Name in Editorial Serif */}
                <h3 className="font-serif text-xl lg:text-2xl xl:text-3xl font-bold text-salon-maroon tracking-wide mt-1">
                  Preeti Makeover
                </h3>
                <span className="text-[11px] lg:text-xs uppercase tracking-[0.25em] text-salon-maroon/60 font-medium">
                  Beauty Salon & Studio
                </span>
              </div>

              {/* Decorative Opening Quote '66' */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-salon-maroon/80 select-none leading-none my-1">
                <svg
                  viewBox="0 0 40 30"
                  fill="currentColor"
                  className="w-7 h-5 sm:w-8 sm:h-6 lg:w-10 lg:h-7 text-salon-maroon inline-block"
                >
                  <path d="M12 4 C6 4, 2 8, 2 15 C2 21, 6 25, 12 25 C17 25, 20 21, 20 17 C20 12, 17 8, 12 8 C11 8, 10 8.2, 9 8.6 C10 6 12 5.5, 15 5.5 L15 4 Z" />
                  <path d="M32 4 C26 4, 22 8, 22 15 C22 21, 26 25, 32 25 C37 25, 40 21, 40 17 C40 12, 37 8, 32 8 C31 8, 30 8.2, 29 8.6 C30 6 32 5.5, 35 5.5 L35 4 Z" />
                </svg>
              </div>

              {/* Review Quote Body with smooth transition */}
              <div className="min-h-[100px] sm:min-h-[120px] lg:min-h-[130px] flex items-center justify-center my-1">
                <p
                  className={`text-base sm:text-lg lg:text-xl xl:text-[22px] text-salon-maroon/90 italic font-serif leading-relaxed px-1 sm:px-4 lg:px-8 transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'
                    }`}
                >
                  “{activeReview.reviewText}”
                </p>
              </div>

              {/* Decorative Closing Quote '99' */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-salon-maroon/80 select-none leading-none my-1">
                <svg
                  viewBox="0 0 40 30"
                  fill="currentColor"
                  className="w-7 h-5 sm:w-8 sm:h-6 lg:w-10 lg:h-7 text-salon-maroon inline-block"
                >
                  <path d="M10 26 C16 26, 20 22, 20 15 C20 9, 16 5, 10 5 C5 5, 2 9, 2 13 C2 18, 5 22, 10 22 C11 22, 12 21.8, 13 21.4 C12 24, 10 24.5, 7 24.5 L7 26 Z" />
                  <path d="M30 26 C36 26, 40 22, 40 15 C40 9, 36 5, 30 5 C25 5, 22 9, 22 13 C22 18, 25 22, 30 22 C31 22, 32 21.8, 33 21.4 C32 24, 30 24.5, 27 24.5 L27 26 Z" />
                </svg>
              </div>

              {/* Author / Client Info with smooth transition */}
              <div className={`mt-3 sm:mt-4 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                <h4 className="font-serif font-bold text-base sm:text-lg lg:text-xl text-salon-maroon tracking-wide">
                  {activeReview.clientName}
                </h4>
                {activeReview.serviceName && (
                  <span className="text-xs lg:text-sm text-salon-gold font-medium block mt-0.5">
                    {activeReview.serviceName}
                  </span>
                )}
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1 mt-2 text-salon-gold">
                  {[...Array(activeReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-salon-gold text-salon-gold" />
                  ))}
                </div>
              </div>

              {/* Review Switcher Controls (Arrows + Dots) */}
              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-salon-gold/40 hover:border-salon-gold bg-salon-blush/30 hover:bg-salon-gold hover:text-white text-salon-maroon flex items-center justify-center transition-all shadow-sm active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-2">
                  {reviewsList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (currentIndex === idx) return;
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentIndex(idx);
                          setIsAnimating(false);
                        }, 250);
                      }}
                      aria-label={`Go to review ${idx + 1}`}
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${currentIndex === idx
                        ? 'w-7 sm:w-8 bg-salon-maroon'
                        : 'w-2 sm:w-2.5 bg-salon-gold/40 hover:bg-salon-gold'
                        }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-salon-gold/40 hover:border-salon-gold bg-salon-blush/30 hover:bg-salon-gold hover:text-white text-salon-maroon flex items-center justify-center transition-all shadow-sm active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
