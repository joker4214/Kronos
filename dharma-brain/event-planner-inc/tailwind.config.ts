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
        cream: {
          DEFAULT: '#F5F4F2',
          50: '#fefdfc',
          100: '#F5F4F2',
          200: '#ece9e4',
        },
        ink: {
          DEFAULT: '#1a1512',
          700: '#332a24',
          900: '#1a1512',
        },
        rust: {
          50: '#f6ede5',
          100: '#ecd9c9',
          300: '#c48a4f',
          500: '#833F11', // Primary — from theeplanner.com brand
          600: '#6b3410',
          700: '#552a0d',
        },
        rose: {
          400: '#d9628a',
          500: '#CC3366', // Accent — from theeplanner.com brand
          600: '#a82952',
        },
        stonegray: {
          400: '#8a9099',
          500: '#69727D', // Secondary — from theeplanner.com brand
          600: '#545b64',
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
