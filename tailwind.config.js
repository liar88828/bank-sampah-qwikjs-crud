/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  daisyui: {
    themes: ["cupcake"],
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
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
