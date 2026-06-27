"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#vision", label: "Vision" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#mechanism", label: "Mechanism" },
  { href: "#market", label: "Market" },
  { href: "#team", label: "Team" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("vision");

  // Scroll-spy: highlight the tab for whichever section is in view.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        {/* Logo */}
        <Link
          href="#vision"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Cualli home"
        >
          <Image
            src="/cualli_logo.webp"
            alt="Cualli"
            width={104}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={`Jump to ${link.label} section`}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-clay-50 text-clay-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`h-[2px] w-4 bg-slate-700 transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-[2px] w-4 bg-slate-700 transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] w-4 bg-slate-700 transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-label={`Jump to ${link.label} section`}
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
