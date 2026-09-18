// Generates /manifest.webmanifest. Compatible with static export — Next.js
// writes the file at build time.
export const dynamic = "force-static";

export default function manifest() {
  return {
    name: "Cualli — Engineered Living Medicine",
    short_name: "Cualli",
    description:
      "A programmable probiotic that captures PFAS forever chemicals in the gut and carries them out of the body.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090a",
    theme_color: "#07090a",
    lang: "en-US",
    categories: ["health", "medical", "science"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      // `any maskable` lets Android crop to its own shape; the artwork is
      // full-bleed on the ink canvas, so it survives an aggressive mask.
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
