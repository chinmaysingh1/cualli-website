"use client";

import { motion } from "framer-motion";

// A "living window into the technology": the Cualli reel loops continuously
// with no playback chrome, framed by a glowing refractive border.
export default function VideoWindow({ src = "/Cualli.mp4" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative mx-auto w-full max-w-5xl"
    >
      {/* Pulsing bioluminescent glow behind the frame */}
      <div className="absolute -inset-4 animate-pulse-glow rounded-[2.75rem] bg-bio-gradient opacity-30 blur-3xl" />

      {/* Refractive gradient border */}
      <div className="relative rounded-5xl bg-bio-gradient p-[1.5px] shadow-glow-lg">
        <div className="relative overflow-hidden rounded-[calc(2.75rem-1.5px)] bg-abyss-900">
          <video
            className="block h-full w-full object-cover"
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Cualli synthetic biology visualization"
          />
          {/* Glass sheen overlay so it reads as a window, not a media player */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0)_35%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[calc(2.75rem-1.5px)] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </motion.div>
  );
}
