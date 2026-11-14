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
  useTransform,
  type MotionValue,
} from 'motion/react'
import { BiologicalJourney } from '@/components/ui/biological-journey'
import { useTheme } from '@/hooks/use-theme'
import { drawBacterium, drawBubbles } from '@/lib/bacteria-canvas'

type ProcessStage = {
  title: string
  value: string
  headline: string
  description: string
}
// Four phases on one uninterrupted 8.4-second timeline.
const STAGE_SECONDS = 2.1

export function LivingFilterPathway({ stages }: { stages: readonly ProcessStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [journeyReady, setJourneyReady] = useState(false)
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
    const remaining = STAGE_SECONDS * (stages.length - progress.get())
    let currentIndex = Math.floor(progress.get())
    // One clock drives each stage change: no interval drift,
    // overlapping timers, or separate progress and content schedules.
    const playback = animate(progress, stages.length, {
      duration: remaining,
      ease: 'linear',
      onUpdate: (value) => {
        const index = Math.min(stages.length - 1, Math.floor(value))
        if (index !== currentIndex) {
          currentIndex = index
          setActiveIndex(index)
        }
      },
      onComplete: () => {
        if (cancelled || generation !== generationRef.current) return
        progress.set(0)
        setActiveIndex(0)
        setPlaybackRevision((current) => current + 1)
      },
    })
    animationRef.current = playback
    return () => {
      cancelled = true
      playback.stop()
      animationRef.current = null
    }
  }, [playbackRevision, running, progress, stages.length])

  function selectStage(index: number) {
    // Invalidate pending completions before changing selection or restarting.
    generationRef.current += 1
    animationRef.current?.stop()
    if (index === activeIndex && !reducedMotion) {
      progress.set(index)
      setPaused(false)
      // Also restart when the active stage is selected during playback.
      setPlaybackRevision((current) => current + 1)
    } else {
      setPaused(true)
      setActiveIndex(index)
      progress.set(index + 0.58)
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
                <StageIllustration
                  stage={stage.value}
                  progress={progress}
                  stageIndex={index}
                  showBacteria={!journeyReady}
                  staticFrame={Boolean(reducedMotion || paused)}
                />
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
      <BiologicalJourney
        containerRef={containerRef}
        timeline={progress}
        enabled={reducedMotion === false}
        onReady={setJourneyReady}
      />
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
function Bacterium({ bound = false, phase }: {
  bound?: boolean
  phase?: MotionValue<number>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const c = context
    // Reuse the hero artwork at twice the SVG's logical resolution. The existing
    // stage MotionValue drives repainting; no extra animation loops or timers.
    const ratio = Math.min(window.devicePixelRatio || 1, 3) * 2
    canvas.width = Math.round(52 * ratio)
    canvas.height = Math.round(44 * ratio)
    function draw() {
      const position = phase?.get() ?? 0.68
      c.setTransform(ratio, 0, 0, ratio, 0, 0)
      c.clearRect(0, 0, 52, 44)
      c.save()
      c.translate(26, 22)
      c.rotate(Math.sin(position * Math.PI * 2) * 0.12)
      c.scale(0.36, 0.36)
      drawBubbles(c, bound ? 1 : 0, theme === 'dark', position * 8 + 1, true)
      drawBacterium(c, 0, theme === 'dark')
      if (bound) {
        c.fillStyle = theme === 'dark' ? '#C5E7EF' : '#477B94'
        for (const [x, y] of [[-14, -21], [20, 21]]) {
          c.beginPath()
          c.arc(x, y, 4.5, 0, Math.PI * 2)
          c.fill()
        }
        c.fillRect(28, -22, 7, 7)
      }
      c.restore()
    }
    draw()
    return phase?.on('change', draw)
  }, [bound, phase, theme])

  return (
    <foreignObject x="-26" y="-22" width="52" height="44">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: 52, height: 44, pointerEvents: 'none' }}
        aria-hidden="true"
      />
    </foreignObject>
  )
}

type IllustrationProps = {
  stage: string
  progress: MotionValue<number>
  stageIndex: number
  showBacteria: boolean
  staticFrame?: boolean
}

function CaptureParticle({ phase, x, y, square = false }: {
  phase: MotionValue<number>
  x: number
  y: number
  square?: boolean
}) {
  const offsetX = useTransform(phase, [0, 0.2, 0.65, 1], [x, x * 0.85, 0, 0])
  const offsetY = useTransform(phase, [0, 0.2, 0.65, 1], [y, y * 0.85, 0, 0])
  const opacity = useTransform(phase, [0, 0.3, 0.65, 1], [0.45, 0.8, 1, 1])
  return (
    <motion.g style={{ x: offsetX, y: offsetY, opacity }}>
      {square ? <path d="M-3-3H3V3H-3Z" /> : <circle r="2.8" />}
    </motion.g>
  )
}

