import Image from "next/image";

// Static imports keep intrinsic dimensions (no layout shift) and give each
// photo a blur placeholder, both of which survive `output: "export"`. Sources
// are pre-resized to 900px-wide WebP at authoring time, since static export
// disables next/image runtime optimization.
import venturepackCheck from "@/public/awards/venturepack-check.webp";
import venturepackAudience from "@/public/awards/venturepack-audience-choice.webp";
import lampePitch from "@/public/awards/lampe-pitch.webp";

// Awards laid out as a CSS-columns masonry so cards of different heights (some
// with photos, some text-only) pack without gaps.
const AWARDS = [
  {
    org: "NC State",
    title: "VenturePack Challenge",
    body: "Selected for 2nd place award winner and Audience Choice Award at the NCSU VenturePack Challenge in 2026.",
    photos: [
      {
        src: venturepackCheck,
        alt: "The Cualli team holding their $4,500 VenturePack Challenge prize check",
      },
      {
        src: venturepackAudience,
        alt: "The Cualli team holding their $500 VenturePack Challenge Audience Choice prize check",
      },
    ],
  },
  {
    org: "UNC-Chapel Hill",
    title: "1789 Student Venture Fund",
    body: "Investment and workspace from UNC's student-run venture fund at the 1789 space.",
    large: true,
  },
  {
    org: "UNC / NC State",
    title: "Lampe Joint Department of Biomedical Engineering",
    body: "Research support and lab access through the joint BME department.",
    photos: [
      {
        src: lampePitch,
        alt: "Cualli co-founders presenting on stage at the McKimmon Conference and Training Center",
      },
    ],
  },
  {
    org: "Innovate Carolina",
    title: "Innovate Carolina",
    body: "Venture programming and mentorship through UNC's innovation hub.",
  },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="anchor shell py-[clamp(72px,9vw,140px)]">
      <div className="flex flex-wrap items-end justify-between gap-5 pb-[clamp(28px,4vw,48px)]">
        <div>
          <p className="eyebrow">05 — Awards</p>
          <h2 className="h2 mt-[18px]">Backed, funded, and on stage.</h2>
        </div>
        <p className="max-w-[32ch] text-[15px] leading-[1.6] text-mist-300">
          Recognition from the programs that put early biotech in front of a
          room.
        </p>
      </div>

      <div className="[column-gap:16px] [columns:300px]">
        {AWARDS.map((award) => (
          <article
            key={award.title}
            className="mb-4 overflow-hidden rounded-2xl border border-mist-50/10 bg-ink-850 transition-all duration-300 [break-inside:avoid] hover:-translate-y-[3px] hover:border-spore hover:shadow-lift-lg"
          >
            {award.photos && (
              // 1px gaps over a light background read as hairline dividers when
              // a card stacks more than one photo.
              <div className="flex flex-col gap-px border-b border-mist-50/[0.08] bg-mist-50/[0.08]">
                {award.photos.map((photo) => (
                  <Image
                    key={photo.alt}
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 700px) 400px, 100vw"
                    className="block w-full"
                  />
                ))}
              </div>
            )}
            <div className={award.large ? "px-[22px] py-[26px]" : "p-[22px]"}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-clay-500">
                {award.org}
              </p>
              <h3
                className={
                  award.large
                    ? "mt-3 font-display text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.15] tracking-[-0.02em]"
                    : "mt-3 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.015em]"
                }
              >
                {award.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-mist-200">
                {award.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
