import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { useTheme } from '@/hooks/use-theme'
import { drawBacterium, drawBubbles } from '@/lib/bacteria-canvas'

export function TechnologyBacteria() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const time = useRef(0)
  const inView = useInView(canvasRef, { amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas?.getContext('2d')
    if (!canvas || !c) return
    const context = c
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = 180 * ratio
    canvas.height = 144 * ratio
    let frame = 0
    let previous: number | null = null
    const moving = inView && reducedMotion === false

    function draw(timestamp?: number) {
      if (timestamp !== undefined) {
        if (previous !== null) time.current += Math.min((timestamp - previous) / 1000, 0.05)
        previous = timestamp
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, 180, 144)
      const t = time.current
      for (let index = 0; index < 2; index++) {
        context.save()
        const drift = moving ? Math.sin(t * 0.55 + index * 2) * 5 : 0
        context.translate(index ? 132 : 52, (index ? 94 : 50) + drift)
        context.rotate((index ? -0.55 : 0.4) + (moving ? t * (index ? -0.22 : 0.26) : 0))
        context.scale(0.58, 0.58)
        drawBubbles(context, index, theme === 'dark', moving ? t : 2, true)
        drawBacterium(context, index, theme === 'dark')
        context.restore()
      }
      if (moving && !document.hidden) frame = requestAnimationFrame(draw)
    }
    function restart() {
      cancelAnimationFrame(frame)
      previous = null
      draw()
    }
    document.addEventListener('visibilitychange', restart)
    restart()
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', restart)
    }
  }, [inView, reducedMotion, theme])

  return <canvas ref={canvasRef} className="technology-intro-bacteria" aria-hidden="true" />
}
