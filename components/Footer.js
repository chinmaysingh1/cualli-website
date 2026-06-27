import Link from "next/link";

const LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#mechanism", label: "Mechanism" },
  { href: "#team", label: "Team" },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-2xl border border-slate-100 bg-white px-6 py-10 text-center shadow-card sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            Programmable medicine for a cleaner body.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Cualli, LLC. All rights reserved.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-label={`Jump to ${l.label} section`}
              className="text-sm text-slate-600 transition-colors hover:text-clay-600"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:olinares@cualli.bio"
            aria-label="Email Cualli"
            className="text-sm text-slate-600 transition-colors hover:text-clay-600"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
