import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // لتفعيل dark mode باستخدام class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};

export default config;
