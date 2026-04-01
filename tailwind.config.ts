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
        /* ========== Primary Colors ========== */
        primary: {
          50: "var(--color-primary-50)",
          500: "var(--color-primary)",
          600: "var(--color-primary-600)",
          900: "var(--color-primary-900)",
        },
        /* ========== Secondary Colors ========== */
        secondary: {
          100: "var(--color-secondary-100)",
          500: "var(--color-secondary)",
          900: "var(--color-secondary-900)",
        },
        /* ========== Functional Colors ========== */
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        tertiary: "var(--color-tertiary)",
        info: "var(--color-info)",
        /* ========== Surface & Neutral ========== */
        surface: "var(--color-surface)",
        "surface-container": "var(--color-surface-container)",
        outline: "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",
        /* ========== Text Colors ========== */
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        /* ========== Background Colors ========== */
        bg: "var(--color-bg)",
        /* ========== Border Colors ========== */
        border: "var(--color-border)",
        /* ========== Button Colors ========== */
        "button-primary": "var(--color-button-primary)",
        "button-primary-hover": "var(--color-button-primary-hover)",
        "button-primary-text": "var(--color-button-primary-text)",
        "button-secondary": "var(--color-button-secondary)",
        "button-secondary-hover": "var(--color-button-secondary-hover)",
        "button-secondary-text": "var(--color-button-secondary-text)",
      },
    },
  },
  plugins: [],
};

export default config;
