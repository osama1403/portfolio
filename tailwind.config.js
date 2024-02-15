/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary:'rgb(0, 183, 255)',
        primaryBG:'#010215'
      },
      fontFamily:{
        Montserrat:'Montserrat, sans-serif'
      }

    },
  },
  plugins: [],
}

