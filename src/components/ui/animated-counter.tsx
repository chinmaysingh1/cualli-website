// Motion fallback: Aceternity Speed Counter requires licensed registry access.
import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

export function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView) return
    if (reducedMotion || hasAnimated.current) {
      element.textContent = String(value)
      return
    }
    hasAnimated.current = true
    element.textContent = '0'
    const controls = animate(0, value, {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        element.textContent = String(Math.round(latest))
      },
      onComplete: () => {
        element.textContent = String(value)
      },
    })
    return () => controls.stop()
  }, [inView, reducedMotion, value])

  // The parent supplies the stable accessible value. The server/no-JS output is final.
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="animated-counter"
      style={{ minWidth: `${String(value).length}ch` }}
    >
      {value}
    </span>
  )
}
