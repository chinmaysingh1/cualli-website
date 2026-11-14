// Aceternity's canvas renderer: original noise, geometry, frame blending and speed.
// Organisms share the wave geometry and animation clock on an unblurred layer.
import { cn } from '@/lib/utils'
import { useEffect, useRef, type ReactNode } from 'react'
import { createNoise3D } from 'simplex-noise'
import { darkWaveColors } from '@/constants/theme'
import { drawBacterium, drawBubbles } from '@/lib/bacteria-canvas'

interface WavyBackgroundProps {
  children?: ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: 'slow' | 'fast'
  waveOpacity?: number
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors = darkWaveColors,
  waveWidth = 50,
  backgroundFill = 'black',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const organismRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const organismCanvas = organismRef.current
    const organismCtx = organismCanvas?.getContext('2d')
    const ctx = canvas.getContext('2d')
    if (!ctx) return // The theme's solid background and content remain readable.
    const noise = createNoise3D()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let w = 0
    let h = 0
    let nt = 0
    let animationId = 0
    let lastFrame: number | null = null
    let organismTime = 0
    let safeTop = 0
    let visibleBottom = 0
    const dark = backgroundFill.toLowerCase() === '#000000' || backgroundFill === 'black'
    const waveY = (x: number, band: number) =>
      noise(x / 800, 0.3 * band, nt) * 100 + h * 0.5
    const organisms = [
      { start: 0.06, band: 1, scale: 0.94, tilt: -20 },
      { start: 0.207, band: 4, scale: 1.08, tilt: 10 },
      { start: 0.353, band: 2, scale: 0.88, tilt: -15 },
      { start: 0.5, band: 3, scale: 1, tilt: 18 },
      { start: 0.647, band: 0, scale: 0.9, tilt: -8 },
      { start: 0.793, band: 3, scale: 0.98, tilt: 16 },
      { start: 0.94, band: 1, scale: 0.86, tilt: -24 },
    ]
    const drawOrganisms = () => {
      if (!organismCtx || !organismCanvas) return
      const c = organismCtx
      c.clearRect(0, 0, w, h)
      c.save()
      c.beginPath()
      c.rect(0, Math.max(0, safeTop), w, Math.max(0, visibleBottom - Math.max(0, safeTop)))
      c.clip()
      const mobile = w < 640
      const size = mobile ? 32 : w < 1024 ? 38 : 48
      organisms.forEach((organism, index) => {
        // Seven on desktop, three on tablets, two on phones.
        if (index >= (mobile ? 2 : w < 1024 ? 3 : 7)) return
        const start = mobile
          ? [0.24, 0.72][index]
          : w < 1024
            ? [0.14, 0.5, 0.86][index]
            : organism.start
        // A faster shared current keeps the organisms spread out, while bounded
        // swimming motions make them feel active without changing the wave field.
        const drift = organismTime * 0.0095 +
          (Math.sin(organismTime * 0.45 + index) - Math.sin(index)) * 0.009
        const phase = (start + drift) % 1
        const x = phase * w
        const swimRange = mobile ? 7 : 12
        const swim = Math.sin(organismTime * 0.72 + index * 1.7) * swimRange +
          Math.sin(organismTime * 0.31 + index) * swimRange * 0.35
        const y = waveY(x, organism.band) + swim
        const radius = size * organism.scale * 0.95
        // Fade out rather than leave the current or pass behind hero controls.
        const clearance = Math.min(y - radius - safeTop, visibleBottom - y - radius)
        const alpha = Math.min(1, Math.max(0, clearance / 20), phase / 0.05, (1 - phase) / 0.05)
        if (alpha <= 0) return
        const slope = (waveY(x + 4, organism.band) - waveY(x - 4, organism.band)) / 8
        c.save()
        c.translate(x, y)
        // Alternate slow full rotations, with slightly varied speeds per cell.
        const spin = organismTime * (0.36 + index % 3 * 0.06) * (index % 2 ? -1 : 1)
        c.rotate(Math.atan(slope) + organism.tilt * Math.PI / 180 + spin)
        c.scale(size * organism.scale / 80, size * organism.scale / 80)
        c.globalAlpha = alpha * (dark ? 0.76 : 0.68)
        drawBubbles(c, index, dark, organismTime)
        drawBacterium(c, index, dark)
        c.restore()
      })
      c.restore()
    }
    const getSpeed = () => (speed === 'slow' ? 0.001 : 0.002)

