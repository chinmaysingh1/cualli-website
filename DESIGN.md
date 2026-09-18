# Cualli Site — Design & Architecture Guidelines

Implements `Cualli Site.dc.html`. This document describes the current dark
"engineered living medicine" aesthetic; it replaces the earlier warm light-theme
guidelines.

## Core aesthetic

A near-black lab canvas with a single bioluminescent green accent and a warm
terracotta secondary. The register is instrument panel, not brochure: monospace
metadata, hairline rules, schematic figures with axis labels and honest
"pre-clinical / illustrative" captions. Claims are sourced inline.

The whole site is one page. A sticky header tracks whichever section is on
screen via `IntersectionObserver` and lights that section's indicator dot.

## Tech stack

- **Framework:** Next.js (App Router), `output: "export"` — see the deployment note below.
- **Styling:** Tailwind CSS, tokens in `tailwind.config.js`.
- **Animation:** CSS keyframes only (no animation library is used).

## Sections

In order, matching the nav and the scroll spy in `components/SiteHeader.js`:

| id         | Section                    | Component              |
| ---------- | -------------------------- | ---------------------- |
| `home`     | Hero + sourced stat grid   | `Hero.js`              |
| —          | Affiliation marquee        | `Ticker.js`            |
| `science`  | 01 — The science           | `ScienceSection.js`    |
| `platform` | 02 — The platform          | `PlatformSection.js`   |
| `team`     | 03 — The team              | `TeamSection.js`       |
| `news`     | 04 — News / the landscape  | `NewsSection.js`       |
| `awards`   | 05 — Awards                | `AwardsSection.js`     |
| `contact`  | Closing CTA + footer bar   | `ContactSection.js`    |

## Color tokens

Defined in `tailwind.config.js`; the two accents are additionally mirrored as
`--ac` / `--acw` on `:root` in `app/globals.css` so the `shadow-glow*` tokens
can reference them.

- `ink-950 … ink-800` — surfaces, darkest (page canvas) to lightest (figure internals).
- `mist-50 … mist-600` — text, brightest to faintest.
- `spore` (`#86e8a8`) — the primary accent. Used sparingly: active states, the
  single "0" stat, figure data lines, hover glows.
- `clay-500` (`#c06e3b`) — warm secondary. Section numbers, captions, "free PFAS".
- `slab-*` — cool neutral greys, used **only** by the News section.

The News section is deliberately off-palette: desaturated, uppercase, newsprint
styling with `filter: grayscale(1)`, so external coverage reads as evidence
rather than as Cualli's own marketing. Don't introduce accent colour there.

## Typography

Three faces, all self-hosted by `next/font/google` (important — see CSP below):

- `font-display` — **Bricolage Grotesque**, weight 500, tight tracking. Headings and stat numerals.
- `font-sans` — **IBM Plex Sans**. Body copy, plus the News section's headings.
- `font-mono` — **IBM Plex Mono**. Labels, metadata, figure annotations.

Shared component classes live in `app/globals.css`: `.shell` (content column),
`.label`, `.eyebrow`, `.h2`, `.anchor` (sticky-header scroll offset). `.label`
intentionally sets no font-size or tracking — callers set both, so a utility can
never collide with one baked into the class.

## Figures

`components/figures.js` holds four schematics: `LumenFigure` (Science) and
`ColonizationFigure` / `IsothermFigure` / `MassBalanceFigure` (the three
Platform steps). They are plain SVG animated purely by the `cualli*` keyframes
in `globals.css`, so they render on the server, need no JS, and go still under
`prefers-reduced-motion`.

Accent colours in that file are **literal hex**, not `var(--ac)`: the values are
used in SVG presentation attributes (`fill=`, `stroke=`, `stop-color=`), which
cannot reference custom properties. Keep them in sync with `:root`.

## Motion

- Subtle and looping: `breathe` glows, the `marquee` ticker, self-drawing plot lines.
- The Platform panel auto-advances every 6s and stops permanently on first manual selection.
- The hero glow drifts toward the cursor — a pointer-only flourish, never load-bearing.
- Everything is suppressed by the `prefers-reduced-motion` block at the end of `globals.css`. Any new animation must be reachable by that rule (i.e. a CSS animation/transition, not a JS tween).

## Deployment constraints

Static export to GitHub Pages (custom domain `cualli.bio`), which cannot set
custom response headers. Consequences:

- The CSP is delivered by `<meta>` in `app/layout.js`; the header-based equivalent in `next.config.mjs` / `vercel.json` only applies on Vercel or `next start`. Keep all three in sync.
- `font-src 'self'` means fonts must be self-hosted. Always load faces through `next/font`, never a `<link>` to Google Fonts.
- `images.unoptimized` is set, so images are pre-optimized to WebP at authoring time. Use static imports (`import img from "@/public/…"`) to keep intrinsic dimensions and blur placeholders.
