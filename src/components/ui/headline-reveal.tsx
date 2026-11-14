import { InlineTextReveal } from '@/components/ui/inline-text-reveal'

export function HeadlineReveal() {
  return (
    <>
      <span className="sr-only">PFAS don&apos;t just spread. They stay.</span>
      <span className="problem-title-line" aria-hidden="true">
        PFAS don&apos;t just spread.
      </span>
      <span
        className="problem-title-line problem-title-accent"
        aria-hidden="true"
      >
        <InlineTextReveal text="They stay." />
      </span>
    </>
  )
}
