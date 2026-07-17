/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050d1f',
          900: '#0a1838',
          800: '#102249',
          700: '#162d5c',
          600: '#1d3a73',
          500: '#24498f',
          400: '#2f5ba8',
        },
        ink: {
          950: '#050d1f',
          900: '#0a1838',
          800: '#102249',
          700: '#162d5c',
          600: '#1d3a73',
          500: '#24498f',
        },
        gold: {
          50: '#fff9e6',
          100: '#fff0c2',
          200: '#ffe18a',
          300: '#ffd24d',
          400: '#f7c12e',
          500: '#e6a91c',
          600: '#c98812',
          700: '#a36c0f',
          800: '#7d5210',
          900: '#5c3e0d',
        },
        accent: {
          DEFAULT: '#f7c12e',
          soft: '#ffe18a',
          deep: '#a36c0f',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        gold: '0 0 40px -8px rgba(247, 193, 46, 0.5)',
        'gold-sm': '0 0 20px -6px rgba(247, 193, 46, 0.45)',
        glass: '0 8px 32px -4px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f7c12e 0%, #e6a91c 40%, #a36c0f 100%)',
        'gold-sheen': 'linear-gradient(120deg, #a36c0f 0%, #f7c12e 25%, #fff0c2 50%, #f7c12e 75%, #a36c0f 100%)',
        'navy-radial': 'radial-gradient(ellipse at top, #162d5c 0%, #0a1838 55%, #050d1f 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(247, 193, 46, 0.5)' },
          '50%': { boxShadow: '0 0 0 14px rgba(247, 193, 46, 0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2.4s ease-out infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
