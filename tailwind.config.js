/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  daisyui: {
    themes: ["cupcake"],
  },
  theme: {
    container: {
      padding: {
        // DEFAULT: "0px",
        // sm: "",
        // lg: "4rem",
        // xl: "5rem",
        // "2xl": "6rem",
      },
    },

    extend: {},
  },
  plugins: [require("daisyui")],
};
