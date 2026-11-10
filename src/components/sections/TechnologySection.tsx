import { LivingFilterPathway } from '@/components/ui/living-filter-pathway'
import '@/styles/technology-section.css'

const processStages = [
  {
    title: 'Take',
    value: 'take',
    headline: 'Take one capsule',
    description: 'Daily probiotic supplement',
  },
  {
    title: 'Reach',
    value: 'reach',
    headline: 'Bacteria reach gut',
    description: 'The living filter forms along the gut',
  },
  {
    title: 'Capture',
    value: 'capture',
    headline: 'Pollutants caught',
    description: 'Bacteria bind PFAS and microplastics',
  },
  {
    title: 'Exit',
    value: 'exit',
    headline: 'Exit naturally',
    description: 'Carried out instead of being reabsorbed',
  },
] as const

export function TechnologySection() {

  return (
    <section
      id="technology"
      className="technology-section section-shell"
      aria-labelledby="technology-title"
    >
      <div className="technology-inner site-container">
        <header>
          <p className="technology-label section-eyebrow">OUR TECHNOLOGY</p>
          <h2
            id="technology-title"
            className="technology-title section-heading font-display"
          >
            Meet the living filter.
          </h2>
          <p className="technology-description section-body">
            Cualli is developing a daily probiotic capsule designed to capture
            PFAS and microplastics in the gut, with the goal of limiting their
            absorption or reabsorption.
          </p>
        </header>
        <div
          className="technology-diagram"
          aria-labelledby="technology-diagram-title"
        >
          <h3
            id="technology-diagram-title"
            className="technology-subheading subsection-heading font-display"
          >
            One daily capsule turns your gut into a living filter
          </h3>
          <LivingFilterPathway stages={processStages} />
        </div>
      </div>
    </section>
  )
}
