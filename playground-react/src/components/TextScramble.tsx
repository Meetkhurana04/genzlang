import { useEffect, useState } from 'react'

const POOL = '!<>-_\\/[]{}—=+*^?#________'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Terminal-style text scramble. Runs once on mount after `delay`; scrambling
 * characters flash in accent red. Re-triggers when `text` changes.
 */
export default function TextScramble({
  text,
  delay = 0,
  duration = 250,
}: {
  text: string
  delay?: number
  duration?: number
}) {
  const [html, setHtml] = useState(() => esc(text))
  const [done, setDone] = useState(true)

  useEffect(() => {
    const totalFrames = Math.round((duration / 1000) * 60)
    const chars = text.split('')
    const queue = chars.map((char) => ({
      char,
      from: Math.random() * 10,
      to: Math.random() * 10 + totalFrames,
    }))

    let frame = 0
    let raf = 0
    let timer = 0

    const tick = () => {
      let output = ''
      let complete = 0
      for (const item of queue) {
        if (frame >= item.from && frame <= item.to) {
          complete++
          if (item.char === ' ') {
            output += ' '
          } else {
            const pick = POOL[Math.floor(Math.random() * POOL.length)]
            output += `<span class="text-accent">${esc(pick)}</span>`
          }
        } else {
          output += esc(item.char)
        }
      }
      setHtml(output)
      setDone(complete === 0)

      if (complete > 0) {
        frame++
        raf = requestAnimationFrame(tick)
      }
    }

    timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [text, delay, duration])

  return (
    <span
      className={done ? 'opacity-100' : 'opacity-90'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}