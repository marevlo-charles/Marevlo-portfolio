import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

import { siteContent } from '@/content/site-content'

interface RippleState {
  left: number
  top: number
  size: number
}

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ripple, setRipple] = useState<RippleState | null>(null)
  const timeoutsRef = useRef<number[]>([])

  const clearTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId)
    })
  }

  useEffect(() => clearTimeouts, [])

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay)
    timeoutsRef.current.push(timeoutId)
  }

  const handleNotify = (event: MouseEvent<HTMLButtonElement>) => {
    const value = email.trim()

    if (!value || !value.includes('@')) {
      setIsInvalid(true)
      scheduleTimeout(() => setIsInvalid(false), 1500)
      return
    }

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(button.offsetWidth, button.offsetHeight)

    setRipple({
      size,
      left: event.clientX - rect.left - size / 2,
      top: event.clientY - rect.top - size / 2,
    })

    scheduleTimeout(() => setRipple(null), 600)
    scheduleTimeout(() => setIsSubmitted(true), 350)
  }

  return (
    <>
      <div
        className="notify"
        id="notify-form"
        style={isSubmitted ? { display: 'none' } : undefined}
      >
        <div className="notify-wrap">
          <input
            type="email"
            id="notify-email"
            placeholder=" "
            aria-label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`${email ? 'has-val' : ''}${isInvalid ? ' is-invalid' : ''}`}
          />
          <label htmlFor="notify-email">
            {siteContent.contact.emailPlaceholder}
          </label>
        </div>
        <button type="button" onClick={handleNotify}>
          Subscribe
          {ripple ? (
            <span
              className="ripple"
              style={{
                width: ripple.size,
                height: ripple.size,
                left: ripple.left,
                top: ripple.top,
              }}
            />
          ) : null}
        </button>
      </div>
      <div
        className={`notify-success${isSubmitted ? ' show' : ''}`}
        id="notify-success"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="#3dbd8d" strokeWidth="1.5" />
          <path
            d="M8 14.5l4 4 8-8"
            stroke="#3dbd8d"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{siteContent.contact.successMessage}</span>
      </div>
    </>
  )
}
