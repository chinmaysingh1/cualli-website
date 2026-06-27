/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ---- Design tokens ------------------------------------------------
      // Warm, light, clinical-but-approachable palette.
      colors: {
        // Soft warm off-white canvas
        canvas: "#FAFAF8",
        // Terracotta / clay — the primary warm accent
        clay: {
          50: "#FBF6F1",
          100: "#F5E7DA",
          200: "#EACBB0",
          300: "#DDA982",
          400: "#CE8757",
          500: "#C06E3B",
          600: "#A65A2E",
          700: "#874827",
          800: "#6E3B22",
          900: "#5B321F",
        },
        // Sage / moss — the secondary earthy accent (signals biology + safety)
        sage: {
          50: "#F4F6F1",
          100: "#E5EADD",
          200: "#C9D4BC",
          300: "#A7B894",
          400: "#879B70",
          500: "#6E8257",
          600: "#586A45",
          700: "#475636",
          800: "#3A452D",
          900: "#303A26",
        },
      },
      fontFamily: {
        // Wired up by next/font in app/layout.js via the --font-sans variable.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        // Soft, neutral elevation for clean white surfaces.
        card: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -16px rgba(15,23,42,0.12)",
        "card-hover":
          "0 2px 4px rgba(15,23,42,0.05), 0 16px 40px -20px rgba(15,23,42,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
