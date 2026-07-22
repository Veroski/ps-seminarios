/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#F3EDE2',
        primary: '#0A0A0A',
        accent: '#0A0A0A',
        dark: '#262222',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Bodoni Moda"', 'serif'],
        brand: ['"Italiana"', 'serif'],
        mono: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
