/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bright-blue': '#00bfff',
        'bright-green': '#00ff57',
      },
      fontFamily: {
        'inter': 'Inter, sans-serif',
      },
    },
  },
  plugins: [],
}


