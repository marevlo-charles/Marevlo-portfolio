import { useEffect, useRef } from 'react'

export function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    // Mouse tracking for repulsion effect
    const mouse = { x: -9999, y: -9999 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseLeave)

    // Increased particle count slightly for better constellation networks
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      baseRadius: Math.random() * 1.2 + 0.5,
      baseOpacity: Math.random() * 0.35 + 0.1,
      phase: Math.random() * Math.PI * 2, // For pulsating desync
    }))

    let frame = 0
    let lastTime = performance.now()

    const resize = () => {
      // Retina / HiDPI Fix
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.scale(dpr, dpr)
    }

    const draw = (time: number) => {
      // Delta-time based animation
      const dt = Math.min((time - lastTime) / 16.666, 3) 
      lastTime = time

      // Use window bounds since scale was applied via dpr
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // 1. Update and Draw Particles
      for (const particle of particles) {
        // Mouse repulsion
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distToMouse = Math.hypot(dx, dy)
        
        if (distToMouse < 150) {
          const force = (150 - distToMouse) / 150
          particle.x += (dx / distToMouse) * force * 2.5 * dt
          particle.y += (dy / distToMouse) * force * 2.5 * dt
        }

        // Apply idle velocity
        particle.x += particle.vx * dt
        particle.y += particle.vy * dt

        // Wrap around boundaries with slight padding so they don't pop instantly
        if (particle.x < -20) particle.x = window.innerWidth + 20
        if (particle.x > window.innerWidth + 20) particle.x = -20
        if (particle.y < -20) particle.y = window.innerHeight + 20
        if (particle.y > window.innerHeight + 20) particle.y = -20

        // Pulsating logic
        const pulse = Math.sin(time * 0.002 + particle.phase) * 0.5 + 0.5
        const currentRadius = particle.baseRadius * (0.8 + pulse * 0.4)
        const currentOpacity = particle.baseOpacity * (0.6 + pulse * 0.4)

        context.beginPath()
        context.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
        context.fillStyle = `rgba(45, 168, 224, ${currentOpacity})`
        context.fill()
      }

      // 2. Draw Constellation Connectors
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.22 // Fade with distance
            context.strokeStyle = `rgba(45, 168, 224, ${opacity})`
            context.lineWidth = 0.6
            context.beginPath()
            context.moveTo(particles[i].x, particles[i].y)
            context.lineTo(particles[j].x, particles[j].y)
            context.stroke()
          }
        }
      }

      frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
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
