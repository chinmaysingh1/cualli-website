// Adapted from the free Aceternity Draggable Card registry component.
// Retains pointer-driven spring tilt and Motion dragging; uses local bounds,
// persistent released positions, and static mobile presentation instead of viewport
// constraints, velocity throws, glare, or global cursor mutations.
import {
  useRef,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'

const desktopPointer = '(min-width: 1024px)'
function subscribe(callback: () => void) {
  const media = window.matchMedia(desktopPointer)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
const getSnapshot = () => window.matchMedia(desktopPointer).matches
const getServerSnapshot = () => false

// Motion measures viewport pixels, while translated positions use CSS pixels.
// Keep bounds and pointer deltas in the same coordinate system under page zoom.
function unscalePagePoint(point: { x: number; y: number }) {
  const zoom = getComputedStyle(document.documentElement).zoom
  const scale =
    (zoom.endsWith('%') ? parseFloat(zoom) / 100 : parseFloat(zoom)) || 1
  return { x: point.x / scale, y: point.y / scale }
}

export function DraggableCardBody({
  className,
  children,
  constraintsRef,
  initialRotation = 0,
  zIndex = 1,
  onActivate,
}: {
  className?: string
  children?: ReactNode
  constraintsRef: RefObject<HTMLDivElement | null>
  initialRotation?: number
  zIndex?: number
  onActivate?: () => void
}) {
  const cardRef = useRef<HTMLElement>(null)
  const dragBounds = useRef<{ left: number; right: number; top: number; bottom: number } | null>(null)
  const desktop = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )
  const reducedMotion = useReducedMotion()
  const interactive = desktop
  const tiltEnabled = interactive && !reducedMotion
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 140, damping: 24, mass: 0.5 }
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [3, -3]),
    springConfig,
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-3, 3]),
    springConfig,
  )

  function resetTilt() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.figure
      ref={cardRef}
      drag={interactive}
      dragConstraints={constraintsRef}
      onMeasureDragConstraints={(bounds) => {
        const card = cardRef.current
        if (!card) return bounds
        // Reserve room for the rotated corners and subtle pointer tilt.
        // Motion has already applied transformPagePoint to these measurements.
        const angle = (Math.abs(initialRotation) + (tiltEnabled ? 3 : 0)) * Math.PI / 180
        const insetX = Math.max(0, (card.offsetWidth * Math.cos(angle) + card.offsetHeight * Math.sin(angle) - card.offsetWidth) / 2) + 6
        const insetY = Math.max(0, (card.offsetHeight * Math.cos(angle) + card.offsetWidth * Math.sin(angle) - card.offsetHeight) / 2) + 6
        const measured = {
          left: bounds.left + insetX,
          right: bounds.right - insetX,
          top: bounds.top + insetY,
          bottom: bounds.bottom - insetY,
        }
        dragBounds.current = measured
        return measured
      }}
      dragElastic={0}
      dragMomentum={false}
      dragSnapToOrigin={false}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 28 }}
      onPointerDown={interactive ? onActivate : undefined}
      onDrag={(_, info) => {
        if (!tiltEnabled) return
        mouseX.set(info.velocity.x * 0.05)
        mouseY.set(info.velocity.y * 0.05)
      }}
      onDragEnd={resetTilt}
      tabIndex={interactive ? 0 : undefined}
      onFocus={interactive ? onActivate : undefined}
      onKeyDown={(event) => {
        if (!interactive || !dragBounds.current) return
        const direction = {
          ArrowLeft: [-1, 0], ArrowRight: [1, 0],
          ArrowUp: [0, -1], ArrowDown: [0, 1],
        }[event.key]
        if (!direction) return
        event.preventDefault()
        onActivate?.()
        const bounds = dragBounds.current
        const distance = event.shiftKey ? 40 : 12
        x.stop()
        y.stop()
        x.set(Math.max(bounds.left, Math.min(bounds.right, x.get() + direction[0] * distance)))
        y.set(Math.max(bounds.top, Math.min(bounds.bottom, y.get() + direction[1] * distance)))
      }}
      onPointerMove={(event) => {
        if (!tiltEnabled) return
        const bounds = cardRef.current?.getBoundingClientRect()
        if (!bounds) return
        mouseX.set(event.clientX - bounds.left - bounds.width / 2)
        mouseY.set(event.clientY - bounds.top - bounds.height / 2)
      }}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={{
        x: interactive ? x : 0,
        y: interactive ? y : 0,
        rotate: desktop ? initialRotation : 0,
        rotateX: tiltEnabled ? rotateX : 0,
        rotateY: tiltEnabled ? rotateY : 0,
        zIndex,
        touchAction: interactive ? 'none' : 'auto',
        cursor: interactive ? 'grab' : 'auto',
      }}
      whileDrag={interactive ? { cursor: 'grabbing' } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.figure>
  )
}

export function DraggableCardContainer({
  ref,
  className,
  children,
}: {
  ref?: RefObject<HTMLDivElement | null>
  className?: string
  children?: ReactNode
}) {
  return (
    <MotionConfig transformPagePoint={unscalePagePoint}>
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    </MotionConfig>
  )
}
