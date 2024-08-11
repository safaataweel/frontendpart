import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        babyPink: '#FEEBF3',
        pink: {
          500: '#ec4899',
          600: '#db2777',
        },
      },
    },
  },
  plugins: [
    forms,
  ],
};
