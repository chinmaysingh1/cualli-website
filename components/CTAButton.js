"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Primary / secondary call-to-action button with liquid hover tension.
export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors";

  if (variant === "primary") {
    return (
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <Link
          href={href}
          className={`${base} group overflow-hidden text-abyss-900 shadow-glow ${className}`}
        >
          <span className="absolute inset-0 animate-gradient-pan bg-bio-gradient bg-[length:200%_200%]" />
          <span className="relative z-10 flex items-center gap-2">
            {children}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={`${base} glass text-white hover:bg-white/10 ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
