import Image from "next/image";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About",
  description:
    "Meet the founders of Cualli — a multidisciplinary team bridging synthetic biology, software, and hardware to reinvent preventative health.",
};

const FOUNDERS = [
  {
    name: "Osvaldo Linares-Gutierrez",
    role: "Co-Founder & CEO",
    img: "/Osvaldo.png",
  },
  { name: "Moiz Chomelawala", role: "Co-Founder & CFO", img: "/Moiz.jpeg" },
  { name: "Chinmay Singh", role: "Co-Founder & Co-CTO", img: "/Chinmay.jpg" },
  { name: "Alex Li", role: "Co-Founder & Co-CTO", img: "/Alex.JPG" },
];

export default function AboutPage() {
  return (
    <>
      {/* ---- Header ---- */}
      <section className="px-4 pt-40 text-center sm:pt-48">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-bio">
            Our Team
          </span>
        </Reveal>
        <Reveal delay={0.1} as="h1">
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.0] tracking-[-0.03em] sm:text-7xl">
            Driven by <span className="text-bio glow-soft">Innovation.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2} as="p">
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            We are a multidisciplinary team of biomedical engineers, software
            developers, and hardware specialists bridging the gap between
            synthetic biology and daily consumer health.
          </p>
        </Reveal>
      </section>

      {/* ---- Founders grid ---- */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              The <span className="text-bio">Founders</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={0.08 * i}>
                <article className="group relative overflow-hidden rounded-4xl p-px transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 rounded-4xl bg-bio-gradient opacity-20 transition-opacity duration-500 group-hover:opacity-60" />
                  <div className="glass relative overflow-hidden rounded-[calc(2rem-1px)]">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={f.img}
                        alt={f.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-abyss-900/20 to-transparent" />
                    </div>
                    <div className="relative p-5">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {f.name}
                      </h3>
                      <p className="mt-1 text-sm text-bio">{f.role}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
