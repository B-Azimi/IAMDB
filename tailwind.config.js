/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        play_red: "#CE1212",
      },
    },
  },
  plugins: [require("daisyui")],
};
