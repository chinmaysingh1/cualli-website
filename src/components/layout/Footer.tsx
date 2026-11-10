import { CualliLogo } from '@/components/layout/CualliLogo'
import { navigation } from '@/constants/navigation'
import '@/styles/contact-footer.css'

export function Footer() {
  return (
    <footer className="site-footer site-container footer-refined">
      <div className="footer-brand">
        <a href="#home" className="footer-wordmark" aria-label="Cualli home">
          <CualliLogo />
        </a>
      </div>
      <div className="footer-information">
        <nav aria-label="Footer navigation" className="footer-navigation">
          {navigation.map(({ name, link }) => (
            <a href={link} key={link}>
              {name}
            </a>
          ))}
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
