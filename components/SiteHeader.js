"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import wordmark from "@/public/cualli_wordmark.png";

// Section order drives both the nav and the scroll spy. `plain` marks the News
// section, whose indicator stays neutral grey to match its desaturated styling.
const NAV = [
  { id: "home", label: "Home" },
  { id: "science", label: "Science" },
  { id: "platform", label: "Platform" },
  { id: "team", label: "Team" },
  { id: "news", label: "News", plain: true },
  { id: "awards", label: "Awards" },
];

const SPY_IDS = [...NAV.map((n) => n.id), "contact"];

export default function SiteHeader() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    // A narrow band across the middle of the viewport: whichever section
    // crosses it owns the indicator.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-[60] border-b border-mist-50/[0.09] bg-ink-950/[0.78] backdrop-blur-lg">
      <div className="mx-auto flex max-w-shell items-center gap-6 px-4 py-3 sm:px-8 lg:px-10">
        <a
          href="#home"
          className="flex flex-none items-center"
          aria-label="Cualli home"
        >
          <Image
            src={wordmark}
            alt="Cualli"
            priority
            className="block h-[26px] w-auto object-contain"
            style={{ height: 26, width: "auto" }}
          />
        </a>

        <nav
          aria-label="Sections"
          className="label flex flex-1 items-center gap-3.5 overflow-x-auto text-[12.5px] tracking-[0.1em] [scrollbar-width:none] sm:gap-5 lg:gap-7 [&::-webkit-scrollbar]:hidden"
        >
          {NAV.map(({ id, label, plain }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center gap-[7px] whitespace-nowrap text-mist-200 transition-colors hover:text-mist-50"
              >
                <span
                  aria-hidden="true"
                  className={`h-[5px] w-[5px] rounded-full transition-opacity duration-300 ${
                    plain ? "bg-[#9aa0a4]" : "bg-spore shadow-[0_0_10px_var(--ac)]"
                  }`}
                  style={{ opacity: isActive ? 1 : 0.14 }}
                />
                {label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="label flex-none rounded-full border border-mist-50/[0.22] px-4 py-2.5 text-[12.5px] tracking-[0.08em] text-mist-50 transition-all duration-200 hover:border-spore hover:text-spore hover:shadow-ring"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
