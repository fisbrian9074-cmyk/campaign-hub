/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-crimson)"],
      },
      colors: {
        arcane: {
          400: "#60a5fa",
          600: "#2563eb",
        },
        brass: {
          500: "#f59e0b",
          600: "#d97706",
        },
        scholar: {
          50: "#f8fafc",
        },
        astral: {
          900: "#334155",
          950: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
