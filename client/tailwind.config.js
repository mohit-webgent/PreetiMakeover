/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: {
            DEFAULT: '#2D0C1E',
            deep: '#1A0611',
            light: '#4A1532',
            subtle: '#3A1027',
          },
          gold: {
            DEFAULT: '#C5A059',
            dark: '#A6833D',
            light: '#E2C88F',
            subtle: '#FAF3E3'
          },
          ivory: {
            DEFAULT: '#FAF7F2',
            warm: '#F5EFEB',
            pure: '#FFFFFF'
          },
          blush: {
            DEFAULT: '#F2DFD7',
            light: '#FBF5F2',
            rose: '#E8C4B8'
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(45, 12, 30, 0.08)',
        'luxury-lg': '0 25px 50px -12px rgba(45, 12, 30, 0.15)',
        'gold-glow': '0 0 25px -5px rgba(197, 160, 89, 0.3)',
      }
    },
  },
  plugins: [],
}
