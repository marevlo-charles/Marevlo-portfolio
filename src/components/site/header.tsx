import { useEffect, useRef } from 'react'

import logo from '@/assets/marevlo-logo.png'
import { siteContent } from '@/content/site-content'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let scrolled = false
    const handleScroll = () => {
      const shouldScrolled = window.scrollY > 50
      if (shouldScrolled !== scrolled) {
        scrolled = shouldScrolled
        headerRef.current?.classList.toggle('scrolled', scrolled)
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header ref={headerRef} id="site-header">
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
