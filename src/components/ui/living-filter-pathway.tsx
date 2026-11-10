// Connected conceptual illustrations of the proposed living-filter pathway.
// Autoplay and manual selection share one cancellable Motion clock.
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'

type ProcessStage = {
  title: string
  value: string
  headline: string
  description: string
}
const STAGE_SECONDS = 4

export function LivingFilterPathway({ stages }: { stages: readonly ProcessStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [playbackRevision, setPlaybackRevision] = useState(0)
  const [documentVisible, setDocumentVisible] = useState(
    () =>
      typeof document !== 'undefined' && document.visibilityState === 'visible',
  )
  const stageRefs = useRef<Array<HTMLButtonElement | null>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const generationRef = useRef(0)
  const id = useId()
  const reducedMotion = useReducedMotion()
  const inView = useInView(containerRef, { amount: 0.2 })
  const progress = useMotionValue(0)
  // Wait until the preference is known before starting any automatic changes.
  const running =
    !paused && reducedMotion === false && inView && documentVisible

  useEffect(() => {
    function updateVisibility() {
      setDocumentVisible(document.visibilityState === 'visible')
      if (document.visibilityState !== 'visible') {
        generationRef.current += 1
        animationRef.current?.stop()
      }
    }
    document.addEventListener('visibilitychange', updateVisibility)
    return () =>
      document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    if (!running) return
    let cancelled = false
    const generation = ++generationRef.current
    const remaining = STAGE_SECONDS * (1 - progress.get())
    // One clock drives each stage change: no interval drift,
    // overlapping timers, or separate progress and content schedules.
    const playback = animate(progress, 1, {
      duration: remaining,
      ease: 'linear',
      onComplete: () => {
        if (cancelled || generation !== generationRef.current) return
        progress.set(0)
        setActiveIndex((current) => (current + 1) % stages.length)
      },
    })
    animationRef.current = playback
    return () => {
      cancelled = true
      playback.stop()
      animationRef.current = null
    }
  }, [activeIndex, playbackRevision, running, progress, stages.length])

  function selectStage(index: number) {
    // Invalidate pending completions before changing selection or restarting.
    generationRef.current += 1
    animationRef.current?.stop()
    progress.set(0)
    if (index === activeIndex && !reducedMotion) {
      setPaused(false)
      // Also restart when the active stage is selected during playback.
      setPlaybackRevision((current) => current + 1)
    } else {
      setPaused(true)
      setActiveIndex(index)
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex = (index + 1) % stages.length
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex = (index - 1 + stages.length) % stages.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = stages.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    stageRefs.current[nextIndex]?.focus()
  }

  return (
    <div ref={containerRef} className="technology-flow">
      <ol
        className="technology-pathway"
        aria-label="Proposed living filter pathway"
      >
        {stages.map((stage, index) => (
          <li
            key={stage.value}
            className="technology-pathway-step"
            data-active={activeIndex === index}
          >
            <span className="technology-step-number">Step {index + 1}</span>
            <button
              type="button"
              id={`${id}-step-${stage.value}`}
              aria-pressed={activeIndex === index}
              aria-describedby={`${id}-description-${stage.value} ${id}-playback-status`}
              aria-label={
                reducedMotion
                  ? `${stage.headline}. Select stage.`
                  : activeIndex === index
                    ? `${stage.headline}. Selected. Activate to resume automatic playback.`
                    : `${stage.headline}. Select and pause automatic playback.`
              }
              ref={(element) => {
                stageRefs.current[index] = element
              }}
              onClick={() => selectStage(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="technology-step"
            >
              <motion.span
                className="technology-step-visual"
                aria-hidden="true"
                animate={{
                  scale: activeIndex === index && !reducedMotion ? 1.04 : 1,
                  opacity: 1,
                }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                <StageIllustration stage={stage.value} />
              </motion.span>
              <span className="technology-box-title">{stage.headline}</span>
              <span
                className="technology-box-description"
                id={`${id}-description-${stage.value}`}
              >
                {stage.description}
              </span>
            </button>
            {index < stages.length - 1 && (
              <svg
                className="technology-connector"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 6H96M91 2L96 6L91 10" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <span id={`${id}-playback-status`} role="status" className="sr-only">
        {reducedMotion
          ? 'Automatic playback disabled for reduced motion.'
          : paused
            ? 'Sequence paused.'
            : running
              ? 'Sequence playing.'
              : 'Sequence paused while not visible.'}
      </span>
      <div className="technology-return-loop">
        <svg
          className="technology-return-desktop"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M875 0V28Q875 40 863 40H137Q125 40 125 28V0M119 8L125 0L131 8" />
        </svg>
        <p className="technology-loop-caption">
          repeat daily to keep the filter working
        </p>
      </div>
      <svg
        className="technology-return-mobile"
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M20 99H8Q2 99 2 97V3Q2 1 8 1H20M15 0L20 1L15 2" />
      </svg>
    </div>
  )
}

// Original, conceptual vector illustrations; not validated biological models.
function StageIllustration({ stage }: { stage: string }) {
  return (
    <svg
      viewBox="0 0 120 108"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {stage === 'take' && (
        <g transform="rotate(28 60 54)">
          <rect x="40" y="15" width="40" height="78" rx="20" />
          <path d="M40 54H80M47 34C47 27 52 22 58 22" />
          <circle cx="52" cy="66" r="1.5" />
          <circle cx="64" cy="65" r="1.5" />
          <circle cx="59" cy="76" r="1.5" />
          <circle cx="68" cy="80" r="1.5" />
        </g>
      )}
      {stage === 'reach' && (
        <g>
          <path d="M51 12V27C51 35 39 33 36 40C32 49 39 52 46 52H77C88 52 88 65 77 65H43C32 65 32 78 43 78H76C84 78 86 88 78 92H68V100" />
          <path d="M63 12V27C63 34 77 29 83 37C88 43 85 47 80 47H47C41 47 41 41 47 40H55" />
          <path
            d="M31 48C22 50 22 58 27 62C18 70 23 85 32 87C39 100 51 97 57 92H67"
            opacity=".5"
          />
        </g>
      )}
      {stage === 'capture' && (
        <g>
          <g transform="rotate(-20 59 55)">
            <rect x="27" y="36" width="65" height="36" rx="18" />
            <path d="M37 36L34 30M51 36V29M66 36V29M80 37L84 31M37 72L34 78M52 72V79M67 72V79M81 70L86 76M27 48L20 46M27 60L20 63M92 48L99 46" />
            <circle cx="45" cy="53" r="3" />
            <circle cx="59" cy="57" r="3" />
            <circle cx="74" cy="50" r="3" />
          </g>
          <circle cx="17" cy="24" r="3" />
          <circle cx="100" cy="28" r="3" />
          <circle cx="102" cy="83" r="3" />
          <circle cx="32" cy="94" r="3" />
          <path
            d="M24 28L33 34M95 33L87 39M96 78L88 72"
            strokeDasharray="2 4"
            opacity=".6"
          />
        </g>
      )}
      {stage === 'exit' && (
        <g>
          <path d="M20 31H43C57 31 56 54 70 54H103M94 45L103 54L94 63" />
          <path
            d="M20 54H41C51 54 51 67 62 67H84M20 77H43C56 77 53 90 67 90H86"
            opacity=".55"
          />
          <path d="M77 82L86 90L77 98" opacity=".55" />
          <circle cx="15" cy="31" r="2" />
          <circle cx="15" cy="54" r="2" />
          <circle cx="15" cy="77" r="2" />
        </g>
      )}
    </svg>
  )
}
