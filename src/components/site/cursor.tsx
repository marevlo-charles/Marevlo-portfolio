import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let animId: number

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input')) {
        setHovered(true)
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input')) {
        setHovered(false)
      }
    }

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`
      }

      animId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    animId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(animId)
    }
  }, [visible])

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${hovered ? ' cursor-hovered' : ''}${visible ? '' : ' cursor-hidden'}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring${hovered ? ' cursor-hovered' : ''}${visible ? '' : ' cursor-hidden'}`}
      />
    </>
  )
}
