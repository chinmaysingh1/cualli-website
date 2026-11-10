// Installed from the free @aceternity/encrypted-text registry component.
// Preserves its space-aware scrambling and elapsed-time character reveal, with
// reduced motion, stable accessible text, and frame state instead of render-time
// ref mutation. It runs once per mount and cancels its animation on unmount.
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type EncryptedTextProps = {
  text: string
  className?: string
  revealDelayMs?: number
  charset?: string
  flipDelayMs?: number
  encryptedClassName?: string
  revealedClassName?: string
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function generateGibberishPreservingSpaces(
  text: string,
  charset: string,
): string {
  const alphabet = charset.replace(/[^A-Za-z]/g, '') || DEFAULT_CHARSET
  return Array.from(text, (character) =>
    /\s/.test(character)
      ? character
      : alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
  ).join('')
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()
  const [frame, setFrame] = useState(() => ({
    revealed: 0,
    scrambled: generateGibberishPreservingSpaces(text, charset),
  }))

  useEffect(() => {
    if (!inView || reducedMotion || !text) return
    const start = performance.now()
    let lastFlip = start
    let lastReveal = 0
    let scrambled = generateGibberishPreservingSpaces(text, charset)
    let animationId = 0
    const length = Array.from(text).length

    const update = (now: number) => {
      const revealed = Math.min(
        length,
        Math.floor((now - start) / Math.max(1, revealDelayMs)),
      )
      const shouldFlip = now - lastFlip >= Math.max(1, flipDelayMs)
      if (shouldFlip) {
        scrambled = generateGibberishPreservingSpaces(text, charset)
        lastFlip = now
      }
      if (revealed !== lastReveal || shouldFlip) {
        setFrame({ revealed, scrambled })
        lastReveal = revealed
      }
      if (revealed < length) {
        animationId = requestAnimationFrame(update)
      }
    }
    animationId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationId)
  }, [inView, reducedMotion, text, revealDelayMs, charset, flipDelayMs])

  const tokens = Array.from(text.matchAll(/\S+|\s+/g), (match) => ({
    word: match[0],
    start: Array.from(text.slice(0, match.index)).length,
  }))
  return (
    <span
      ref={ref}
      className={cn(className)}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map(({ word, start }, tokenIndex) => {
          const characters = Array.from(word)
          if (/^\s*$/.test(word)) return word
          return (
            <EncryptedWord
              key={tokenIndex}
              word={word}
              resolved={
                Boolean(reducedMotion) ||
                frame.revealed >= start + characters.length
              }
            >
              {characters.map((character, index) => {
                const revealed = reducedMotion || start + index < frame.revealed
                return (
                  <span
                    key={index}
                    className={cn(
                      revealed ? revealedClassName : encryptedClassName,
                    )}
                  >
                    {revealed ? character : frame.scrambled[start + index]}
                  </span>
                )
              })}
            </EncryptedWord>
          )
        })}
      </span>
    </span>
  )
}

// The actual word reserves its natural width and height. The scrambled layer is
// fitted into that space before paint, so glyph changes cannot rewrap the heading
// or push its paragraph down. No fixed heading height or clipped letters needed.
function EncryptedWord({
  word,
  resolved,
  children,
}: {
  word: string
  resolved: boolean
  children: ReactNode
}) {
  const wordRef = useRef<HTMLSpanElement>(null)
  const cipherRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const element = wordRef.current
    const cipher = cipherRef.current
    if (!element || !cipher) return
    const fit = () => {
      cipher.style.transform = 'none'
      if (resolved) return
      const width = element.getBoundingClientRect().width
      const naturalWidth = cipher.getBoundingClientRect().width
      if (naturalWidth > width && naturalWidth > 0) {
        cipher.style.transform = `scaleX(${width / naturalWidth})`
      }
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    return () => observer.disconnect()
  }, [children, resolved])

  return (
    <span
      ref={wordRef}
      style={{
        display: 'inline-block',
        position: 'relative',
        whiteSpace: 'pre',
      }}
    >
      <span style={{ visibility: 'hidden' }}>{word}</span>
      <span
        ref={cipherRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'max-content',
          transformOrigin: 'left center',
        }}
      >
        {children}
      </span>
    </span>
  )
}
