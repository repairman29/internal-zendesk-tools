/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sesame: '#F5F4F0',
        matcha: '#80B670',
        fern: '#246041', 
        cactus: '#076539',
        mint: '#C7DFA4',
        pineapple: '#F0C945',
        licorice: '#33261D',
        coconut: '#FFFFFF',
        shamrock: '#54AC95'
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
} 