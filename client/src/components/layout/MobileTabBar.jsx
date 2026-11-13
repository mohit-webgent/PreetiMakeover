import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, CalendarPlus, Crown, Images } from 'lucide-react';

const TABS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Services', path: '/services', icon: Sparkles },
  { label: 'Book', path: '/contact', icon: CalendarPlus, primary: true },
  { label: 'Bridal', path: '/bridal-makeup', icon: Crown },
  { label: 'Gallery', path: '/gallery', icon: Images }
];

/** App-style bottom navigation for phones and tablets: every page is one thumb-tap away. */
export default function MobileTabBar() {
  return (
    <nav
      aria-label="Main"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(42,28,36,0.35)]"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {TABS.map(({ label, path, icon: Icon, primary }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `flex h-16 flex-col items-center justify-center gap-1 text-caption font-medium transition-colors ${
                  primary ? 'text-wine' : isActive ? 'text-wine' : 'text-ink-faint hover:text-ink-soft'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {primary ? (
                    <span className={`-mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-wine text-white shadow-float ${isActive ? 'ring-4 ring-rose' : ''}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                  ) : (
                    <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.25 : 1.75} />
                  )}
                  <span className={primary ? 'font-semibold' : ''}>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
