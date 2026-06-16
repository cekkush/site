import frappeUIPreset from 'frappe-ui/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [frappeUIPreset],
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Living Data — electric indigo / violet neon on near-black
        ink: {
          950: '#05060d',
          900: '#080a16',
          850: '#0b0e1f',
          800: '#10142b',
          700: '#171c3a',
        },
        neon: {
          DEFAULT: '#7c5cff',
          50: '#f1eeff',
          100: '#e3dcff',
          200: '#c7baff',
          300: '#a691ff',
          400: '#8b6dff',
          500: '#7c5cff',
          600: '#6645f5',
          700: '#5634d6',
          800: '#452aac',
          900: '#382587',
        },
        cyan: {
          glow: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,92,255,0.25), 0 0 40px -8px rgba(124,92,255,0.55)',
        'glow-lg': '0 0 80px -12px rgba(124,92,255,0.6)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(5,6,13,0) 0%, rgba(5,6,13,1) 90%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseglow: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulseglow: 'pulseglow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
