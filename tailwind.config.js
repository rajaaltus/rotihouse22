module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif']
      },
      spacing: {
        "half-screen": "40rem"
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
