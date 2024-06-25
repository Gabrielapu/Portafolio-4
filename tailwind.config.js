/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        company: {
          primary: '#FBD022',
          'primary-variant': '#F8B814',
          secondary: '#115093',
          'secondary-variant': '#114379',
          alternative: '#706CD6',
          'alternative-variant': '#5C58B4',
        }
      }
    },
  },
  plugins: [],
}

