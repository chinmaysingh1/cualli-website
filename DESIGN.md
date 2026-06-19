# Cualli Next.js & Tailwind Architecture Guidelines

## Core Aesthetic Vision

The Cualli website operates as a portal into the future of synthetic biology. The interface uses a liquid glass aesthetic. It feels fluid, refractive, and alive. Every component conveys precision and advanced scientific innovation.

## Tech Stack

- **Framework:** Next.js (App Router)
    
- **Styling:** Tailwind CSS
    
- **Animation:** Framer Motion
    
- **Deployment:** Vercel (recommended)
    

## Color Palette & Tailwind Config

- **Background:** Deep abyssal black (`bg-black`) blending into ultra-dark charcoal (`bg-[#0A0A0C]`).
    
- **Primary Accents:** Bioluminescent Cyan and Emerald. Configured as custom Tailwind linear gradients flowing across components.
    
- **Surfaces:** Translucent liquid glass panels. Utilize Tailwind's `backdrop-blur-xl`, `bg-white/5`, and ultra-thin `border-white/10`.
    
- **Text:** Pure white for primary headers. Soft silver (`text-gray-400`) for paragraph text.
    

## Typography

- **Primary Font:** `next/font/google` using Inter or Roboto.
    
- **Headers:** Massive, bold, and commanding. Use Tailwind's `bg-clip-text text-transparent` with custom gradients on key action words.
    
- **Body:** Clean, legible, with loose line height (`leading-relaxed`).
    

## Liquid Glass Component Rules

- Containers use heavy backdrop filters combined with semi-transparent borders.
    
- Avoid sharp corners. Use `rounded-2xl` or `rounded-3xl`.
    
- Hover states simulate liquid surface tension. Use Framer Motion to gently scale elements and reveal shifting color gradients underneath on hover.
    
- Navigation bars are fully floating liquid glass pills (`fixed`, `backdrop-blur-md`, `rounded-full`).
    

## Animation & Motion

- Implement smooth scrolling.
    
- Page transitions and element reveals are handled by Framer Motion (`initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`).
    
- Backgrounds feature slow, amorphous CSS gradient blobs moving underneath the dark layer to simulate a microscopic fluid environment.
    

## Video & Media Integration

- Media elements blend into the liquid glass layout. Use masking and border-radius to integrate videos directly into the page flow.
    
- Autoplaying videos use the standard HTML5 `<video>` tag with `autoPlay`, `loop`, `muted`, and `playsInline` attributes.