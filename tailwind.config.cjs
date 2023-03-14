/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fontInter: ["Inter", "sans-serif"],
        fontLora: ["Lora", "serif"],
        fontInconsolata: ["Inconsolata", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
