'use client'
import React, { useEffect, useRef, useState, useId } from 'react'
import { motion, useTransform, useScroll, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const gradientId = useId()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const element = contentRef.current
    if (!element) return
    const observer = new ResizeObserver(() =>
      setSvgHeight(element.offsetHeight),
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  )
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  )

  return (
    <motion.div
      ref={ref}
      className={cn('relative mx-auto h-full w-full max-w-4xl', className)}
    >
      <div
        className="tracing-beam-track absolute top-3 -left-4 md:-left-20"
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="var(--unmet-accent)"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="var(--unmet-accent)" stopOpacity="0"></stop>
              <stop stopColor="var(--unmet-accent)"></stop>
              <stop offset="0.325" stopColor="var(--unmet-accent)"></stop>
              <stop
                offset="1"
                stopColor="var(--unmet-accent)"
                stopOpacity="0"
              ></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}
