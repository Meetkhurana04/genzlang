import { motion } from 'motion/react'
import {
  Braces,
  ChevronRight,
  Cpu,
  FileCode,
  Terminal,
  Workflow,
} from 'lucide-react'
import TerminalWindow from '../components/TerminalWindow'
import SectionLabel from '../components/SectionLabel'
import GlitchText from '../components/GlitchText'

const STEPS = [
  { icon: FileCode, label: 'Source', sub: '.yap file', color: 'text-flow-shell-start', index: '01' },
  { icon: Braces, label: 'Lexer', sub: 'tokens', color: 'text-accent', index: '02' },
  { icon: Workflow, label: 'Parser', sub: 'AST', color: 'text-flow-lime', index: '03' },
  { icon: Cpu, label: 'Interpreter', sub: 'tree-walk', color: 'text-warning', index: '04' },
  { icon: Terminal, label: 'Output', sub: 'stdout', color: 'text-success', index: '05' },
]

const ARCH = [
  {
    title: 'Lexer',
    desc: 'Scans raw source into a flat token stream, tagging every token with line and column. Newlines end statements.',
    icon: Braces,
  },
  {
    title: 'Recursive Descent',
    desc: 'Hand-written parser builds the AST following a strict precedence ladder — assignment → or → and → equality → … → primary.',
    icon: Workflow,
  },
  {
    title: 'Tree-Walking Eval',
    desc: 'The interpreter walks the AST and executes it. Scopes chain via a parent link; return/break/continue are control-flow signals.',
    icon: Cpu,
  },
  {
    title: 'Closures',
    desc: 'Functions capture their defining environment. Counters, factories, recursion — all first-class and scope-aware.',
    icon: FileCode,
  },
]

function Connector({ delay }: { delay: number }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-8 flex-shrink-0 pb-10">
      <div className="relative w-full h-px bg-divider overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-flow-shell-start to-transparent"
          animate={{ x: ['0%', '2000%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            delay,
          }}
        />
      </div>
      <ChevronRight className="w-3 h-3 text-text-hint mt-2" />
    </div>
  )
}

export default function Pipeline() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-24">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Pipeline // How It Works" />

        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 uppercase tracking-tight">
            A Real{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-flow-shell-start via-accent to-flow-shell-start bg-[length:200%] animate-gradient-shift">
              <GlitchText text="Compiler" />
            </span>{' '}
            Pipeline
          </h2>
          <p className="text-text-secondary text-base max-w-2xl mx-auto font-mono">
            No regex hacks. No magic. Source text flows through five distinct
            stages, each one readable in the source code.
          </p>
        </div>

        <TerminalWindow title="pipeline.sh">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
            {STEPS.map((step, i) => (
              <div key={step.label} className="contents">
                {i > 0 && <Connector delay={(i - 1) * 0.3} />}
                <motion.div
                  className="flex flex-col items-center text-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="w-12 h-12 rounded-xl border border-divider bg-surface-elevated/50 flex items-center justify-center mb-3 group-hover:border-flow-shell-start/30">
                    <step.icon className={`w-5 h-5 ${step.color}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-text-secondary text-[11px] font-mono leading-tight max-w-[120px] uppercase tracking-wider">
                    {step.label}
                  </span>
                  <span className="text-text-hint text-[10px] font-mono mt-1">
                    {step.index} · {step.sub}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </TerminalWindow>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {ARCH.map((card, i) => (
            <motion.div
              key={card.title}
              className="border border-divider rounded-xl p-6 bg-surface/30 backdrop-blur-sm hover:border-flow-shell-start/20 transition-colors group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg border border-divider bg-surface-elevated/50 flex items-center justify-center mb-4 text-flow-shell-start group-hover:border-flow-shell-start/30 transition-colors">
                <card.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h4 className="font-heading font-semibold text-base mb-2">
                {card.title}
              </h4>
              <p className="text-text-secondary text-xs font-mono leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}