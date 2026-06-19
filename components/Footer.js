import Link from "next/link";

const LINKS = [
  { href: "/science", label: "Science" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 pt-20">
      <div className="glass mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-4xl px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-lg font-semibold tracking-tight">
            Filter the <span className="text-bio">Forever.</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Cualli, LLC. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
