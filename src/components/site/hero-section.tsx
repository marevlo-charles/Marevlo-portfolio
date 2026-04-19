import { useEffect, useRef } from 'react'
import { siteContent } from '@/content/site-content'

export function HeroSection() {
  const { hero } = siteContent
  const titleRef = useRef<HTMLHeadingElement>(null)
  const arrowRef = useRef<HTMLButtonElement>(null)
  const titleRectRef = useRef<DOMRect | null>(null)
  const arrowRectRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    const updateRects = () => {
      titleRectRef.current = titleRef.current?.getBoundingClientRect() ?? null
      arrowRectRef.current = arrowRef.current?.getBoundingClientRect() ?? null
    }

    updateRects()
    window.addEventListener('resize', updateRects, { passive: true })

    let rafId = 0
    let pendingX = 0
    let pendingY = 0
    let scheduled = false

    const applyEffects = () => {
      scheduled = false
      const clientX = pendingX
      const clientY = pendingY

      if (titleRef.current && titleRectRef.current) {
        const { left, width, top, height } = titleRectRef.current
        const offsetX = (clientX - (left + width / 2)) * 0.04
        const offsetY = (clientY - (top + height / 2)) * 0.04
        titleRef.current.style.textShadow = `
          ${-offsetX}px ${-offsetY}px 20px rgba(45,168,224,0.2),
          ${-offsetX * 2}px ${-offsetY * 2}px 60px rgba(45,168,224,0.1)`
      }

      if (arrowRef.current && arrowRectRef.current) {
        const { left, width, top, height } = arrowRectRef.current
        const distX = clientX - (left + width / 2)
        const distY = clientY - (top + height / 2)
        const distance = Math.hypot(distX, distY)
        if (distance < 160) {
          arrowRef.current.style.setProperty('--mag-x', `${distX * 0.35}px`)
          arrowRef.current.style.setProperty('--mag-y', `${distY * 0.35}px`)
        } else {
          arrowRef.current.style.setProperty('--mag-x', '0px')
          arrowRef.current.style.setProperty('--mag-y', '0px')
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX
      pendingY = e.clientY
      if (!scheduled) {
        scheduled = true
        rafId = requestAnimationFrame(applyEffects)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateRects)
      cancelAnimationFrame(rafId)
    }
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
