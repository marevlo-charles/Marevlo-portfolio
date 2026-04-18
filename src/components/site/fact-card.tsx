import { useState, useRef, useEffect } from 'react'
import { useInView } from '@/hooks/use-in-view'
import type { FactItem } from '@/types/site'

const NUMBERS = "0123456789!#%*"

interface FactCardProps {
  fact: FactItem
  index: number
}

export function FactCard({ fact, index }: FactCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const [displayText, setDisplayText] = useState<string>("...")
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      
      const targetStr = String(fact.countTo !== undefined ? fact.countTo : fact.value)
      const duration = 1500 + index * 200 // Stagger slightly based on index
      const steps = 40
      let step = 0
      
      const interval = setInterval(() => {
        if (step >= steps) {
          clearInterval(interval)
          setDisplayText(targetStr)
          return
        }
        
        const progress = step / steps
        // ease in out
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress
        const settledLength = Math.floor(targetStr.length * ease)
        
        const currentScramble = targetStr.split('').map((char, i) => {
          if (i < settledLength) return char
          if (char === ' ') return ' '
          return NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
        }).join('')
        
        setDisplayText(currentScramble)
        step++
      }, duration / steps)
      
      return () => clearInterval(interval)
    }
  }, [isInView, fact, index])

  return (
    <div
      ref={ref}
      className={`fact${isInView ? ' revealed' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="f-val">
        {displayText}
      </div>
      <div className="f-label">{fact.label}</div>
    </div>
  )
}
