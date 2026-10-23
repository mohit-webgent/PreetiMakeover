import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  ExternalLink,
  Layers,
  Crown,
  ShieldCheck,
  Heart,
  Phone,
  Calendar,
  Eye,
  FileText,
  Trash2
} from 'lucide-react';
import { api } from '../../services/api';

/**
 * Image Field Uploader with Drag-and-Drop, Live Preview & URL fallback
 */
function ImageFieldUploader({ label, value, onChange, token, helperText }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP)');
      return;
    }
    setError(null);
    setUploading(true);

    try {
      const res = await api.uploadImage(token, file);
      if (res?.url) {
        onChange(res.url);
      } else {
        throw new Error(res?.message || 'Upload failed');
      }
    } catch (err) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum">
          {label}
        </label>
        {helperText && <span className="text-[11px] text-brand-plum/50">{helperText}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4 flex items-center gap-3">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-brand-ivory border-2 border-brand-gold/40 shadow-sm shrink-0 flex items-center justify-center">
            {value ? (
              <img 
                src={value} 
                alt={label} 
                className="w-full h-full object-cover object-top"
                onError={(e) => { e.target.src = '/pm_logo.png'; }}
              />
            ) : (
              <ImageIcon className="w-8 h-8 text-brand-plum/30" />
            )}
            {uploading && (
              <div className="absolute inset-0 bg-brand-plum/70 backdrop-blur-xs flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-brand-gold animate-spin" />
              </div>
            )}
          </div>
          <div className="text-xs text-brand-plum/70 space-y-1">
            <span className="font-semibold block text-brand-plum">Current Photo</span>
            <span className="text-[10px] text-brand-plum/50 break-all line-clamp-2">
              {value || 'No image set'}
            </span>
          </div>
        </div>

        {/* Upload Drop Zone & Controls */}
        <div className="sm:col-span-8 space-y-2">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
              dragOver 
                ? 'border-brand-gold bg-brand-gold/10 scale-[1.01]' 
                : 'border-brand-blush hover:border-brand-gold bg-brand-ivory/50 hover:bg-white'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-plum">
              <Upload className="w-4 h-4 text-brand-gold-dark" />
              <span>{uploading ? 'Uploading to Server...' : 'Click to Upload or Drag & Drop'}</span>
            </div>
            <p className="text-[10px] text-brand-plum/50 mt-1">
              Supports JPG, PNG, WebP up to 8MB
            </p>
          </div>

          {/* URL text input */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-brand-plum/50 uppercase tracking-wider shrink-0">Or URL:</span>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/hero-bridal.jpg or https://..."
              className="flex-1 px-3 py-1.5 rounded-lg border border-brand-blush text-xs bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-[11px] text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WebsiteContentManager({ token, onContentUpdated }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Form states initialized with safe defaults
  const [heroData, setHeroData] = useState({
    headingLine1: 'Look good.',
    headingLine2: 'Feel even better.',
    description: 'Hair, skin, makeup, and bespoke bridal looks — crafted with meticulous care by Preeti Mandal.',
    tagline: '"Your Beauty Is Our Duty."',
    modelImage: '/hero-bridal.jpg',
    badgeTitle: 'Signature Service',
    badgeService: 'HD Bridal Makeover',
    badgeSubtitle: 'Camera-ready perfection by Preeti Mandal',
    quickLocation: 'Prince Colony, Badarpur',
    quickHours: '10 AM – 9 PM',
    quickPhone: '+91 8810359438',
    btnAppointment: 'Book Appointment',
    btnServices: 'View Services'
  });

  const [ribbonData, setRibbonData] = useState({
    item1Title: '100% Genuine Brands',
    item1Desc: 'Sealed L’Oréal, Casmara & Rica',
    item2Title: 'Preeti Mandal Direct Care',
    item2Desc: 'Diagnostic personal consultations',
    item3Title: 'Hospital-Grade Clean',
    item3Desc: 'Sanitized instruments every client',
    item4Title: '10:00 AM – 9:00 PM',
    item4Desc: 'Open 6 Days (Closed Tuesday)'
  });

  const [signatureData, setSignatureData] = useState({
    eyebrow: 'CLIENT FAVORITES & TOP PICKS',
    title: 'Our Most Loved Services',
    items: [
      {
        id: 1,
        name: 'Signature Bridal HD Makeover',
        category: 'Bridal Studio',
        desc: 'Flawless high-definition bridal glam with bespoke hair draping and long-wear waterproof skin prep.',
        badge: 'Most Requested',
        link: '/bridal-makeup',
        image: '/signature-bridal.jpg'
      },
      {
        id: 2,
        name: 'Casmara Luxury Algae Facial',
        category: 'Clinical Skincare',
        desc: 'Spanish peel-off algae mask delivering intense hydration, firming and luminous radiance.',
        badge: 'Skin Glow',
        link: '/services',
        image: '/signature-facial.jpg'
      },
      {
        id: 3,
        name: 'Hair Botox & Nanoplastia Restoration',
        category: 'Hair Treatments',
        desc: 'Advanced structural realignment and keratin sealing for mirror-shine, frizz-free hair.',
        badge: 'Restorative',
        link: '/services',
        image: '/signature-hair.jpg'
      },
      {
        id: 4,
        name: 'Italian Rica Liposoluble Waxing',
        category: 'Hygienic Care',
        desc: 'Gentle, 98% natural origin colophony-free wax designed for sensitive and delicate skin.',
        badge: 'Painless Care',
        link: '/services',
        image: '/signature-waxing.jpg'
      }
    ]
  });

  const [bridalData, setBridalData] = useState({
    title: 'High-Definition Bridal Artistry',
    description: 'From deep pre-bridal skin therapy to camera-ready HD makeup and custom saree draping, crafted by Preeti Mandal for your most memorable celebration.',
    feature1: 'Pre-Bridal Clinical Glow Care Package',
    feature2: 'Signature Waterproof HD Bridal Makeup',
    feature3: 'Bespoke Hairstyling & Extensions',
    feature4: 'Designer Saree & Dupatta Draping',
    bookingNote: 'Advance bookings recommended 3–6 weeks prior.'
  });

  const [brandsData, setBrandsData] = useState({
    eyebrow: 'CERTIFIED CLINICAL QUALITY',
    title: 'Professional Product Brands'
  });

  const [aboutData, setAboutData] = useState({
    essenceTag: 'OUR ESSENCE',
    quote: '“Your Beauty Is Our Duty.”',
    essenceStory: 'Founded by Preeti Mandal in Harinagar, Badarpur, Preeti Makeover was built to provide women with a reliable, clinical and luxury parlour experience close to home.',
    heading: 'Passionate Artistry & Personal Consultation',
    description: 'Every face, hair type and skin tone has distinct requirements. We take time to diagnose before recommending any facial, treatment or makeup drape, ensuring healthy, radiant and long-lasting results.'
  });

  const [ctaData, setCtaData] = useState({
    title: 'Ready for Your Transformation?',
    subtext: 'Book your appointment online in seconds, or contact directly on WhatsApp.',
    buttonText: 'Book Appointment Online',
    whatsappNumber: '918810359438',
    whatsappText: 'Message on WhatsApp'
  });

  // Load content from API
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await api.getContent();
      if (res?.data) {
        const d = res.data;
        if (d.hero) setHeroData(prev => ({ ...prev, ...d.hero }));
        if (d.ribbon) setRibbonData(prev => ({ ...prev, ...d.ribbon }));
        if (d.signature) {
          setSignatureData(prev => ({
            ...prev,
            eyebrow: d.signature.eyebrow || prev.eyebrow,
            title: d.signature.title || prev.title,
            items: Array.isArray(d.signature.items) ? d.signature.items : prev.items
          }));
        }
        if (d.bridal) setBridalData(prev => ({ ...prev, ...d.bridal }));
        if (d.brands) setBrandsData(prev => ({ ...prev, ...d.brands }));
        if (d.about) setAboutData(prev => ({ ...prev, ...d.about }));
        if (d.cta) setCtaData(prev => ({ ...prev, ...d.cta }));
      }
    } catch (err) {
      console.error('Failed to load CMS content:', err);
      showToast('error', 'Could not load current content from database');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Save current active section
  const handleSaveSection = async (sectionKey) => {
    setSaving(true);
    let itemsToSave = [];

    try {
      if (sectionKey === 'hero') {
        itemsToSave = Object.entries(heroData).map(([k, v]) => ({
          key: `hero.${k}`,
          value: v,
          section: 'hero',
          type: 'text'
        }));
      } else if (sectionKey === 'ribbon') {
        itemsToSave = Object.entries(ribbonData).map(([k, v]) => ({
          key: `ribbon.${k}`,
          value: v,
          section: 'ribbon',
          type: 'text'
        }));
      } else if (sectionKey === 'signature') {
        itemsToSave = [
          { key: 'signature.eyebrow', value: signatureData.eyebrow, section: 'signature', type: 'text' },
          { key: 'signature.title', value: signatureData.title, section: 'signature', type: 'text' },
          { key: 'signature.items', value: JSON.stringify(signatureData.items), section: 'signature', type: 'json' }
        ];
      } else if (sectionKey === 'bridal') {
        itemsToSave = Object.entries(bridalData).map(([k, v]) => ({
          key: `bridal.${k}`,
          value: v,
          section: 'bridal',
          type: 'text'
        }));
      } else if (sectionKey === 'brands') {
        itemsToSave = Object.entries(brandsData).map(([k, v]) => ({
          key: `brands.${k}`,
          value: v,
          section: 'brands',
          type: 'text'
        }));
      } else if (sectionKey === 'about') {
        itemsToSave = Object.entries(aboutData).map(([k, v]) => ({
          key: `about.${k}`,
          value: v,
          section: 'about',
          type: 'text'
        }));
      } else if (sectionKey === 'cta') {
        itemsToSave = Object.entries(ctaData).map(([k, v]) => ({
          key: `cta.${k}`,
          value: v,
          section: 'cta',
          type: 'text'
        }));
      }

      await api.saveContentBatch(token, itemsToSave);
      showToast('success', `✨ ${sectionKey.toUpperCase()} section updated and live!`);
      if (onContentUpdated) onContentUpdated();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('error', err.message || 'Failed to save section changes');
    } finally {
      setSaving(false);
    }
  };

  const sectionsList = [
    { id: 'hero', label: 'Hero & Model Photo', icon: Sparkles, desc: 'Top banner, model photo, headlines & badges' },
    { id: 'ribbon', label: 'Commitments Ribbon', icon: ShieldCheck, desc: 'The 4 trust badges & operational commitments' },
    { id: 'signature', label: 'Most Loved Services', icon: Layers, desc: '4 signature cards on home page with photos' },
    { id: 'bridal', label: 'Bridal Spotlight', icon: Crown, desc: 'HD Bridal headline, highlights & booking note' },
    { id: 'brands', label: 'Brands Showcase', icon: Eye, desc: 'Brand showcase heading & certification note' },
    { id: 'about', label: 'About & Meet Preeti', icon: Heart, desc: 'Essence quote, salon story & personal bio' },
    { id: 'cta', label: 'Booking CTA Banner', icon: Phone, desc: 'Transform banner text & WhatsApp contact' },
  ];

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-brand-plum">
        <RefreshCw className="w-8 h-8 animate-spin text-brand-gold mb-3" />
        <p className="text-sm font-semibold">Loading Website Content Manager...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-luxury-lg border transition-all duration-300 ${
          toast.type === 'success'
            ? 'bg-emerald-800 text-white border-emerald-600'
            : 'bg-rose-800 text-white border-rose-600'
        }`}>
          {toast.type === 'success' ? <Check className="w-5 h-5 text-emerald-300" /> : <AlertCircle className="w-5 h-5 text-rose-300" />}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-plum text-[11px] font-bold uppercase tracking-wider mb-2 border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>Zero-Developer Content Management System (CMS)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-plum">
            Website Content & Photo Studio
          </h2>
          <p className="text-xs sm:text-sm text-brand-plum/65 mt-1">
            Edit any text, announcement, guarantee, and upload photographs directly from your phone or laptop. Changes reflect instantly on the live website.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-ivory text-brand-plum hover:bg-brand-blush/40 border border-brand-blush text-xs font-bold transition-all shrink-0"
        >
          <ExternalLink className="w-4 h-4 text-brand-gold-dark" />
          <span>View Live Website</span>
        </a>
      </div>

      {/* Section Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {sectionsList.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-brand-plum text-brand-gold border-brand-gold shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-brand-ivory text-brand-plum/80 border-brand-blush/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : 'text-brand-plum/60'}`} />
                {isActive && <span className="w-2 h-2 rounded-full bg-brand-gold"></span>}
              </div>
              <span className="font-bold text-xs leading-tight block">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush shadow-sm">
        
        {/* SECTION 1: HERO */}
        {activeSection === 'hero' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Hero Section & Main Bridal Photo
                </h3>
                <p className="text-xs text-brand-plum/60">
                  Controls the first impression on the homepage, including the main model photo.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('hero')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Hero Changes'}</span>
              </button>
            </div>

            {/* Main Model Photo Upload */}
            <div className="p-5 rounded-2xl bg-brand-ivory/60 border border-brand-gold/30">
              <ImageFieldUploader
                label="Main Hero Model Photograph"
                value={heroData.modelImage}
                onChange={(newUrl) => setHeroData({ ...heroData, modelImage: newUrl })}
                token={token}
                helperText="Indian bridal or model portrait (Portrait aspect ratio recommended)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Main Headline Line 1
                </label>
                <input
                  type="text"
                  value={heroData.headingLine1}
                  onChange={(e) => setHeroData({ ...heroData, headingLine1: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Main Headline Line 2
                </label>
                <input
                  type="text"
                  value={heroData.headingLine2}
                  onChange={(e) => setHeroData({ ...heroData, headingLine2: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Hero Description Paragraph
              </label>
              <textarea
                rows={3}
                value={heroData.description}
                onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Tagline (Gold Accent Line)
                </label>
                <input
                  type="text"
                  value={heroData.tagline}
                  onChange={(e) => setHeroData({ ...heroData, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Photo Card Tag
                </label>
                <input
                  type="text"
                  value={heroData.badgeTitle}
                  onChange={(e) => setHeroData({ ...heroData, badgeTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Photo Card Title
                </label>
                <input
                  type="text"
                  value={heroData.badgeService}
                  onChange={(e) => setHeroData({ ...heroData, badgeService: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Photo Card Subtitle
                </label>
                <input
                  type="text"
                  value={heroData.badgeSubtitle}
                  onChange={(e) => setHeroData({ ...heroData, badgeSubtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Quick Info: Location
                </label>
                <input
                  type="text"
                  value={heroData.quickLocation}
                  onChange={(e) => setHeroData({ ...heroData, quickLocation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Quick Info: Hours
                </label>
                <input
                  type="text"
                  value={heroData.quickHours}
                  onChange={(e) => setHeroData({ ...heroData, quickHours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Quick Info: Phone
                </label>
                <input
                  type="text"
                  value={heroData.quickPhone}
                  onChange={(e) => setHeroData({ ...heroData, quickPhone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Button 1 Text
                </label>
                <input
                  type="text"
                  value={heroData.btnAppointment}
                  onChange={(e) => setHeroData({ ...heroData, btnAppointment: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Button 2 Text
                </label>
                <input
                  type="text"
                  value={heroData.btnServices}
                  onChange={(e) => setHeroData({ ...heroData, btnServices: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: COMMITMENTS RIBBON */}
        {activeSection === 'ribbon' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Commitments & Philosophy Ribbon
                </h3>
                <p className="text-xs text-brand-plum/60">
                  The four key guarantee badges displayed prominently under the hero.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('ribbon')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Ribbon Changes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Badge 1 */}
              <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-blush space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-gold-dark block">
                  Commitment Badge 1
                </span>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Title</label>
                  <input
                    type="text"
                    value={ribbonData.item1Title}
                    onChange={(e) => setRibbonData({ ...ribbonData, item1Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Subtitle / Details</label>
                  <input
                    type="text"
                    value={ribbonData.item1Desc}
                    onChange={(e) => setRibbonData({ ...ribbonData, item1Desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Badge 2 */}
              <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-blush space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-gold-dark block">
                  Commitment Badge 2
                </span>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Title</label>
                  <input
                    type="text"
                    value={ribbonData.item2Title}
                    onChange={(e) => setRibbonData({ ...ribbonData, item2Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Subtitle / Details</label>
                  <input
                    type="text"
                    value={ribbonData.item2Desc}
                    onChange={(e) => setRibbonData({ ...ribbonData, item2Desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Badge 3 */}
              <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-blush space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-gold-dark block">
                  Commitment Badge 3
                </span>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Title</label>
                  <input
                    type="text"
                    value={ribbonData.item3Title}
                    onChange={(e) => setRibbonData({ ...ribbonData, item3Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Subtitle / Details</label>
                  <input
                    type="text"
                    value={ribbonData.item3Desc}
                    onChange={(e) => setRibbonData({ ...ribbonData, item3Desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Badge 4 */}
              <div className="p-4 rounded-2xl bg-brand-ivory/50 border border-brand-blush space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-gold-dark block">
                  Commitment Badge 4
                </span>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Title</label>
                  <input
                    type="text"
                    value={ribbonData.item4Title}
                    onChange={(e) => setRibbonData({ ...ribbonData, item4Title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-plum mb-1">Subtitle / Details</label>
                  <input
                    type="text"
                    value={ribbonData.item4Desc}
                    onChange={(e) => setRibbonData({ ...ribbonData, item4Desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SIGNATURE MOST LOVED SERVICES */}
        {activeSection === 'signature' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Most Loved Services (Homepage 4 Cards)
                </h3>
                <p className="text-xs text-brand-plum/60">
                  Edit the 4 spotlight service cards on the homepage with custom photos, titles, and descriptions.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('signature')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Services Cards'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={signatureData.eyebrow}
                  onChange={(e) => setSignatureData({ ...signatureData, eyebrow: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={signatureData.title}
                  onChange={(e) => setSignatureData({ ...signatureData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-blush text-sm bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            {/* 4 Cards Editor */}
            <div className="space-y-6 pt-2">
              {signatureData.items.map((item, idx) => (
                <div key={item.id || idx} className="p-5 rounded-2xl bg-brand-ivory/50 border border-brand-gold/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-brand-blush/60 pb-2">
                    <span className="font-serif font-bold text-sm text-brand-plum">
                      Card 0{idx + 1}: {item.name}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-plum">
                      {item.badge}
                    </span>
                  </div>

                  <ImageFieldUploader
                    label={`Card 0${idx + 1} Photograph`}
                    value={item.image}
                    onChange={(newUrl) => {
                      const updated = [...signatureData.items];
                      updated[idx].image = newUrl;
                      setSignatureData({ ...signatureData, items: updated });
                    }}
                    token={token}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-brand-plum mb-1">Service Title</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...signatureData.items];
                          updated[idx].name = e.target.value;
                          setSignatureData({ ...signatureData, items: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-blush text-xs bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-plum mb-1">Category Tag</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...signatureData.items];
                          updated[idx].category = e.target.value;
                          setSignatureData({ ...signatureData, items: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-blush text-xs bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-plum mb-1">Top Badge Text</label>
                      <input
                        type="text"
                        value={item.badge}
                        onChange={(e) => {
                          const updated = [...signatureData.items];
                          updated[idx].badge = e.target.value;
                          setSignatureData({ ...signatureData, items: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-brand-blush text-xs bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-plum mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => {
                        const updated = [...signatureData.items];
                        updated[idx].desc = e.target.value;
                        setSignatureData({ ...signatureData, items: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-brand-blush text-xs bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: BRIDAL SPOTLIGHT */}
        {activeSection === 'bridal' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Bridal Feature Spotlight
                </h3>
                <p className="text-xs text-brand-plum/60">
                  Headline, value proposition, and bullet highlights for the bridal feature.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('bridal')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Bridal Changes'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Bridal Section Headline
              </label>
              <input
                type="text"
                value={bridalData.title}
                onChange={(e) => setBridalData({ ...bridalData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Description Paragraph
              </label>
              <textarea
                rows={3}
                value={bridalData.description}
                onChange={(e) => setBridalData({ ...bridalData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Highlight Bullet 1
                </label>
                <input
                  type="text"
                  value={bridalData.feature1}
                  onChange={(e) => setBridalData({ ...bridalData, feature1: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Highlight Bullet 2
                </label>
                <input
                  type="text"
                  value={bridalData.feature2}
                  onChange={(e) => setBridalData({ ...bridalData, feature2: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Highlight Bullet 3
                </label>
                <input
                  type="text"
                  value={bridalData.feature3}
                  onChange={(e) => setBridalData({ ...bridalData, feature3: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Highlight Bullet 4
                </label>
                <input
                  type="text"
                  value={bridalData.feature4}
                  onChange={(e) => setBridalData({ ...bridalData, feature4: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Advance Booking Notice Note
              </label>
              <input
                type="text"
                value={bridalData.bookingNote}
                onChange={(e) => setBridalData({ ...bridalData, bookingNote: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* SECTION 5: BRANDS SHOWCASE */}
        {activeSection === 'brands' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Brands Showcase Titles
                </h3>
                <p className="text-xs text-brand-plum/60">
                  Header text and certification eyebrow for the luxury product brands section.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('brands')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Brands Changes'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Section Eyebrow
              </label>
              <input
                type="text"
                value={brandsData.eyebrow}
                onChange={(e) => setBrandsData({ ...brandsData, eyebrow: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Section Main Title
              </label>
              <input
                type="text"
                value={brandsData.title}
                onChange={(e) => setBrandsData({ ...brandsData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* SECTION 6: ABOUT & MEET PREETI */}
        {activeSection === 'about' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Studio Essence & Meet Preeti Mandal
                </h3>
                <p className="text-xs text-brand-plum/60">
                  Salon philosophy, signature quote, and Preeti Mandal personal consultation description.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('about')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save About Changes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Essence Tag
                </label>
                <input
                  type="text"
                  value={aboutData.essenceTag}
                  onChange={(e) => setAboutData({ ...aboutData, essenceTag: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Salon Signature Quote
                </label>
                <input
                  type="text"
                  value={aboutData.quote}
                  onChange={(e) => setAboutData({ ...aboutData, quote: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Salon Essence Story
              </label>
              <textarea
                rows={3}
                value={aboutData.essenceStory}
                onChange={(e) => setAboutData({ ...aboutData, essenceStory: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Meet Preeti Title
              </label>
              <input
                type="text"
                value={aboutData.heading}
                onChange={(e) => setAboutData({ ...aboutData, heading: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Preeti Mandal Consultation Bio
              </label>
              <textarea
                rows={3}
                value={aboutData.description}
                onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* SECTION 7: CTA BANNER */}
        {activeSection === 'cta' && (
          <div className="space-y-6">
            <div className="border-b border-brand-blush/60 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-brand-plum">
                  Grand Transformation Booking Banner
                </h3>
                <p className="text-xs text-brand-plum/60">
                  Headline, subtext, and quick WhatsApp action buttons on the footer CTA.
                </p>
              </div>
              <button
                onClick={() => handleSaveSection('cta')}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-brand-plum bg-gradient-to-r from-[#FEE5C8] via-[#E5B57F] to-[#FEE5C8] hover:shadow-luxury transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Banner Changes'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Banner Headline
              </label>
              <input
                type="text"
                value={ctaData.title}
                onChange={(e) => setCtaData({ ...ctaData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Banner Subtext
              </label>
              <textarea
                rows={2}
                value={ctaData.subtext}
                onChange={(e) => setCtaData({ ...ctaData, subtext: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  Button 1: Online Booking
                </label>
                <input
                  type="text"
                  value={ctaData.buttonText}
                  onChange={(e) => setCtaData({ ...ctaData, buttonText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={ctaData.whatsappNumber}
                  onChange={(e) => setCtaData({ ...ctaData, whatsappNumber: e.target.value })}
                  placeholder="918810359438"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                  WhatsApp Button Text
                </label>
                <input
                  type="text"
                  value={ctaData.whatsappText}
                  onChange={(e) => setCtaData({ ...ctaData, whatsappText: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-sm bg-brand-ivory/30 focus:bg-white text-brand-plum focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
