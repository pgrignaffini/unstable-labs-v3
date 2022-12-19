/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minWidth: { "1/5": "20%" },
    screens: {
      '3xl': '1600px',
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        'tremble': 'shake 0.5s infinite',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
          '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
          '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
          '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
          '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
          '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
          '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
          '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
          '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
          '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
          '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
        },
      },
      fontFamily: {
        'sans': ['"Press Start 2P"', ...defaultTheme.fontFamily.sans],
        'tinos': ['"Tinos"', ...defaultTheme.fontFamily.serif],
        'book': ['"Goudy Bookletter 1911', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'acid': '#b4e61d',
        'dark-acid': '#354407',
        'std': '#9ca3af',
        'paper': '#F0E1B2',
        'dark-paper': '#BBA469',
      },
    }
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar-hide')
  ],
};