    // This is the original Aceternity drawWave algorithm, including h * 0.5.
    const drawWave = (n: number) => {
      nt += getSpeed()
      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth
        ctx.strokeStyle = colors[i % colors.length]
        for (let x = 0; x < w; x += 5) {
          ctx.lineTo(x, waveY(x, i))
        }
        ctx.stroke()
        ctx.closePath()
      }
    }

    const render = (timestamp?: number) => {
      if (timestamp !== undefined && !reducedMotion.matches && !document.hidden) {
        if (lastFrame !== null) organismTime += Math.min((timestamp - lastFrame) / 1000, 0.05)
        lastFrame = timestamp
      }
      // Preserve the original translucent fill and accumulated wave trails.
      // Clearing every frame or making the fill opaque removes this fluid effect.
      ctx.fillStyle = backgroundFill
      ctx.globalAlpha = waveOpacity
      ctx.fillRect(0, 0, w, h)
      drawWave(5)
      drawOrganisms()
      if (!reducedMotion.matches && !document.hidden) {
        animationId = requestAnimationFrame(render)
      }
    }
    const restart = () => {
      cancelAnimationFrame(animationId)
      lastFrame = null
      render()
    }
    const resize = () => {
      // Keep the backing dimensions equal to the displayed size, as in the original.
      // Scope the size to this full-height hero rather than the entire window.
      w = canvas.width = container.clientWidth
      h = canvas.height = container.clientHeight
      ctx.filter = `blur(${blur}px)`
      if (organismCanvas) {
        organismCanvas.width = w
        organismCanvas.height = h
      }
      const canvasBounds = canvas.getBoundingClientRect()
      const containerBounds = container.getBoundingClientRect()
      const scale = containerBounds.width / w || 1
      const controls = container.querySelector('.hero-actions')?.getBoundingClientRect()
      safeTop = controls ? (controls.bottom - canvasBounds.top) / scale + 16 : 0
      visibleBottom = (containerBounds.bottom - canvasBounds.top) / scale
      // Pick a real band with room below the controls at each initial position.
      // Keep that assignment throughout playback, rather than hopping between paths.
      for (const organism of organisms) {
        const x = organism.start * w
        const clearance = (band: number) => {
          const y = waveY(x, band)
          return Math.min(y - safeTop, visibleBottom - y)
        }
        if (clearance(organism.band) < 85) {
          organism.band = [0, 1, 2, 3, 4].reduce((best, band) =>
            clearance(band) > clearance(best) ? band : best,
          organism.band)
        }
      }
      restart()
    }

    // Preserve Aceternity's Safari CSS-filter fallback.
    const isSafari =
      navigator.userAgent.includes('Safari') &&
      !navigator.userAgent.includes('Chrome')
    canvas.style.filter = isSafari ? `blur(${blur}px)` : ''
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    const controls = container.querySelector('.hero-actions')
    if (controls) observer.observe(controls)
    reducedMotion.addEventListener('change', restart)
    document.addEventListener('visibilitychange', restart)
    resize()
    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
      reducedMotion.removeEventListener('change', restart)
      document.removeEventListener('visibilitychange', restart)
    }
  }, [backgroundFill, blur, colors, speed, waveOpacity, waveWidth])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative isolate h-screen flex flex-col items-center justify-center',
        containerClassName,
      )}
      style={{ background: backgroundFill }}
    >
      <canvas
        className="wave-canvas absolute inset-0 z-0"
        ref={canvasRef}
        aria-hidden="true"
      />
      <canvas
        className="wave-canvas absolute inset-0 z-0"
        ref={organismRef}
        aria-hidden="true"
      />
      <div className={cn('relative z-10 w-full', className)}>{children}</div>
    </div>
  )
}
