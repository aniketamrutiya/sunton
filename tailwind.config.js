/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Fluent / Atlassian inspired enterprise palette
        enterprise: {
          50: '#f0f4f9',
          100: '#deebf7',
          200: '#c6dbef',
          300: '#9ecae1',
          400: '#6baed6',
          500: '#4292c6', // primary brand blue
          600: '#2171b5',
          700: '#08519c',
          800: '#08306b',
          900: '#031a49',
        },
        darkBg: {
          DEFAULT: '#0b0f19',
          card: '#161d30',
          border: '#232d45',
          hover: '#1e2942',
        }
      },
    },
  },
  plugins: [],
}
