"use client";

import { motion } from "framer-motion";

// Scroll-triggered reveal. A quick, subtle fade-up as content enters view.
// `delay` lets callers gently stagger sibling elements.
export default function Reveal({
  children,
  delay = 0,
  y = 10,
  className = "",
  as = "div",
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
