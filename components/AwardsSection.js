// Awards laid out as a CSS-columns masonry so cards of different heights (some
// with a photo well, some text-only) pack without gaps.
//
// `photo` marks a reserved image well. No award photography exists yet, so the
// well renders as a hatched placeholder at the intended aspect — swap in a
// next/image with a static import when the photos land.

const AWARDS = [
  {
    org: "NC State",
    title: "VenturePack at NCSU",
    body: "Selected venture — pitch competition cohort. Award details to confirm.",
    photo: { height: 240, note: "photo — pitch finals, 4:3" },
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
    photo: { height: 320, note: "photo — team with award, 3:4" },
  },
  {
    org: "Innovate Carolina",
    title: "Innovate Carolina",
    body: "Venture programming and mentorship through UNC's innovation hub.",
    photo: { height: 200, note: "photo — demo day, 16:9" },
  },
];

const HATCH =
  "repeating-linear-gradient(135deg, rgba(234,239,236,.05) 0 1px, transparent 1px 10px)";

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
            {award.photo && (
              <div
                className="grid place-items-center border-b border-mist-50/[0.08]"
                style={{
                  height: award.photo.height,
                  backgroundImage: HATCH,
                }}
              >
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mist-500">
                  {award.photo.note}
                </span>
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

        <div className="mb-4 rounded-2xl border border-dashed border-mist-50/[0.16] px-[22px] py-[26px] transition-all duration-300 [break-inside:avoid] hover:border-spore hover:shadow-[0_0_40px_-20px_var(--ac)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist-500">
            Slot open
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-mist-300">
            Room here for the next award — send the photo and the citation and
            it drops in.
          </p>
        </div>
      </div>
    </section>
  );
}
