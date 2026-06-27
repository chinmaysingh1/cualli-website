import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundMesh from "@/components/BackgroundMesh";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://cualli.bio";
const TITLE =
  "Cualli | Living Medicine for Internal PFAS Remediation";
const DESCRIPTION =
  "Cualli builds programmable probiotics — a living medicine that performs internal remediation, capturing PFAS forever chemicals in the gut to lower the body's toxic burden. The next generation of programmable medicine.";
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
    "PFAS degradation",
    "PFAS forever chemicals",
    "forever chemicals body burden",
    "PFAS removal from the body",
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
        alt: "Cualli — living medicine for internal PFAS remediation",
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
  themeColor: "#FAFAF8",
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
// nonces, and Next.js + framer-motion inject inline hydration scripts/styles.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Static, trusted Organization schema for rich search results. The payload is a
// hard-coded object (no user input), serialized with `<` escaped to prevent any
// possibility of markup breakout — the canonical safe JSON-LD pattern.
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cualli",
  url: "https://cualli.bio",
  logo: "https://cualli.bio/cualli_logo.webp",
  description:
    "Cualli builds programmable probiotics — a living medicine for internal remediation that captures PFAS forever chemicals in the gut to lower the body's toxic burden.",
  email: "olinares@cualli.bio",
  knowsAbout: [
    "Programmable probiotics",
    "PFAS forever chemicals",
    "Internal remediation",
    "Synthetic biology",
    "Living medicine",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
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
      <body className="relative font-sans">
        <BackgroundMesh />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
