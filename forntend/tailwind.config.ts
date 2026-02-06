import type { Config } from "tailwindcss";

const config: Config = {
 darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#ff0000',
            secondary: '#00ff00',
            tertiary: '#0000ff',
            quaternary: '#ff00ff',
            darkBg: '#121212',
        },
    },
  },
  plugins: [],
};
export default config;
