"use client";

import { motion } from "framer-motion";

// A clean window into the technology. The reel loops continuously with no
// playback chrome, framed by a simple rounded mask and a subtle border.
export default function VideoWindow({ src = "/Cualli.mp4" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
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
      </div>
    </motion.div>
  );
}
