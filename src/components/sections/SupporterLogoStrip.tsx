import { useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { supporterLogos } from '@/constants/awards'

export function SupporterLogoStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.1 })
  const [paused, setPaused] = useState(false)

  return (
    <div
      ref={ref}
      className="supporter-strip"
      role="region"
      aria-label="Organizations supporting Cualli"
    >
      <div
        className="supporter-window"
        role="button"
        tabIndex={0}
        aria-label={`${supporterLogos.map((logo) => logo.name).join(', ')}. ${paused ? 'Resume' : 'Pause'} logo animation`}
        aria-pressed={paused}
        onClick={() => setPaused((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setPaused((current) => !current)
          }
        }}
      >
        <div
          className="supporter-track"
          style={{
            animationPlayState: paused || !inView ? 'paused' : 'running',
          }}
        >
          {[false, true].map((duplicate) => (
            <ul
              key={String(duplicate)}
              className={`supporter-group${duplicate ? ' supporter-group-copy' : ''}`}
              aria-hidden={duplicate ? true : undefined}
            >
              {supporterLogos.map((logo) => (
                <li
                  key={logo.src}
                  className={`supporter-logo supporter-logo-${logo.variant}`}
                >
                  <img
                    src={logo.src}
                    alt={duplicate ? '' : logo.name}
                    width={logo.width}
                    height={logo.height}
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

    </div>
  )
}
