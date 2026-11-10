// "News / the landscape" — deliberately styled as a desaturated newsprint
// record rather than a card grid, so it reads as external evidence rather than
// as Cualli's own marketing.

const ITEMS = [
  {
    title:
      "North Carolina secures $455 million PFAS settlement from Chemours, DuPont and Corteva",
    href: "https://www.wral.com/news/investigates/nc-reaches-445-million-dollar-pfas-settlement-chemours-dupont-september-2026/",
    meta: ["WRAL", "September 2026", "Litigation"],
  },
  {
    title:
      "EPA moves to rescind four PFAS drinking-water limits and push PFOA/PFOS compliance to 2031",
    href: "https://www.epa.gov/sdwa/proposed-pfas-rescission-rule",
    meta: ["U.S. EPA", "May 2026", "Rollback"],
  },
  {
    title:
      "Forever chemicals found in 98.8% of more than 10,500 blood samples",
    href: "https://medicalxpress.com/news/2026-05-multiple-chemicals-people.html",
    meta: ["J. Occ. & Env. Hygiene", "May 2026", "Biomonitoring"],
  },
  {
    title:
      "Gut microbes soak up PFAS and carry them out in feces — 25% to 74% within minutes",
    href: "https://www.cam.ac.uk/research/news/gut-microbes-could-protect-us-from-toxic-forever-chemicals",
    meta: ["Nature Microbiology", "July 2025", "Cambridge"],
  },
  {
    title:
      "Court approves 3M’s $10.3 billion settlement with more than 11,000 public water systems",
    href: "https://cen.acs.org/policy/litigation/Court-approves-10-billion-PFAS/102/i11",
    meta: ["C&EN", "2024", "Litigation"],
  },
  {
    title: "Rising PFAS in human serum correlates with elevated blood lipid levels",
    href: "https://pubmed.ncbi.nlm.nih.gov/41727405/",
    meta: ["UNC / NC State / Duke", "Feb 2026", "Health effects"],
  },
  {
    title: "PFAS detected in roughly 45% of U.S. tap water samples nationwide",
    href: "https://www.usgs.gov/news/national-news-release/tap-water-study-detects-pfas-forever-chemicals-across-us",
    meta: ["USGS", "2023", "Exposure"],
  },
  {
    title:
      "We haven’t found a way to destroy PFAS — the gap is getting them out of people",
    href: "https://www.ukri.org/news/gut-bacteria-can-remove-pfas-forever-chemicals-from-our-body/",
    meta: ["UKRI", "July 2025", "Analysis"],
  },
];

function ExternalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-[7px] text-slab-700"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export default function NewsSection({ grayscale = true }) {
  return (
    <section
      id="news"
      className="anchor border-y border-slab-900 bg-slab-950"
      style={grayscale ? { filter: "grayscale(1) contrast(1.04)" } : undefined}
    >
      <div className="shell py-[clamp(64px,8vw,120px)]">
        <div className="grid gap-6 border-b-2 border-slab-800 pb-10 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] lg:gap-14">
          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.24em] text-slab-400">
              04 — News / the landscape
            </p>
            <h2 className="mt-4 text-[clamp(28px,4vw,52px)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-slab-100">
              {/* The space before the break keeps the accessible name reading
                  "Nothing about this is solved yet." rather than fusing the
                  two words either side of the <br>. */}
              Nothing about this{" "}
              <br />
              is solved yet.
            </h2>
          </div>
          <p className="max-w-[46ch] self-end text-[15px] leading-[1.7] text-slab-300">
            Regulation is arriving, litigation is settling, filtration is
            improving. None of it removes what people already carry. This is the
            record we work against.
          </p>
        </div>

        <ol className="list-none p-0">
          {ITEMS.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[56px_1fr_auto] items-start gap-x-5 border-b border-slab-850 py-[26px] pl-3 pr-4 text-slab-100 transition-[background-color,padding] duration-200 hover:bg-slab-925 hover:pl-5 hover:text-white"
              >
                <span className="pt-[5px] font-mono text-[11.5px] tracking-[0.1em] text-slab-500">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span>
                  <span className="block max-w-[32ch] text-[clamp(18px,2.1vw,26px)] font-medium leading-[1.25] tracking-[-0.015em]">
                    {item.title}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slab-400">
                    {item.meta.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </span>
                </span>
                <ExternalIcon />
              </a>
            </li>
          ))}
        </ol>

        <p className="mt-[26px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-slab-600">
          Sourced coverage — links open at the publisher
        </p>
      </div>
    </section>
  );
}
