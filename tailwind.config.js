/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ---- Design tokens ------------------------------------------------
      // Dark, near-black lab palette with a single bioluminescent accent.
      colors: {
        // Surfaces, darkest → lightest
        ink: {
          950: "#07090a", // page canvas
          900: "#090c0d", // alternating section band
          880: "#090d0e", // figure well
          850: "#0b0f10", // cards
          800: "#0f1614", // cell fill inside figures
        },
        // Text, brightest → faintest
        mist: {
          50: "#eaefec",
          200: "#b9c2bc",
          300: "#8b948f",
          400: "#7d8781",
          500: "#6e7873",
          600: "#5c6561",
        },
        // Primary accent — engineered-biology green
        spore: {
          DEFAULT: "#86e8a8",
          dim: "rgba(134,232,168,.18)",
        },
        // Secondary warm accent (terracotta), carried over from the earlier palette
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
        // Cool neutral greys for the desaturated "News / landscape" section,
        // which is deliberately styled as a newsprint record rather than a card grid.
        slab: {
          100: "#cfd3d4",
          300: "#8a8f92",
          400: "#6b7073",
          500: "#61666a",
          600: "#565b5e",
          700: "#4e5457",
          800: "#2c3032",
          850: "#262a2c",
          900: "#222527",
          925: "#171a1b",
          950: "#101213",
        },
      },
      fontFamily: {
        // Wired up by next/font in app/layout.js.
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1240px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        // Accent bloom used on hover for cards, pills and buttons.
        glow: "0 0 40px -14px var(--ac)",
        "glow-sm": "0 0 28px -10px var(--ac)",
        "glow-lg": "0 0 46px -16px var(--ac)",
        lift: "0 24px 60px -30px var(--ac), 0 0 40px -18px var(--ac)",
        "lift-lg": "0 26px 70px -34px var(--ac), 0 0 44px -18px var(--ac)",
        cta: "0 0 0 1px var(--ac), 0 22px 60px -18px var(--ac)",
        ring: "0 0 0 1px var(--ac), 0 0 36px -8px var(--ac)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        breathe: {
          "0%,100%": { opacity: ".55", transform: "scale(1)" },
          "50%": { opacity: ".9", transform: "scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        marquee: "marquee var(--ticker-dur, 48s) linear infinite",
        breathe: "breathe 9s ease-in-out infinite",
        "breathe-slow": "breathe 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
