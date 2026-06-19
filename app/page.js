import Reveal from "@/components/Reveal";
import GlassCard from "@/components/GlassCard";
import CTAButton from "@/components/CTAButton";

const VALUE_PROPS = [
  {
    title: "Targeted Capture",
    body: "Engineered to specifically bind PFAS compounds within the gastrointestinal tract with high affinity — before they ever reach your bloodstream.",
    icon: "M12 2l2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1z",
  },
  {
    title: "Systemic Reduction",
    body: "By intercepting toxins early in digestion, we drastically reduce the absorption rate of forever chemicals into the human circulatory system.",
    icon: "M12 21s-7-4.35-9-9a5.5 5.5 0 019-4 5.5 5.5 0 019 4c-2 4.65-9 9-9 9z",
  },
  {
    title: "Daily Efficacy",
    body: "A simple, non-invasive oral therapeutic that integrates seamlessly into your daily health routine — protection that compounds over time.",
    icon: "M12 2v20M2 12h20",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pt-28 text-center">
        <Reveal as="div" delay={0.05}>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-bio">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-bio-emerald" />
            Synthetic Biology · Next-Gen Therapeutics
          </span>
        </Reveal>

        <Reveal as="h1" delay={0.12}>
          <h1 className="mx-auto mt-8 max-w-5xl text-balance text-6xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl md:text-[7.5rem]">
            Filter the{" "}
            <span className="text-bio glow-soft whitespace-nowrap">Forever.</span>
          </h1>
        </Reveal>

        <Reveal as="p" delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            Perfluoroalkyl substances (PFAS) are accumulating in our bodies.
            Cualli has engineered the first{" "}
            <span className="text-white">autonomous probiotic</span> designed to
            actively sequester environmental toxins in your gut — before they
            enter your bloodstream.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href="/science" className="group">
              Explore the Mechanism
            </CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Partner With Us
            </CTAButton>
          </div>
        </Reveal>

        {/* Scroll hint */}
        <Reveal delay={0.5}>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
              <span className="h-2 w-1 animate-pulse-glow rounded-full bg-white/60" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---- Value propositions ---- */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-4xl font-bold tracking-tight sm:text-5xl">
              A new standard of <span className="text-bio">defense.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-gray-400">
              Three principles guide every strand of our engineered biology.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((prop, i) => (
              <Reveal key={prop.title} delay={0.1 * i}>
                <GlassCard className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-bio-cyan ring-1 ring-white/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d={prop.icon}
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {prop.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-gray-400">
                    {prop.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="relative px-4 pb-12">
        <Reveal>
          <div className="glass-strong relative mx-auto max-w-5xl overflow-hidden rounded-5xl px-6 py-16 text-center sm:py-20">
            <div className="absolute -top-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-mesh-emerald opacity-40 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                The future of preventative health is{" "}
                <span className="text-bio">alive.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-gray-400">
                See how we engineer living filters from trusted biology — or
                reach out about partnership and investment.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <CTAButton href="/science">See the Science</CTAButton>
                <CTAButton href="/contact" variant="secondary">
                  Get in Touch
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
