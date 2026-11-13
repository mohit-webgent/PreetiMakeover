import { useEffect } from 'react';
import { SITE_URL } from '../../config/siteDefaults';

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page <title>, description, canonical, Open Graph and optional JSON-LD.
 * Renders nothing; updates <head> on mount and when inputs change.
 */
export default function Seo({ title, description, path = '/', image = '/og-preview.jpg', jsonLd }) {
  // Compare JSON-LD by value so inline objects don't re-run the effect every render
  const ldString = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const fullTitle = title ? `${title} | Preeti Makeover` : 'Preeti Makeover — Bridal Makeup & Beauty Salon in Badarpur, New Delhi';
    const url = `${SITE_URL}${path}`;
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setCanonical(url);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    let script;
    if (ldString) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'page';
      script.text = ldString;
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, image, ldString]);

  return null;
}
