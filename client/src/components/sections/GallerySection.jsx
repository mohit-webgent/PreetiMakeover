import React, { useState } from 'react';
import { Sparkles, Eye, Camera } from 'lucide-react';

export default function GallerySection({ galleryImages = [], onBookClick }) {
  const [filter, setFilter] = useState('all');

  // Wireframe categories matching PDF Page 2: [BRIDAL LOOK], [HAIR STYLE], [MAKEUP LOOK], [NAIL ART]
  const defaultPlaceholders = [
    {
      id: 'bridal-1',
      title: 'Royal Indian Bridal HD Glam',
      category: 'bridal',
      categoryLabel: 'Bridal Look',
      description: 'Traditional red lehenga drape with high-definition flawless foundation and floral bun styling.'
    },
    {
      id: 'hair-1',
      title: 'Nanoplastia & Hair Botox Glow',
      category: 'hair',
      categoryLabel: 'Hair Style',
      description: 'Silky, frizz-free mirror shine hair rejuvenation treatment using clinical restorative formulas.'
    },
    {
      id: 'makeup-1',
      title: 'Cocktail & Engagement Evening Makeup',
      category: 'makeup',
      categoryLabel: 'Makeup Look',
      description: 'Soft-glam sculpted eyes with champagne shimmer highlights and nude matte lip contour.'
    },
    {
      id: 'nail-1',
      title: 'Bespoke Gel Nail Extensions & Nail Art',
      category: 'nails',
      categoryLabel: 'Nail Art',
      description: 'Almond French tips with delicate gold foil accents and high-gloss gel finish.'
    }
  ];

  const displayedItems = galleryImages.length > 0 
    ? (filter === 'all' ? galleryImages : galleryImages.filter(img => img.category.toLowerCase() === filter))
    : (filter === 'all' ? defaultPlaceholders : defaultPlaceholders.filter(p => p.category === filter));

  return (
    <section id="gallery" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching PDF Page 2 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-gold-dark font-semibold block mb-2">
            PORTFOLIO & TRANSFORMATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum tracking-tight mb-4">
            Our Work
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-brand-plum/70 font-light leading-relaxed">
            Signature artistry across bridal glam, hair transformations, radiant facials, and creative nail styling.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Portfolio' },
            { id: 'bridal', label: 'Bridal Looks' },
            { id: 'hair', label: 'Hair Styles' },
            { id: 'makeup', label: 'Makeup Looks' },
            { id: 'nails', label: 'Nail Art' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                filter === tab.id
                  ? 'bg-brand-plum text-brand-gold shadow-md'
                  : 'bg-white text-brand-plum/70 hover:text-brand-plum hover:bg-brand-blush/40 border border-brand-blush'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid (4 columns on desktop matching PDF) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => (
            <div
              key={item.id || index}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-blush/80 hover:border-brand-gold/60 shadow-sm hover:shadow-luxury-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Visual Card Area */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-brand-blush/50 via-brand-ivory to-white p-6 flex flex-col justify-between overflow-hidden">
                
                {/* Category Pill */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-plum shadow-sm">
                    {item.categoryLabel || item.category}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-brand-plum flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
                  </span>
                </div>

                {/* Center Arch / Icon Display */}
                <div className="my-auto flex flex-col items-center justify-center text-center p-4">
                  <div className="w-16 h-24 rounded-t-full border border-brand-gold/40 bg-brand-plum/5 flex items-center justify-center mb-3 group-hover:border-brand-gold transition-colors">
                    <Camera className="w-5 h-5 text-brand-gold-dark" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-brand-gold-dark font-semibold">
                    [{item.categoryLabel || item.category}]
                  </span>
                </div>

                {/* Subtle Watermark */}
                <div className="relative z-10 text-center">
                  <span className="text-[10px] text-brand-plum/40 tracking-widest uppercase">
                    Preeti Makeover Studio
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 bg-white border-t border-brand-blush/40 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-brand-plum mb-2 leading-snug group-hover:text-brand-gold-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-plum/70 font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={onBookClick}
                  className="w-full text-center py-2 px-3 rounded-xl text-xs font-semibold text-brand-plum bg-brand-ivory hover:bg-brand-plum hover:text-brand-gold transition-all duration-200 border border-brand-blush/60"
                >
                  Book Similar Look
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Attribution Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-brand-plum/60 italic max-w-xl mx-auto">
            Note: Portfolio demonstrates available makeover styles and treatment categories. To upload original client before-after transformations, visit the salon admin portal.
          </p>
        </div>

      </div>
    </section>
  );
}
