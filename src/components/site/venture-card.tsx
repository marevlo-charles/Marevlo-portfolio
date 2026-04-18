import { useState, useRef, useEffect, type MouseEvent } from 'react'

import { useInView } from '@/hooks/use-in-view'
import type { VentureItem } from '@/types/site'

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

function DecodeText({ text, isHovered }: { text: string, isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text)
  const isAnimating = useRef(false)

  useEffect(() => {
    if (isHovered) {
      if (isAnimating.current) return
      isAnimating.current = true
      let iteration = 0
      
      const interval = setInterval(() => {
        setDisplayText(() => 
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) { return text[index] }
              return letter === ' ' ? ' ' : LETTERS[Math.floor(Math.random() * LETTERS.length)]
            })
            .join('')
        )
        
        if (iteration >= text.length) {
          clearInterval(interval)
          isAnimating.current = false
        }
        // Speed multiplier
        iteration += 1 / 3
      }, 30)
      
      return () => clearInterval(interval)
    } else {
      setDisplayText(text)
      isAnimating.current = false
    }
  }, [isHovered, text])

  return <>{displayText}</>
}

interface VentureCardProps {
  venture: VentureItem
  index: number
}

export function VentureCard({ venture, index }: VentureCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.12 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    
    // For 3D Tilt
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    card.style.transform = `perspective(600px) rotateY(${x * 9}deg) rotateX(${
      -y * 9
    }deg) translateZ(4px)`
    
    // For inner glass spotlight
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    
    // For magnetic floating icon
    card.style.setProperty('--icon-x', `${x * 40}px`)
    card.style.setProperty('--icon-y', `${y * 40}px`)
  }
  
  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    setIsHovered(false)
    const card = event.currentTarget
    card.style.transform = ''
    card.style.setProperty('--mouse-x', '-900px')
    card.style.setProperty('--mouse-y', '-900px')
    card.style.setProperty('--icon-x', '0px')
    card.style.setProperty('--icon-y', '0px')
  }

  return (
    <div
      ref={ref}
      className={`venture${isInView ? ' revealed' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Arrow indicator */}
      <div className="v-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="v-icon">{venture.icon}</div>
      <h3><DecodeText text={venture.title} isHovered={isHovered} /></h3>
      <div className="v-brand"><DecodeText text={venture.brand} isHovered={isHovered} /></div>
      <p>{venture.description}</p>
      <div className="v-status">
        <span className="blink" /> {venture.status}
      </div>
    </div>
  )
}
