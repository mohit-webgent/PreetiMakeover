import React, { useState } from 'react';
import { brandCategories } from '../../data/brandsData';
import { ShieldCheck, Award } from 'lucide-react';

export default function BrandsShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-white border-y border-salon-babypink/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-salon-babypink/50 text-salon-maroon text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-salon-gold-dark" />
            <span>100% Authentic Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salon-maroon tracking-tight mb-3">
            Professional Product Brands
          </h2>
          <div className="w-16 h-0.5 bg-salon-gold mx-auto mb-3"></div>
          <p className="text-sm text-salon-text/75 font-light leading-relaxed">
            We exclusively use tested, genuine products from world-renowned haircare, clinical dermatology, and bridal beauty laboratories.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {brandCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === idx
                  ? 'bg-salon-maroon text-salon-gold shadow-md'
                  : 'bg-salon-blush text-salon-text/80 hover:text-salon-maroon hover:bg-salon-babypink/50 border border-salon-babypink'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {brandCategories[activeTab].brands.map((b, i) => (
            <div
              key={i}
              className="group bg-salon-blush rounded-2xl p-6 border border-salon-babypink/70 hover:border-salon-gold/60 hover:shadow-luxury transition-all text-center flex flex-col items-center justify-center min-h-[140px]"
            >
              <span className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-4 h-4 text-salon-gold" />
              </span>
              <h4 className="font-serif text-lg font-bold text-salon-maroon mb-1">
                {b.name}
              </h4>
              <span className="text-[10px] uppercase font-bold tracking-widest text-salon-gold-dark">
                {b.tag}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
