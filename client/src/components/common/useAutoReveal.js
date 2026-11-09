import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Adds a soft scroll-reveal to every <section> inside <main> (except the first one
 * on each page, which is above the fold). Re-runs on route change.
 */
export default function useAutoReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // Wait for the outgoing page's exit animation so we tag the new page's sections
    const timer = setTimeout(() => {
      // Home uses <section>s; other pages use top-level blocks inside the page root
      const pageRoot = document.querySelector('main > div > *');
      const blocks = pageRoot ? Array.from(pageRoot.children) : [];
      const sections = Array.from(new Set([...document.querySelectorAll('main section'), ...blocks]))
        .filter((el) => el.offsetHeight > 40 && !el.closest('[role="dialog"]'));
      sections.forEach((el, i) => {
        if (i === 0 || el.dataset.noReveal !== undefined) return;
        el.classList.add('reveal');
        io.observe(el);
      });
    }, 520);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [pathname]);
}
