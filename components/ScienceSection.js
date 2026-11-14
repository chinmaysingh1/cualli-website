import { LumenFigure } from "@/components/figures";

const TAGS = [
  "Enterohepatic recirculation",
  "Fluorophilic binding",
  "Fecal clearance",
];

export default function ScienceSection() {
  return (
    <section id="science" className="anchor shell py-[clamp(72px,9vw,140px)]">
      <div className="grid items-center gap-8 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] lg:gap-[72px]">
        <div>
          <p className="eyebrow">01 — The science</p>
          <h2 className="h2 mt-[18px] max-w-[20ch]">
            PFAS don&apos;t break down. They circulate.
          </h2>
          <p className="mt-[22px] max-w-[52ch] text-[16.5px] leading-[1.65] text-mist-200 [text-wrap:pretty]">
            Per- and polyfluoroalkyl substances bind serum proteins and re-enter
            the gut through bile, where they are reabsorbed rather than
            excreted. That loop is why exposure measured once persists for
            years.
          </p>
          <p className="mt-[18px] max-w-[52ch] text-[16.5px] leading-[1.65] text-mist-200 [text-wrap:pretty]">
            Cualli interrupts the loop at the lumen. A colonizing probiotic
            chassis presents high-affinity binding domains for long-chain PFAS,
            holds them through transit, and leaves with the stool.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.1em]">
            {TAGS.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-mist-50/[0.16] px-[13px] py-[7px] text-mist-200 transition-all duration-200 hover:border-spore hover:text-spore hover:shadow-glow-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative m-0 flex min-h-[280px] flex-col justify-center gap-3.5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-[18%] inset-x-[12%] animate-breathe"
            style={{
              background:
                "radial-gradient(ellipse at 52% 50%, rgba(134,232,168,.14), rgba(7,9,10,0) 70%)",
            }}
          />
          <div className="relative w-full">
            <LumenFigure />
          </div>
          <figcaption className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-mist-600">
            <span className="flex items-center gap-[7px]">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-clay-500"
              />
              free PFAS
            </span>
            <span className="flex items-center gap-[7px]">
              <span
                aria-hidden="true"
                className="h-2 w-3.5 rounded border border-spore bg-spore/[0.18]"
              />
              loaded chassis, excreted
            </span>
            <span>schematic, not to scale</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
