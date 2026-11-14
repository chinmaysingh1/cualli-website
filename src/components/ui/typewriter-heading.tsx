import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type TypewriterHeadingProps = {
  text: string
  animate?: boolean
  className?: string
}

// Remount the typing state whenever the configured heading changes.
export function TypewriterHeading(props: TypewriterHeadingProps) {
  return <TypingHeading key={props.text} {...props} />
}

function TypingHeading({
  text,
  animate = true,
  className,
}: TypewriterHeadingProps) {
  const reducedMotion = useReducedMotion()
  const [revealed, setRevealed] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const characters = Array.from(text)
  const immediate = !animate || reducedMotion
  const count = immediate ? characters.length : revealed

  useEffect(() => {
    if (!animate || reducedMotion || !text) return
    let position = 0
    let cursorTimer: ReturnType<typeof setTimeout> | undefined
    const timer = setInterval(() => {
      position += 1
      setRevealed(position)
      if (position >= Array.from(text).length) {
        clearInterval(timer)
        cursorTimer = setTimeout(() => setCursorVisible(false), 180)
      }
    }, 30)
    return () => {
      clearInterval(timer)
      clearTimeout(cursorTimer)
    }
  }, [text, animate, reducedMotion])

  // All final characters occupy their natural space from the first frame.
  // Fade only the glyph itself, never override ancestor panel visibility.
  // This also leaves the cursor independent of an unrevealed first letter.
  const tokens = Array.from(text.matchAll(/\S+|\s+/g), (match) => ({
    word: match[0],
    start: Array.from(text.slice(0, match.index)).length,
  }))
  const cursorIndex = Math.max(0, count - 1)
  return (
    <h3 className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map(({ word, start }, tokenIndex) => (
          <span className="technology-typed-word" key={tokenIndex}>
            {Array.from(word).map((character, index) => (
              <span key={index} className="technology-typed-character">
                <span style={{ opacity: start + index < count ? 1 : 0 }}>
                  {character}
                </span>
                {!immediate &&
                  cursorVisible &&
                  start + index === cursorIndex && (
                    <span
                      className="technology-typewriter-cursor"
                      style={
                        count === 0 ? { left: 0, right: 'auto' } : undefined
                      }
                    />
                  )}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h3>
  )
}
