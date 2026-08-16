import { type ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Magnetic wrapper — children gently follow the cursor (15% of the offset from
 * center) with a springy settle. Used on buttons, avatars, and icon chips.
 */
export default function Magnetic({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15)
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.15)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}