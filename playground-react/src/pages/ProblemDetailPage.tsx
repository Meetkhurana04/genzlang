import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Lightbulb,
  ListChecks,
  Play,
  RotateCcw,
  TerminalSquare,
  X,
} from 'lucide-react'
import {
  DIFFICULTY_META,
  PROBLEMS,
  type Difficulty,
  type Problem,
} from '../data/problems'
import { evaluateCases, type Evaluation } from '../lib/problemRunner'
import { SOLUTIONS } from '../data/solutions'

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const meta = DIFFICULTY_META[difficulty]
  const color =
    difficulty === 'easy'
      ? 'border-success/30 text-success'
      : difficulty === 'medium'
        ? 'border-warning/30 text-warning'
        : 'border-error/30 text-error'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-xs uppercase tracking-widest ${color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}

function Example({ input, output }: { input: string; output: string }) {
  return (
    <div className="mt-4 rounded-lg border border-divider bg-background/50 overflow-hidden">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text-hint font-mono border-b border-divider">
        Example
      </div>
      <div className="px-3 py-2.5 space-y-2 font-mono text-[13px]">
        <div>
          <span className="text-text-hint mr-2">Input:</span>
          <code className="text-text-secondary">{input}</code>
        </div>
        <div>
          <span className="text-text-hint mr-2">Output:</span>
          <code className="text-text-secondary">{output}</code>
        </div>
      </div>
    </div>
  )
}

function CaseBox({
  label,
  children,
  tone,
}: {
  label: string
  children: React.ReactNode
  tone?: 'ok' | 'bad' | 'warn'
}) {
  const color =
    tone === 'ok'
      ? 'text-success'
      : tone === 'bad'
        ? 'text-error'
        : tone === 'warn'
          ? 'text-warning'
          : 'text-text-secondary'
  return (
    <div className="rounded-md border border-divider bg-background/50 px-3 py-2">
      <div className="text-[10px] uppercase tracking-[0.2em] text-text-hint mb-1">
        {label}
      </div>
      <code className={`break-words ${color}`}>{children}</code>
    </div>
  )
}

