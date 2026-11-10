// Installed from the official Aceternity registry (sticky-scroll-reveal).
// Retains useScroll, nearest-breakpoint selection and the sticky active visual.
// Uses Aceternity's documented page-scroll option, Cualli styling and static fallbacks.
import { useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react'
import { cn } from '@/lib/utils'

interface StickyScrollItem {
  label: string
  title: string
  description: string
  content: ReactNode
  source?: ReactNode
}

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: StickyScrollItem[]
  contentClassName?: string
}) {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reducedMotion || cardLength === 0) return
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint)
        return distance < Math.abs(latest - cardsBreakpoints[acc]) ? index : acc
      },
      0,
    )
    setActiveCard(closestBreakpointIndex)
  })

  return (
    <div className="sticky-scroll" ref={ref}>
      <div className="sticky-scroll-narrative">
        {content.map((item, index) => (
          <article
            key={item.label}
            className="sticky-scroll-stage"
            aria-labelledby={`unmet-stage-${index}`}
          >
            <p className="unmet-stage-label">{item.label}</p>
            <motion.h3
              id={`unmet-stage-${index}`}
              initial={false}
              animate={{
                opacity: reducedMotion || activeCard === index ? 1 : 0.7,
              }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="font-display"
            >
              {item.title}
            </motion.h3>
            <p className="unmet-stage-description">{item.description}</p>
            {item.source}
            <div className="sticky-scroll-inline-visual">{item.content}</div>
          </article>
        ))}
      </div>
      <div className={cn('sticky-scroll-panel', contentClassName)}>
        <motion.div
          key={activeCard}
          initial={reducedMotion ? false : { opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="sticky-scroll-visual"
        >
          {content[activeCard]?.content ?? null}
        </motion.div>
        <div className="unmet-stage-progress" aria-hidden="true">
          {content.map((item, index) => (
            <span key={item.label} data-active={activeCard === index} />
          ))}
        </div>
      </div>
    </div>
  )
}
