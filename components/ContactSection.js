import Image from "next/image";
import wordmark from "@/public/cualli_wordmark.png";
import { CONTACT_EMAIL } from "@/lib/site";

// Closing CTA. This section also carries the footer bar, so the page ends on
// one surface rather than a separate <footer> block.
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="anchor relative overflow-hidden border-t border-mist-50/[0.07] bg-ink-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-80 left-1/2 -ml-[450px] h-[900px] w-[900px] animate-breathe-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(134,232,168,.16) 0%, rgba(7,9,10,0) 64%)",
        }}
      />

      <div className="shell relative py-[clamp(72px,9vw,140px)]">
        <h2 className="max-w-[24ch] font-display text-[clamp(32px,5.4vw,72px)] font-medium leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">
          If you work on exposure, clearance, or capital — talk to us.
        </h2>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-spore px-6 py-[15px] text-[15px] font-semibold text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cta"
          >
            {CONTACT_EMAIL}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </a>
          <a
            href="#home"
            className="inline-flex items-center gap-2.5 rounded-full border border-mist-50/[0.22] px-6 py-[15px] text-[15px] text-mist-50 transition-all duration-200 hover:border-mist-50/50 hover:bg-mist-50/5"
          >
            Back to top
          </a>
        </div>

        <footer className="mt-[clamp(56px,7vw,96px)] flex flex-wrap items-center justify-between gap-5 border-t border-mist-50/[0.09] pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mist-500">
          <Image
            src={wordmark}
            alt="Cualli"
            className="block h-6 w-auto object-contain opacity-80"
            style={{ height: 24, width: "auto" }}
          />
          <p>Chapel Hill · Raleigh, NC</p>
          <p>© {new Date().getFullYear()} Cualli — research use only</p>
        </footer>
      </div>
    </section>
  );
}
