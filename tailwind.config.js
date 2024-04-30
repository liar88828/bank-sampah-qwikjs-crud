/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2vw",
        sm: "3vw",
        md: "3vw",
        lg: "3vw",
        
      },
    },

    extend: {},
  },
  plugins: [require("daisyui")],
};
