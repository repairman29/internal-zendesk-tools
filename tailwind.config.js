/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        matcha: '#68A063',
        sesame: '#5D534A',
        fern: '#3B4A1C',
        shamrock: '#2E8B57',
        coconut: '#FFFDF9',
        pineapple: '#FFD700',
        licorice: '#1A1110',
        sage: '#B7C4B1',
        clay: '#B4A397',
        moss: '#4A5D23',
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
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