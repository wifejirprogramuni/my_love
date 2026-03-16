/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wedding-bg': '#FDF9F3',
        'wedding-text': '#2C2C2C',
        'wedding-gold': '#C9A961',
        'wedding-terracotta': '#8B7355',
        'wedding-beige': '#E8D5C4',
        'wedding-light': '#FFF9F5',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
