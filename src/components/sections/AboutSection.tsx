import '@/styles/closing-sections.css'
import '@/styles/about-section.css'
import { founders } from '@/constants/founders'

export function AboutSection() {
  return (
    <section
      id="about"
      className="about-section section-shell"
      aria-labelledby="about-title"
    >
      <div className="closing-inner about-layout site-container">
        <div className="about-mission">
          <p className="closing-eyebrow section-eyebrow">ABOUT CUALLI</p>
          <h2
            id="about-title"
            className="about-title section-heading font-display"
          >
            A different way of thinking about <span>forever chemicals.</span>
          </h2>
          <p className="closing-description section-body">
            Cualli brings together biotechnology, engineering, and
            entrepreneurship to investigate new ways of addressing persistent
            environmental contaminants. Born from award-winning iGEM research at UNC Chapel Hill, we're building toward a future where biology can
            complement traditional environmental protection. In-vitro data
            confirms the bacterial capture mechanism, and testing in a simulated
            gut environment is underway, funded by non-dilutive grants. Advisors
            include experts in probiotic manufacturing and PFAS toxicology.
          </p>
        </div>
        <div className="about-team" aria-labelledby="founding-team-title">
          <h3
            id="founding-team-title"
            className="closing-eyebrow section-eyebrow"
          >
            THE FOUNDING TEAM
          </h3>
          <ul className="founder-list">
            {founders.map(({ name, role, imageSrc, linkedinUrl }) => (
              <li
                key={name}
                className={`founder-entry${imageSrc ? ' founder-entry-with-photo' : ''}`}
              >
                {imageSrc ? (
                  <a
                    className="founder-portrait"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${name} on LinkedIn (opens in a new tab)`}
                  >
                    <img
                      src={imageSrc}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="founder-linkedin" aria-hidden="true">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        focusable="false"
                      >
                        <circle cx="5" cy="5" r="2" />
                        <path d="M3 9h4v12H3zm7 0h4v1.6c.8-1.2 2-1.9 3.6-1.9 3 0 4.4 1.9 4.4 5.2V21h-4v-6.3c0-1.7-.6-2.6-1.9-2.6-1.5 0-2.1 1-2.1 2.8V21h-4z" />
                      </svg>
                    </span>
                  </a>
                ) : (
                  <div className="founder-portrait" aria-hidden="true" />
                )}
                <p className="founder-name font-display">{name}</p>
                <p className="founder-role">{role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
