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
          400: "#c4b5fd",
          600: "#7c3aed",
        },
        brass: {
          500: "#f59e0b",
          600: "#d97706",
        },
        scholar: {
          50: "#fef7ed",
        },
        astral: {
          900: "#1e293b",
          950: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
