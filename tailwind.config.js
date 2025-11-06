/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'school-blue': '#4A90E2',
        'school-light-blue': '#E3F2FD',
        'pastel-blue': '#B3D9FF',
      },
    },
  },
  plugins: [],
}

