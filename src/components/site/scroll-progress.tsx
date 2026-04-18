import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [scrollPerc, setScrollPerc] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const maxScroll = docHeight - winHeight
      
      if (maxScroll <= 0) {
        setScrollPerc(0)
        return
      }
      
      const percentage = (scrollY / maxScroll) * 100
      setScrollPerc(Math.min(100, Math.max(0, percentage)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Trigger initial calculation
    setTimeout(handleScroll, 100)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="scroll-progress-neon"
      style={{ width: `${scrollPerc}%` }}
      aria-hidden="true"
    />
  )
}