function VerdictTabs({ eval: ev, fn }: { eval: Evaluation; fn: string }) {
  const [active, setActive] = useState(0)
  const current = ev.verdicts[active] ?? ev.verdicts[0]

  return (
    <div>
      <ResultSummary eval={ev} />

      {/* Case tabs */}
      <div className="flex items-center gap-2 px-4 pt-3 overflow-x-auto">
        {ev.verdicts.map((v, i) => (
          <button
            key={v.index}
            type="button"
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
              active === i
                ? 'text-flow-shell-start bg-flow-shell-start/10 border border-flow-shell-start/40'
                : 'text-text-secondary border border-divider hover:text-text-primary hover:border-flow-shell-start/30'
            }`}
          >
            <span className={v.passed ? 'text-success' : 'text-error'}>
              {v.passed ? '✓' : '✗'}
            </span>
            Case {v.index}
          </button>
        ))}
      </div>

      {/* Input / got / expected */}
      <div className="grid sm:grid-cols-3 gap-3 px-4 py-3 font-mono text-[13px]">
        <CaseBox label="Input">
          {fn}({current.args})
        </CaseBox>
        <div className="rounded-md border border-divider bg-background/50 px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-text-hint mb-1">
            Your output
          </div>
          {current.error ? (
            <code className="break-words text-error">{current.error}</code>
          ) : (
            <>
              {current.stdout.length > 0 ? (
                <div className="text-text-secondary space-y-0.5 break-words">
                  {current.stdout.map((l, i) => (
                    <div key={i}>{l === '' ? '\u200b' : l}</div>
                  ))}
                </div>
              ) : null}
              <div
                className={`break-words ${
                  current.passed ? 'text-success' : 'text-error'
                }`}
              >
                → returned {JSON.stringify(current.got)}
              </div>
            </>
          )}
        </div>
        <CaseBox label="Expected output" tone={current.passed ? undefined : 'warn'}>
          {JSON.stringify(current.expected)}
        </CaseBox>
      </div>
    </div>
  )
}

function ResultSummary({ eval: ev }: { eval: Evaluation }) {
  const { allPassed, passed, total } = ev
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 border-b border-divider ${
        allPassed
          ? 'bg-success/10 text-success'
          : 'bg-error/10 text-error'
      }`}
    >
      <span className="font-mono text-sm font-semibold uppercase tracking-widest">
        {allPassed ? 'Accepted' : 'Wrong Answer'}
      </span>
      <span className="font-mono text-xs opacity-80">
        {passed} / {total} tests passed
      </span>
    </div>
  )
}

export default function ProblemDetailPage() {
  const { id } = useParams()
  const problem = PROBLEMS.find((p) => p.id === Number(id))
  if (!problem) return <Navigate to="/problems" replace />
  return <ProblemWorkspace problem={problem} />
}

function ProblemWorkspace({ problem }: { problem: Problem }) {
  const hasTests = Boolean(problem.fn && problem.runCases && problem.submitCases)
  const fn = problem.fn ?? ''
  const runCases = problem.runCases ?? []
  const submitCases = problem.submitCases ?? []

  const [source, setSource] = useState(
    problem.starter ?? SOLUTIONS[problem.id]?.code ?? '',
  )
  const [panel, setPanel] = useState<'cases' | 'result' | null>(null)
  const [caseTab, setCaseTab] = useState(0)
  const [runEval, setRunEval] = useState<Evaluation | null>(null)
  const [submitEval, setSubmitEval] = useState<Evaluation | null>(null)
  const [lastAction, setLastAction] = useState<'run' | 'submit' | null>(null)
  const [busy, setBusy] = useState(false)
  const [solved, setSolved] = useState(false)
  const [hintsOpen, setHintsOpen] = useState(false)
  const [descTab, setDescTab] = useState('description')

  const lineCount = useMemo(() => source.split('\n').length, [source])

  const runCode = () => {
    if (!hasTests) return
    setBusy(true)
    const ev = evaluateCases(source, fn, runCases)
    setRunEval(ev)
    setLastAction('run')
    setPanel('result')
    setBusy(false)
  }

  const submitCode = () => {
    if (!hasTests) return
    setBusy(true)
    const ev = evaluateCases(source, fn, submitCases)
    setSubmitEval(ev)
    setLastAction('submit')
    setPanel('result')
    if (ev.allPassed) setSolved(true)
    setBusy(false)
  }

  const reset = () => {
    setSource(problem.starter ?? SOLUTIONS[problem.id]?.code ?? '')
    setRunEval(null)
    setSubmitEval(null)
    setLastAction(null)
    setPanel(null)
    setCaseTab(0)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      runCode()
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.currentTarget
      const s = el.selectionStart
      const end = el.selectionEnd
      setSource(el.value.slice(0, s) + '  ' + el.value.slice(end))
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2
      })
    }
  }

  const shownEval = lastAction === 'submit' ? submitEval : runEval

  return (
    <div className="relative z-10 min-h-screen lg:h-screen lg:overflow-hidden flex flex-col">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-divider bg-surface/40 backdrop-blur-sm z-20 flex-shrink-0">
        <Link
          to="/problems"
          className="flex items-center gap-2 font-mono text-xs text-text-hint hover:text-text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-flow-shell-start">GENZ</span>
          <span className="hidden sm:inline">// PROBLEMS</span>
        </Link>

        <span className="hidden md:inline-block font-mono text-xs text-text-secondary truncate">
          {problem.id}. {problem.title}
        </span>

        <span className="ml-auto flex items-center gap-3">
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-divider text-xs font-mono text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            <BrainCircuit className="w-4 h-4 text-text-hint" />
            PROBLEMS
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-divider text-xs font-mono text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            <TerminalSquare className="w-4 h-4 text-text-hint" />
            PLAYGROUND
          </Link>
        </span>
      </header>

      {/* Split layout */}
      <main className="flex flex-1 min-h-0 flex-col lg:flex-row">
        {/* Left: description */}
        <aside className="w-full lg:w-[44%] xl:w-[42%] lg:overflow-y-auto lg:border-r lg:border-divider data-lenis-prevent">
          <div className="px-5 sm:px-6 py-4">
            {/* Description / Editorial / Solutions / Submissions tabs */}
            <div className="flex items-center gap-1 border-b border-divider pb-2 mb-5 overflow-x-auto">
              {[
                { key: 'description', label: 'Description' },
                { key: 'editorial', label: 'Editorial', soon: true },
                { key: 'solutions', label: 'Solutions', soon: true },
                { key: 'submissions', label: 'Submissions', soon: true },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  disabled={t.soon}
                  onClick={() => setDescTab(t.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
                    descTab === t.key && !t.soon
                      ? 'text-flow-shell-start bg-flow-shell-start/10'
                      : t.soon
                        ? 'text-text-hint/50 cursor-not-allowed'
                        : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t.label}
                  {t.soon ? (
                    <span className="ml-1.5 text-[9px] uppercase tracking-widest text-text-hint/60">
                      soon
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            {/* Title row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary">
                {problem.id}. {problem.title}
              </h1>
              {solved ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-success/40 text-success font-mono text-[10px] uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                </span>
              ) : null}
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-5">
              {problem.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-widest text-flow-shell-start font-mono px-2.5 py-1 rounded-full border border-flow-shell-start/30 bg-flow-shell-start/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Companies */}
            {problem.companies ? (
              <div className="flex items-center gap-2 mb-5 text-xs font-mono text-text-hint">
                <Building2 className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest text-[10px]">Companies</span>
                <span className="text-text-secondary">
                  {problem.companies.join(' · ')}
                </span>
              </div>
            ) : null}

            {/* Statement */}
            <p className="text-text-secondary text-[15px] leading-relaxed font-mono mb-5">
              {problem.statement}
            </p>

            {/* Examples */}
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-text-hint mb-2">
              Examples
            </h2>
            {problem.examples.map((ex, i) => (
              <Example key={i} input={ex.input} output={ex.output} />
            ))}

            {/* Constraints */}
            {problem.constraints ? (
              <>
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-text-hint mt-6 mb-2">
                  Constraints
                </h2>
                <ul className="space-y-1.5 font-mono text-[13px] text-text-secondary">
                  {problem.constraints.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-text-hint">·</span>
                      <code>{c}</code>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {/* Hints */}
            {problem.hints ? (
              <div className="mt-6 border border-divider rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setHintsOpen((o) => !o)}
                  className="w-full flex items-center gap-2 px-4 py-3 text-left font-mono text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated/30 transition-colors"
                >
                  <Lightbulb className="w-4 h-4 text-warning" />
                  Hints ({problem.hints.length})
                  <ChevronDown
                    className={`w-4 h-4 ml-auto transition-transform ${
                      hintsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {hintsOpen ? (
                  <div className="px-4 pb-4 space-y-2">
                    {problem.hints.map((h, i) => (
                      <p key={i} className="font-mono text-[13px] text-text-secondary leading-relaxed">
                        <span className="text-text-hint">Hint {i + 1}:</span> {h}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>

        {/* Right: code + tests */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0 bg-background/80">
          {/* Right tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-divider bg-surface/20 flex-shrink-0">
            <button
              type="button"
              onClick={() => setPanel('result')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                panel === 'result'
                  ? 'text-flow-shell-start bg-flow-shell-start/10'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Test Result
              {shownEval ? (
                <span
                  className={`ml-1.5 text-[10px] ${
                    shownEval.allPassed ? 'text-success' : 'text-error'
                  }`}
                >
                  {shownEval.allPassed ? `✓ ${shownEval.passed}/${shownEval.total}` : `✗ ${shownEval.passed}/${shownEval.total}`}
                </span>
              ) : null}
            </button>

            <span className="ml-auto flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-text-hint font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-flow-shell-start animate-pulse-optimal" />
                GenzLang
              </span>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-text-secondary border border-divider rounded-md hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </span>
          </div>

          {/* Editor */}
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            data-lenis-prevent
            aria-label={`${problem.title} — GenzLang solution`}
            className="flex-1 min-h-[320px] lg:min-h-0 resize-none border-none outline-none bg-transparent text-text-primary font-mono text-[13px] leading-[1.6] p-4 tab-size-2 caret-flow-shell-start"
          />

          {/* Run / Submit */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-t border-divider bg-surface/20 flex-shrink-0">
            <button
              type="button"
              onClick={runCode}
              disabled={!hasTests || busy}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-mono text-xs font-medium transition-all active:scale-95 ${
                hasTests
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'bg-surface-elevated/40 text-text-hint cursor-not-allowed'
              }`}
            >
              <Play className="w-4 h-4" /> Run
            </button>
            <button
              type="button"
              onClick={submitCode}
              disabled={!hasTests || busy}
              className={`inline-flex items-center gap-2 px-6 py-2 rounded-md font-mono text-xs font-medium transition-all active:scale-95 ${
                hasTests
                  ? 'bg-success text-black/80 hover:bg-success/90'
                  : 'bg-surface-elevated/40 text-text-hint cursor-not-allowed'
              }`}
            >
              Submit
            </button>

            <span className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPanel(panel === 'cases' ? null : 'cases')}
                disabled={!hasTests}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border text-xs font-mono transition-colors active:scale-95 ${
                  !hasTests
                    ? 'border-divider text-text-hint cursor-not-allowed'
                    : panel === 'cases'
                      ? 'border-flow-shell-start/50 text-flow-shell-start bg-flow-shell-start/10'
                      : 'border-divider text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30'
                }`}
              >
                <ListChecks className="w-4 h-4" />
                Testcases
              </button>
              <span className="text-[10px] text-text-hint font-mono">
                {lineCount} lines · {hasTests ? `${runCases.length} run / ${submitCases.length} submit` : 'tests soon'}
              </span>
            </span>
          </div>

          {/* Testcases panel — tabular view, one tab per case */}
          {panel === 'cases' && hasTests ? (
            <div className="border-t border-divider bg-background/60 flex-shrink-0">
              <div className="flex items-center gap-3 px-4 py-2 border-b border-divider">
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-hint font-mono">
                  Testcases
                </span>
                <span className="ml-auto">
                  <button
                    type="button"
                    onClick={() => setPanel(null)}
                    aria-label="Close testcases"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-text-secondary border border-divider rounded-md hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Close
                  </button>
                </span>
              </div>

              <div className="flex items-center gap-2 px-4 pt-3 overflow-x-auto">
                {runCases.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCaseTab(i)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
                      caseTab === i
                        ? 'text-flow-shell-start bg-flow-shell-start/10 border border-flow-shell-start/40'
                        : 'text-text-secondary border border-divider hover:text-text-primary hover:border-flow-shell-start/30'
                    }`}
                  >
                    Case {i + 1}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 px-4 py-3 font-mono text-[13px]">
                <div className="rounded-md border border-divider bg-background/50 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-text-hint mb-1">
                    Input
                  </div>
                  <code className="text-text-secondary break-words">
                    {fn}({runCases[caseTab]?.args})
                  </code>
                </div>
                <div className="rounded-md border border-divider bg-background/50 px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-text-hint mb-1">
                    Expected output
                  </div>
                  <code className="text-text-secondary break-words">
                    {JSON.stringify(runCases[caseTab]?.expected)}
                  </code>
                </div>
              </div>
            </div>
          ) : null}

          {/* Test result */}
          {panel === 'result' && shownEval ? (
            <div className="max-h-80 overflow-y-auto border-t border-divider bg-background/60 flex-shrink-0 data-lenis-prevent">
              <VerdictTabs eval={shownEval} fn={fn} />
            </div>
          ) : null}

          {panel === 'result' && !shownEval ? (
            <div className="px-4 py-6 text-center text-text-hint font-mono text-xs border-t border-divider flex-shrink-0">
              You must run your code first
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}