import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brandCategories } from '../../data/brandsData';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Scissors, 
  Award,
  ArrowRight
} from 'lucide-react';
import BotanicalLeaves from '../common/BotanicalLeaves';

export default function BrandsShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const activeCategory = brandCategories[activeTab];

  // Check scroll boundary
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -290 : 290;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // Icon mapping for tabs
  const getTabIcon = (iconName) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors className="w-3.5 h-3.5" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      default:
        return <Award className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-salon-blush border-y border-salon-babypink/60 relative overflow-hidden">
      {/* Background Botanical Leaves */}
      <BotanicalLeaves variant="corners" />

      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-salon-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-salon-rose/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-salon-gold-dark font-semibold block mb-2">
            CERTIFIED CLINICAL QUALITY
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold text-salon-maroon tracking-tight leading-tight mb-2.5">
            Professional Product Brands
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-salon-gold to-salon-gold-light mx-auto mb-3"></div>
        </div>

        {/* Categories Bar - Single-Line Horizontal Scroll on Mobile (Zero Stacking!) */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 sm:justify-center flex-nowrap">
            {brandCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`shrink-0 px-3.5 sm:px-5 py-2 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 sm:gap-2 select-none cursor-pointer ${
                  activeTab === idx
                    ? 'bg-salon-maroon text-salon-gold-light border border-salon-gold shadow-luxury scale-[1.02]'
                    : 'bg-white/80 backdrop-blur-sm text-salon-text/75 hover:text-salon-maroon hover:bg-white border border-salon-babypink shadow-sm'
                }`}
              >
                <span className={activeTab === idx ? 'text-salon-gold' : 'text-salon-gold-dark'}>
                  {getTabIcon(cat.iconName)}
                </span>
                <span>{cat.shortName}</span>
                <span className={`text-[9.5px] font-sans font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === idx
                    ? 'bg-salon-gold/25 text-salon-gold-light border border-salon-gold/30'
                    : 'bg-salon-babypink/70 text-salon-maroon'
                }`}>
                  {cat.brands.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Header Sub-Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-salon-maroon leading-tight">
              {activeCategory.category}
            </h3>
            <p className="text-[11px] text-salon-text/65 font-sans font-light hidden sm:block">
              {activeCategory.subtitle} • <span className="font-medium text-salon-gold-dark">{activeCategory.brands.length} Formulations</span>
            </p>
          </div>

          {/* Desktop Left / Right Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll brands left"
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-white hover:bg-salon-maroon hover:text-white text-salon-maroon border-salon-gold/40 shadow-sm cursor-pointer'
                  : 'bg-white/40 text-salon-text/30 border-salon-babypink cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll brands right"
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200 ${
                canScrollRight
                  ? 'bg-white hover:bg-salon-maroon hover:text-white text-salon-maroon border-salon-gold/40 shadow-sm cursor-pointer'
                  : 'bg-white/40 text-salon-text/30 border-salon-babypink cursor-not-allowed opacity-40'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track - Modern Luxury Brand Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pt-1 px-1 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {activeCategory.brands.map((b, i) => (
            <Link
              key={i}
              to="/services"
              className="w-[235px] sm:w-[275px] shrink-0 snap-start bg-gradient-to-b from-white via-white/95 to-[#FFF7FA] rounded-2xl p-5 border border-salon-gold/30 hover:border-salon-gold shadow-sm hover:shadow-luxury-lg transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 relative overflow-hidden select-none block"
            >
              {/* Luxury Gold Top Foil Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-salon-gold/50 to-transparent group-hover:via-salon-gold transition-colors duration-500"></div>

              {/* Subtle Ambient Radial Glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-salon-gold/15 rounded-full blur-2xl group-hover:bg-salon-gold/30 transition-all duration-500 pointer-events-none"></div>

              <div>
                {/* Top Row: Luxury Monogram Crest & Index Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A030D] via-[#2A0617] to-salon-maroon text-salon-gold font-cinzel font-bold text-sm tracking-wider flex items-center justify-center shadow-md border border-salon-gold/40 ring-1 ring-salon-gold/25 ring-offset-2 ring-offset-white group-hover:scale-105 group-hover:border-salon-gold group-hover:shadow-gold-glow transition-all duration-300 shrink-0">
                    {b.initials}
                  </div>

                  <span className="font-cinzel text-xs font-semibold tracking-widest text-salon-gold/70 group-hover:text-salon-gold transition-colors">
                    0{i + 1}
                  </span>
                </div>

                {/* Specialty Pill Tag */}
                <div className="mb-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.16em] font-cinzel font-bold text-salon-gold-dark bg-salon-gold/10 border border-salon-gold/25 group-hover:bg-salon-gold/20 transition-colors line-clamp-1">
                    {b.tag}
                  </span>
                </div>

                {/* Brand Name */}
                <h4 className="font-cinzel text-[16px] sm:text-[17.5px] font-bold text-salon-maroon group-hover:text-salon-maroon-deep transition-colors line-clamp-1 leading-snug">
                  {b.name}
                </h4>

                {/* Concise Formulation Description */}
                {b.desc && (
                  <p className="text-[11.5px] font-sans text-salon-text/75 font-light mt-2 leading-relaxed line-clamp-2">
                    {b.desc}
                  </p>
                )}
              </div>

              {/* Modern Action Footer */}
              <div className="pt-3 mt-4 border-t border-salon-babypink/70 flex items-center justify-between text-[11px] font-cinzel font-semibold tracking-wider text-salon-maroon group-hover:text-salon-gold-dark transition-colors">
                <span>View Treatments</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-salon-gold-dark" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 text-[10px] font-cinzel text-salon-text/50 pt-1">
          <span>← Swipe horizontally to explore all {activeCategory.brands.length} brands →</span>
        </div>

      </div>
    </section>
  );
}
