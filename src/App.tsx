import { MotionConfig } from 'motion/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { TechnologySection } from '@/components/sections/TechnologySection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProblemSection />
        <TechnologySection />
        <AboutSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </MotionConfig>
  )
}
