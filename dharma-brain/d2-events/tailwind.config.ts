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
        linen: {
          DEFAULT: '#F7F5F1',
          50: '#fefdfb',
          100: '#F7F5F1',
          200: '#ece8e0',
        },
        ink: {
          DEFAULT: '#171614',
          700: '#2c2a26',
          900: '#171614',
        },
        teal: {
          50: '#e7f1ef',
          100: '#c7ded9',
          300: '#5f9d90',
          500: '#0F6B5C',
          600: '#0c574a',
          700: '#094238',
        },
        gold: {
          400: '#dcb857',
          500: '#C9A227',
          600: '#a1841f',
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
