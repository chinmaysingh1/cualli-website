# Cualli

A static, single-page React + TypeScript website built with Vite, Tailwind CSS v4, shadcn/ui, and the official Aceternity Resizable Navbar and Wavy Background components. The initial scope is the navbar and hero. Science, Technology, Research, About, and Contact are intentionally labeled placeholders; no research results or company details have been invented.

## Local development

Use Node.js 22.12+ (or another version supported by Vite 8) and npm. No environment variables, backend, or external services are required.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Validation and production

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run preview
```

`npm run format` applies Prettier. Production output is written to `dist/`. Quicksand is self-hosted through `@fontsource-variable/quicksand`; only its Latin variable font (weights 300–700) is loaded. All website text uses Quicksand.


## Project structure

- `src/components/layout/`: responsive navigation and footer.
- `src/components/sections/Hero.tsx`: supplied hero copy and calls to action.
- `src/components/ui/`: locally owned shadcn and Aceternity components.
- `src/constants/`: navigation destinations and wave palette.
- `src/styles/globals.css`: brand tokens, typography, and responsive styling.
- `src/App.tsx`: page structure and future section anchors.

The mobile menu supports keyboard buttons, Escape with focus restoration, closing on link selection or outside pointer interaction, and closing at the desktop breakpoint. Focus indicators, a skip link, reduced-motion preferences, and native anchor scrolling are supported. The canvas caps device pixel ratio, renders at up to 30 fps, pauses offscreen/in hidden tabs, and cleans up observers and animation frames. A static SVG wave fallback remains if canvas is unavailable.

## Component sources

Installed with the official CLI:

```sh
npx shadcn@latest init -d
npx shadcn@latest add @aceternity/resizable-navbar @aceternity/wavy-background
```

- [Aceternity Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar)
- [Aceternity Wavy Background](https://ui.aceternity.com/components/wavy-background)
- [shadcn Vite installation](https://ui.shadcn.com/docs/installation/vite)
- [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite)

The installed navbar retains Aceternity's scroll threshold, child state propagation, Motion spring resizing, and mobile components. Adaptations provide the brand styling and accessible Lucide menu toggle. The installed Wavy Background retains its simplex-noise paths and canvas rendering, with typed props, container sizing, reduced-motion support, and lifecycle fixes. TypeScript 6 is used because the current typescript-eslint release supports versions below 6.1; the Vite starter's TypeScript 7 is outside that range.