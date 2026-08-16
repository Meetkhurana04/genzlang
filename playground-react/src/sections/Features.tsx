import { useState } from 'react'
import { Braces, Cpu, Shield, Workflow } from 'lucide-react'
import TextScramble from '../components/TextScramble'
import SectionLabel from '../components/SectionLabel'

const FEATURES = [
  {
    icon: Braces,
    title: 'Slang Keywords',
    desc: 'Every keyword is Gen-Z slang — manifest, yap, lockin, nocap. A real language wearing its hoodie inside-out.',
    metric: '[16 KEYWORDS]',
  },
  {
    icon: Cpu,
    title: 'Real Pipeline',
    desc: 'A genuine lexer → recursive-descent parser → tree-walking interpreter. No regex tricks, no magic.',
    metric: '[LEXER → PARSER → EVAL]',
  },
  {
    icon: Workflow,
    title: 'First-Class Fns',
    desc: 'Functions capture their defining scope. Build counters, factories, and recursion for fun and profit.',
    metric: '[CLOSURES INCLUDED]',
  },
  {
    icon: Shield,
    title: 'Helpful Errors',
    desc: 'Every error is line-numbered and written in the language\u2019s own dialect. No raw stack traces, ever.',
    metric: '[LINE-NUMBERED]',
  },
]

const BORDERS = [
  'border-b md:border-b lg:border-b-0 md:border-r',
  'border-b md:border-b lg:border-b-0',
  'border-b md:border-b-0 md:border-r',
  'border-b-0 md:border-b-0',
]

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Features // The Vibe" />

        <div className="flex justify-between items-end mb-8 sm:mb-16 border-b border-divider pb-4">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight">
            <TextScramble text="Key Features" delay={200} duration={500} />
          </h2>
          <span className="font-mono text-xs sm:text-sm text-text-hint hidden sm:block">
            STATUS: <span className="text-success">ACTIVE</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-divider rounded-xl bg-surface/30 backdrop-blur-sm overflow-hidden">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => setHovered(i)}
              onTouchEnd={() => setHovered(null)}
              className={`p-6 sm:p-8 bg-transparent hover:bg-primary hover:text-text-primary active:bg-primary transition-colors duration-200 flex flex-col group touch-manipulation ${BORDERS[i]}`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-text-hint group-hover:text-text-primary/50 text-xs font-mono tracking-widest transition-colors">
                  FEAT.{i + 1}
                </span>
                <f.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg sm:text-xl uppercase tracking-wider mb-4 font-bold min-h-[56px] sm:h-14">
                {hovered === i ? (
                  <TextScramble text={f.title} duration={250} />
                ) : (
                  f.title
                )}
              </h3>

              <p className="text-sm leading-relaxed text-text-secondary group-hover:text-text-primary/70 transition-colors mb-6">
                {f.desc}
              </p>

              <div className="font-mono text-xs tracking-widest text-success pt-4 border-t border-divider group-hover:border-text-primary/20 transition-colors mt-auto">
                {f.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}