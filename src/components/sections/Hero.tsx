import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WavyBackground } from '@/components/ui/wavy-background'
import { darkWaveColors, lightWaveColors } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'

export function Hero() {
  const { theme } = useTheme()
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <WavyBackground
        key={theme}
        backgroundFill={theme === 'dark' ? '#000000' : '#FFFFFF'}
        colors={theme === 'dark' ? darkWaveColors : lightWaveColors}
        waveWidth={theme === 'dark' ? 50 : 38}
        blur={theme === 'dark' ? 10 : 5}
        speed="fast"
        waveOpacity={theme === 'dark' ? 0.5 : 0.24}
        containerClassName="hero-background"
      >
        <HeroContent />
      </WavyBackground>
      <a
        className="hero-footnote"
        href="#science"
        aria-label="Go to the science section"
      >
        <ArrowDown size={20} aria-hidden="true" />
      </a>
    </section>
  )
}

function HeroContent() {
  return (
    <div className="hero-content">
      <h1 id="hero-title" className="font-display">
        Filter the Forever.
      </h1>
      <p className="hero-description">
        Cualli engineers probiotic bacteria that capture PFAS and microplastics in your gut, so they
leave your body instead of building up in it. One capsule a day, taken as a dietary supplement.
      </p>
      <div className="hero-actions">
        <Button
          nativeButton={false}
          render={<a href="#science" />}
          className="cta-primary"
        >
          Explore our technology <ArrowUpRight aria-hidden="true" size={17} />
        </Button>
        <Button
          nativeButton={false}
          render={<a href="#about" />}
          variant="outline"
          className="cta-secondary"
        >
          Learn more <ArrowUpRight aria-hidden="true" size={17} />
        </Button>
      </div>
    </div>
  )
}
