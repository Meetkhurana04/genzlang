import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import TerminalWindow from '../components/TerminalWindow'
import SectionLabel from '../components/SectionLabel'
import TextScramble from '../components/TextScramble'

const PANELS = [
  {
    title: 'keywords.config',
    dot: 'bg-flow-shell-start',
    chevron: 'text-flow-shell-start',
    items: [
      'manifest — declare variable',
      'when / orwhen / nvm — conditionals',
      'lockin / run — while / for loops',
      'fun / give — functions & return',
      'plus / alt / nah — and / or / not',
      'drop / move — break / continue',
      'nocap / cap / dead — true / false / null',
    ],
  },
  {
    title: 'builtins.config',
    dot: 'bg-warning',
    chevron: 'text-warning',
    items: [
      'yap(...) — print to stdout',
      'vibecheck(x) — type as a string',
      'howmany(x) — length of string/array',
      'glowup(s) / chill(s) — uppercase / lowercase',
      'slide(arr, x) / yoink(arr) — push / pop',
      'numify(s) — parse a string to a number',
    ],
  },
  {
    title: 'values.config',
    dot: 'bg-accent',
    chevron: 'text-accent',
    items: [
      'number — one numeric type',
      'string — double quotes, \\n \\t escapes',
      'boolean — nocap / cap',
      'dead — the null / empty value',
      'array — zero-indexed, assignable',
      'function — first-class, closes over scope',
    ],
  },
]

export default function Reference() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="Reference // Cheat Sheet" />

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-4">
          <TextScramble text="The Whole Language" delay={150} duration={500} />
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mb-10 font-mono">
          Keywords, built-ins, and runtime values — the entire surface of
          GenzLang, open on one screen.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {PANELS.map((panel, pi) => (
            <TerminalWindow key={panel.title} title={panel.title} delay={pi * 0.1}>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`w-2 h-2 rounded-full ${panel.dot} animate-pulse-optimal`}
                />
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider">
                  {panel.title.replace('.config', '').toUpperCase()}
                </h4>
              </div>
              <ul className="space-y-2.5">
                {panel.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2 text-text-secondary text-xs font-mono leading-relaxed"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <ChevronRight className={`w-3 h-3 ${panel.chevron}`} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </TerminalWindow>
          ))}
        </div>
      </div>
    </section>
  )
}