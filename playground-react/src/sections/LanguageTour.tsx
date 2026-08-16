import { motion } from 'motion/react'
import SectionLabel from '../components/SectionLabel'
import TextScramble from '../components/TextScramble'
import TerminalWindow from '../components/TerminalWindow'

const SAMPLES: { file: string; code: string; hint: string }[] = [
  {
    file: 'variables.yap',
    code: `manifest lang = "GenzLang"
manifest year = 2026
yap("yo, welcome to " + lang + " 🔥")
yap("it's giving " + year + " energy fr fr")`,
    hint: '> manifest = declare · yap = print',
  },
  {
    file: 'conditionals.yap',
    code: `manifest score = 85
when (score >= 90) {
  yap("you ate that")
} orwhen (score >= 60) {
  yap("mid but passing")
} nvm {
  yap("it's giving fail")
}`,
    hint: '> when · orwhen · nvm',
  },
  {
    file: 'loops.yap',
    code: `run (manifest i = 1; i <= 5; i = i + 1) {
  yap("rep " + i)
}

manifest n = 0
lockin (n < 3) {
  n = n + 1
  yap("while: " + n)
}`,
    hint: '> run = for · lockin = while · drop = break',
  },
  {
    file: 'functions.yap',
    code: `fun fib(n) {
  when (n < 2) { give n }
  give fib(n - 1) + fib(n - 2)
}

fun makeCounter() {
  manifest n = 0
  fun tick() { n = n + 1  give n }
  give tick
}

yap(fib(10))   // 55`,
    hint: '> fun · give · first-class closures',
  },
]

export default function LanguageTour() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Tour // The Language" />

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-4">
          <TextScramble text="Zero to Hero" delay={150} duration={500} />
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mb-10 font-mono">
          The whole language fits on a single screen. A few minutes of poking
          around and you’ll be shipping bangers.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {SAMPLES.map((s, i) => (
            <motion.div
              key={s.file}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TerminalWindow title={s.file} className="h-full">
                <pre className="m-0 font-mono text-[13px] leading-[1.65] text-text-primary whitespace-pre overflow-x-auto">
                  <code>{s.code}</code>
                </pre>
                <div className="mt-4 pt-3 border-t border-divider text-[10px] text-text-hint font-mono uppercase tracking-widest">
                  {s.hint}
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}