/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'UNA-Red': '#A31E32',
        'Focus-Login-Red': '#931212',
        'UNA-Gray': '#A7A7A9',
        'UNA-Gray-Dark': '#747476'
      },
      screens: {
        'Pc-Medium': '900px',
        'Pc-Small': '500px'
      }
    },
  },
  plugins: [],
};
