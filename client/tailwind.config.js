/** @type {import('tailwindcss').Config} */
/*
 * Preeti Makeover — "Rose & gold" design tokens.
 * Calm, eye-friendly: rose-tinted pearl paper, aubergine ink (15:1, softer than pure black),
 * wine for actions, muted rose surfaces and the logo's antique gold for fine details only.
 *
 *   paper    page background          card     raised surfaces, inputs
 *   ink      text (DEFAULT 15:1 · soft 7.5:1 · faint 3.9:1 for placeholders/icons only)
 *   wine     primary actions & links  rose     tinted surfaces, borders
 *   gold     hairline details, stars   leaf     "open now", success
 *   wa       WhatsApp actions          night    footer
 *
 * `salon.*` is the previous palette name, kept as an alias (remapped to these colours)
 * because the admin panel still uses it.
 */
const palette = {
  paper: '#FAF6F5',
  card: '#FFFFFF',
  ink: { DEFAULT: '#2A1C24', soft: '#5E4A55', faint: '#8B7680' },
  wine: { DEFAULT: '#7D2E4A', deep: '#5E2137', soft: '#9B4A66' },
  rose: { DEFAULT: '#F1E4E6', light: '#F7EEEF', deep: '#E3CCD2', accent: '#C98A9B' },
  line: '#EADBDE',
  gold: { DEFAULT: '#A8834F', deep: '#86683C', soft: '#F3EADC' },
  leaf: '#2F6B4F',
  wa: { DEFAULT: '#0F7A5C', deep: '#0B5E47' },
  night: { DEFAULT: '#2A1520', soft: '#3A2230' }
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...palette,
        // Legacy aliases (admin panel)
        salon: {
          white: '#FFFFFF',
          babypink: { DEFAULT: palette.rose.DEFAULT, light: palette.rose.light, hover: palette.rose.deep },
          rose: { DEFAULT: palette.rose.accent, light: palette.rose.deep, dark: palette.wine.soft },
          berry: { DEFAULT: palette.wine.DEFAULT, deep: palette.wine.deep, light: palette.wine.soft, subtle: palette.night.DEFAULT },
          petal: { DEFAULT: palette.gold.DEFAULT, dark: palette.gold.deep, light: palette.gold.soft, subtle: '#FBF7F0' },
          blush: { DEFAULT: palette.rose.DEFAULT, light: palette.paper, accent: palette.rose.light },
          lavender: { DEFAULT: '#D9CBE3', light: '#F2ECF6', dark: '#8E79A3' },
          peach: { DEFAULT: '#F2D4C4', light: '#FAEDE6' },
          text: { DEFAULT: palette.ink.DEFAULT, muted: palette.ink.soft, light: palette.ink.faint }
        }
      },
      fontFamily: {
        // Mukta (Ek Type) for all text, Rozha One (Indian Type Foundry) for large display headings.
        // Both cover Latin and Devanagari.
        sans: ['Mukta', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Rozha One"', 'Georgia', 'serif'],
        serif: ['"Rozha One"', 'Georgia', 'serif'],
        script: ['"Rozha One"', 'Georgia', 'serif']
      },
      fontSize: {
        // Mobile-first reading sizes (body never below 17px, captions never below 13px)
        caption: ['0.8125rem', { lineHeight: '1.45' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        lead: ['1.1875rem', { lineHeight: '1.65' }],
        h3: ['1.3125rem', { lineHeight: '1.3' }],
        h2: ['clamp(1.875rem, 1.35rem + 2.2vw, 2.875rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h1: ['clamp(2.375rem, 1.6rem + 3.2vw, 3.875rem)', { lineHeight: '1.03', letterSpacing: '-0.015em' }]
      },
      borderRadius: {
        // Hierarchy: inputs/rows 14, cards 20, feature blocks 28; buttons are pills
        field: '14px',
        card: '20px',
        block: '28px'
      },
      boxShadow: {
        // Used only on elements that float above the page (header, tab bar, dialogs)
        float: '0 10px 30px -12px rgba(42, 28, 36, 0.22)',
        lift: '0 2px 10px -4px rgba(42, 28, 36, 0.12)',
        // Legacy (admin)
        luxury: '0 10px 30px -14px rgba(42, 28, 36, 0.18)',
        'luxury-lg': '0 18px 40px -16px rgba(42, 28, 36, 0.24)',
        'luxury-gold': '0 10px 30px -12px rgba(125, 46, 74, 0.35)',
        'rose-glow': '0 0 0 4px rgba(201, 138, 155, 0.25)',
        '2xs': '0 1px 3px rgba(42, 28, 36, 0.08)'
      },
      maxWidth: {
        content: '72rem',
        prose: '62ch'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
