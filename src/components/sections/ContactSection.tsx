import '@/styles/closing-sections.css'
import '@/styles/contact-footer.css'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section section-shell"
      aria-labelledby="contact-title"
    >
      <div className="closing-inner site-container">
        <div className="contact-labels">
          <p className="closing-eyebrow section-eyebrow">CONTACT</p>
        </div>
        <h2
          id="contact-title"
          className="contact-title section-heading font-display contact-tagline"
        >
          The environment changed.{' '}
          <span>The human body hasn&apos;t kept up.</span>
        </h2>
        <p className="closing-description section-body contact-tagline-description">
          We&apos;re closing that gap by engineering the body&apos;s first
          defenses against environmental toxins.
        </p>
        <div className="contact-connect">
          <div className="contact-invitation">
            <h3 className="subsection-heading font-display">
              Let&apos;s build what <span>comes next.</span>
            </h3>
            <p className="closing-description contact-description section-body">
              Working in biotechnology, environmental health, research, or
              investment? We&apos;d love to hear from you.
            </p>
          </div>
          <div className="contact-direct">
            <a className="contact-email" href="mailto:olinares@cualli.bio">
              olinares@cualli.bio
            </a>
            <p className="contact-location">
              Chapel Hill · Raleigh, North Carolina
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
