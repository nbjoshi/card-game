import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "beige-lighter": "#f3ebdf",
        "beige-light": "#ffe4c9",
        beige: "#ffead2",
        "fortnite-blue-light": "#dbdfea",
        "fortnite-blue": "#acb1d6",
        "fortnite-blue-dark": "#8294c4",
        "fortnite-blue-darker": "#265073",
        "fortnite-grey": "#c7c8cc",
      },
      fontFamily: {
        fortnite: ["Fortnite", "sans-serif"],
      },
      animation: {
        oscillate: "oscillate 1s ease-in-out infinite alternate",
        spin: "spin 0.8s ease-in-out infinite alternate",
      },
      keyframes: {
        oscillate: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-3px)" },
        },
      },
      boxShadow: {
        fortnite: "0.5rem 0.5rem var(--tw-shadow-color)",
        "fortnite-lg": "0.8rem 0.8rem var(--tw-shadow-color)",
      },
    },
  },
  plugins: [],
} satisfies Config;
