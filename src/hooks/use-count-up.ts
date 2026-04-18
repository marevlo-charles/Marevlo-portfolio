import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  start?: number
  duration?: number
  active?: boolean
}

export function useCountUp(
  target: number,
  { start = 0, duration = 900, active = true }: UseCountUpOptions = {},
) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (!active) {
      return
    }

    let frame = 0
    const startedAt = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const nextValue = Math.round(start + (target - start) * eased)

      setValue(nextValue)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [active, duration, start, target])

  return value
}
