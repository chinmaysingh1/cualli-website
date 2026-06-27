"use client";

import Link from "next/link";

// Clean call-to-action button. Primary is a solid warm clay fill; secondary is
// a quiet outlined button. Subtle color/shadow transitions only — no liquid
// hover tension or shifting gradients.
export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-200";

  const styles =
    variant === "primary"
      ? "bg-clay-500 text-white shadow-sm hover:bg-clay-600"
      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      <span>{children}</span>
      {variant === "primary" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}