function StageIllustration({ stage, progress, stageIndex, showBacteria, staticFrame }: IllustrationProps) {
  // The existing stage clock drives every illustration and connector together.
  // Inactive/manual/reduced-motion views retain a complete, readable static state.
  const phase = useTransform(progress, (value) => {
    const position = staticFrame ? 0.68 : Math.max(0, Math.min(1, value - stageIndex))
    return position * position * (3 - 2 * position)
  })
  // Keep a schematic pollutant cluster visible between visits from the moving
  // bacteria. Fade it away during arrival/capture so the scene stays uncluttered.
  const captureIdleOpacity = useTransform(progress, (value) => {
    if (showBacteria) return 0
    if (value < 1.85 || value >= 3.1) return 1
    if (value < 2) return 1 - (value - 1.85) / 0.15
    if (value > 2.9) return (value - 2.9) / 0.2
    return 0
  })
  const capY = useTransform(phase, [0, 0.22, 1], [0, -9, -9])
  const emergeX = useTransform(phase, [0, 0.18, 0.6, 1], [-17, -12, 0, 2])
  const emergeY = useTransform(phase, [0, 0.6, 1], [5, 0, -1])
  const emergeOpacity = useTransform(phase, [0, 0.2, 0.5, 1], [0.2, 0.5, 1, 1])
  const settleX = useTransform(phase, [0, 0.5, 0.75, 1], [-24, -2, 1, 0])
  const settleY = useTransform(phase, [0, 0.5, 0.75, 1], [-10, 2, -1, 0])
  const settleRotate = useTransform(phase, [0, 0.55, 1], [-12, 3, 0])
  const exitX = useTransform(phase, [0, 0.3, 0.9, 1], [-18, -8, 22, 26])
  const exitY = useTransform(phase, [0, 0.5, 1], [2, -2, 0])
  const exitOpacity = useTransform(phase, [0, 0.12, 0.85, 1], [0.6, 1, 1, 0])
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
            <motion.g style={{ y: capY }}>
              <path d="M34 49V30a18 18 0 0 1 36 0V49ZM40 31C40 24 45 19 51 19" />
            </motion.g>
            <path d="M34 53H70V73a18 18 0 0 1-36 0Z" />
          </g>
          <g transform="translate(81 52) rotate(20)">
            <motion.g style={{ x: emergeX, y: emergeY, opacity: emergeOpacity }}>{showBacteria && <Bacterium phase={phase} />}</motion.g>
          </g>
          <g transform="translate(89 79) rotate(-12) scale(.75)">
            <motion.g style={{ x: emergeX, opacity: emergeOpacity }}>{showBacteria && <Bacterium phase={phase} />}</motion.g>
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
            <motion.g style={{ x: settleX, y: settleY, rotate: settleRotate }}>{showBacteria && <Bacterium phase={phase} />}</motion.g>
          </g>
          <g transform="translate(56 82) scale(.65)">{showBacteria && <Bacterium phase={phase} />}</g>
        </>
      )}
      {stage === 'capture' && (
        <>
          <motion.g style={{ opacity: captureIdleOpacity }}>
            <g stroke="currentColor" strokeWidth="1.7">
              <circle cx="43" cy="36" r="5" />
              <circle cx="76" cy="47" r="4" />
              <circle cx="47" cy="75" r="3.5" />
              <path d="M62 66L70 62L77 69L70 77L62 73Z" />
              <path d="M57 47L63 52L59 59L52 55Z" fill="currentColor" fillOpacity=".12" />
            </g>
          </motion.g>
          <g transform="translate(61 55) rotate(-18) scale(1.65)">{showBacteria && <Bacterium phase={phase} />}</g>
          <g className="technology-capture-particles" fill="currentColor" visibility={showBacteria ? 'visible' : 'hidden'}>
            <g transform="translate(44 37)"><CaptureParticle phase={phase} x={-19} y={-15} /></g>
            <g transform="translate(79 67)"><CaptureParticle phase={phase} x={21} y={15} /></g>
            <g transform="translate(77 32)"><CaptureParticle phase={phase} x={20} y={-18} square /></g>
          </g>
        </>
      )}
      {stage === 'exit' && (
        <>
          <g opacity=".55">
            <path d="M16 54H104M95 45L104 54L95 63M23 84H90M84 79L90 84L84 89" />
          </g>
          <g transform="translate(61 45) scale(1.15)">
            <motion.g style={{ x: exitX, y: exitY, opacity: exitOpacity }}>{showBacteria && <Bacterium bound phase={phase} />}</motion.g>
          </g>
        </>
      )}
    </svg>
  )
}
