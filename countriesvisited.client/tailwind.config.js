/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'], // Adjust paths based on your project structure
  theme: {
    extend: {
      colors: {
        primary: '#0f172a', // Similar to TailwindCSS's dark background
        secondary: '#1e293b', // Darker gray for components
        accent: '#38bdf8', // Accent color (blue)
        textPrimary: '#e2e8f0', // Light text color
        textSecondary: '#94a3b8', // Subtle text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter font for modern typography
      },
    },
  },
  plugins: [],
};
