import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { navigation } from '@/constants/navigation'
import { CualliLogo } from '@/components/layout/CualliLogo'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('')
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )
    document
      .querySelectorAll('main section[id]')
      .forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        headerRef.current
          ?.querySelector<HTMLButtonElement>(
            '[aria-controls="mobile-navigation"]',
          )
          ?.focus()
      }
    }
    const closeOnOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setIsOpen(false)
    }
    const breakpoint = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => {
      if (breakpoint.matches) setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutside)
    breakpoint.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutside)
      breakpoint.removeEventListener('change', closeOnDesktop)
    }
  }, [isOpen])

  const wordmark = (
    <a
      href="#home"
      className="wordmark"
      aria-label="Cualli home"
      onClick={() => setIsOpen(false)}
    >
      <CualliLogo />
    </a>
  )
  const contact = (
    <a
      className="contact-link"
      href="#contact"
      onClick={() => setIsOpen(false)}
    >
      Contact <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  )

  return (
    <header ref={headerRef}>
      <ResizableNavbar className="site-navbar">
        <NavBody>
          {wordmark}
          <nav aria-label="Main navigation" className="desktop-links">
            {navigation.map(({ name, link }) => (
              <a
                key={link}
                href={link}
                aria-current={active === link ? 'location' : undefined}
              >
                {name}
              </a>
            ))}
          </nav>
          <div className="navbar-actions">
            {contact}
            <ThemeToggle />
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            {wordmark}
            <div className="navbar-actions">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="mobile-links"
            >
              {navigation.map(({ name, link }) => (
                <a
                  key={link}
                  href={link}
                  aria-current={active === link ? 'location' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </a>
              ))}
              {contact}
            </nav>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </header>
  )
}
