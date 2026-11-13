import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { DEFAULT_SETTINGS, DEFAULT_STATS, STAT_ICONS } from '../config/siteDefaults';
import { deriveBusiness } from '../lib/business';

const SiteDataContext = createContext(null);

// After this long without data we assume the API is cold-starting and tell the visitor.
const SLOW_AFTER_MS = 6000;

/**
 * Loads all public data once (CMS copy, business settings, services, reviews, gallery)
 * and shares it with every page. Each part falls back to built-in defaults on failure.
 */
export function SiteDataProvider({ children }) {
  const [content, setContent] = useState({});
  const [contentLoaded, setContentLoaded] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [categories, setCategories] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  const refreshContent = useCallback(() => {
    return api.getContent()
      .then((res) => res?.data && setContent(res.data))
      .catch(() => {})
      .finally(() => setContentLoaded(true));
  }, []);

  const refreshSettings = useCallback(() => {
    return api.getSettings()
      .then((res) => res?.data && setSettings({ ...DEFAULT_SETTINGS, ...res.data }))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let alive = true;
    const slowTimer = setTimeout(() => alive && setSlow(true), SLOW_AFTER_MS);

    const jobs = [
      refreshContent(),
      refreshSettings(),
      api.getServices()
        .then((res) => alive && setCategories(res?.data || []))
        .catch((err) => alive && setServicesError(err.message))
        .finally(() => alive && setServicesLoading(false)),
      api.getTestimonials()
        .then((res) => alive && setTestimonials(res?.data || []))
        .catch(() => {})
        .finally(() => alive && setTestimonialsLoaded(true)),
      api.getGallery()
        .then((res) => alive && setGallery(res?.data || []))
        .catch(() => {})
        .finally(() => alive && setGalleryLoaded(true))
    ];

    Promise.allSettled(jobs).then(() => {
      clearTimeout(slowTimer);
      if (alive) setSlow(false);
    });

    return () => {
      alive = false;
      clearTimeout(slowTimer);
    };
  }, [refreshContent, refreshSettings]);

  const business = useMemo(() => deriveBusiness(settings), [settings]);

  const value = useMemo(() => ({
    content,
    contentLoaded,
    business,
    categories,
    servicesLoading,
    servicesError,
    testimonials,
    testimonialsLoaded,
    gallery,
    galleryLoaded,
    slow,
    refreshContent,
    refreshSettings
  }), [content, contentLoaded, business, categories, servicesLoading, servicesError, testimonials, testimonialsLoaded, gallery, galleryLoaded, slow, refreshContent, refreshSettings]);

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used inside <SiteDataProvider>');
  return ctx;
}

/** Display-ready business details: phone/WhatsApp links, hours, address, map URLs. */
export function useBusiness() {
  return useSiteData().business;
}

/** Social-proof stats (CMS "stats" section, else built-in defaults) with icons attached. */
export function useStats() {
  const { content } = useSiteData();
  return useMemo(() => {
    const items = Array.isArray(content?.stats?.items) && content.stats.items.length ? content.stats.items : DEFAULT_STATS;
    return items.slice(0, 4).map((s, i) => ({ ...s, icon: STAT_ICONS[i % STAT_ICONS.length] }));
  }, [content]);
}
