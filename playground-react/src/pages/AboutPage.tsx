import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronLeft, Terminal } from 'lucide-react'
import SignalLine from '../components/SignalLine'
import SectionLabel from '../components/SectionLabel'
import Features from '../sections/Features'
import Pipeline from '../sections/Pipeline'
import LanguageTour from '../sections/LanguageTour'
import Reference from '../sections/Reference'
import CTA from '../sections/CTA'
import Footer from '../sections/Footer'

function AboutIntro() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-24">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <SectionLabel label="About // The Language" />
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-divider bg-surface/50 backdrop-blur-sm">
          <Terminal className="w-3.5 h-3.5 text-flow-shell-start" />
          <span className="text-xs font-mono text-text-secondary">
            GENZLANG v0.1 — THE STORY
          </span>
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-flow-shell-start via-accent to-flow-shell-start bg-[length:200%] animate-gradient-shift">
            GenzLang
          </span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed font-mono">
          Most “learn how interpreters work” projects are either toy
          regex tricks (not real) or huge and intimidating. GenzLang is a
          genuine pipeline — lexer, recursive descent parser, tree-walking
          evaluator with closures — kept deliberately tiny and friendly. The
          slang keywords are just a fun coat of paint over a normal little
          language.
        </p>
        <Link
          to="/playground"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-mono text-sm hover:bg-accent/90 transition-colors active:scale-95 touch-manipulation"
        >
          <Terminal className="w-4 h-4" />
          OPEN PLAYGROUND
        </Link>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div ref={ref} className="relative z-10">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-flow-shell-start to-accent z-50"
        style={{ width: progress }}
      />

      {/* Header pills */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-mono border border-divider rounded-full text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 backdrop-blur-sm bg-surface/30 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> BACK
      </Link>
      <Link
        to="/playground"
        className="fixed top-6 right-6 z-50 px-4 py-2 text-sm font-mono border border-divider rounded-full text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 backdrop-blur-sm bg-surface/30 transition-colors"
      >
        PLAYGROUND
      </Link>

      <main>
        <AboutIntro />
        <SignalLine />
        <Features />
        <SignalLine />
        <Pipeline />
        <SignalLine />
        <LanguageTour />
        <SignalLine />
        <Reference />
        <SignalLine />
        <CTA />
        <Footer />
      </main>
    </div>
  )
}