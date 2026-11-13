/**
 * Built-in defaults used until (or if) the API responds.
 * Live values come from Admin → Settings (business details) and Admin → Website Content (copy & stats).
 */
import { Award, Crown, Sparkles, Star } from 'lucide-react';

export const SITE_URL = 'https://preetimakeover.com';

export const DEFAULT_SETTINGS = Object.freeze({
  businessName: 'Preeti Makeover',
  tagline: 'Your Beauty Is Our Duty.',
  ownerName: 'Preeti Mandal',
  phone: '+918810359438',
  whatsapp: '+918810359438',
  email: 'preetimakeoverpm@gmail.com',
  address: 'D/109, Gali No. 5, Prince Colony, Harinagar, Jaitpur, Badarpur, New Delhi – 110044',
  openingHour: '10:00 AM',
  closingHour: '09:00 PM',
  weeklyOffDay: 'Tuesday',
  googleMapsUrl: null
});

/**
 * Social-proof figures shown in the hero. ONE source of truth: every place that quotes a
 * number reads it from here (or from the CMS "stats" section, which overrides these).
 * Keep these honest — they must match what the salon can actually back up.
 */
export const DEFAULT_STATS = Object.freeze([
  { number: '10+', label: 'Years Experience', sub: 'Founded by Preeti Mandal' },
  { number: '1,200+', label: 'Happy Brides', sub: 'Signature HD Glamour' },
  { number: '27+', label: 'Salon Services', sub: 'Hair, Skin & Bridal' },
  { number: '4.9★', label: 'Client Rating', sub: 'Google & Direct Reviews' }
]);

export const STAT_ICONS = [Award, Crown, Sparkles, Star];
