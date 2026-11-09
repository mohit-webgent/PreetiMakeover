import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Sparkles, 
  Clock, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calendar,
  MessageCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Info,
  X,
  SlidersHorizontal,
  Flame,
  Check,
  Star,
  ExternalLink,
  PhoneCall,
  Crown
} from 'lucide-react';

// Category Editorial Imagery and Highlights mapping
const CATEGORY_META = {
  'hair-care-treatments': {
    image: '/signature-hair.jpg',
    tag: 'L’Oréal • Matrix • Schwarzkopf',
    highlight: 'Advanced smoothing, keratin restructuring & mirror-shine texturing'
  },
  'skin-care-facials': {
    image: '/signature-facial.jpg',
    tag: 'Casmara Spain • Kanpeki • O3+',
    highlight: 'Dermatological peel-off algae masks, oxygen therapy & radiant dermal care'
  },
  'bridal-occasion-makeover': {
    image: '/signature-bridal.jpg',
    tag: 'Waterproof HD • Designer Draping',
    highlight: 'Signature bridal glamour, airbrush finishes & royal bridal styling'
  },
  'waxing-grooming': {
    image: '/signature-waxing.jpg',
    tag: 'Italian Rica • Colophony-Free',
    highlight: '98% natural origin gentle waxing, body polishing & velvet smoothness'
  },
  'nails-manicure-pedicure': {
    image: '/gallery-nails.jpg',
    tag: 'Precision Gel • Spa Care',
    highlight: 'Luxury manicure, botanical pedicure & bespoke nail artistry'
  }
};

// Fallback helper for category meta
const getCategoryMeta = (slug = '') => {
  if (slug.includes('hair')) return CATEGORY_META['hair-care-treatments'];
  if (slug.includes('skin') || slug.includes('facial')) return CATEGORY_META['skin-care-facials'];
  if (slug.includes('bridal') || slug.includes('makeover')) return CATEGORY_META['bridal-occasion-makeover'];
  if (slug.includes('wax')) return CATEGORY_META['waxing-grooming'];
  if (slug.includes('nail') || slug.includes('pedicure')) return CATEGORY_META['nails-manicure-pedicure'];
  return {
    image: '/signature-bridal.jpg',
    tag: 'Preeti Makeover Signature',
    highlight: 'Bespoke international salon treatments and therapeutic care'
  };
};

