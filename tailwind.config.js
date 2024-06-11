/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
       primary_light:"#1E3A8A", //blue-900
        primary_dark:"#2563EB",//blue-600
        button_primary:"#2563EB",//blue-600
        button_hover:"#1E40AF",


      }
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/forms')
  ],
}

