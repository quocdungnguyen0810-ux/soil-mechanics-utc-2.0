import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe0fe',
          300: '#93cbfd',
          400: '#60aefa',
          500: '#3b8ff6',
          600: '#2570eb',
          700: '#1d5bd8',
          800: '#1e4aaf',
          900: '#1e408a',
          950: '#172854',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#bc24d0',
          700: '#9f1ab1',
          800: '#841891',
          900: '#6d1a75',
          950: '#47044e',
        },
        dark: {
          50: '#f6f6f9',
          100: '#ececf2',
          200: '#d5d5e2',
          300: '#b1b1c8',
          400: '#8686aa',
          500: '#676790',
          600: '#535277',
          700: '#444361',
          800: '#3b3a52',
          900: '#343347',
          950: '#0f0e17',
        },
        surface: {
          DEFAULT: '#1a1a2e',
          light: '#222240',
          lighter: '#2a2a4a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 143, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 143, 246, 0.4)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
