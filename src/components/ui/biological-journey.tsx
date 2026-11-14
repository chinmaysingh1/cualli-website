import { useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from 'react'
import { type MotionValue } from 'motion/react'
import { useTheme } from '@/hooks/use-theme'
import { drawBacterium, drawBubbles } from '@/lib/bacteria-canvas'
import { clampUnit, sampleJourney, smoothUnit, type JourneyGeometry } from '@/lib/technology-journey'

export function BiologicalJourney({ containerRef, timeline, enabled, onReady }: {
  containerRef: RefObject<HTMLDivElement | null>
  timeline: MotionValue<number>
  enabled: boolean
  onReady: Dispatch<SetStateAction<boolean>>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !container || !context) return
    const c = context
    if (!enabled) {
      c.clearRect(0, 0, canvas.width, canvas.height)
      onReady(false)
      return
    }
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let geometry: JourneyGeometry = { centers: [], mobile: false, laneX: 16 }
    const visuals = Array.from(container.querySelectorAll<HTMLElement>('.technology-step-visual'))

    const headings = [0, 0]
    let lastTime: number | null = null
    function draw() {
      c.setTransform(ratio, 0, 0, ratio, 0, 0)
      c.clearRect(0, 0, width, height)
      if (geometry.centers.length !== 4) return
      const time = timeline.get()
      const jumped = lastTime === null || Math.abs(time - lastTime) > 0.4
      const elapsed = lastTime === null ? 0 : Math.abs(time - lastTime) * 2.1
      lastTime = time
      const count = 2
      for (let index = 0; index < count; index++) {
        // These are the same organisms for the entire journey, not new sprites
        // mounted at each phase. Small offsets make a calm, recognizable group.
        const position = Math.max(0, time - index * 0.055)
        const point = sampleJourney(position, geometry)
        const before = sampleJourney(Math.max(0, position - 0.012), geometry)
        const ahead = sampleJourney(Math.min(4, position + 0.012), geometry)
        const targetHeading = Math.atan2(ahead.y - before.y, ahead.x - before.x)
        const difference = Math.atan2(Math.sin(targetHeading - headings[index]), Math.cos(targetHeading - headings[index]))
        headings[index] = jumped ? targetHeading : headings[index] + difference * (1 - Math.exp(-elapsed * 14))
        const direction = headings[index]
        const spread = geometry.mobile ? index * 6 : (index === 0 ? -9 : 9)
        const capture = smoothUnit((position - 2.08) / 0.48)
        const alpha = Math.min(clampUnit((position - 0.08) / 0.18), clampUnit((4 - time) / 0.18))
        const scale = geometry.mobile ? 0.28 : 0.4 + Math.sin(clampUnit((position - 2) / 0.7) * Math.PI) * 0.05
        c.save()
        c.globalAlpha = alpha
        c.translate(point.x - Math.sin(direction) * spread, point.y + Math.cos(direction) * spread)
        c.rotate(direction + Math.sin(position * 5 + index) * 0.12)
        c.scale(scale, scale)
        drawBubbles(c, index, theme === 'dark', time * 2.1 + index, true)
        drawBacterium(c, index, theme === 'dark')
        // Two round marks and one angular mark remain attached through exit.
        // This is a conceptual capture sequence, not measured research data.
        const particles = [[-14, -21, -42, -28], [20, 21, 46, 32], [28, -22, 32, -35]]
        const particleOpacity = clampUnit((position - 1.98) / 0.12)
        c.fillStyle = theme === 'dark' ? '#C5E7EF' : '#477B94'
        particles.forEach(([x, y, dx, dy], particleIndex) => {
          c.save()
          c.globalAlpha *= particleOpacity
          const px = x + dx * (1 - capture)
          const py = y + dy * (1 - capture)
          if (particleIndex === 2) c.fillRect(px - 3.5, py - 3.5, 7, 7)
          else {
            c.beginPath()
            c.arc(px, py, 4.5, 0, Math.PI * 2)
            c.fill()
          }
          c.restore()
        })
        c.restore()
      }
    }

    function measure() {
      const bounds = container!.getBoundingClientRect()
      const zoom = bounds.width / container!.clientWidth || 1
      width = container!.clientWidth
      height = container!.clientHeight
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      const centers = visuals.map((visual) => {
        const box = visual.getBoundingClientRect()
        return { x: (box.left + box.width / 2 - bounds.left) / zoom, y: (box.top + box.height / 2 - bounds.top) / zoom }
      })
      geometry = { centers, mobile: centers.length > 1 && Math.abs(centers[1].y - centers[0].y) > 60, laneX: 16 }
      onReady(centers.length === 4)
      draw()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    visuals.forEach((visual) => observer.observe(visual))
    const unsubscribe = timeline.on('change', draw)
    measure()
    return () => {
      unsubscribe()
      observer.disconnect()
      c.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [containerRef, enabled, onReady, theme, timeline])

  return <canvas ref={canvasRef} className="technology-biological-journey" aria-hidden="true" />
}
