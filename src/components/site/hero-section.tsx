import { useEffect, useRef } from 'react'
import { siteContent } from '@/content/site-content'

export function HeroSection() {
  const { hero } = siteContent
  const titleRef = useRef<HTMLHeadingElement>(null)
  const arrowRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // 1. Cinematic Flashlight for Title
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect()
        const centerX = titleRect.left + titleRect.width / 2
        const centerY = titleRect.top + titleRect.height / 2
        
        const offsetX = (clientX - centerX) * 0.04
        const offsetY = (clientY - centerY) * 0.04
        
        titleRef.current.style.textShadow = `
          ${-offsetX}px ${-offsetY}px 20px rgba(45, 168, 224, 0.2),
          ${-offsetX * 2}px ${-offsetY * 2}px 60px rgba(45, 168, 224, 0.1)
        `
      }

      // 2. Magnetic Scroll Arrow
      if (arrowRef.current) {
        const arrowRect = arrowRef.current.getBoundingClientRect()
        const arrowCenterX = arrowRect.left + arrowRect.width / 2
        const arrowCenterY = arrowRect.top + arrowRect.height / 2
        
        const distX = clientX - arrowCenterX
        const distY = clientY - arrowCenterY
        const distance = Math.hypot(distX, distY)
        
        // If cursor gets within 160px, pull it magnetically
        if (distance < 160) {
          const pullX = distX * 0.35
          const pullY = distY * 0.35
          arrowRef.current.style.setProperty('--mag-x', `${pullX}px`)
          arrowRef.current.style.setProperty('--mag-y', `${pullY}px`)
        } else {
          // Snap back to normal
          arrowRef.current.style.setProperty('--mag-x', `0px`)
          arrowRef.current.style.setProperty('--mag-y', `0px`)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero">
      <div className="tags-container">
        {hero.tag.split('·').map((t, i) => (
          <span key={i} className={`tag-pill theme-${i + 1}`}>
            {t.trim()}
          </span>
        ))}
      </div>
      <h1 ref={titleRef} style={{ transition: 'text-shadow 0.1s ease-out' }}>
        {hero.titleLead} <span className="grad">{hero.titleAccent}</span>{' '}
        {hero.titleTrail}
      </h1>
      <p className="desc">{hero.description}</p>
      <button
        ref={arrowRef}
        className="scroll-indicator"
        onClick={() => document.querySelector('.rule')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to ventures"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 3v14M4 11l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}

