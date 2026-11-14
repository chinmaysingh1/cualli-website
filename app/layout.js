import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

// Fonts are vendored in app/fonts (latin subsets pulled from Google Fonts) and
// loaded through next/font/local rather than next/font/google. Two reasons:
// the build needs no network access (next/font/google's build-time fetch hangs
// on current Node versions), and nothing is requested from a third party at
// runtime, which keeps the `font-src 'self'` CSP below satisfiable.
//
// To refresh a face, re-download the `latin` subset woff2 from the Google Fonts
// css2 endpoint and replace the file in place.

const plexSans = localFont({
  // Served as a single variable file spanning 400–600.
  src: [
    {
      path: "./fonts/ibm-plex-sans-400-600-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const bricolage = localFont({
  src: [
    {
      path: "./fonts/bricolage-grotesque-400-800-latin.woff2",
      weight: "400 800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const plexMono = localFont({
  src: [
    {
      path: "./fonts/ibm-plex-mono-400-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ibm-plex-mono-500-latin.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

// Kept under ~60 chars so search results don't truncate it.
const TITLE = "Cualli | Filter the Forever — Living Medicine for PFAS";
// Kept under ~160 chars for the same reason.
const DESCRIPTION =
  "Cualli builds a programmable probiotic that captures PFAS forever chemicals in the gut and carries them out, breaking the loop that keeps exposure in the body.";
const OG_IMAGE = "/og-image.png";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Cualli",
  },
  description: DESCRIPTION,
  applicationName: "Cualli",
  keywords: [
    "Cualli",
    "internal remediation",
    "programmable probiotics",
    "programmable medicine",
    "living medicine",
    "PFAS body burden",
    "PFAS forever chemicals",
    "PFAS removal from the body",
    "enterohepatic recirculation",
    "synthetic biology",
    "EcN 1917",
    "E. coli Nissle 1917",
  ],
  authors: [{ name: "Cualli" }],
  creator: "Cualli",
  publisher: "Cualli",
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.webmanifest",
  // Icons are declared explicitly rather than via the app/icon.* file
  // convention so the small sizes can use their own optically-tuned artwork
  // (see scripts/generate-brand-assets.mjs) instead of one source downscaled.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cualli",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cualli — engineered living medicine for PFAS clearance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  category: "biotechnology",
};

export const viewport = {
  themeColor: "#07090a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Content Security Policy enforced via a <meta> tag. The site deploys as a
// static export to GitHub Pages, where custom HTTP response headers cannot be
// set — so the meta-delivered CSP is the layer that actually applies in
// production. Equivalent header-based CSP + clickjacking defenses (which a meta
// tag cannot deliver, e.g. frame-ancestors / X-Frame-Options) are configured in
// next.config.mjs and vercel.json for server/Vercel deployments.
// 'unsafe-inline' is required because static export precludes per-request
// nonces, and Next.js injects inline hydration scripts/styles.
//
// `frame-ancestors` is deliberately absent here: browsers ignore it when it
// arrives via <meta> and log an error for every page view. It is set in the
// header-based policies instead (next.config.mjs / vercel.json), which is the
// only place it can actually take effect.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Static, trusted Organization schema for rich search results. The payload is a
// hard-coded object (no user input), serialized with `<` escaped to prevent any
// possibility of markup breakout — the canonical safe JSON-LD pattern.
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Cualli",
      alternateName: "Cualli Probiotic Therapeutics",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}${OG_IMAGE}`,
      description: DESCRIPTION,
      email: CONTACT_EMAIL,
      slogan: "Filter the Forever",
      areaServed: "US",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chapel Hill",
        addressRegion: "NC",
        addressCountry: "US",
      },
      knowsAbout: [
        "Programmable probiotics",
        "PFAS forever chemicals",
        "Internal remediation",
        "Enterohepatic recirculation",
        "Synthetic biology",
        "Living medicine",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "business enquiries",
        email: CONTACT_EMAIL,
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Cualli",
      description: DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-US"
      className={`${plexSans.variable} ${bricolage.variable} ${plexMono.variable}`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- static, trusted payload
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORG_JSONLD).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="relative">
        {/* Lets keyboard and screen-reader users jump the sticky nav. Visually
            hidden until focused. */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-spore focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
