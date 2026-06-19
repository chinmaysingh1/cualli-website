import Reveal from "@/components/Reveal";
import GlassCard from "@/components/GlassCard";
import VideoWindow from "@/components/VideoWindow";
import CTAButton from "@/components/CTAButton";

export const metadata = {
  title: "The Science",
  description:
    "Cualli engineers FDA-recognized E. coli Nissle 1917 into living biological filters that sequester PFAS in the gut. A deep dive into our synthetic biology.",
};

const STATS = [
  { value: "EcN 1917", label: "FDA-recognized safe chassis" },
  { value: "Transporter", label: "Mediated PFAS uptake" },
  { value: "GI-stable", label: "Survives the gastric environment" },
];

export default function SciencePage() {
  return (
    <>
      {/* ---- Header ---- */}
      <section className="px-4 pt-40 text-center sm:pt-48">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-bio">
            The Mechanism
          </span>
        </Reveal>
        <Reveal delay={0.1} as="h1">
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.0] tracking-[-0.03em] sm:text-7xl">
            Precision <br className="hidden sm:block" />
            <span className="text-bio glow-soft">Synthetic Biology.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2} as="p">
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            A paradigm shift in preventative therapeutics. By engineering stable
            modifications into trusted bacterial chassis, we create living
            biosensors and filters.
          </p>
        </Reveal>
      </section>

      {/* ---- The Chassis ---- */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-bio-cyan">
                The Chassis
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                EcN 1917
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-400">
                <p>
                  We utilize the extensively studied and FDA-recognized safe
                  probiotic strain{" "}
                  <em className="not-italic text-white">
                    Escherichia coli Nissle 1917
                  </em>{" "}
                  (EcN). Unlike traditional probiotics that merely compete for
                  resources in the gut flora, our modified EcN is designed with a
                  highly specific mechanical purpose.
                </p>
                <p>
                  Because bacterial uptake of perfluoroalkyl substances is
                  primarily transporter-mediated, EcN serves as an ideal
                  biological chassis. It natively survives the harsh gastric
                  environment and colonizes the GI tract long enough to perform
                  its filtration duties before being naturally passed.
                </p>
              </div>

              <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-white/10 sm:grid-cols-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/[0.03] px-6 py-6 text-center"
                  >
                    <div className="text-xl font-semibold text-bio">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ---- Living window into the technology (video) ---- */}
      <section className="px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-bio-cyan">
                Engineering in Motion
              </p>
              <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                A living window into our{" "}
                <span className="text-bio">technology.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
                Watch our engineered biology intercept and sequester forever
                chemicals in real time — the filtration mechanism, alive.
              </p>
            </div>
          </Reveal>

          <VideoWindow src="/Cualli.mp4" />
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="px-4 pb-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Want the full data package?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
              We share detailed mechanism and pipeline information with
              prospective partners and investors.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton href="/contact">Request More Information</CTAButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
