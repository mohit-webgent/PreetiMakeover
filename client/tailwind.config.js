/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refined Premium Salon Palette
        salon: {
          white: '#FFFFFF',
          babypink: {
            DEFAULT: '#F8DDE5',
            light: '#FDF2F6',
            hover: '#F2CAD5'
          },
          rose: {
            DEFAULT: '#D98CA3',
            light: '#EBB6C4',
            dark: '#BF6B85'
          },
          maroon: {
            DEFAULT: '#641C32',
            deep: '#471222',
            light: '#7F2440',
            subtle: '#3B0E1B'
          },
          gold: {
            DEFAULT: '#C5A15A',
            dark: '#A6823B',
            light: '#E2CA94',
            subtle: '#FAF4E8'
          },
          blush: {
            DEFAULT: '#F8DDE5',
            light: '#FCEBF1',
            accent: '#FDEEF2'
          },
          text: {
            DEFAULT: '#30232A',
            muted: '#63535C',
            light: '#8F7E88'
          }
        },
        // Backward-compatibility aliases for brand palette
        brand: {
          plum: {
            DEFAULT: '#641C32',
            deep: '#471222',
            light: '#7F2440',
            subtle: '#3B0E1B',
          },
          gold: {
            DEFAULT: '#C5A15A',
            dark: '#A6823B',
            light: '#E2CA94',
            subtle: '#FAF4E8'
          },
          ivory: {
            DEFAULT: '#FCEBF1',
            warm: '#F8DDE5',
            pure: '#FFFFFF'
          },
          blush: {
            DEFAULT: '#F8DDE5',
            light: '#FCEAEF',
            rose: '#D98CA3'
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(100, 28, 50, 0.08)',
        'luxury-lg': '0 25px 50px -12px rgba(100, 28, 50, 0.16)',
        'gold-glow': '0 0 25px -5px rgba(197, 161, 90, 0.35)',
        'gold-card': '0 10px 30px -10px rgba(197, 161, 90, 0.2)',
        'rose-glow': '0 0 25px -5px rgba(217, 140, 163, 0.3)',
      }
    },
  },
  plugins: [],
}
