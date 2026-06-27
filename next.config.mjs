/** @type {import('next').NextConfig} */

// Strict Content Security Policy. Mirrors the meta-tag CSP in app/layout.js so
// the policy is identical whether the site is served as a static export
// (GitHub Pages, via the meta tag) or from a Next.js server / Vercel (via these
// headers). 'unsafe-inline' is required for Next.js hydration scripts and
// framer-motion's injected inline styles in the absence of per-request nonces.
const ContentSecurityPolicy = [
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

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), camera=(), microphone=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  // Static export so the site can deploy to GitHub Pages (custom domain:
  // cualli.bio) as well as Vercel. Remove `output: 'export'` to use Next server
  // features. NOTE: with static export, the headers() below are NOT emitted by
  // GitHub Pages — that host can't set custom response headers — so the CSP and
  // X-Content-Type-Options are also delivered via <meta> in app/layout.js, and
  // the full header set here applies when the site runs on Vercel / `next start`
  // (and is mirrored in vercel.json).
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // next/image runtime optimization is incompatible with static export, so
    // assets are pre-optimized to WebP at authoring time (see public/team/*).
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
