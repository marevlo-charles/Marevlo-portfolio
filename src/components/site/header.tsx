import { useEffect, useState } from 'react'

import logo from '@/assets/marevlo-logo.png'
import { siteContent } from '@/content/site-content'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      id="site-header"
      className={isScrolled ? 'scrolled' : undefined}
    >
      <div className="logo">
        <img src={logo} alt="Marevlo Research" />
        <div className="logo-wordmark">
          <span className="name">{siteContent.company.shortName}</span>
          <span className="entity">{siteContent.company.entity}</span>
        </div>
      </div>
      <div className="header-right">
        <span className="loc">{siteContent.company.location}</span>
        <div className="status-badge">
          <span className="dot" />
          {siteContent.company.status}
        </div>
      </div>
    </header>
  )
}