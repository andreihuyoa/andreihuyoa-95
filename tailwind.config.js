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
        website: {
          text: "var(--website-text)",
          "text-muted": "var(--website-text-muted)",
          "text-soft": "var(--website-text-soft)",
          background: "var(--website-background)",
          surface: "var(--website-surface)",
          "surface-muted": "var(--website-surface-muted)",
          "surface-soft": "var(--website-surface-soft)",
          border: "var(--website-border)",
          "border-strong": "var(--website-border-strong)",
          green: "var(--website-green)",
          "green-dot": "var(--website-green-dot)",
          "green-soft": "var(--website-green-soft)",
          orange: "var(--website-orange)",
        },
      },
      boxShadow: {
        website: "0 1px 0 var(--website-shadow)",
      },
      fontFamily: {
        MS95: ["msw", "sans-serif"],
        msdonchia: ["msdon", "sans-serif"],
      },
    },
  },
  plugins: [],
};
