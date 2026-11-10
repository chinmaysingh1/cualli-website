// Adapted from Aceternity's free Tooltip Card:
// https://ui.aceternity.com/components/tooltip-card
// Retains its Motion reveal and viewport collision checks. Inline anchoring
// also respects the site's CSS zoom; focus, tap and Escape extend accessibility.
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function TechnologyTooltip({
  children,
  content,
}: {
  children: ReactNode
  content: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const wrapper = useRef<HTMLSpanElement>(null)
  const popup = useRef<HTMLSpanElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )
  const reducedMotion = useReducedMotion()

  function show() {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  function closeSoon() {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }
  useEffect(() => () => clearTimeout(closeTimer.current), [])

  useLayoutEffect(() => {
    if (!open || !wrapper.current || !popup.current) return
    const trigger = wrapper.current.getBoundingClientRect()
    const tip = popup.current
    const zoom = trigger.width / (wrapper.current.offsetWidth || trigger.width)
    const width = tip.getBoundingClientRect().width
    const height = tip.getBoundingClientRect().height
    const centered = (trigger.width - width) / 2
    const left = Math.max(
      12 - trigger.left,
      Math.min(centered, window.innerWidth - 12 - trigger.left - width),
    )
    tip.style.left = `${left / zoom}px`
    // Keep the complete paragraph clear even when its term wraps to another line.
    const paragraph =
      wrapper.current.closest('p')?.getBoundingClientRect() ?? trigger
    const below = paragraph.top < height + 12
    tip.style.top = below
      ? `calc(100% + ${Math.max(0, paragraph.bottom - trigger.bottom) / zoom}px)`
      : 'auto'
    tip.style.bottom = below
      ? 'auto'
      : `calc(100% + ${Math.max(0, trigger.top - paragraph.top) / zoom}px)`
  }, [open, content])

  useEffect(() => {
    if (!open) return
    function dismiss(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false)
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    function close() {
      setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', close, true)
    }
  }, [open])

  return (
    <span
      ref={wrapper}
      className="technology-term-wrapper"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') show()
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') closeSoon()
      }}
      onFocus={show}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        type="button"
        className="technology-term"
        aria-describedby={open ? id : undefined}
        onClick={show}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <span ref={popup} className="technology-tooltip-positioner">
            <motion.span
              id={id}
              role="tooltip"
              className="technology-tooltip"
              initial={reducedMotion ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.16 }}
            >
              {content}
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </span>
  )
}
