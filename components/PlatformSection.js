"use client";

import { useEffect, useState } from "react";
import {
  ColonizationFigure,
  IsothermFigure,
  MassBalanceFigure,
} from "@/components/figures";

const STEPS = [
  {
    n: 1,
    name: "Colonize",
    teaser: "A food-grade chassis establishes in the lower GI tract.",
    kicker: "Colonization",
    heading: "Engraftment without displacement",
    body: "The strain is selected for transient-to-stable engraftment in the colon at doses compatible with a daily capsule, without outcompeting resident commensals. Colonization is dose-dependent and reversible on withdrawal.",
    figLabel: "colonization — CFU / g stool over 14 d",
    Figure: ColonizationFigure,
  },
  {
    n: 2,
    name: "Capture",
    teaser: "Surface-displayed binding domains sequester long-chain PFAS.",
    kicker: "Capture",
    heading: "Affinity where the compound is",
    body: "Binding domains engineered for fluorinated tails are displayed on the cell surface, concentrating PFAS out of bile and luminal fluid. Affinity is tuned per chain length so PFOS and PFOA are captured preferentially.",
    figLabel: "binding isotherm — capture vs. free concentration",
    Figure: IsothermFigure,
  },
  {
    n: 3,
    name: "Clear",
    teaser: "Bound complexes exit with normal transit. Nothing accumulates.",
    kicker: "Clearance",
    heading: "One-way exit",
    body: "Sequestered PFAS leave the body with the cells that hold them. Because capture happens downstream of absorption, the recirculation loop is broken rather than merely slowed.",
    figLabel: "mass balance — dose in / stool out",
    Figure: MassBalanceFigure,
  },
];

const PILLARS = [
  {
    title: "Containment by design",
    body: "Auxotrophy and kill-switch logic bound the strain's persistence outside the gut.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </>
    ),
  },
  {
    title: "Measured, not assumed",
    body: "Clearance read out by LC-MS/MS on stool and serum across a dosing window.",
    icon: (
      <path d="M12 3c-3.2 3.4-5.5 6.4-5.5 9.3A5.5 5.5 0 0 0 17.5 12.3C17.5 9.4 15.2 6.4 12 3z" />
    ),
  },
  {
    title: "A platform, not a product",
    body: "Swap the binding domain and the same chassis addresses other persistent xenobiotics.",
    icon: (
      <>
        <path d="M4 19V5M4 19h16" />
        <path d="M8 16V9M13 16v-4M18 16V6" />
      </>
    ),
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function PlatformSection({ autoAdvance = true }) {
  const [step, setStep] = useState(1);
  // Any manual selection ends the carousel for the rest of the visit — once
  // someone is driving, the panel should not move under them.
  const [userPicked, setUserPicked] = useState(false);

  useEffect(() => {
    if (!autoAdvance || userPicked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setStep((s) => (s % STEPS.length) + 1),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(timer);
  }, [autoAdvance, userPicked]);

  const pick = (n) => {
    setUserPicked(true);
    setStep(n);
  };

  const current = STEPS[step - 1];
  const { Figure } = current;

  return (
    <section
      id="platform"
      className="anchor border-y border-mist-50/[0.07] bg-ink-900"
    >
      <div className="shell py-[clamp(72px,9vw,140px)]">
        <p className="eyebrow">02 — The platform</p>
        <h2 className="h2 mt-[18px] max-w-[24ch]">Three steps, one dose.</h2>

        <div className="mt-[clamp(32px,4vw,52px)] grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {STEPS.map((s) => {
            const on = s.n === step;
            return (
              <button
                key={s.n}
                type="button"
                aria-pressed={on}
                onClick={() => pick(s.n)}
                className={`rounded-2xl border p-[22px] text-left transition-all duration-300 hover:border-spore hover:shadow-glow ${
                  on
                    ? "border-spore bg-spore/[0.07] shadow-glow-lg"
                    : "border-mist-50/10 bg-ink-850"
                }`}
              >
                <span className="block font-mono text-[11px] tracking-[0.16em] text-spore">
                  STEP {String(s.n).padStart(2, "0")}
                </span>
                <span className="mt-3 block font-display text-2xl tracking-[-0.01em]">
                  {s.name}
                </span>
                <span className="mt-2 block text-sm leading-[1.55] text-mist-200">
                  {s.teaser}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 overflow-hidden rounded-[18px] border border-mist-50/10 bg-ink-850">
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {/* No aria-live here: the panel changes on its own every 6s, so a
                live region would talk over the user continuously. The step
                buttons carry aria-pressed, which announces the change when a
                user is the one making it. */}
            <div className="border-mist-50/[0.08] p-[clamp(24px,3.5vw,40px)] lg:border-r">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-clay-500">
                {current.kicker}
              </p>
              <h3 className="mt-3.5 font-display text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-0.02em]">
                {current.heading}
              </h3>
              <p className="mt-3.5 max-w-[46ch] text-[15.5px] leading-[1.6] text-mist-200">
                {current.body}
              </p>

              <div aria-hidden="true" className="mt-7 flex gap-2">
                {STEPS.map((s) => (
                  <span
                    key={s.n}
                    className="h-[3px] w-[34px] rounded-sm bg-spore transition-opacity duration-300"
                    style={{ opacity: s.n === step ? 1 : 0.18 }}
                  />
                ))}
              </div>
            </div>

            <figure className="m-0 flex min-h-[240px] flex-col justify-center gap-3 bg-ink-880 p-[clamp(16px,2vw,24px)]">
              <div className="w-full">
                <Figure />
              </div>
              <figcaption className="flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-600">
                <span className="text-mist-400">{current.figLabel}</span>
                <span>illustrative target profile — pre-clinical</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-3.5 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-mist-50/10 bg-ink-850 p-6 transition-all duration-300 hover:-translate-y-[3px] hover:border-spore hover:shadow-lift"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-spore"
              >
                {p.icon}
              </svg>
              <h3 className="mt-4 font-display text-xl font-medium tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-mist-200">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
