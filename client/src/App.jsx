import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileQuickBar from './components/layout/MobileQuickBar';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import BotanicalLeaves from './components/common/BotanicalLeaves';

// Multi-Page Routes
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BridalPage from './pages/BridalPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

import { api } from './services/api';

function AppLayout({ 
  categories, 
  servicesLoading, 
  servicesError, 
  testimonials, 
  galleryImages, 
  selectedService, 
  setSelectedService,
  adminToken,
  adminUser,
  handleLoginSuccess,
  handleLogout
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Handle legacy hash migration (#admin -> /admin)
  useEffect(() => {
    if (window.location.hash === '#admin') {
      window.location.hash = '';
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-salon-blush text-salon-text font-sans antialiased selection:bg-salon-gold/30 selection:text-salon-maroon">
      <ScrollToTop />
      {/* Global Botanical Watermarks across all pages */}
      <BotanicalLeaves variant="corners" className="fixed inset-0 pointer-events-none z-0 opacity-70" />

      {/* Public Header Navigation (Hidden on Admin portal for clean workspace) */}
      {!isAdminRoute && <Navbar />}

      {/* Main Multi-page Routes */}
      <main className="flex-1 pb-20 md:pb-0">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                categories={categories} 
                testimonials={testimonials} 
                galleryImages={galleryImages} 
                onSelectService={(s) => setSelectedService(s)} 
              />
            } 
          />

          <Route 
            path="/services" 
            element={
              <ServicesPage 
                categories={categories} 
                loading={servicesLoading} 
                error={servicesError} 
                onSelectService={(s) => setSelectedService(s)} 
              />
            } 
          />

          <Route 
            path="/bridal-makeup" 
            element={
              <BridalPage 
                onSelectService={(s) => setSelectedService(s)} 
              />
            } 
          />

          <Route 
            path="/gallery" 
            element={
              <GalleryPage 
                galleryImages={galleryImages} 
              />
            } 
          />

          <Route 
            path="/about" 
            element={<AboutPage />} 
          />

          <Route 
            path="/contact" 
            element={
              <ContactPage 
                categories={categories} 
                selectedService={selectedService} 
                onClearSelectedService={() => setSelectedService(null)} 
              />
            } 
          />

          <Route 
            path="/admin/*" 
            element={
              <AdminPage 
                adminToken={adminToken} 
                adminUser={adminUser} 
                onLoginSuccess={handleLoginSuccess} 
                onLogout={handleLogout} 
              />
            } 
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Public Footer & Floating Mobile Bar */}
      {!isAdminRoute && (
        <>
          <Footer />
          <MobileQuickBar />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
}

export default function App() {
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

  // Fetch Public Catalog Data from API
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

    // Load Active Gallery Images
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
  };

  const handleLogout = () => {
    setAdminToken(null);
    setAdminUser(null);
    sessionStorage.removeItem('pm_admin_token');
    sessionStorage.removeItem('pm_admin_user');
  };

  return (
    <BrowserRouter>
      <AppLayout 
        categories={categories}
        servicesLoading={servicesLoading}
        servicesError={servicesError}
        testimonials={testimonials}
        galleryImages={galleryImages}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        adminToken={adminToken}
        adminUser={adminUser}
        handleLoginSuccess={handleLoginSuccess}
        handleLogout={handleLogout}
      />
    </BrowserRouter>
  );
}
