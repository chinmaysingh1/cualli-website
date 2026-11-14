import { Highlight } from '@/components/ui/hero-highlight'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import { TracingBeam } from '@/components/ui/tracing-beam'
import {
  unmetNeedScience,
  unmetNeedStatistics,
  type UnmetNeedStatistic,
} from '@/constants/unmet-need'
import '@/styles/unmet-need.css'

function StatisticDisplay({ statistic }: { statistic: UnmetNeedStatistic }) {
  return (
    <figure className="unmet-statistic">
      <p className="unmet-stat-status">{statistic.status}</p>
      <p
        className="unmet-stat-number font-display"
        aria-label={`${statistic.approximate ? 'Approximately ' : ''}${statistic.value}${statistic.unit === '%' ? ' percent' : ' plus'}`}
      >
        {statistic.approximate && (
          <span className="unmet-stat-approx" aria-hidden="true">
            ≈
          </span>
        )}
        <span aria-hidden="true">
          {statistic.value}
          <span className="unmet-stat-unit">{statistic.unit}</span>
        </span>
      </p>
      <figcaption>{statistic.scope}</figcaption>
    </figure>
  )
}

const storyContent = unmetNeedStatistics.map((statistic) => ({
  label: statistic.label,
  title: statistic.title,
  description: statistic.description,
  source: (
    <p className="unmet-stat-context">
      {statistic.context}
      {statistic.source && (
        <a href={statistic.source.href}>{statistic.source.label}</a>
      )}
    </p>
  ),
  content: <StatisticDisplay statistic={statistic} />,
}))

export function UnmetNeedSection() {
  return (
    <section
      id="science"
      className="unmet-section"
      aria-labelledby="unmet-title"
    >
      <div className="unmet-inner">
        <header className="unmet-opening">
          <p className="unmet-label">01 / THE UNMET NEED</p>
          <h2 id="unmet-title" className="unmet-title font-display">
            <span>Cleanup protects the water.</span>
            <span>
              But what about{' '}
              <Highlight className="unmet-highlight">the body?</Highlight>
            </span>
          </h2>
          <p className="unmet-introduction">
            PFAS can persist in the environment and, for some compounds, remain
            in the human body for years. Cualli is investigating a new approach
            that could complement efforts to reduce environmental exposure.
          </p>
        </header>

        <div className="unmet-scale" aria-labelledby="unmet-scale-title">
          <div className="unmet-part-heading">
            <p className="unmet-label">02 / THE SCALE</p>
            <h3 id="unmet-scale-title" className="font-display">
              An environmental problem.
              <br />A human one, too.
            </h3>
          </div>
          <StickyScroll content={storyContent} />
        </div>

        <div
          className="unmet-explanation"
          aria-labelledby="unmet-science-title"
        >
          <div className="unmet-part-heading">
            <p className="unmet-label">03 / THE SCIENCE</p>
            <h3 id="unmet-science-title" className="font-display">
              Why persistence matters.
            </h3>
          </div>
          <TracingBeam className="unmet-tracing">
            {unmetNeedScience.map((block) => (
              <article className="unmet-science-block" key={block.label}>
                <p className="unmet-science-number">{block.label}</p>
                <div>
                  <h4 className="font-display">{block.title}</h4>
                  <p>{block.description}</p>
                </div>
              </article>
            ))}
          </TracingBeam>
          <div className="unmet-science-sources">
            <span>Scientific context</span>
            <a href="https://www.atsdr.cdc.gov/pfas/about/index.html">
              ATSDR · About PFAS
            </a>
            <a href="https://www.atsdr.cdc.gov/pfas/about/health-effects.html">
              ATSDR · Health effects and evidence
            </a>
          </div>
        </div>

        <div className="unmet-local" aria-labelledby="unmet-local-title">
          <p className="unmet-label">04 / NORTH CAROLINA</p>
          <h3 id="unmet-local-title" className="font-display">
            This problem hits
            <br />
            close to home.
          </h3>
          <div className="unmet-local-copy">
            <p>
              From Pittsboro to Fayetteville and the Lower Cape Fear region,
              North Carolina communities have experienced significant PFAS
              exposure concerns. Research including the GenX Exposure Study has
              documented these regional challenges.
            </p>
            <a href="https://genxstudy.ncsu.edu/">
              GenX Exposure Study · NC State University
            </a>
          </div>
          <a className="unmet-transition font-display" href="#technology">
            What if biology could help?
            <span className="unmet-transition-label">
              Explore Cualli’s technology
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
