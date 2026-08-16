import { Link } from 'react-router-dom'
import { BookOpen, GitBranch, Terminal } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import GlitchText from '../components/GlitchText'
import Reveal from '../components/Reveal'

export default function CTA() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight tracking-tight">
            Stop scrolling.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-flow-shell-start to-accent">
              <GlitchText text="Start yapping" />
            </span>
            .
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-text-secondary text-base md:text-lg mb-10 max-w-lg mx-auto font-mono">
            Open the playground, drop in an example, and press Run it ▶. No
            signup, no server, no install — the whole language is one click
            away.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Magnetic>
              <Link
                to="/playground"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-flow-shell-start to-flow-shell-end text-white font-mono text-sm font-medium hover:shadow-lg hover:shadow-flow-shell-start/25 transition-all"
              >
                <Terminal className="w-4 h-4" />
                Open the Playground
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/playground"
                state={{ docs: true }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-divider text-text-secondary hover:text-text-primary hover:border-text-hint transition-all font-mono text-sm"
              >
                <BookOpen className="w-4 h-4" />
                Read the Docs
              </Link>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href="https://github.com/xOAviOx/yap-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-hint hover:text-text-secondary transition-colors text-xs font-mono"
          >
            <GitBranch className="w-3.5 h-3.5" />
            View on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  )
}