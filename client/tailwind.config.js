/** @type {import('tailwindcss').Config} */
// Premium "girlish" salon palette: berry rose, rose-gold, petal pink, lavender & peach.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        salon: {
          white: '#FFFFFF',
          babypink: { DEFAULT: '#FCE1EC', light: '#FFF4F8', hover: '#F9CFE0' },
          rose: { DEFAULT: '#EE7FA8', light: '#F8BCD2', dark: '#D9578A' },
          maroon: { DEFAULT: '#A3245E', deep: '#6B1442', light: '#C2477F', subtle: '#4A0E30' },
          gold: { DEFAULT: '#D98C9F', dark: '#B4607A', light: '#F5C9D3', subtle: '#FFF1F5' },
          blush: { DEFAULT: '#FDE6EF', light: '#FFF6FA', accent: '#FFEFF5' },
          lavender: { DEFAULT: '#C9B3F2', light: '#EFE6FD', dark: '#9A7BD8' },
          peach: { DEFAULT: '#FFC9B5', light: '#FFE9DF' },
          text: { DEFAULT: '#3D2234', muted: '#765669', light: '#A68597' }
        },
        brand: {
          plum: { DEFAULT: '#A3245E', deep: '#6B1442', light: '#C2477F', subtle: '#4A0E30' },
          gold: { DEFAULT: '#D98C9F', dark: '#B4607A', light: '#F5C9D3', subtle: '#FFF1F5' },
          ivory: { DEFAULT: '#FFF6FA', warm: '#FDE6EF', pure: '#FFFFFF' },
          blush: { DEFAULT: '#FDE6EF', light: '#FFF4F8', rose: '#EE7FA8' }
        }
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        montserrat: ['"Poppins"', 'sans-serif'],
        inter: ['"Poppins"', 'sans-serif']
      },
      boxShadow: {
        luxury: '0 20px 40px -15px rgba(163, 36, 94, 0.14)',
        'luxury-lg': '0 28px 60px -15px rgba(163, 36, 94, 0.25)',
        'luxury-gold': '0 10px 30px -8px rgba(238, 127, 168, 0.55)',
        'gold-glow': '0 0 28px -4px rgba(238, 127, 168, 0.45)',
        'gold-card': '0 12px 32px -10px rgba(217, 140, 159, 0.35)',
        'rose-glow': '0 0 30px -5px rgba(238, 127, 168, 0.45)'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        shimmer: { '0%': { transform: 'translateX(-120%) skewX(-20deg)' }, '100%': { transform: 'translateX(220%) skewX(-20deg)' } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-40px) scale(1.08)' }, '66%': { transform: 'translate(-25px,20px) scale(0.95)' } },
        twinkle: { '0%,100%': { opacity: 0.2, transform: 'scale(0.7)' }, '50%': { opacity: 1, transform: 'scale(1.1)' } }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
        blob: 'blob 18s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
