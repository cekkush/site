import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cosmos — deep, bluish night
        void: '#04060d',
        night: '#070b18',
        deep: '#0c1124',
        dusk: '#131b34',
        haze: '#1c2746',
        // East light — sunrise
        gold: {
          DEFAULT: '#ecb24c',
          soft: '#f6cf85',
          deep: '#cf9230',
        },
        amber: '#f6a04a',
        coral: '#ff7d55',
        ember: '#ff5a52',
        cream: '#fff3d8',
        // Ink / text
        ink: '#f5f2ea',
        mist: '#b3bad2',
        slate: '#79829f',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter2: '-0.035em',
      },
      maxWidth: {
        container: '88rem',
      },
      backgroundImage: {
        sunrise:
          'radial-gradient(125% 125% at 50% 118%, #ff7d55 0%, #f6a04a 20%, #ecb24c 36%, rgba(236,178,76,0) 60%)',
        'east-glow':
          'radial-gradient(60% 60% at 50% 100%, rgba(246,160,74,0.55) 0%, rgba(236,178,76,0) 70%)',
        'noise-fade':
          'linear-gradient(180deg, rgba(4,6,13,0) 0%, rgba(4,6,13,0.6) 60%, #04060d 100%)',
      },
      boxShadow: {
        glow: '0 0 90px -22px rgba(246,160,74,0.55)',
        'glow-sm': '0 0 44px -16px rgba(246,160,74,0.45)',
        ring: '0 0 0 1px rgba(255,255,255,0.08)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        floaty: {
          '0%,100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-12px)'},
        },
        shimmer: {
          '0%': {backgroundPosition: '0% 50%'},
          '100%': {backgroundPosition: '200% 50%'},
        },
        marquee: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-50%)'},
        },
        'spin-slow': {to: {transform: 'rotate(360deg)'}},
        aurora: {
          '0%,100%': {opacity: '0.55', transform: 'translate3d(0,0,0) scale(1)'},
          '50%': {opacity: '0.95', transform: 'translate3d(0,-2%,0) scale(1.06)'},
        },
        'pulse-ring': {
          '0%': {transform: 'scale(0.8)', opacity: '0.7'},
          '100%': {transform: 'scale(2.4)', opacity: '0'},
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        aurora: 'aurora 12s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
