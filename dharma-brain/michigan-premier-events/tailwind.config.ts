import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mist: {
          DEFAULT: '#F4F5F7',
          50: '#fcfcfd',
          100: '#F4F5F7',
          200: '#e6e8ec',
        },
        navy: {
          DEFAULT: '#14213D',
          700: '#1c2f56',
          900: '#14213D',
        },
        gold: {
          400: '#e0bb52',
          500: '#D4A017',
          600: '#ab7f12',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        display: ['var(--font-italiana)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
