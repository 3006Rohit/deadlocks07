/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        spartan: ['"League Spartan"', "sans-serif"],
        helveticaCompressed: ['"Helvetica Compressed"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
      screens: {
        custom: "1100px",
      },
    },
  },
  plugins: [],
};
