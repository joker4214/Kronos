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
        gold: {
          50: '#fef9f3',
          100: '#fce7cc',
          200: '#f9d5a0',
          300: '#f0b86d',
          400: '#e49d47',
          500: '#d4a574', // Primary gold
          600: '#c2934f',
          700: '#9a6f38',
          800: '#6b4c2a',
          900: '#452f1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
