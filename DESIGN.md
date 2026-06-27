# Cualli Next.js & Tailwind Architecture Guidelines

## Core Aesthetic & Architecture Vision
The Cualli website operates as a welcoming, clean, and minimal portal into the future of synthetic biology[cite: 1, 2]. Moving away from a dark liquid glass aesthetic, the new interface utilizes a sleek, warm, and light-theme design to convey approachability, safety, and scientific precision[cite: 1]. 
The architecture is structured entirely on a single page, featuring sticky navigation tabs at the top that allow users to scroll smoothly to different content sections of the page[cite: 1].

## Tech Stack
* **Framework:** Next.js (App Router)[cite: 1].
* **Styling:** Tailwind CSS[cite: 1].
* **Animation:** Framer Motion[cite: 1].
* **Deployment:** Vercel (recommended)[cite: 1].

## Single-Page Navigation Structure
The sticky top navigation bar should contain tabs linked to the following core sections derived from the project presentation[cite: 2]:
* **Hero/Vision:** Displaying the mission to develop "the next generation of programmable medicine" through a "Programmable Intestinal Microbiome"[cite: 2].
* **The Problem:** Highlighting the PFAS crisis, noting that over 15,000 variants of "forever chemicals" exist and that 98% of Americans carry PFAS in their bloodstream[cite: 2]. 
* **The Solution:** Introducing "Internal Remediation" and the programmable probiotic designed to capture PFAS directly in the gut to lower the body burden[cite: 2].
* **Mechanism:** Outlining the three-step scientific process: Colonize (using E. coli Nissle 1917), Capture (by inactivating the AcrB efflux pump), and Clear (via normal fecal elimination)[cite: 2].
* **Market & Roadmap:** Detailing the expansion path from B2G/B2B institutional contracts (such as the Department of Defense and municipal utilities like OWASA) to B2C consumer living medicine[cite: 2].
* **Team:** Showcasing the founders (Osvaldo Linares Gutiérrez, Moiz Chomelawala, Chinmay Singh, and Jinghan (Alex) Li) alongside project advisors[cite: 2].

## Color Palette & Tailwind Config
* **Background:** Soft, warm, and clean off-white (e.g., `bg-slate-50` or `bg-[#FAFAFA]`) to replace the deep abyssal black and ultra-dark charcoal[cite: 1]. 
* **Primary Accents:** Earthy, warm tones to replace the bioluminescent cyan and emerald gradients[cite: 1]. 
* **Surfaces:** Clean, minimal white cards with subtle shadows (`bg-white shadow-sm border-slate-100`) rather than translucent liquid glass panels[cite: 1].
* **Text:** Dark charcoal (`text-slate-900`) for primary headers and warm medium gray (`text-slate-600`) for paragraph text, replacing the previous pure white and soft silver styling[cite: 1].

## Typography
* **Primary Font:** `next/font/google` using Inter or Roboto[cite: 1].
* **Headers:** Clean, bold, and welcoming. Avoid transparent text with custom gradients[cite: 1]; instead, use solid dark tones for strong legibility and a minimal feel.
* **Body:** Clean and highly legible, maintaining a loose line height (`leading-relaxed`)[cite: 1].

## Clean Minimalist Component Rules
* Containers should utilize clean styling with gentle corners (use `rounded-lg` or `rounded-xl`), completely avoiding heavy backdrop filters and semi-transparent borders[cite: 1].
* Hover states should remain subtle and minimal, avoiding the shifting color gradients and liquid surface tension simulations previously used[cite: 1].
* The navigation bar should act as a sticky, lightly frosted or solid header at the top of the screen (`sticky top-0 bg-white/90 backdrop-blur-sm z-50`), housing the scrolling tabs rather than floating as a liquid glass pill[cite: 1].

## Animation & Motion
* Implement smooth scrolling functionality to seamlessly navigate between the top tabs and their corresponding sections on the single page[cite: 1].
* Page transitions and element reveals are handled by Framer Motion, keeping them subtle, quick, and clean (`initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`)[cite: 1].
* Backgrounds should remain static, warm, and clean, removing the slow, amorphous CSS gradient blobs used to simulate a microscopic fluid environment[cite: 1].

## Video & Media Integration
* Media elements, such as lab proof of concept imagery or founder headshots, should blend seamlessly into the clean layout with standard border-radius masking[cite: 1, 2].
* Autoplaying videos should continue to use the standard HTML5 `<video>` tag with `autoPlay`, `loop`, `muted`, and `playsInline` attributes[cite: 1].
