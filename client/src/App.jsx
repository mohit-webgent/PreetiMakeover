import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Database, 
  Server, 
  Globe, 
  Scissors, 
  HeartHandshake,
  CalendarX
} from 'lucide-react';

export default function App() {
  const [apiHealth, setApiHealth] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setApiHealth({ loading: false, data, error: null }))
      .catch((err) => setApiHealth({ loading: false, data: null, error: err.message }));
  }, []);

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-plum selection:bg-brand-gold/20 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-brand-blush/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-plum text-brand-gold flex items-center justify-center font-serif text-lg font-bold">
                P
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-plum">
                Preeti Makeover
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-brand-gold-dark font-medium mt-0.5">
              Your Beauty Is Our Duty.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-blush/40 text-brand-plum border border-brand-blush">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Phase 1 Scaffolding
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-plum to-brand-plum-deep text-brand-ivory p-8 sm:p-12 relative overflow-hidden shadow-luxury-lg mb-12">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs uppercase tracking-widest font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Luxury Beauty & Makeover Studio
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight">
              Preeti Makeover
            </h1>
            <p className="text-brand-ivory/80 text-lg mb-6 font-light leading-relaxed">
              Phase 1 foundation initialized with production-grade architecture: React + Vite + Tailwind CSS frontend, Node.js + Express.js backend, and PostgreSQL + Prisma data modeling.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Security Hardened</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm border border-white/10">
                <Database className="w-4 h-4 text-brand-gold" />
                <span>PostgreSQL + Prisma</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm border border-white/10">
                <CalendarX className="w-4 h-4 text-brand-gold" />
                <span>Tuesday Blackout Rule</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Backend Connection */}
          <div className="bg-white rounded-2xl p-6 border border-brand-blush/60 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-brand-blush/50 text-brand-plum flex items-center justify-center">
                <Server className="w-5 h-5 text-brand-plum" />
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                apiHealth.loading 
                  ? 'bg-amber-100 text-amber-800' 
                  : apiHealth.data?.status === 'healthy' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
              }`}>
                {apiHealth.loading ? 'Checking...' : apiHealth.data?.status === 'healthy' ? 'Connected' : 'Offline'}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold mb-1">Backend API Health</h3>
            <p className="text-sm text-brand-plum/70 mb-4">
              Direct proxy verification to <code className="bg-brand-ivory px-1.5 py-0.5 rounded text-xs">/api/health</code>
            </p>
            {apiHealth.data ? (
              <div className="bg-brand-ivory rounded-lg p-3 text-xs space-y-1 font-mono text-brand-plum/80">
                <div>Status: <span className="text-emerald-700 font-semibold">{apiHealth.data.status}</span></div>
                <div>Service: {apiHealth.data.business}</div>
                <div>Uptime: {Math.round(apiHealth.data.uptime)}s</div>
              </div>
            ) : apiHealth.error ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs">
                {apiHealth.error}
              </div>
            ) : (
              <div className="text-xs text-brand-plum/60">Connecting to server...</div>
            )}
          </div>

          {/* Card 2: Confirmed Business Identity */}
          <div className="bg-white rounded-2xl p-6 border border-brand-blush/60 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold-dark flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-blush/40 text-brand-plum">
                Badarpur, New Delhi
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold mb-1">Salon Location & Hours</h3>
            <p className="text-xs text-brand-plum/70 leading-relaxed mb-3">
              D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044
            </p>
            <div className="text-xs space-y-1.5 pt-2 border-t border-brand-blush/40">
              <div className="flex items-center justify-between">
                <span className="text-brand-plum/60">Owner:</span>
                <span className="font-medium">Preeti Mandal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-plum/60">Hours:</span>
                <span className="font-medium">10:00 AM – 9:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-plum/60">Weekly Off:</span>
                <span className="font-semibold text-rose-600">Tuesday</span>
              </div>
            </div>
          </div>

          {/* Card 3: Database & Security Blueprint */}
          <div className="bg-white rounded-2xl p-6 border border-brand-blush/60 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800">
                Prisma 5.22
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold mb-1">PostgreSQL Ready</h3>
            <p className="text-sm text-brand-plum/70 mb-3">
              Schema & seed prepared for 6 core models with zero hardcoded credentials:
            </p>
            <ul className="text-xs space-y-1 text-brand-plum/80">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>AdminUser & BusinessSettings</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ServiceCategory & Service Catalog</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Appointment with Status Tracking</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>GalleryImage & Moderated Testimonials</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Scope Reference */}
        <div className="bg-white rounded-3xl p-8 border border-brand-blush/60 shadow-luxury">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-brand-plum text-brand-gold flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold">Configured Service Domains & Premium Brands</h2>
              <p className="text-xs text-brand-plum/70">From confirmed business specification and seed catalog</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-blush/40">
              <h4 className="font-bold text-brand-plum mb-1.5">Hair Care & Botox</h4>
              <p className="text-xs text-brand-plum/70 mb-2">Keratin, Botox, Nanoplastia, Smoothing, Global Colour, Balayage.</p>
              <span className="text-[10px] uppercase font-semibold text-brand-gold-dark tracking-wider">Brands: L’Oréal, Matrix, Streax, Schwarzkopf</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-blush/40">
              <h4 className="font-bold text-brand-plum mb-1.5">Luxury Facials</h4>
              <p className="text-xs text-brand-plum/70 mb-2">Casmara, Kanpeki, O3+ Brightening, Oxylife, Herbal Cleanups.</p>
              <span className="text-[10px] uppercase font-semibold text-brand-gold-dark tracking-wider">Brands: Casmara, Kanpeki, O3+, Lotus, VLCC</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-blush/40">
              <h4 className="font-bold text-brand-plum mb-1.5">Bridal & HD Glam</h4>
              <p className="text-xs text-brand-plum/70 mb-2">Pre-bridal packages, Signature HD Bridal Makeup, Draping & Hair.</p>
              <span className="text-[10px] uppercase font-semibold text-brand-gold-dark tracking-wider">National & International Brands</span>
            </div>
            <div className="p-4 rounded-xl bg-brand-ivory border border-brand-blush/40">
              <h4 className="font-bold text-brand-plum mb-1.5">Waxing & Grooming</h4>
              <p className="text-xs text-brand-plum/70 mb-2">Rica Liposoluble, Threading, Body Polishing, Spa Manicure/Pedicure.</p>
              <span className="text-[10px] uppercase font-semibold text-brand-gold-dark tracking-wider">Brands: Rica, Raga, Honeycare</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-blush/60 bg-white/60 py-6 text-center text-xs text-brand-plum/60">
        <p>© Preeti Makeover. All rights reserved. Crafted as a high-end portfolio product by Webgent.</p>
      </footer>
    </div>
  );
}
