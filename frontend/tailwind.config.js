/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#071b4f',
        ink: '#111827',
        accent: '#ff7c3b',
        gold: '#c99b3f',
        warm: '#f5f2ed',
        smoke: '#f2f2f2',
      },
      fontFamily: {
        sans: ['Open Sans', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 22px 60px rgba(7, 27, 79, 0.12)',
        soft: '0 16px 40px rgba(17, 24, 39, 0.08)',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
}
