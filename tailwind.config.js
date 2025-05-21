// tailwind.config.js
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'], // Enables class *and* attribute strategy
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
