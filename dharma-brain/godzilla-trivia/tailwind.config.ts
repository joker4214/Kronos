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
        kaiju: {
          50: '#effef3',
          100: '#d9fee3',
          200: '#a6f7c1',
          300: '#6be99a',
          400: '#33d271',
          500: '#14b856', // radioactive green
          600: '#0a9445',
          700: '#0a7439',
          800: '#0c5c31',
          900: '#0b4c2a',
        },
        atomic: {
          orange: '#ff6a1a',
        },
      },
      fontFamily: {
        display: ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
