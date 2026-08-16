import { useEffect, useRef } from 'react'

const POOL =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*'

/**
 * Decodes a label into glitchy characters on hover, settling left → right.
 * Spaces are preserved. Re-renders nothing; mutates textContent directly.
 */
export default function GlitchText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [])

  const run = () => {
    const el = ref.current
    if (!el) return
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current)

    const chars = text.split('')
    let iterations = 0

    intervalRef.current = window.setInterval(() => {
      const resolved = Math.floor(iterations)
      let out = ''
      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') {
          out += ' '
        } else if (i < resolved) {
          out += chars[i]
        } else {
          out += POOL[Math.floor(Math.random() * POOL.length)]
        }
      }
      el.textContent = out
      iterations += 0.5
      if (resolved >= chars.length && intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, 30)
  }

  return (
    <span ref={ref} onMouseEnter={run} className={className}>
      {text}
    </span>
  )
}