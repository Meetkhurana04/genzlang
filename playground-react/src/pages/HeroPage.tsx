import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ChevronRight, Terminal } from 'lucide-react'
import TextScramble from '../components/TextScramble'
import GlitchText from '../components/GlitchText'
import RadarRings from '../components/RadarRings'

/**
 * Landing screen (`/`): a fixed, non-scrollable single viewport. The only way
 * forward is OPEN PLAYGROUND (full-screen playground) or ABOUT.
 */
export default function HeroPage() {
  // This screen never scrolls — lock the body.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <section className="relative z-10 h-screen min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-y-auto">
      {/* Radar / signal meter — the hero's signature graphic */}
      <RadarRings />

      {/* Header pills */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 font-mono text-xs text-text-hint hover:text-text-primary transition-colors"
      >
        <span className="text-flow-shell-start">GENZ</span>
        <span className="hidden sm:inline">// LANGUAGE v0.1</span>
        <span
          className="inline-block w-1.5 h-3.5 bg-text-primary animate-pulse-optimal"
          aria-hidden="true"
        />
      </Link>
      <Link
        to="/about"
        className="fixed top-6 right-6 z-50 px-4 py-2 text-sm font-mono border border-divider rounded-full text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 backdrop-blur-sm bg-surface/30 transition-colors"
      >
        ABOUT
      </Link>

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-divider bg-surface/50 backdrop-blur-sm">
            <Terminal className="w-3.5 h-3.5 text-flow-shell-start" />
            <span className="text-xs font-mono text-text-secondary">
              REAL LEXER → PARSER → INTERPRETER
            </span>
          </span>
        </motion.div>

        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
          <span className="block">
            <TextScramble text="We Built" delay={100} duration={600} />
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-flow-shell-start via-accent to-flow-shell-start bg-[length:200%] animate-gradient-shift my-2">
            <GlitchText text="GenzLang" />
          </span>
          <span className="block text-text-hint text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3">
            <TextScramble
              text="Because Slang > Syntax."
              delay={500}
              duration={600}
            />
          </span>
        </h1>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A tiny, interpreted programming language whose keywords are Gen-Z
          slang. <span className="text-text-primary">manifest</span>,{' '}
          <span className="text-text-primary">yap</span>,{' '}
          <span className="text-text-primary">lockin</span> — no cap.
        </p>
        <p className="text-text-hint text-sm font-mono">
          No install. No server. Just code, running entirely in your browser.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Link
            to="/playground"
            className="px-8 py-4 bg-accent text-white font-mono text-sm hover:bg-accent/90 transition-colors active:scale-95 touch-manipulation inline-flex items-center gap-2 justify-center"
          >
            <Terminal className="w-4 h-4" />
            OPEN PLAYGROUND
          </Link>
          <Link
            to="/playground"
            state={{ docs: true }}
            className="px-8 py-4 border border-divider text-text-primary font-mono text-sm hover:bg-surface transition-colors active:scale-95 touch-manipulation inline-flex items-center gap-2 justify-center"
          >
            READ THE DOCS
          </Link>
        </div>

        <Link
          to="/about"
          className="inline-flex items-center gap-1.5 text-text-hint hover:text-text-secondary transition-colors text-xs font-mono uppercase tracking-widest"
        >
          Explore the story <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 flex items-center gap-2 font-mono text-xs text-text-secondary">
        <span className="w-2 h-2 bg-success rounded-full animate-pulse-optimal" />
        STATUS: ACTIVE — READY FOR INTERPRETATION
      </div>
    </section>
  )
}