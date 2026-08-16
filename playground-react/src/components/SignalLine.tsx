import { motion } from 'motion/react'

/** Horizontal hairline divider with a travelling electric-purple pulse. */
export default function SignalLine() {
  return (
    <div className="relative w-full h-px my-8 md:my-12 overflow-hidden">
      <div className="absolute inset-0 bg-divider" />
      <motion.div
        className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent via-flow-shell-start to-transparent"
        animate={{ x: ['-128px', 'calc(100vw + 128px)'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
        aria-hidden="true"
      />
    </div>
  )
}