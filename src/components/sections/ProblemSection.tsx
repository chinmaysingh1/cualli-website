import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState } from 'react'
import '@/styles/problem-section.css'

type ProblemMetric = {
  id: string
  label: string
  value: string
  description: string
  source: { label: string; href: string }
}

const usgsSource =
  'https://www.usgs.gov/news/national-news-release/tap-water-study-detects-pfas-forever-chemicals-across-us'

const problemMetrics = [
  {
    id: 'chemicals',
    label: 'PFAS chemicals',
    value: '12,000+',
    description: 'More than 12,000 types of PFAS have been identified.',
    source: { label: 'USGS', href: usgsSource },
  },
  {
    id: 'water',
    label: 'U.S. tap water',
    value: '45%',
    description: 'Estimated to contain at least one PFAS tested by USGS.',
    source: { label: 'USGS, 2023', href: usgsSource },
  },
  {
    id: 'teenagers',
    label: 'U.S. teenagers',
    value: '96%+',
    description:
      'More than 96% of U.S. teenagers aged 12–19 had measurable concentrations of the four legacy PFAS studied in 2017–March 2020.',
    source: {
      label: 'CDC / NHANES',
      href: 'https://stacks.cdc.gov/view/cdc/261744',
    },
  },
  {
    id: 'treatment',
    label: 'Approved treatments',
    value: '0',
    description: 'No approved medical treatments specifically reduce PFAS in the body.',
    source: {
      label: 'CDC/ATSDR',
      href: 'https://www.atsdr.cdc.gov/pfas/hcp/faqs/index.html',
    },
  },
] as const satisfies readonly ProblemMetric[]

const clientParagraph = 'PFAS ("forever chemicals") and microplastics are now in our water, food and packaging, and they accumulate in the human body. Once ingested, PFAS can cycle between the liver and the gut many times instead of leaving, which is part of why they persist for years. Today there is no simple, everyday way for people to reduce what they carry.'

export function ProblemSection() {
  const reducedMotion = useReducedMotion()
  const hoverId = useId()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const activeIndex = hoveredIndex ?? focusedIndex

  return (
    <section
      id="science"
      className="problem-section section-shell"
      aria-labelledby="science-title"
    >
      <div className="problem-inner site-container">
        <header className="problem-header">
          <p className="problem-label section-eyebrow">THE PROBLEM</p>
          <h2
            id="science-title"
            className="problem-title section-heading font-display"
          >
            PFAS are everywhere.
            <span>The effects can last.</span>
          </h2>
          <p className="problem-description section-body">{clientParagraph}</p>
        </header>
        <dl className="problem-evidence" onMouseLeave={() => setHoveredIndex(null)}>
          {problemMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="problem-metric"
              data-highlighted={activeIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onFocusCapture={() => setFocusedIndex(index)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setFocusedIndex(null)
                }
              }}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reducedMotion ? 0 : 0.3,
                delay: reducedMotion ? 0 : index * 0.04,
              }}
            >
              <dt className="problem-metric-label">{metric.label}</dt>
              {/* Adapted from the free Aceternity Card Hover Effect registry.
                  Keep its shared layout indicator, without the demo's link wrapper
                  or heavy nested cards. Keyboard focus receives the same treatment. */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.dd
                    aria-hidden="true"
                    className="problem-hover-background"
                    layoutId={reducedMotion ? undefined : `problem-hover-${hoverId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  />
                )}
              </AnimatePresence>
              <dd className="problem-metric-value font-display">{metric.value}</dd>
              <dd className="problem-metric-copy">
                <p className="problem-metric-description">{metric.description}</p>
              </dd>
              <dd className="problem-metric-source">
                <a
                  href={metric.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${metric.source.label}: source for ${metric.label.toLowerCase()} (opens in a new tab)`}
                >
                  {metric.source.label}
                </a>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
