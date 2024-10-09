/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //use case, "font-95-gray"
        95: {
          gray: "#c0c0c0",
          darkgray: "#808080",
          navy: "#000080",
          cyan: "#008080",
          black: "#000000",
          white: "#ffffff",
        },
      },
      fontFamily: {
        MS95: ["msw", "sans-serif"],
        msdonchia: ["msdon", "sans-serif"],
      },
    },
  },
  plugins: [],
};
