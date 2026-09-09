import Image from "next/image";
import Reveal from "@/components/Reveal";
import GlassCard from "@/components/GlassCard";
import LazyVideoWindow from "@/components/LazyVideoWindow";
import CTAButton from "@/components/CTAButton";

// Static image imports let Next.js generate a low-res blurDataURL at build time
// (the blur placeholder works even with static export / unoptimized images) and
// bake in intrinsic width/height to prevent layout shift (CLS).
import osvaldoImg from "@/public/team/osvaldo.webp";
import chinmayImg from "@/public/team/chinmay.webp";
import alexImg from "@/public/team/alex.webp";

// ---- Section data ----------------------------------------------------------

const PROBLEM_STATS = [
  {
    value: "15,000+",
    label: "variants of PFAS 'forever chemicals' now exist in the environment",
  },
  {
    value: "98%",
    label: "of Americans carry PFAS in their bloodstream",
  },
  {
    value: "Persistent",
    label:
      "PFAS resist breakdown, accumulating in the body and water supply for decades",
  },
];

const ROADMAP = [
  {
    phase: "B2G",
    title: "Government & Defense",
    body: "Institutional contracts with partners such as the Department of Defense, where PFAS exposure is a documented operational and health concern.",
  },
  {
    phase: "B2B",
    title: "Municipal Utilities",
    body: "Partnerships with water authorities like OWASA to address PFAS exposure at the community scale.",
  },
  {
    phase: "B2C",
    title: "Consumer Living Medicine",
    body: "A daily, accessible probiotic — living medicine that protects individuals and families as part of an everyday health routine.",
  },
];

const FOUNDERS = [
  { name: "Osvaldo Linares Gutiérrez", role: "Co-Founder", img: osvaldoImg },
  { name: "Chinmay Singh", role: "Co-Founder", img: chinmayImg },
  { name: "Jinghan (Alex) Li", role: "Co-Founder", img: alexImg },
];

// ---- Page ------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* ============================ VISION / HERO ====================== */}
      <section
        id="vision"
        className="relative flex min-h-[88svh] flex-col items-center justify-center px-4 py-24 text-center"
      >
        <Reveal as="div">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-clay-500" />
            Programmable Intestinal Microbiome
          </span>
        </Reveal>

        <Reveal
          as="h1"
          delay={0.06}
          className="mx-auto mt-7 max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
        >
          Filter the{" "}
          <span className="text-clay-600">Forever.</span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.12}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
        >
          Cualli engineers a programmable probiotic that works from the inside
          out — a living medicine designed to capture environmental toxins in the
          gut and clear them from the body, safely and naturally.
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href="#solution">See How It Works</CTAButton>
            <CTAButton href="#market" variant="secondary">
              Partner With Us
            </CTAButton>
          </div>
        </Reveal>
      </section>

      {/* ============================ THE PROBLEM ======================== */}
      <section id="problem" className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="eyebrow">The Problem</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Forever chemicals are everywhere — including inside us.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              PFAS — per- and polyfluoroalkyl substances — are a class of
              synthetic chemicals built to never break down. They have spread
              through our water, soil, and food, and they accumulate in the
              human body with no natural path to clear them.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PROBLEM_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={0.06 * i}>
                <GlassCard className="h-full">
                  <div className="text-4xl font-bold tracking-tight text-clay-600">
                    {stat.value}
                  </div>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {stat.label}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ THE SOLUTION ======================= */}
      <section id="solution" className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="eyebrow">The Solution</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Internal remediation.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  Instead of only cleaning the environment around us, Cualli
                  cleans the body from within. Our programmable probiotic is
                  designed to capture PFAS directly in the gut — before it
                  enters circulation — and carry it out of the body.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  The result is a simple, non-invasive way to lower the body's
                  PFAS burden over time: a living filter, taken as a daily
                  probiotic.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-sage-200 bg-sage-50 px-4 py-2 text-sm font-medium text-sage-700">
                    Non-invasive
                  </span>
                  <span className="rounded-full border border-sage-200 bg-sage-50 px-4 py-2 text-sm font-medium text-sage-700">
                    Lowers body burden
                  </span>
                  <span className="rounded-full border border-sage-200 bg-sage-50 px-4 py-2 text-sm font-medium text-sage-700">
                    Living medicine
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <LazyVideoWindow src="/Cualli.mp4" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ MARKET & ROADMAP =================== */}
      <section id="market" className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="eyebrow">Market &amp; Roadmap</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              From institutions to households.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Our path begins with the partners who feel the PFAS problem most
              acutely, then expands into everyday consumer health.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ROADMAP.map((item, i) => (
              <Reveal key={item.phase} delay={0.08 * i}>
                <GlassCard className="h-full">
                  <span className="inline-flex rounded-full bg-clay-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-clay-700">
                    {item.phase}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TEAM ============================== */}
      <section id="team" className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal>
              <span className="eyebrow">The Team</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                The people building Cualli.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                A multidisciplinary founding team — supported by experienced
                scientific and industry advisors — bridging synthetic biology,
                engineering, and operations.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={0.06 * i}>
                <article className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={f.img}
                      alt={`${f.name}, ${f.role} of Cualli`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="blur"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                      {f.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-clay-600">
                      {f.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Closing CTA */}
          <Reveal delay={0.1}>
            <div className="mt-16 rounded-2xl border border-slate-100 bg-white px-6 py-14 text-center shadow-card sm:py-16">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Let&apos;s build a cleaner future together.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                Interested in partnership, investment, or learning more about our
                timeline? We&apos;d love to hear from you.
              </p>
              <div className="mt-8 flex justify-center">
                <CTAButton href="mailto:olinares@cualli.bio">
                  Get in Touch
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
