import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";

export const metadata = {
  title: "Contact",
  description:
    "Interested in partnership, investment, or our clinical timeline? Reach out to the Cualli team.",
};

export default function ContactPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <section className="px-4 pt-40 text-center sm:pt-48">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-bio">
            Get in Touch
          </span>
        </Reveal>
        <Reveal delay={0.1} as="h1">
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-bold leading-[1.0] tracking-[-0.03em] sm:text-7xl">
            Let&apos;s <span className="text-bio glow-soft">Connect.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2} as="p">
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            Interested in partnership opportunities, investment, or learning more
            about our clinical timeline? Reach out to our team below.
          </p>
        </Reveal>
      </section>

      {/* ---- Contact CTA ---- */}
      <section className="px-4 py-16 sm:py-20">
        <Reveal delay={0.1}>
          <div className="glass-strong relative mx-auto max-w-2xl overflow-hidden rounded-5xl px-6 py-16 text-center sm:py-20">
            <div className="absolute -top-1/2 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-mesh-cyan opacity-40 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Drop us a <span className="text-bio">line.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-gray-400">
                Send us a message and our team will get back to you shortly.
              </p>
              <div className="mt-10 flex justify-center">
                <CTAButton href="mailto:olinares@cualli.bio">
                  Contact Us
                </CTAButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
