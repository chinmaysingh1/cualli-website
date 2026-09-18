import Image from "next/image";

// Static imports let Next.js bake in intrinsic dimensions (no layout shift) and
// generate a blur placeholder, both of which survive `output: "export"`.
import alexImg from "@/public/team/alex.webp";
import chinmayImg from "@/public/team/chinmay.webp";
import osvaldoImg from "@/public/team/osvaldo.webp";

const FOUNDERS = [
  {
    name: "Alex",
    fullName: "Jinghan (Alex) Li",
    role: "Co-founder · CTO",
    img: alexImg,
  },
  {
    name: "Chinmay",
    fullName: "Chinmay Singh",
    role: "Co-founder · CFO",
    img: chinmayImg,
  },
  {
    name: "Osvaldo",
    fullName: "Osvaldo Linares Gutiérrez",
    role: "Co-founder · CEO",
    img: osvaldoImg,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="anchor shell py-[clamp(72px,9vw,140px)]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow">03 — The team</p>
          <h2 className="h2 mt-[18px]">Three people, one loop to break.</h2>
        </div>
        <p className="max-w-[34ch] text-[15px] leading-[1.6] text-mist-300">
          Biomedical engineering and synthetic biology out of UNC-Chapel Hill
          and NC State.
        </p>
      </div>

      <ul className="mt-[clamp(32px,4vw,52px)] grid list-none gap-4 p-0 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {FOUNDERS.map((person) => (
          <li
            key={person.fullName}
            className="group overflow-hidden rounded-2xl border border-mist-50/10 bg-ink-850 transition-all duration-300 hover:border-spore hover:shadow-glow-lg"
          >
            <Image
              src={person.img}
              alt={person.fullName}
              placeholder="blur"
              sizes="(min-width: 1024px) 400px, 100vw"
              className="block aspect-[4/5] w-full object-cover contrast-[1.05] grayscale-[.35] transition-[filter] duration-[400ms] group-hover:contrast-100 group-hover:grayscale-0"
            />
            <div className="px-[18px] pb-5 pt-4">
              <p className="font-display text-[19px] tracking-[-0.01em]">
                {person.name}
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-mist-300">
                {person.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
