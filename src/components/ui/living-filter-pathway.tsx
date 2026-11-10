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
    <div ref={containerRef} className="technology-flow" data-bacteria-running={running}>
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
              <>
              <svg
                className="technology-connector"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 6H96M91 2L96 6L91 10" />
              </svg>
              <svg
                className={`technology-bacteria-transit technology-bacteria-transit-${stage.value}`}
                viewBox="0 0 60 28"
                aria-hidden="true"
                focusable="false"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g className="technology-bacteria-traveler">
                  <g transform="translate(29 14) scale(.75)">
                    <Bacterium bound={stage.value === 'capture'} />
                  </g>
                </g>
              </svg>
              </>
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

// Original conceptual illustrations, not validated biological models.
function Bacterium({ bound = false }: { bound?: boolean }) {
  return (
    <g className="technology-bacterium">
      <rect x="-13" y="-6" width="26" height="12" rx="6" fill="var(--background)" />
      <path d="M-8-6L-10-9M0-6V-9M8-6L10-9M-8 6L-10 9M0 6V9M8 6L10 9M-13 0C-18-4-17 5-22 1" />
      <path d="M-7 0Q-3-4 0 0T7 0" opacity=".7" />
      {bound && (
        <g className="technology-bound-particles" fill="currentColor" strokeWidth="1">
          <circle cx="-6" cy="-9" r="2" />
          <circle cx="8" cy="8" r="1.8" />
          <path d="M12-8L15-6L13-3L10-5Z" />
        </g>
      )}
    </g>
  )
}

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
      className={`technology-biology technology-biology-${stage}`}
    >
      {stage === 'take' && (
        <>
          <g transform="rotate(28 52 50)">
            <g className="technology-capsule-cap">
              <path d="M34 49V30a18 18 0 0 1 36 0V49ZM40 31C40 24 45 19 51 19" />
            </g>
            <path d="M34 53H70V73a18 18 0 0 1-36 0Z" />
          </g>
          <g transform="translate(81 52) rotate(20)">
            <g className="technology-bacteria-emerge"><Bacterium /></g>
          </g>
          <g transform="translate(89 79) rotate(-12) scale(.75)">
            <g className="technology-bacteria-emerge technology-bacteria-companion"><Bacterium /></g>
          </g>
        </>
      )}
      {stage === 'reach' && (
        <>
          <g opacity=".65">
            <path d="M51 12V27C51 35 39 33 36 40C32 49 39 52 46 52H77C88 52 88 65 77 65H43C32 65 32 78 43 78H76C84 78 86 88 78 92H68V100" />
            <path d="M63 12V27C63 34 77 29 83 37C88 43 85 47 80 47H47C41 47 41 41 47 40H55" />
            <path d="M31 48C22 50 22 58 27 62C18 70 23 85 32 87C39 100 51 97 57 92H67" opacity=".5" />
          </g>
          <g transform="translate(61 58) scale(.85)">
            <g className="technology-bacteria-settle"><Bacterium /></g>
          </g>
          <g transform="translate(56 82) scale(.65)"><Bacterium /></g>
        </>
      )}
      {stage === 'capture' && (
        <>
          <g transform="translate(61 55) rotate(-18) scale(1.65)"><Bacterium /></g>
          <g className="technology-capture-particles" fill="currentColor">
            <circle className="technology-contaminant technology-contaminant-one" cx="44" cy="37" r="3" />
            <circle className="technology-contaminant technology-contaminant-two" cx="79" cy="67" r="2.7" />
            <path className="technology-contaminant technology-contaminant-three" d="M76 28L81 32L77 37L72 33Z" />
          </g>
        </>
      )}
      {stage === 'exit' && (
        <>
          <g opacity=".55">
            <path d="M16 54H104M95 45L104 54L95 63M23 84H90M84 79L90 84L84 89" />
          </g>
          <g transform="translate(61 45) scale(1.15)">
            <g className="technology-bacteria-exit"><Bacterium bound /></g>
          </g>
        </>
      )}
    </svg>
  )
}
