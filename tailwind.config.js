/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ---- Design tokens ------------------------------------------------
      colors: {
        abyss: {
          900: "#000000", // pure abyssal black
          800: "#040406",
          700: "#0A0A0C", // ultra-dark charcoal
          600: "#101014",
        },
        bio: {
          cyan: "#22E1D6", // bioluminescent cyan
          aqua: "#34D6FF",
          emerald: "#2BF5A0", // bioluminescent emerald
          deep: "#0E7C7B",
        },
      },
      fontFamily: {
        // Wired up by next/font in app/layout.js via the --font-sans variable.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // ---- Liquid-glass blur scale -------------------------------------
      backdropBlur: {
        xs: "2px",
        glass: "28px",
        heavy: "48px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 0 40px -8px rgba(34,225,214,0.35)",
        "glow-lg":
          "0 0 0 1px rgba(255,255,255,0.06), 0 20px 80px -20px rgba(43,245,160,0.35), 0 0 60px -10px rgba(34,225,214,0.35)",
        "inner-glass": "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      // ---- Gradient meshes ---------------------------------------------
      backgroundImage: {
        "bio-gradient":
          "linear-gradient(120deg, #22E1D6 0%, #34D6FF 45%, #2BF5A0 100%)",
        "glass-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0) 100%)",
        "mesh-cyan":
          "radial-gradient(closest-side, rgba(34,225,214,0.55), rgba(34,225,214,0))",
        "mesh-emerald":
          "radial-gradient(closest-side, rgba(43,245,160,0.45), rgba(43,245,160,0))",
        "mesh-aqua":
          "radial-gradient(closest-side, rgba(52,214,255,0.40), rgba(52,214,255,0))",
      },
      // ---- Motion -------------------------------------------------------
      keyframes: {
        "drift-a": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6vw,-4vh,0) scale(1.15)" },
          "66%": { transform: "translate3d(-4vw,5vh,0) scale(0.95)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.05)" },
          "50%": { transform: "translate3d(-7vw,6vh,0) scale(1.2)" },
        },
        "drift-c": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(0.9)" },
          "50%": { transform: "translate3d(5vw,-6vh,0) scale(1.1)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "drift-a": "drift-a 26s ease-in-out infinite",
        "drift-b": "drift-b 32s ease-in-out infinite",
        "drift-c": "drift-c 38s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
