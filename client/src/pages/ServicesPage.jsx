import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  Sparkles, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calendar,
  MessageCircle,
  Award
} from 'lucide-react';

export default function ServicesPage({ categories = [], loading = false, error = null, onSelectService }) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filtered categories and services
  const filteredData = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    let result = categories;

    // Filter by category slug
    if (selectedCategorySlug !== 'all') {
      result = result.filter(c => c.slug === selectedCategorySlug);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.map(cat => ({
        ...cat,
        services: cat.services?.filter(s => 
          s.name.toLowerCase().includes(q) || 
          (s.description && s.description.toLowerCase().includes(q))
        )
      })).filter(cat => cat.services && cat.services.length > 0);
    }

    return result;
  }, [categories, selectedCategorySlug, searchQuery]);

  // Total services count
  const totalServicesCount = useMemo(() => {
    return categories.reduce((acc, cat) => acc + (cat.services?.length || 0), 0);
  }, [categories]);

  const handleBookService = (service) => {
    if (onSelectService) {
      onSelectService(service);
    }
    navigate('/contact', { state: { preselectedService: service.name, serviceId: service.id } });
  };

  return (
    <div className="pt-28 pb-24 bg-salon-blush min-h-screen">
      
      {/* 1. Page Header */}
      <div className="bg-white border-b border-salon-babypink/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-salon-text/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-salon-maroon transition-colors">Home</Link>
            <span>/</span>
            <span className="text-salon-maroon font-semibold">Services</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-babypink/60 text-salon-maroon text-xs font-semibold uppercase tracking-wider mb-3 border border-salon-rose/30">
                <Sparkles className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>Complete Salon Catalog</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
                Our Services & Treatments
              </h1>
              <p className="text-sm sm:text-base text-salon-text/80 font-light max-w-2xl mt-3 leading-relaxed">
                Discover all {totalServicesCount || 27} specialized hair, skincare, bridal, waxing, and nail therapies crafted by Preeti Mandal with genuine international formulations.
              </p>
            </div>

            {/* Quick Consultation Badge */}
            <div className="bg-salon-blush rounded-2xl p-4 border border-salon-babypink flex items-center gap-3 self-start lg:self-auto">
              <ShieldCheck className="w-8 h-8 text-salon-gold-dark shrink-0" />
              <div className="text-xs">
                <span className="font-serif font-bold text-salon-maroon block">Transparent Consultations</span>
                <span className="text-salon-text/70 block">Prices tailored on hair length & skin analysis</span>
              </div>
            </div>
          </div>

          {/* Search and Category Filter Tabs */}
          <div className="mt-10 pt-8 border-t border-salon-babypink/40 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategorySlug('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  selectedCategorySlug === 'all'
                    ? 'bg-salon-maroon text-salon-gold shadow-sm'
                    : 'bg-white text-salon-text/75 hover:bg-salon-babypink/50 border border-salon-babypink'
                }`}
              >
                All Services ({totalServicesCount || 27})
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                    selectedCategorySlug === cat.slug
                      ? 'bg-salon-maroon text-salon-gold shadow-sm'
                      : 'bg-white text-salon-text/75 hover:bg-salon-babypink/50 border border-salon-babypink'
                  }`}
                >
                  {cat.name} ({cat.services?.length || 0})
                </button>
              ))}
            </div>

            {/* Real-time Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-salon-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-white border border-salon-babypink focus:outline-none focus:border-salon-gold text-salon-text placeholder:text-salon-text/40 shadow-sm"
              />
            </div>

          </div>

        </div>
      </div>

      {/* 2. Main Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-salon-gold border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-salon-maroon font-medium">Loading Preeti Makeover service catalog...</p>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-16">
            {filteredData.map((category) => (
              <section key={category.id || category.slug} className="space-y-6">
                
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-salon-babypink/80 pb-4 gap-2">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salon-maroon">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-xs sm:text-sm text-salon-text/75 font-light mt-1 max-w-3xl">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-salon-gold-dark uppercase tracking-widest shrink-0">
                    {category.services?.length || 0} Treatments
                  </span>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services?.map((service) => (
                    <div
                      key={service.id || service.slug}
                      className="group bg-white rounded-3xl p-6 border border-salon-babypink/70 hover:border-salon-gold/60 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Meta Badges */}
                        <div className="flex items-center justify-between mb-3">
                          {service.isFeatured ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-salon-babypink text-salon-maroon border border-salon-rose/30">
                              <Sparkles className="w-3 h-3 text-salon-gold-dark" />
                              <span>Featured</span>
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-salon-gold-dark">
                              Certified Service
                            </span>
                          )}

                          {service.durationMinutes && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-salon-text/60 bg-salon-blush px-2.5 py-0.5 rounded-full border border-salon-babypink/50">
                              <Clock className="w-3 h-3 text-salon-gold-dark" />
                              <span>{service.durationMinutes} mins</span>
                            </span>
                          )}
                        </div>

                        {/* Service Title */}
                        <h3 className="font-serif text-lg font-bold text-salon-maroon mb-2 group-hover:text-salon-maroon-light transition-colors leading-snug">
                          {service.name}
                        </h3>

                        {/* Description */}
                        {service.description && (
                          <p className="text-xs text-salon-text/75 font-light leading-relaxed mb-4">
                            {service.description}
                          </p>
                        )}
                      </div>

                      {/* Pricing Note & Book Button */}
                      <div className="pt-4 border-t border-salon-babypink/50 mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-salon-text/50 block">Pricing</span>
                          <span className="text-xs font-semibold text-salon-maroon">
                            {service.startingPrice ? `From ₹${service.startingPrice}` : 'Price on Consultation'}
                          </span>
                        </div>

                        <button
                          onClick={() => handleBookService(service)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep transition-all shadow-sm active:scale-95"
                        >
                          <Calendar className="w-3 h-3 text-salon-gold" />
                          <span>Book</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </section>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-salon-babypink shadow-sm space-y-4">
            <Scissors className="w-10 h-10 text-salon-gold-dark mx-auto" />
            <h3 className="font-serif text-xl font-bold text-salon-maroon">No matching services found</h3>
            <p className="text-xs text-salon-text/70">
              No services matched your query "{searchQuery}". Try searching for terms like "facial", "keratin", "bridal", or "waxing".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategorySlug('all'); }}
              className="px-5 py-2 rounded-full text-xs font-semibold text-salon-maroon bg-salon-babypink/60 border border-salon-rose/30"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3. Hygiene & Product Commitment Card */}
        <div className="mt-20 rounded-3xl bg-white p-8 sm:p-10 border border-salon-babypink shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-salon-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-salon-maroon">Original Products Only</h4>
              <p className="text-xs text-salon-text/75 font-light mt-1 leading-relaxed">
                We never use duplicate or loose formulations. Every Casmara mask, L’Oréal tube, and Rica can is opened fresh.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-salon-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-salon-maroon">Hospital-Grade Sterilization</h4>
              <p className="text-xs text-salon-text/75 font-light mt-1 leading-relaxed">
                Scissors, combs, brushes, and threading tools are sanitized and UV treated between guests.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-salon-babypink text-salon-maroon flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-salon-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-salon-maroon">Tuesday Weekly Off</h4>
              <p className="text-xs text-salon-text/75 font-light mt-1 leading-relaxed">
                The studio remains closed every Tuesday for thorough deep-cleaning and inventory sanitization.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
