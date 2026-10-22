import React, { useState } from 'react';
import { 
  Scissors, 
  Sparkles, 
  Smile, 
  HandMetal, 
  Feather, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  Clock
} from 'lucide-react';

export default function ServicesSection({ categories, loading, error, onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Wireframe reference categories matching PDF Page 1
  const wireframeHighlights = [
    {
      num: '01',
      title: 'Hair Styling & Cuts',
      desc: 'Cuts, colour, smoothing, keratin, hair botox, and clinical styling for every occasion.',
      priceTag: 'Price on Consultation',
      icon: Scissors,
      slugMatch: 'hair-care-treatments'
    },
    {
      num: '02',
      title: 'Skin & Facials',
      desc: 'Luxury Casmara algae facials, Kanpeki, O3+ brightening, and herbal glow therapies.',
      priceTag: 'Price on Consultation',
      icon: Sparkles,
      slugMatch: 'skin-care-facials'
    },
    {
      num: '03',
      title: 'Party & Occasion Makeup',
      desc: 'High-definition glam looks for parties, engagements, sangeet, and events.',
      priceTag: 'Price on Consultation',
      icon: Smile,
      slugMatch: 'bridal-occasion-makeover'
    },
    {
      num: '04',
      title: 'Nails & Spa Grooming',
      desc: 'Classic spa manicure, pedicure, bespoke nail art, and gel nail enhancements.',
      priceTag: 'Price on Consultation',
      icon: HandMetal,
      slugMatch: 'hands-feet-nails'
    },
    {
      num: '05',
      title: 'Waxing & Threading',
      desc: 'Clean, gentle hair removal in a sanitized space using Italian Rica liposoluble wax.',
      priceTag: 'Price on Consultation',
      icon: Feather,
      slugMatch: 'waxing-grooming'
    },
    {
      num: '06',
      title: 'Spa & Relaxation',
      desc: 'Deep head massage, full body polishing, gentle exfoliation, and relaxing add-ons.',
      priceTag: 'Price on Consultation',
      icon: Heart,
      slugMatch: 'hair-care-treatments'
    }
  ];

  // Flatten services list for filtered view
  const allServices = categories.flatMap(cat => 
    cat.services.map(s => ({ ...s, categoryName: cat.name, categorySlug: cat.slug }))
  );

  const filteredServices = activeCategory === 'all'
    ? allServices
    : allServices.filter(s => s.categorySlug === activeCategory);

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching PDF */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold block mb-2">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum tracking-tight mb-4">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-brand-plum/70 font-light leading-relaxed">
            Personalized beauty treatments crafted with international products and clinical hygiene standards.
          </p>
        </div>

        {/* 6 Core Highlight Cards from PDF Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {wireframeHighlights.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.num}
                className="group bg-[#FAF7F2] rounded-3xl p-8 border border-brand-blush/60 hover:border-brand-gold/60 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-brand-gold-dark tracking-wide">
                      {item.num}
                    </span>
                    <span className="w-10 h-10 rounded-2xl bg-white text-brand-plum flex items-center justify-center shadow-sm group-hover:bg-brand-plum group-hover:text-brand-gold transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-plum mb-3 group-hover:text-brand-gold-dark transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-brand-plum/70 leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-blush/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-plum/80 uppercase tracking-wider">
                    {item.priceTag}
                  </span>
                  <button
                    onClick={() => setActiveCategory(item.slugMatch)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold-dark hover:text-brand-plum transition-colors"
                  >
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comprehensive Service Catalog Browser */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-brand-blush/60 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Full Service Menu & Consultations
              </h3>
              <p className="text-xs text-brand-plum/70 mt-1">
                Browse all 27 specialized treatments available at Preeti Makeover
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-brand-plum text-brand-gold shadow-sm'
                    : 'bg-white text-brand-plum/70 hover:text-brand-plum border border-brand-blush'
                }`}
              >
                All Treatments ({allServices.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-brand-plum text-brand-gold shadow-sm'
                      : 'bg-white text-brand-plum/70 hover:text-brand-plum border border-brand-blush'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading & Error States */}
          {loading && (
            <div className="py-12 text-center text-brand-plum/60 text-sm">
              <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Loading services menu...
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs text-center">
              Unable to load live services: {error}. Please call or WhatsApp us for instant enquiries.
            </div>
          )}

          {/* Services Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-5 border border-brand-blush/60 hover:border-brand-gold/50 hover:shadow-luxury transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-serif font-bold text-base text-brand-plum">
                        {service.name}
                      </h4>
                      {service.isFeatured && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-gold/15 text-brand-gold-dark uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="block text-[11px] text-brand-plum/50 uppercase tracking-wider mb-3">
                      {service.categoryName}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-brand-blush/40 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-brand-plum/70">
                      <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                      <span>{service.durationMinutes ? `${service.durationMinutes} mins` : 'Consultation'}</span>
                    </div>

                    <button
                      onClick={() => onSelectService(service)}
                      className="inline-flex items-center gap-1 font-semibold text-xs text-brand-plum hover:text-brand-gold-dark transition-colors px-2.5 py-1 rounded-lg bg-brand-ivory hover:bg-brand-blush/40"
                    >
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      <span>Select</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
