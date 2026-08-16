import { useEffect, useRef } from 'react'

/**
 * The signature background: an infinite 3D perspective grid of electric-purple
 * dots that flows toward the viewer (TRON-floor / starfield feel). Driven by a
 * single requestAnimationFrame loop; fully cleaned up on unmount.
 */
export default function FloatingGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gridSize = 40
    const perspective = 800
    const half = gridSize * 20 // 800
    let time = 0
    let raf = 0
    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 16

      ctx.clearRect(0, 0, width, height)

      const rotationX = Math.sin(time * 0.0003) * 0.3
      const rotationY = Math.cos(time * 0.0002) * 0.2

      for (let x = -20; x <= 20; x++) {
        for (let z = -20; z <= 20; z++) {
          const worldX = x * gridSize
          // Forward flow speed: 0.02 world units per tick.
          let worldZ = z * gridSize - time * 0.02

          // Wrap into [-800, 800) so the field loops infinitely.
          worldZ = ((worldZ + half) % (2 * half) + 2 * half) % (2 * half) - half

          // Y-axis rotation.
          const rotatedX =
            worldX * Math.cos(rotationY) - worldZ * Math.sin(rotationY)
          const rotatedZ =
            worldX * Math.sin(rotationY) + worldZ * Math.cos(rotationY)

          // X-axis rotation + 200 offset (tilt-floor look).
          const rotatedY = rotatedZ * Math.sin(rotationX) + 200
          const finalZ = rotatedZ * Math.cos(rotationX) + perspective

          if (finalZ <= 0) continue

          const screenX = (rotatedX * perspective) / finalZ + width / 2
          const screenY = (rotatedY * perspective) / finalZ + height / 2

          const size = Math.max(1, (perspective / finalZ) * 1.5)
          const alpha = Math.max(0, Math.min(0.15, 1 - finalZ / 2000))

          ctx.beginPath()
          ctx.fillStyle = `rgba(90, 69, 246, ${alpha})`
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  )
}