export default function ServicesPage({ categories = [], loading = false, error = null, onSelectService }) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [activeModalService, setActiveModalService] = useState(null);
  
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle individual category accordion
  const toggleCategory = (slug) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  // Expand or collapse all categories
  const toggleAllCategories = () => {
    const allCollapsed = categories.every(cat => collapsedCategories[cat.slug]);
    const newState = {};
    categories.forEach(cat => {
      newState[cat.slug] = !allCollapsed;
    });
    setCollapsedCategories(newState);
  };

  // Filtered categories and services
  const filteredData = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    let result = categories;

    // Filter by category slug if not 'all'
    if (selectedCategorySlug !== 'all') {
      result = result.filter(c => c.slug === selectedCategorySlug);
    }

    // Filter by search query or featured flag
    result = result.map(cat => {
      let svcs = cat.services || [];
      
      if (onlyFeatured) {
        svcs = svcs.filter(s => s.isFeatured);
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        svcs = svcs.filter(s => 
          s.name.toLowerCase().includes(q) || 
          (s.description && s.description.toLowerCase().includes(q))
        );
      }

      return {
        ...cat,
        services: svcs
      };
    }).filter(cat => cat.services && cat.services.length > 0);

    return result;
  }, [categories, selectedCategorySlug, searchQuery, onlyFeatured]);

  // Total services count
  const totalServicesCount = useMemo(() => {
    return categories.reduce((acc, cat) => acc + (cat.services?.length || 0), 0);
  }, [categories]);

  // Featured count
  const featuredCount = useMemo(() => {
    return categories.reduce((acc, cat) => 
      acc + (cat.services?.filter(s => s.isFeatured)?.length || 0), 0
    );
  }, [categories]);

  const handleBookService = (service) => {
    if (onSelectService) {
      onSelectService(service);
    }
    navigate('/contact', { state: { preselectedService: service.name, serviceId: service.id } });
  };

  const handleWhatsAppConsult = (service) => {
    const text = encodeURIComponent(`Hello Preeti Makeover, I would like to consult about the "${service.name}" treatment.`);
    window.open(`https://wa.me/918810359438?text=${text}`, '_blank');
  };

  // Smooth scroll or jump to category
  const handleCategoryNav = (slug) => {
    setSelectedCategorySlug(slug);
    if (slug === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Ensure category is uncollapsed
      setCollapsedCategories(prev => ({ ...prev, [slug]: false }));
      setTimeout(() => {
        const el = document.getElementById(`cat-${slug}`);
        if (el) {
          const navOffset = 150;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  };

  // Quick search pill click handler
  const handleQuickTagClick = (tag) => {
    setSearchQuery(tag);
    setSelectedCategorySlug('all');
  };

  return (
    <div className="pt-20 sm:pt-24 pb-36 min-h-screen text-[#5A1745] selection:bg-salon-gold/30 selection:text-salon-maroon">
      
      {/* 1. ULTRA-LUXURY EDITORIAL HERO BANNER */}
      <div className="page-hero !pt-10 sm:!pt-14">
        
        {/* Ambient Glows & Architectural Lines */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-salon-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-salon-rose/20 rounded-full blur-3xl pointer-events-none" />
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-salon-gold to-transparent absolute top-0 left-0 opacity-80" />

        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 relative z-10">
          
          {/* High-Contrast Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#4A2A3E] font-semibold mb-6 tracking-wide" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-salon-maroon transition-colors">Home</Link>
            <span className="text-salon-gold-dark/80">/</span>
            <span className="text-salon-maroon font-bold">Services & Treatments</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-salon-maroon/20 text-salon-maroon text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-2xs">
                <Crown className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>Haute Coiffure & Aesthetics • {totalServicesCount || 27} Therapies</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-salon-maroon tracking-tight leading-[1.12]">
                Bespoke Beauty, Hair <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-salon-maroon via-salon-maroon-light to-salon-gold-dark bg-clip-text text-transparent">
                  & Therapeutic Care
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#4A2A3E] font-normal leading-relaxed max-w-xl">
                Personalized consultations and clinical craftsmanship by <strong className="font-semibold text-salon-maroon">Preeti Mandal</strong>. Every treatment is prepared using genuine formulations from international dermatological & haircare leaders.
              </p>

              {/* Quick Search Tag Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#7A5A6E] font-semibold">Popular:</span>
                {['Keratin', 'Casmara Facial', 'Bridal HD', 'Nanoplastia', 'Rica Waxing', 'Hair Botox'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-salon-maroon hover:text-white border border-salon-babypink text-salon-maroon text-[11px] font-semibold transition-all cursor-pointer shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column: Key Trust Matrix Bento Box */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-salon-babypink shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-salon-babypink/80 text-salon-maroon flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-5 h-5 text-salon-gold-dark" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-salon-maroon">100%</div>
                <div className="text-xs text-[#4A2A3E] font-medium mt-0.5">Original Sealed Brands</div>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-salon-babypink shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-salon-babypink/80 text-salon-maroon flex items-center justify-center mb-2.5">
                  <Sparkles className="w-5 h-5 text-salon-gold-dark" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-salon-maroon">{totalServicesCount || 27}+</div>
                <div className="text-xs text-[#4A2A3E] font-medium mt-0.5">Signature Therapies</div>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-salon-babypink shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-salon-babypink/80 text-salon-maroon flex items-center justify-center mb-2.5">
                  <Star className="w-5 h-5 text-salon-gold-dark fill-salon-gold-dark" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-salon-maroon">4.9 / 5.0</div>
                <div className="text-xs text-[#4A2A3E] font-medium mt-0.5">Verified Client Reviews</div>
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-salon-babypink shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-salon-babypink/80 text-salon-maroon flex items-center justify-center mb-2.5">
                  <Clock className="w-5 h-5 text-salon-gold-dark" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif text-salon-maroon">Tue Off</div>
                <div className="text-xs text-[#4A2A3E] font-medium mt-0.5">Weekly Sanitization Day</div>
              </div>

            </div>

          </div>

          {/* Integrated Search Input & View Controls Bar */}
          <div className="mt-8 pt-6 border-t border-salon-babypink/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full max-w-xl group">
              <Search className="w-5 h-5 text-salon-maroon absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-salon-gold-dark transition-colors" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search any service e.g. Keratin, Casmara, Bridal, Bleach..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-2xl text-sm bg-white border border-salon-rose/30 focus:border-salon-maroon focus:ring-2 focus:ring-salon-gold/30 text-[#3A0D2C] placeholder:text-[#7A5A6E] font-medium shadow-2xs transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-salon-babypink text-salon-maroon hover:bg-salon-maroon hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Controls: Featured Filter & Accordions Master Toggle */}
            <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
              
              <button
                onClick={() => setOnlyFeatured(!onlyFeatured)}
                className={`min-h-[46px] px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                  onlyFeatured
                    ? 'bg-salon-maroon text-salon-gold border-salon-gold/60 shadow-sm'
                    : 'bg-white/90 text-[#30232A] hover:bg-white border-salon-babypink'
                }`}
              >
                <Flame className={`w-4 h-4 ${onlyFeatured ? 'text-salon-gold fill-salon-gold' : 'text-salon-gold-dark'}`} />
                <span>Featured Only ({featuredCount})</span>
              </button>

              <button
                onClick={toggleAllCategories}
                className="min-h-[46px] px-4 py-2 rounded-2xl text-xs font-bold text-salon-maroon bg-white/90 hover:bg-white border border-salon-babypink transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                title="Expand or collapse all categories"
              >
                <SlidersHorizontal className="w-4 h-4 text-salon-maroon" />
                <span className="hidden sm:inline">Toggle Views</span>
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* 2. STICKY HORIZONTAL SCROLLING CATEGORY CHIPS */}
      <div className="sticky top-[64px] lg:top-[80px] z-30 bg-[#FAF3F6]/95 backdrop-blur-xl border-b border-salon-babypink shadow-[0_4px_20px_rgba(43,23,33,0.06)] py-3 transition-all">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none py-0.5">
            <button
              onClick={() => handleCategoryNav('all')}
              className={`min-h-[44px] px-4.5 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategorySlug === 'all'
                  ? 'bg-salon-maroon text-salon-gold shadow-md ring-2 ring-salon-gold/40'
                  : 'bg-white text-[#5A1745] hover:bg-salon-babypink/70 border border-salon-babypink hover:border-salon-rose/40'
              }`}
            >
              <span>All Treatments</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                selectedCategorySlug === 'all' ? 'bg-salon-gold/25 text-salon-gold' : 'bg-salon-blush text-salon-maroon'
              }`}>
                {totalServicesCount || 27}
              </span>
            </button>

            {categories.map((cat) => {
              const count = cat.services?.length || 0;
              const isSelected = selectedCategorySlug === cat.slug;

              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => handleCategoryNav(cat.slug)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-salon-maroon text-salon-gold shadow-md ring-2 ring-salon-gold/40'
                      : 'bg-white text-[#5A1745] hover:bg-salon-babypink/70 border border-salon-babypink hover:border-salon-rose/40'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-salon-gold/25 text-salon-gold' : 'bg-salon-blush text-salon-maroon'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. BENTO-GRID SERVICE CATEGORIES & CARDS */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 sm:pt-12">
        
        {loading ? (
          <div className="text-center py-28">
            <div className="w-12 h-12 rounded-full border-3 border-salon-gold border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-sm text-salon-maroon font-bold tracking-wide">
              Loading Preeti Makeover catalog...
            </p>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-14 sm:space-y-20">
            {filteredData.map((category) => {
              const isCollapsed = Boolean(collapsedCategories[category.slug]);
              const services = category.services || [];
              const meta = getCategoryMeta(category.slug);

              return (
                <section 
                  key={category.id || category.slug} 
                  id={`cat-${category.slug}`}
                  className="scroll-mt-44 transition-all"
                >
                  
                  {/* Category Visual Bento Header */}
                  <div className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-salon-babypink shadow-2xs mb-5 group">
                    
                    {/* Background subtle watermark & image peek */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden sm:block pointer-events-none overflow-hidden">
                      <img 
                        src={meta.image} 
                        alt={category.name}
                        className="w-full h-full object-cover object-center filter grayscale contrast-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salon-maroon">
                            {category.name}
                          </h2>
                          <span className="text-[11px] font-bold text-salon-maroon bg-salon-babypink/80 px-3 py-0.5 rounded-full border border-salon-rose/30">
                            {services.length} {services.length === 1 ? 'Treatment' : 'Treatments'}
                          </span>
                          <span className="text-[11px] font-bold text-salon-gold-dark bg-[#FFF4F8] px-2.5 py-0.5 rounded-full border border-salon-gold/30">
                            {meta.tag}
                          </span>
                        </div>

                        {category.description && (
                          <p className="text-xs sm:text-sm text-[#4A2A3E] font-normal leading-relaxed">
                            {category.description}
                          </p>
                        )}
                      </div>

                      {/* Expand / Collapse Accordion Button */}
                      <button
                        onClick={() => toggleCategory(category.slug)}
                        className="min-h-[44px] inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-2xl text-xs font-bold text-salon-maroon bg-white hover:bg-salon-babypink/50 border border-salon-babypink shadow-2xs transition-all cursor-pointer shrink-0"
                        aria-expanded={!isCollapsed}
                      >
                        <span>{isCollapsed ? `View ${services.length} Treatments` : 'Collapse Category'}</span>
                        {isCollapsed ? (
                          <ChevronDown className="w-4 h-4 text-salon-maroon" />
                        ) : (
                          <ChevronUp className="w-4 h-4 text-salon-maroon" />
                        )}
                      </button>

                    </div>

                    {/* Single Sticky Category-Level Diagnostic Notice (Completely eliminates repetitive card clutter) */}
                    {!isCollapsed && (
                      <div className="mt-4 pt-3.5 border-t border-salon-babypink/60 flex items-center gap-2.5 text-xs text-[#5A1745] font-medium bg-[#FFF9FB] p-3 rounded-2xl border border-salon-gold/25">
                        <Info className="w-4 h-4 text-salon-gold-dark shrink-0" />
                        <span>
                          <strong>Diagnostic pricing:</strong> Tailored transparently on hair length, density & skin analysis. Exact quote confirmed prior to service start.
                        </span>
                      </div>
                    )}

                  </div>

                  {/* 2-Column Mobile & 3-to-4-Column Desktop Bento-Grid Cards */}
                  {!isCollapsed && (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                      {services.map((service) => (
                        <div
                          key={service.id || service.slug}
                          className={`group relative bg-white/95 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
                            service.isFeatured
                              ? 'border-salon-gold/60 shadow-[0_8px_30px_rgba(229,143,176,0.12)] hover:shadow-luxury hover:border-salon-gold ring-1 ring-salon-gold/20'
                              : 'border-salon-babypink/90 hover:border-salon-rose hover:shadow-md'
                          }`}
                        >
                          
                          {/* Card Content Top */}
                          <div>
                            {/* Badges & Duration Row */}
                            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                              {service.isFeatured ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider bg-salon-maroon text-salon-gold border border-salon-gold/40 shadow-2xs">
                                  <Sparkles className="w-2.5 h-2.5 text-salon-gold" />
                                  <span>Featured</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-[#B0507A] uppercase tracking-wider">
                                  <CheckCircle2 className="w-2.5 h-2.5 text-salon-gold-dark" />
                                  <span>Certified</span>
                                </span>
                              )}

                              {service.durationMinutes && (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#5A1745] bg-[#FAF2F6] px-2 py-0.5 rounded-full border border-salon-maroon/15 shadow-2xs">
                                  <Clock className="w-3 h-3 text-salon-gold-dark shrink-0" />
                                  <span>{service.durationMinutes}m</span>
                                </span>
                              )}
                            </div>

                            {/* Service Title */}
                            <h3 
                              onClick={() => setActiveModalService(service)}
                              className="font-serif text-sm sm:text-base font-bold text-salon-maroon mb-1.5 group-hover:text-salon-gold-dark transition-colors leading-snug line-clamp-2 cursor-pointer"
                              title="Click to view treatment details"
                            >
                              {service.name}
                            </h3>

                            {/* Service Description */}
                            {service.description && (
                              <p className="text-[11.5px] sm:text-xs text-[#4A2A3E] font-normal leading-relaxed line-clamp-3 sm:line-clamp-4 mb-3">
                                {service.description}
                              </p>
                            )}
                          </div>

                          {/* Card Action & Price Row (No repeated strings, clear touch target) */}
                          <div className="pt-3 border-t border-salon-babypink/60 mt-2 space-y-2.5">
                            
                            <div className="flex items-center justify-between">
                              {service.startingPrice ? (
                                <div className="flex flex-col">
                                  <span className="text-[9px] uppercase tracking-wider text-[#7A5A6E] font-bold">Starts From</span>
                                  <span className="text-xs sm:text-sm font-bold text-salon-maroon">₹{service.startingPrice}</span>
                                </div>
                              ) : (
                                <span className="text-[10px] sm:text-[11px] font-semibold text-salon-maroon/90">
                                  Diagnostic Plan
                                </span>
                              )}

                              {/* View Detail Link */}
                              <button
                                onClick={() => setActiveModalService(service)}
                                className="text-[11px] font-bold text-salon-maroon hover:text-salon-gold-dark transition-colors cursor-pointer"
                              >
                                View Details →
                              </button>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              <button
                                onClick={() => handleBookService(service)}
                                className="min-h-[38px] sm:min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-salon-maroon hover:bg-salon-maroon-deep active:scale-95 transition-all shadow-sm cursor-pointer"
                                aria-label={`Book ${service.name}`}
                              >
                                <Calendar className="w-3.5 h-3.5 text-salon-gold shrink-0" />
                                <span>Book</span>
                              </button>

                              <button
                                onClick={() => handleWhatsAppConsult(service)}
                                className="min-h-[38px] sm:min-h-[42px] inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 active:scale-95 transition-all cursor-pointer"
                                aria-label={`Consult on WhatsApp for ${service.name}`}
                              >
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="hidden sm:inline">Enquire</span>
                                <span className="sm:hidden">Chat</span>
                              </button>
                            </div>

                          </div>

                        </div>
                      ))}
                    </div>
                  )}

                </section>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto border border-salon-babypink shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center mx-auto shadow-sm">
              <Scissors className="w-7 h-7 text-salon-gold-dark" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-salon-maroon">
              No matching therapies found
            </h3>
            <p className="text-xs sm:text-sm text-[#4A2A3E] leading-relaxed">
              We couldn't find any treatments matching <strong className="text-salon-maroon">"{searchQuery}"</strong>. Try checking popular therapies like Keratin, Casmara, Facial, or Bridal.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategorySlug('all'); setOnlyFeatured(false); }}
              className="min-h-[44px] px-6 py-2.5 rounded-full text-xs font-bold text-salon-maroon bg-salon-babypink hover:bg-salon-babypink-hover border border-salon-rose/40 cursor-pointer transition-all active:scale-95"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* 4. CLINICAL SAFETY & HYGIENE COMMITMENT BENTO BAR */}
        <div className="mt-16 sm:mt-24 rounded-3xl bg-white/90 backdrop-blur-md p-6 sm:p-10 border border-salon-babypink shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0 shadow-2xs">
              <Award className="w-5 h-5 text-salon-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-salon-maroon">Genuine Brand Formulations</h4>
              <p className="text-xs text-[#4A2A3E] font-normal mt-1 leading-relaxed">
                Zero duplicates or loose mixtures. Every Casmara mask, L’Oréal tube, and Rica wax can is unsealed fresh in your presence.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-salon-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-salon-maroon">Medical-Grade Sanitization</h4>
              <p className="text-xs text-[#4A2A3E] font-normal mt-1 leading-relaxed">
                Scissors, combs, brushes, and threading tools undergo hospital-grade sterilization and UV treatment between each guest.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-5 h-5 text-salon-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-salon-maroon">Tuesday Deep Maintenance</h4>
              <p className="text-xs text-[#4A2A3E] font-normal mt-1 leading-relaxed">
                Our studio remains strictly closed every Tuesday for comprehensive inventory sanitization and protocol audits.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 5. INTERACTIVE SERVICE DETAIL MODAL */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-salon-gold/40 shadow-2xl relative space-y-5 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-salon-babypink/60 hover:bg-salon-maroon hover:text-white flex items-center justify-center text-salon-maroon transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {activeModalService.isFeatured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-salon-maroon text-salon-gold">
                    <Sparkles className="w-3 h-3 text-salon-gold" />
                    <span>Featured Experience</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#B0507A] uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-salon-gold-dark" />
                    <span>Certified Salon Service</span>
                  </span>
                )}

                {activeModalService.durationMinutes && (
                  <span className="text-[11px] font-bold text-salon-maroon bg-salon-babypink px-2.5 py-0.5 rounded-full">
                    {activeModalService.durationMinutes} mins duration
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-salon-maroon">
                {activeModalService.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-[#4A2A3E] leading-relaxed">
              {activeModalService.description || 'Customized beauty therapy formulated with international genuine products.'}
            </p>

            {/* Protocol Highlights */}
            <div className="space-y-2 bg-[#FFF9FB] p-4 rounded-2xl border border-salon-babypink">
              <h4 className="text-xs font-bold text-salon-maroon uppercase tracking-wider">Treatment Protocol:</h4>
              <ul className="text-xs text-[#4A2A3E] space-y-1.5 list-disc list-inside">
                <li>One-on-one diagnostic consultation with Preeti Mandal</li>
                <li>Sealed international product freshly unsealed in front of you</li>
                <li>Autoclaved, UV-sanitized salon implements</li>
                <li>Customized post-treatment aftercare regimen guidance</li>
              </ul>
            </div>

            {/* Pricing note */}
            <div className="flex items-center justify-between text-xs border-t border-salon-babypink pt-3">
              <span className="font-bold text-[#7A5A6E]">Pricing Policy</span>
              <span className="font-bold text-salon-maroon">
                {activeModalService.startingPrice ? `Starting from ₹${activeModalService.startingPrice}` : 'Personalized Consultation Rate'}
              </span>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  handleBookService(s);
                }}
                className="min-h-[46px] w-full flex items-center justify-center gap-2 rounded-2xl text-xs font-bold text-white bg-salon-maroon hover:bg-salon-maroon-deep transition-all shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-salon-gold" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={() => {
                  const s = activeModalService;
                  setActiveModalService(null);
                  handleWhatsAppConsult(s);
                }}
                className="min-h-[46px] w-full flex items-center justify-center gap-2 rounded-2xl text-xs font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
