// Extracted from the official Aceternity Text Reveal Card registry component.
// Preserves its pointer-position percentage and inset clip-path reveal, without
// card chrome, stars, reveal bars, text shadows, or touch-scroll interception.
import { useRef, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

export function InlineTextReveal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const widthPercentage = useMotionValue(0)
  const smoothPercentage = useSpring(widthPercentage, {
    stiffness: 280,
    damping: 35,
    mass: 0.35,
  })
  const clipPath = useTransform(
    smoothPercentage,
    (percentage) => `inset(0 ${100 - percentage}% 0 0)`,
  )
  const reducedMotion = useReducedMotion()

  function pointerMoveHandler(event: PointerEvent<HTMLSpanElement>) {
    if (
      reducedMotion ||
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
      return
    const element = ref.current
    if (!element) return
    // Measure on movement so responsive wrapping, scrolling and font loads do
    // not leave the pointer coordinates stale, unlike the original one-time read.
    const { left, width } = element.getBoundingClientRect()
    if (width <= 0) return
    widthPercentage.set(
      Math.max(0, Math.min(100, ((event.clientX - left) / width) * 100)),
    )
  }

  return (
    <span
      ref={ref}
      className="inline-text-reveal"
      onPointerMove={pointerMoveHandler}
      onPointerLeave={() => widthPercentage.set(0)}
    >
      <span className="inline-text-reveal-base">{text}</span>
      <motion.span
        className="inline-text-reveal-overlay"
        aria-hidden="true"
        style={{ clipPath }}
      >
        {text}
      </motion.span>
    </span>
  )
}
