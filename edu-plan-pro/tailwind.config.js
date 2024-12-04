/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'UNA-Red': '#A31E32',
        'UNA-Red-light': '#CD1719',
        'UNA-Pink-Light': '#D18F99',
        'UNA-Blue-Light': '#0C71C3',
        'UNA-Blue-Dark': '#2b3843',
        'Focus-Login-Red': '#931212',
        'UNA-Gray': '#A7A7A9',
        'UNA-Gray-Dark': '#747476'
      },
      animation: {
        'slow-spin': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};
