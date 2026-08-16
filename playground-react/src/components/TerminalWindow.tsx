import { type ReactNode } from 'react'
import { motion } from 'motion/react'

/** macOS-style terminal window: traffic lights + title bar + bordered body. */
export default function TerminalWindow({
  title,
  children,
  className,
  delay = 0,
}: {
  title: string
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`relative border border-divider rounded-lg overflow-hidden bg-surface/50 backdrop-blur-sm ${className ?? ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-divider bg-surface-elevated/50">
        <span className="w-2.5 h-2.5 rounded-full bg-error/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-warning/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-success/70" />
        <span className="text-text-hint text-xs font-mono ml-2">{title}</span>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </motion.div>
  )
}