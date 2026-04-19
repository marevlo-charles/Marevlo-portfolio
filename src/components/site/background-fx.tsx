import { useEffect, useRef } from 'react'

export function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const mouse = { x: -9999, y: -9999 }
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      baseRadius: Math.random() * 1.2 + 0.5,
      baseOpacity: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }))

    let frame = 0
    let frameCount = 0
    let lastTime = performance.now()
    let paused = false

    const handleVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', handleVisibility)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.scale(dpr, dpr)
    }

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      if (paused) return

      const dt = Math.min((time - lastTime) / 16.666, 3)
      lastTime = time
      frameCount++

      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const p of particles) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const distToMouse = Math.hypot(dx, dy)

        if (distToMouse < 150 && distToMouse > 0) {
          const force = (150 - distToMouse) / 150
          p.x += (dx / distToMouse) * force * 2.5 * dt
          p.y += (dy / distToMouse) * force * 2.5 * dt
        }

        p.x += p.vx * dt
        p.y += p.vy * dt

        if (p.x < -20) p.x = window.innerWidth + 20
        if (p.x > window.innerWidth + 20) p.x = -20
        if (p.y < -20) p.y = window.innerHeight + 20
        if (p.y > window.innerHeight + 20) p.y = -20

        const pulse = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5
        const r = p.baseRadius * (0.8 + pulse * 0.4)
        const o = p.baseOpacity * (0.6 + pulse * 0.4)

        context.beginPath()
        context.arc(p.x, p.y, r, 0, Math.PI * 2)
        context.fillStyle = `rgba(45,168,224,${o})`
        context.fill()
      }

      // Constellation lines — every 2nd frame, ONE batched stroke call
      if (frameCount % 2 === 0) {
        context.beginPath()
        context.lineWidth = 0.6
        context.strokeStyle = 'rgba(100,160,220,0.18)'
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            if (dx * dx + dy * dy < 130 * 130) {
              context.moveTo(particles[i].x, particles[i].y)
              context.lineTo(particles[j].x, particles[j].y)
            }
          }
        }
        context.stroke()
      }
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <>
      <canvas id="particles" ref={canvasRef} aria-hidden="true" />
      <div className="ambient" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grid-bg" aria-hidden="true" />
    </>
  )
}
