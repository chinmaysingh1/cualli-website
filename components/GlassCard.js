"use client";

import { motion } from "framer-motion";

// Liquid-glass card. On hover it gently scales and reveals a shifting
// bioluminescent gradient underneath to simulate fluid surface tension.
export default function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative overflow-hidden rounded-4xl p-px ${className}`}
    >
      {/* Refractive gradient ring that brightens on hover */}
      <div className="absolute inset-0 rounded-4xl bg-bio-gradient opacity-20 transition-opacity duration-500 group-hover:opacity-60" />

      {/* Inner glass surface */}
      <div className="glass relative h-full rounded-[calc(2rem-1px)] p-8">
        {/* Fluid sheen that drifts across the surface on hover */}
        <div className="pointer-events-none absolute -inset-x-10 -top-24 h-40 -rotate-12 bg-glass-sheen opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
