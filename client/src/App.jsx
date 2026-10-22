import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileQuickBar from './components/layout/MobileQuickBar';
import Hero from './components/sections/Hero';
import ServicesSection from './components/sections/ServicesSection';
import BridalFeature from './components/sections/BridalFeature';
import BrandsShowcase from './components/sections/BrandsShowcase';
import GallerySection from './components/sections/GallerySection';
import AboutSection from './components/sections/AboutSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import BookingSection from './components/sections/BookingSection';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { api } from './services/api';

export default function App() {
  // Navigation / View State ('public' or 'admin')
  const [currentView, setCurrentView] = useState('public');

  // Admin Auth State
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('pm_admin_token'));
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('pm_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Public Catalog & Content State
  const [categories, setCategories] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);

  const [testimonials, setTestimonials] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  // Sync view with URL hash (e.g. #admin)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Validate existing admin token on mount
  useEffect(() => {
    if (adminToken) {
      api.getAdminMe(adminToken)
        .then((res) => {
          if (res?.data) {
            setAdminUser(res.data);
            sessionStorage.setItem('pm_admin_user', JSON.stringify(res.data));
          } else {
            handleLogout();
          }
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [adminToken]);

  // Fetch Public Data
  useEffect(() => {
    let isMounted = true;

    // Load Services
    api.getServices()
      .then((res) => {
        if (isMounted && res?.data) {
          setCategories(res.data);
          setServicesLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setServicesError(err.message);
          setServicesLoading(false);
        }
      });

    // Load Approved Testimonials
    api.getTestimonials()
      .then((res) => {
        if (isMounted && res?.data) {
          setTestimonials(res.data);
        }
      })
      .catch((err) => console.log('Testimonials fetch:', err.message));

    // Load Gallery
    api.getGallery()
      .then((res) => {
        if (isMounted && res?.data) {
          setGalleryImages(res.data);
        }
      })
      .catch((err) => console.log('Gallery fetch:', err.message));

    return () => {
      isMounted = false;
    };
  }, []);

  // Admin Auth Handlers
  const handleLoginSuccess = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
    sessionStorage.setItem('pm_admin_token', token);
    sessionStorage.setItem('pm_admin_user', JSON.stringify(user));
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setAdminToken(null);
    setAdminUser(null);
    sessionStorage.removeItem('pm_admin_token');
    sessionStorage.removeItem('pm_admin_user');
    window.location.hash = '';
    setCurrentView('public');
  };

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setCurrentView('public');
  };

  // Smooth scroll to booking
  const scrollToBooking = () => {
    if (currentView !== 'public') {
      navigateToPublic();
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    scrollToBooking();
  };

  const handleBridalEnquiry = () => {
    setSelectedService({
      id: null,
      name: 'Signature Bridal HD Makeup'
    });
    scrollToBooking();
  };

  // If Admin View is active
  if (currentView === 'admin') {
    if (adminToken && adminUser) {
      return (
        <AdminDashboard
          token={adminToken}
          admin={adminUser}
          onLogout={handleLogout}
          onBackToSite={navigateToPublic}
        />
      );
    }
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={navigateToPublic}
      />
    );
  }

  // Public Website View
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-brand-plum selection:bg-brand-gold/30 selection:text-brand-plum-deep flex flex-col font-sans">
      {/* Top Sticky Navigation */}
      <Navbar onBookClick={scrollToBooking} />

      {/* Main Public Website Sections */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 1. Hero Section matching PDF wireframe */}
        <Hero onBookClick={scrollToBooking} />

        {/* 2. Services Grid connected to Database Catalog */}
        <ServicesSection
          categories={categories}
          loading={servicesLoading}
          error={servicesError}
          onSelectService={handleSelectService}
        />

        {/* 3. Bridal & Occasion Makeover Banner */}
        <BridalFeature onBridalEnquiry={handleBridalEnquiry} />

        {/* 4. Confirmed Product Brands Showcase */}
        <BrandsShowcase />

        {/* 5. Salon Work Portfolio Gallery */}
        <GallerySection
          galleryImages={galleryImages}
          onBookClick={scrollToBooking}
        />

        {/* 6. About the Salon & Preeti Mandal Story */}
        <AboutSection />

        {/* 7. Client Reviews / Salon Standards */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 8. Interactive Appointment Booking & Location */}
        <BookingSection
          categories={categories}
          selectedService={selectedService}
          onClearSelectedService={() => setSelectedService(null)}
        />
      </main>

      {/* Footer matching PDF wireframe with discrete Admin link */}
      <Footer onAdminClick={navigateToAdmin} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar onBookClick={scrollToBooking} />
    </div>
  );
}
