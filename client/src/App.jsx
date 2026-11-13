import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileTabBar from './components/layout/MobileTabBar';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import PageTransition from './components/common/PageTransition';
import ServerWakeNotice from './components/common/ServerWakeNotice';
import { ArchDefs } from './components/common/Arch';
import { SiteDataProvider, useSiteData } from './context/SiteDataContext';
import { api } from './services/api';

import HomePage from './pages/HomePage';

// Home is in the main bundle (first paint); every other page loads on demand.
const pageImports = {
  services: () => import('./pages/ServicesPage'),
  bridal: () => import('./pages/BridalPage'),
  gallery: () => import('./pages/GalleryPage'),
  about: () => import('./pages/AboutPage'),
  contact: () => import('./pages/ContactPage')
};
const ServicesPage = lazy(pageImports.services);
const BridalPage = lazy(pageImports.bridal);
const GalleryPage = lazy(pageImports.gallery);
const AboutPage = lazy(pageImports.about);
const ContactPage = lazy(pageImports.contact);
// The admin panel is large and only for the owner: never downloaded by visitors.
const AdminPage = lazy(() => import('./pages/AdminPage'));

/** Warm the page chunks once the browser is idle so navigation feels instant. */
function usePrefetchPages() {
  useEffect(() => {
    const run = () => Object.values(pageImports).forEach((load) => load().catch(() => {}));
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 2500);
    return () => clearTimeout(t);
  }, []);
}

function PageFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-rose-deep border-t-wine" aria-label="Loading" />
    </div>
  );
}

/** Admin session kept in sessionStorage so it ends when the browser tab closes. */
function useAdminSession() {
  const [token, setToken] = useState(() => sessionStorage.getItem('pm_admin_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('pm_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('pm_admin_token');
    sessionStorage.removeItem('pm_admin_user');
  }, []);

  const login = useCallback((newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    sessionStorage.setItem('pm_admin_token', newToken);
    sessionStorage.setItem('pm_admin_user', JSON.stringify(newUser));
  }, []);

  // Validate a stored token once on load
  useEffect(() => {
    if (!token) return;
    api.getAdminMe(token)
      .then((res) => {
        if (res?.data) {
          setUser(res.data);
          sessionStorage.setItem('pm_admin_user', JSON.stringify(res.data));
        } else {
          logout();
        }
      })
      .catch(logout);
  }, [token, logout]);

  return { token, user, login, logout };
}

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const admin = useAdminSession();
  const { refreshContent, refreshSettings } = useSiteData();
  usePrefetchPages();

  // Legacy hash link (#admin → /admin)
  useEffect(() => {
    if (window.location.hash === '#admin') {
      window.location.hash = '';
      navigate('/admin');
    }
  }, [navigate]);

  const onContentUpdated = useCallback(() => {
    refreshContent();
    refreshSettings();
  }, [refreshContent, refreshSettings]);

  return (
    <div className="flex min-h-screen flex-col">
      <ArchDefs />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] btn-primary">
        Skip to content
      </a>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={isAdminRoute ? 'admin' : location.pathname}>
            <Suspense fallback={<PageFallback />}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/bridal-makeup" element={<BridalPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/admin/*"
                  element={
                    <AdminPage
                      onContentUpdated={onContentUpdated}
                      adminToken={admin.token}
                      adminUser={admin.user}
                      onLoginSuccess={admin.login}
                      onLogout={admin.logout}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      {!isAdminRoute && (
        <>
          <Footer />
          <MobileTabBar />
          <FloatingWhatsApp />
          <ServerWakeNotice />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <AppLayout />
      </SiteDataProvider>
    </BrowserRouter>
  );
}
