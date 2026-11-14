// Adapted from Aceternity's free Pointer Highlight:
// https://ui.aceternity.com/components/pointer-highlight
// Inline sizing preserves headline wrapping, with a single, understated reveal.
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function TechnologyPointerHighlight({
  children,
}: {
  children: ReactNode
}) {
  const reducedMotion = useReducedMotion()
  return (
    <span className="technology-pointer-highlight">
      {children}
      <motion.span
        aria-hidden="true"
        className="technology-pointer-outline"
        initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reducedMotion ? 0 : 0.65, ease: 'easeInOut' }}
      >
        <svg
          className="technology-pointer"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
        >
          <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
        </svg>
      </motion.span>
    </span>
  )
}
