import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5CE1E6", // Custom blue
        secondary: "#222222", // Custom purple
        accent: "#1BC4CD", // Custom yellow
        font: "#F7F7F7", // Custom gray
        font2: "#000000A1", // Custom gray more opacity
      },
      fontFamily: {
        garet: ["Garet", "sans-serif"],
        waterlily: ["Waterlily", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
