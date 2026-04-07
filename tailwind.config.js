/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        sans: ['"Planc Extra Light"', "sans-serif"],
        brand: ['"Ascent Pro"', "sans-serif"],
        alerta: ['"Allerta"', "sans-serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        spinSlow: "spinSlow 60s linear infinite",
      },
    },
  },
  plugins: [],
};
