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
        'east-glow':
          'radial-gradient(60% 60% at 50% 100%, rgba(246,160,74,0.55) 0%, rgba(236,178,76,0) 70%)',
      },
      boxShadow: {
        glow: '0 0 90px -22px rgba(246,160,74,0.55)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Drift only — translate + opacity. No scale(): scaling a blurred layer
        // forces a full re-rasterisation of the 40px blur every frame, which is
        // a per-frame paint on a fixed, always-on-screen element and the main
        // cause of rough-feeling scroll.
        aurora: {
          '0%,100%': {opacity: '0.55', transform: 'translate3d(0,0,0)'},
          '50%': {opacity: '0.9', transform: 'translate3d(0,-2%,0)'},
        },
      },
      animation: {
        aurora: 'aurora 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
