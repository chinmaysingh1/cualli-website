# Cualli, LLC — Official Website

The official website for **Cualli**, a synthetic-biology company building autonomous probiotics that sequester PFAS ("forever chemicals") in the gut before they enter the bloodstream. Derived from the award-winning 2025 UNC iGEM project, our flagship therapeutic uses an engineered _Escherichia coli_ Nissle 1917 (EcN) strain.

> **Filter the Forever.**

## 🧬 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS — custom design tokens for heavy blurs & bioluminescent gradients
- **Animation:** Framer Motion — scroll-triggered reveals and fluid hover tension
- **Fonts:** `next/font` (Inter)
- **Output:** Static export (`output: "export"`) — deploys to GitHub Pages _or_ Vercel

## 🎨 Design — "Liquid Glass"

A portal into the future of synthetic biology: fluid, refractive, and alive.

- **Abyssal black** background with slow-moving cyan/emerald gradient meshes drifting underneath (`components/BackgroundMesh.js`).
- **Liquid-glass surfaces** — heavy `backdrop-blur`, ultra-thin `border-white/10`, generous rounding. See the `.glass` / `.glass-strong` utilities in `app/globals.css`.
- **Floating pill navbar** with an animated active indicator.
- Design tokens (colors, blur scale, gradients, motion keyframes) live in `tailwind.config.js`.

## 📂 Structure

```
app/
  layout.js        Root layout — fonts, navbar, footer, background mesh, metadata
  page.js          Home — hero ("Filter the Forever") + value props + CTA
  science/page.js  Science — EcN chassis + looping video window
  about/page.js    About — founders grid
  contact/page.js  Contact — server wrapper for the form
components/
  Navbar, Footer, BackgroundMesh, Reveal, GlassCard, CTAButton,
  VideoWindow      Continuously-looping, controls-free "living window"
  ContactForm      Validated form (First/Last name, Work Email, Message)
public/            Logo, founder headshots, Cualli.mp4, CNAME
```

## 📨 Contact form

The form validates client-side and submits to an optional endpoint. Set
`NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. a Formspree URL or serverless function) to
enable network submission. **Without it, the form falls back to opening the
visitor's mail client** via `mailto:` (update `FALLBACK_EMAIL` in
`components/ContactForm.js`).

## 🚀 Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## 🌐 Deployment

`npm run build` emits a fully static site to `out/` (the `CNAME` for
`cualli.bio` is included for GitHub Pages). Deploy `out/` to GitHub Pages, or
connect the repo to Vercel for zero-config builds.
