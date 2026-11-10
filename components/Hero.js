"use client";

import { useEffect, useRef } from "react";

const STATS = [
  {
    value: "97%",
    body: "of Americans carry measurable PFAS in their blood serum",
    source: "CDC / NHANES",
  },
  {
    value: "45%",
    body: "of sampled U.S. tap water contained at least one PFAS compound",
    source: "USGS, 2023",
  },
  {
    value: "3–7",
    unit: " yrs",
    body: "serum half-life of PFOA and PFOS in the human body",
    source: "published estimates",
  },
  {
    value: "0",
    accent: true,
    body: "approved therapeutics that reduce PFAS body burden",
    source: "the opening",
    sourceWarm: true,
  },
];

export default function Hero() {
  const heroRef = useRef(null);
  const lightRef = useRef(null);

  // The ambient glow drifts toward the cursor. Pointer-only flourish: it is
  // never required to read the section, and touch devices simply keep the
  // centred resting position.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (event) => {
      const light = lightRef.current;
      if (!light) return;
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height * 0.42;
      light.style.transform = `translate(${x}px, ${y}px)`;
    };

    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="anchor relative overflow-hidden border-b border-mist-50/[0.07]"
    >
      {/* Breathing accent glow */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] -ml-[550px] -mt-[550px] h-[1100px] w-[1100px] animate-breathe transition-transform duration-[450ms] ease-[cubic-bezier(.2,.6,.2,1)]"
        style={{
          background:
            "radial-gradient(circle, rgba(134,232,168,.20) 0%, rgba(134,232,168,.07) 34%, rgba(7,9,10,0) 66%)",
        }}
      />
      {/* Faint lab graph paper, masked to a soft circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(234,239,236,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(234,239,236,.045) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(circle at 50% 40%, #000 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 40%, #000 0%, transparent 72%)",
        }}
      />

      <div className="shell relative pb-12 pt-[clamp(72px,11vw,160px)] sm:pb-16 lg:pb-[88px]">
        <p className="label flex items-center gap-3 text-[12px] tracking-[0.2em] text-spore">
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] rounded-full bg-spore shadow-[0_0_14px_var(--ac)]"
          />
          Engineered living medicine · pre-clinical
        </p>

        <h1 className="mt-[clamp(20px,3vw,34px)] max-w-[17ch] font-display text-[clamp(42px,7.4vw,104px)] font-medium leading-[0.96] tracking-[-0.03em] [text-wrap:balance]">
          Filter the Forever
        </h1>

        <p className="mt-[clamp(22px,3vw,32px)] max-w-[58ch] text-[clamp(16px,1.5vw,20px)] leading-relaxed text-mist-200 [text-wrap:pretty]">
          PFAS get into people and then they stay. We&apos;re building a
          probiotic you swallow that catches them in your gut and carries them
          out, so the stuff doesn&apos;t keep circling back.
        </p>

        <div className="mt-[clamp(28px,4vw,44px)] flex flex-wrap gap-3.5">
          <a
            href="#platform"
            className="inline-flex items-center gap-2.5 rounded-full bg-spore px-[22px] py-3.5 text-[15px] font-semibold text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cta"
          >
            See the mechanism
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
          <a
            href="#news"
            className="inline-flex items-center gap-2.5 rounded-full border border-mist-50/[0.22] px-[22px] py-3.5 text-[15px] text-mist-50 transition-all duration-200 hover:border-mist-50/50 hover:bg-mist-50/5"
          >
            The current landscape
          </a>
        </div>

        {/* Hairline-separated stat grid: 1px gaps over a light background read
            as dividers without extra border juggling at every breakpoint. */}
        <dl className="mt-[clamp(56px,7vw,96px)] grid gap-px overflow-hidden rounded-2xl border border-mist-50/10 bg-mist-50/10 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {STATS.map((stat) => (
            <div
              key={stat.source}
              className="bg-ink-950 px-[22px] py-6 transition-colors duration-300 hover:bg-spore/[0.05]"
            >
              <dt
                className={`font-display text-[clamp(34px,4vw,48px)] leading-none tracking-[-0.02em] ${
                  stat.accent ? "text-spore" : ""
                }`}
              >
                {stat.value}
                {stat.unit && (
                  <span className="text-[0.45em] tracking-normal text-mist-200">
                    {stat.unit}
                  </span>
                )}
              </dt>
              <dd className="mt-2.5 text-sm leading-normal text-mist-200">
                {stat.body}
                <span
                  className={`mt-3 block font-mono text-[10.5px] uppercase tracking-[0.12em] ${
                    stat.sourceWarm ? "text-clay-500" : "text-mist-500"
                  }`}
                >
                  {stat.source}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
