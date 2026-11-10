// Scrolling affiliation marquee. The track holds two identical copies of the
// item list and translates by -50%, so the loop is seamless; the second copy is
// hidden from assistive tech.

const ITEMS = [
  "VenturePack at NCSU",
  "Lampe Joint Department of Biomedical Engineering at UNC Chapel Hill/NC State University",
  "Innovate Carolina",
  "1789 Student Venture Fund at UNC CH",
];

function Run() {
  return (
    <div className="flex items-center gap-7 whitespace-nowrap pr-7">
      <span className="text-clay-500">Supported by / As seen on:</span>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-7">
          {item}
          <span className="text-spore">•</span>
        </span>
      ))}
    </div>
  );
}

export default function Ticker({ seconds = 48 }) {
  return (
    <div className="relative overflow-hidden border-b border-mist-50/[0.07] bg-ink-900 py-4">
      <div
        className="flex w-max animate-marquee font-mono text-[12.5px] uppercase tracking-[0.14em] text-mist-300"
        style={{ "--ticker-dur": `${seconds}s` }}
      >
        <Run />
        <div aria-hidden="true" className="flex">
          <Run />
        </div>
      </div>
    </div>
  );
}
