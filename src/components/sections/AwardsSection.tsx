import { useRef, useState } from 'react'
import {
  DraggableCardBody,
  DraggableCardContainer,
} from '@/components/ui/draggable-card'
import { awardPhotos, recognitions } from '@/constants/awards'
import { SupporterLogoStrip } from '@/components/sections/SupporterLogoStrip'
import '@/styles/awards-section.css'

export function AwardsSection() {
  const scrapbook = useRef<HTMLDivElement>(null)
  const [frontPhoto, setFrontPhoto] = useState(awardPhotos.length - 1)

  return (
    <section
      id="awards"
      className="awards-section section-shell"
      aria-labelledby="awards-title"
    >
      <div className="awards-inner site-container">
        <header className="awards-header">
          <p className="awards-eyebrow section-eyebrow">AWARDS</p>
          <h2
            id="awards-title"
            className="awards-title section-heading font-display"
          >
            Backed, funded, and on stage.
          </h2>
          <p className="awards-description section-body">
            Recognition and support from the programs helping early
            biotechnology take shape.
          </p>
        </header>
        <div className="awards-composition">
          <DraggableCardContainer ref={scrapbook} className="awards-scrapbook">
            {awardPhotos.map((photo, index) => (
              <DraggableCardBody
                key={photo.src}
                className={`award-photo ${photo.className}`}
                constraintsRef={scrapbook}
                initialRotation={photo.rotation}
                zIndex={
                  frontPhoto === index ? awardPhotos.length + 1 : index + 1
                }
                onActivate={() => setFrontPhoto(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <figcaption>{photo.caption}</figcaption>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
          <ul className="awards-recognitions">
            {recognitions.map(({ institution, name, description }) => (
              <li key={name}>
                <p className="award-institution">{institution}</p>
                <h3 className="award-name font-display">{name}</h3>
                <p className="award-description">{description}</p>
              </li>
            ))}
          </ul>
        </div>
        <SupporterLogoStrip />
      </div>
    </section>
  )
}
