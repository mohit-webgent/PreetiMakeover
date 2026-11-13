import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Title area for inner pages: breadcrumb, display title, short intro, optional actions.
 * Quiet on purpose: the page's own content (photos, services, booking) is the focus.
 */
export default function PageHeader({ crumb, title, intro, children, aside }) {
  return (
    <header className="border-b border-line bg-paper">
      <div className={`container-x pt-6 pb-10 sm:pt-10 sm:pb-14 ${aside ? 'grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center' : ''}`}>
        <div className={aside ? 'lg:col-span-7' : ''}>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true" className="text-ink-faint">/</span>
            <span className="text-ink" aria-current="page">{crumb}</span>
          </nav>
          <h1 className="mt-4 text-h1">{title}</h1>
          {intro && <p className="lead mt-4">{intro}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </header>
  );
}
