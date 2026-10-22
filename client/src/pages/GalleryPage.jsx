import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Sparkles, 
  Eye, 
  X, 
  Calendar, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';

export default function GalleryPage({ galleryImages = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const navigate = useNavigate();

  // Curated transformation showcase entries
  const defaultItems = [
    {
      id: 'bridal-hd-1',
      title: 'Royal Indian Bridal HD Glam',
      category: 'Bridal',
      description: 'High-definition waterproof bridal makeover with custom contouring and floral bun styling for the wedding ceremony.'
    },
    {
      id: 'hair-botox-1',
      title: 'Nanoplastia & Hair Botox Glow',
      category: 'Hair Care',
      description: 'Deep restorative realignment therapy using professional clinical formulas for long-lasting silky shine.'
    },
    {
      id: 'skin-casmara-1',
      title: 'Casmara Luxury Algae Radiance',
      category: 'Facials',
      description: 'Intense peel-off treatment delivering firm, hydrated and visibly glowing skin.'
    },
    {
      id: 'nails-french-1',
      title: 'Bespoke Gel Nail Extensions',
      category: 'Nails',
      description: 'Delicate almond French tips with micro gold foil accents and ultra-glossy finish.'
    },
    {
      id: 'party-glam-1',
      title: 'Engagement & Sangeet Evening Glam',
      category: 'Bridal',
      description: 'Luminous skin with champagne shimmer eye artistry and nude velvet contour.'
    },
    {
      id: 'keratin-treatment-1',
      title: 'Clinical Keratin Protein Smoothing',
      category: 'Hair Care',
      description: 'Eliminates stubborn frizz while preserving natural bounce and softness.'
    },
    {
      id: 'o3-brightening-1',
      title: 'O3+ Professional Brightening Glow',
      category: 'Facials',
      description: 'Specialized herbal and clinical brightening treatment for sun-exposed and dull skin.'
    },
    {
      id: 'rica-waxing-1',
      title: 'Italian Rica Liposoluble Waxing Care',
      category: 'Waxing',
      description: 'Gentle, skin-safe hair removal designed specifically for sensitive areas.'
    }
  ];

  // Merge database images with defaults
  const itemsToDisplay = galleryImages.length > 0 ? galleryImages : defaultItems;

  const categoriesList = ['all', 'Bridal', 'Hair Care', 'Facials', 'Nails', 'Waxing'];

  const filteredItems = activeCategory === 'all'
    ? itemsToDisplay
    : itemsToDisplay.filter(item => {
        const cat = (item.category || '').toLowerCase();
        return cat.includes(activeCategory.toLowerCase());
      });

  // Handle ESC key for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBookFromLightbox = (item) => {
    setActiveLightboxItem(null);
    navigate('/contact', { state: { preselectedService: item.title } });
  };

  return (
    <div className="pt-28 pb-24 bg-salon-blush min-h-screen">
      
      {/* 1. Page Header */}
      <div className="bg-white border-b border-salon-babypink/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs text-salon-text/60 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-salon-maroon transition-colors">Home</Link>
            <span>/</span>
            <span className="text-salon-maroon font-semibold">Gallery</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salon-babypink/70 text-salon-maroon text-xs font-semibold uppercase tracking-wider mb-3 border border-salon-rose/30">
                <Camera className="w-3.5 h-3.5 text-salon-gold-dark" />
                <span>Verified Studio Portfolio</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-salon-maroon tracking-tight">
                Salon Work & Artistry
              </h1>
              <p className="text-sm sm:text-base text-salon-text/80 font-light max-w-2xl mt-3 leading-relaxed">
                Explore real transformations crafted by Preeti Mandal across high-definition bridal makeovers, clinical hair restorations, luxury algae facials, and delicate nail artistry.
              </p>
            </div>

            <div className="bg-salon-blush rounded-2xl p-4 border border-salon-babypink flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-salon-gold-dark shrink-0" />
              <div className="text-xs">
                <span className="font-serif font-bold text-salon-maroon block">Authentic Work</span>
                <span className="text-salon-text/70 block">Click any card to inspect details</span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-10 pt-6 border-t border-salon-babypink/40 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  activeCategory === cat
                    ? 'bg-salon-maroon text-salon-gold shadow-sm'
                    : 'bg-white text-salon-text/75 hover:bg-salon-babypink/50 border border-salon-babypink'
                }`}
              >
                {cat === 'all' ? 'All Transformations' : cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 2. Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setActiveLightboxItem(item)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-salon-babypink/80 hover:border-salon-gold/60 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6">
                {/* Visual Icon Header */}
                <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-salon-babypink/60 via-salon-blush to-salon-babypink/30 border border-salon-rose/20 flex flex-col items-center justify-center p-4 text-center group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 text-salon-gold-dark">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-salon-maroon">
                    {item.category || 'Transformation'}
                  </span>
                  
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-salon-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-salon-maroon text-xs font-bold shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-salon-gold-dark" />
                      <span>View</span>
                    </span>
                  </div>
                </div>

                <div className="pt-5">
                  <span className="text-[10px] uppercase tracking-widest text-salon-gold-dark font-bold block mb-1">
                    {item.category || 'Specialized Service'}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-salon-maroon mb-2 group-hover:text-salon-maroon-light transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-salon-text/75 font-light leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-salon-maroon border-t border-salon-babypink/40">
                <span className="text-[11px] text-salon-text/60">Inspect Details</span>
                <span className="text-salon-gold-dark group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Bottom Consultation Note */}
        <div className="mt-20 rounded-3xl bg-white p-8 sm:p-10 border border-salon-babypink shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-salon-gold-dark font-bold block">
            BESPOKE CONSULTATIONS
          </span>
          <h3 className="font-serif text-2xl font-bold text-salon-maroon">
            Have a Specific Reference or Inspiration Photo?
          </h3>
          <p className="text-xs sm:text-sm text-salon-text/75 font-light leading-relaxed">
            Share your preferred bridal reference, hair smoothing goal, or nail design with Preeti Mandal. We evaluate compatibility with your natural hair, skin, and occasion requirements.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-salon-gold" />
              <span>Book Consultation for Your Look</span>
            </Link>
          </div>
        </div>

      </div>

      {/* 4. Accessible Lightbox Modal */}
      {activeLightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-luxury-lg border border-salon-gold/40 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-salon-text/60 hover:text-salon-maroon hover:bg-salon-babypink/50 transition-colors"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Visual Area */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-salon-babypink/60 to-salon-blush border border-salon-rose/30 flex flex-col items-center justify-center p-6 text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-3 text-salon-gold-dark">
                <Camera className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-salon-maroon bg-white/90 px-3 py-1 rounded-full shadow-sm">
                {activeLightboxItem.category || 'Salon Artistry'}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-salon-gold-dark font-bold">
                Preeti Makeover Portfolio
              </span>
              <h3 id="lightbox-title" className="font-serif text-2xl font-bold text-salon-maroon">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs text-salon-text/80 leading-relaxed font-light">
                {activeLightboxItem.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-salon-babypink/60 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-salon-text/70 hover:bg-salon-babypink/40 transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => handleBookFromLightbox(activeLightboxItem)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-maroon hover:bg-salon-maroon-deep shadow-md transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-salon-gold" />
                <span>Book This Look</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
