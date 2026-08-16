import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ListChecks, Sparkles, TerminalSquare } from 'lucide-react'
import {
  DIFFICULTY_COUNTS,
  DIFFICULTY_META,
  PROBLEMS,
  type Difficulty,
} from '../data/problems'

type Filter = 'all' | Difficulty

const FILTERS: { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'All', count: DIFFICULTY_COUNTS.total },
  { value: 'easy', label: 'Easy', count: DIFFICULTY_COUNTS.easy },
  { value: 'medium', label: 'Medium', count: DIFFICULTY_COUNTS.medium },
  { value: 'hard', label: 'Hard', count: DIFFICULTY_COUNTS.hard },
]

export default function ProblemsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const list =
    filter === 'all' ? PROBLEMS : PROBLEMS.filter((p) => p.difficulty === filter)

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-divider bg-surface/40 backdrop-blur-sm z-20 flex-shrink-0 sticky top-0">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-xs text-text-hint hover:text-text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-flow-shell-start">GENZ</span>
          <span className="hidden sm:inline">// PROBLEMS</span>
        </Link>

        <span className="ml-auto flex items-center gap-3">
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-divider text-xs font-mono text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            <TerminalSquare className="w-4 h-4 text-text-hint" />
            PLAYGROUND
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-4 py-2 rounded-full border border-divider text-xs font-mono text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            ABOUT
          </Link>
        </span>
      </header>

      {/* Header */}
      <section className="px-4 sm:px-8 md:px-24 pt-6 sm:pt-8 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1] tracking-tight">
              Problems{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-flow-shell-start via-accent to-flow-shell-start bg-[length:200%] animate-gradient-shift">
                // Pick a Slice
              </span>
            </h1>
            <p className="text-text-secondary text-xs sm:text-sm font-mono">
              Ten famous DSA classics that fit in GenzLang — pick one, solve it
              in the terminal.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-divider bg-surface/50 backdrop-blur-sm"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_META[d].dot}`}
                  />
                  <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
                    {DIFFICULTY_META[d].label}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${DIFFICULTY_META[d].color}`}
                  >
                    {DIFFICULTY_COUNTS[d]}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem list */}
      <section className="px-4 sm:px-8 md:px-24 pb-24 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-colors active:scale-95 flex-shrink-0 ${
                  filter === f.value
                    ? 'border-flow-shell-start/50 text-flow-shell-start bg-flow-shell-start/10'
                    : 'border-divider text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30'
                }`}
              >
                {f.label}
                <span
                  className={
                    filter === f.value ? 'text-flow-shell-start' : 'text-text-hint'
                  }
                >
                  {f.count}
                </span>
              </button>
            ))}
            <span className="ml-auto hidden sm:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-hint font-mono">
              <ListChecks className="w-3.5 h-3.5" />
              {list.length} problems
            </span>
          </div>

          {/* Rows */}
          <ul className="border border-divider rounded-xl divide-y divide-divider bg-surface/40 backdrop-blur-sm overflow-hidden">
            {list.map((p) => {
              const meta = DIFFICULTY_META[p.difficulty]
              return (
                <li key={p.id}>
                  <Link
                    to={`/problems/${p.id}`}
                    className="w-full text-left flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-surface-elevated/40 hover:border-l-2 hover:border-l-flow-shell-start transition-colors border-l-2 border-l-transparent group"
                  >
                    <span className="text-sm font-mono text-text-hint w-8 flex-shrink-0">
                      {String(p.id).padStart(2, '0')}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-heading text-sm sm:text-base font-semibold text-text-primary group-hover:text-flow-shell-start transition-colors">
                        {p.title}
                      </span>
                      <span className="flex flex-wrap gap-2 mt-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-hint font-mono px-2 py-0.5 rounded-full border border-divider bg-background/40"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-[10px] sm:text-xs uppercase tracking-widest flex-shrink-0 ${
                        p.difficulty === 'easy'
                          ? 'border-success/30 text-success'
                          : p.difficulty === 'medium'
                            ? 'border-warning/30 text-warning'
                            : 'border-error/30 text-error'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-text-hint">
            <Sparkles className="w-3.5 h-3.5 text-flow-shell-start" />
            click a problem to drop it into the GenzLang terminal
          </p>
        </div>
      </section>
    </div>
  )
}