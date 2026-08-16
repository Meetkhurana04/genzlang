import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  Play,
  RotateCcw,
} from 'lucide-react'
import { run } from '@yap/runner'
import DocsSidebar from '../components/DocsSidebar'
import { EXAMPLES } from '../data/examples'

interface Line {
  text: string
  error: boolean
  meta?: boolean
}

const DEFAULT_SOURCE = EXAMPLES[Object.keys(EXAMPLES)[0]] as string

export default function PlaygroundPage() {
  const location = useLocation()
  const [source, setSource] = useState(DEFAULT_SOURCE)
  const [lines, setLines] = useState<Line[]>([])
  const [status, setStatus] = useState('ready')
  const [docsOpen, setDocsOpen] = useState(() => window.innerWidth >= 1024)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const consoleRef = useRef<HTMLDivElement>(null)

  // "READ THE DOCS" from elsewhere opens the docs sidebar.
  useEffect(() => {
    const state = location.state as { docs?: boolean } | null
    if (state?.docs) setDocsOpen(true)
  }, [location.state])

  // Full-screen view — the body never scrolls here.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const appendLine = (text: string) => {
    setLines((prev) => [
      ...prev,
      { text, error: text.startsWith('💀') || text.startsWith('⚠️') },
    ])
  }

  const runCode = (code?: string) => {
    const src = code ?? source
    setLines([])
    setStatus('running')
    const started = performance.now()
    let printed = 0

    const result = run(src, (text) => {
      appendLine(text)
      printed++
    })

    const ms = (performance.now() - started).toFixed(1)
    let meta: string
    if (printed === 0 && result.ok) {
      meta = `— ran clean in ${ms}ms (nothing spilled) —`
    } else {
      meta = result.ok
        ? `— done in ${ms}ms —`
        : `— stopped on an error in ${ms}ms —`
    }
    setLines((prev) => [...prev, { text: meta, error: false, meta: true }])
    setStatus(result.ok ? `ok · ${ms}ms` : 'error')
  }

  useEffect(() => {
    const el = consoleRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

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
      const next = el.value.slice(0, s) + '  ' + el.value.slice(end)
      setSource(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2
      })
    }
  }

  const runSnippet = (code: string) => {
    setSource(code)
    runCode(code)
    editorRef.current?.focus()
  }

  return (
    <div className="relative z-10 h-screen flex flex-col bg-background/80 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-divider bg-surface/40 backdrop-blur-sm z-20 flex-shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-xs text-text-hint hover:text-text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-flow-shell-start">GENZ</span>
          <span className="hidden sm:inline">// PLAYGROUND</span>
        </Link>

        <span className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDocsOpen((o) => !o)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border text-xs font-mono transition-colors active:scale-95 ${
              docsOpen
                ? 'border-flow-shell-start/40 text-flow-shell-start bg-flow-shell-start/10'
                : 'border-divider text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            DOCS
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                docsOpen ? 'bg-flow-shell-start' : 'bg-text-hint'
              }`}
            />
          </button>
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-divider text-xs font-mono text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            <BrainCircuit className="w-4 h-4 text-text-hint" />
            PROBLEMS
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center px-4 py-2 rounded-full border border-divider text-xs font-mono text-text-secondary hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            ABOUT
          </Link>
        </span>
      </header>

      {/* Editor toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 py-3 border-b border-divider bg-surface/20 flex-shrink-0">
        <label
          htmlFor="examples"
          className="text-text-hint text-[10px] uppercase tracking-[0.2em]"
        >
          load example:
        </label>
        <select
          id="examples"
          aria-label="Load an example"
          className="bg-surface-elevated/50 border border-divider rounded-md text-text-secondary text-xs font-mono px-3 py-2 cursor-pointer hover:border-flow-shell-start/30 transition-colors focus:outline-none"
          onChange={(e) => setSource(EXAMPLES[e.target.value] ?? '')}
          defaultValue={Object.keys(EXAMPLES)[0]}
        >
          {Object.keys(EXAMPLES).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <span className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSource('')
              editorRef.current?.focus()
            }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-divider rounded-md text-text-secondary text-xs font-mono hover:text-text-primary hover:border-flow-shell-start/30 transition-colors active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-text-hint" /> Clear
          </button>
          <button
            type="button"
            onClick={() => runCode()}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-gradient-to-r from-flow-shell-start to-flow-shell-end text-white text-xs font-mono font-medium hover:shadow-lg hover:shadow-flow-shell-start/25 transition-all active:scale-95"
          >
            <Play className="w-4 h-4" /> Run it ▶
          </button>
        </span>
      </div>

      {/* Editor + console + docs */}
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-2 min-h-0">
          {/* Editor pane */}
          <div className="flex flex-col min-h-0 lg:border-r border-divider border-t lg:border-t-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-divider bg-surface-elevated/40 flex-shrink-0">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-hint font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-optimal" />
                code.yap
              </span>
              <span className="text-[10px] text-text-hint font-mono">
                {source.split('\n').length} lines
              </span>
            </div>
            <textarea
              ref={editorRef}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              data-lenis-prevent
              aria-label="GenzLang source code editor"
              className="flex-1 min-h-0 resize-none border-none outline-none bg-transparent text-text-primary font-mono text-[13px] leading-[1.6] p-4 tab-size-2 caret-flow-shell-start"
            />
          </div>

          {/* Console pane */}
          <div className="flex flex-col min-h-0 border-t lg:border-t-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-divider bg-surface-elevated/40 flex-shrink-0">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-hint font-mono">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status === 'running'
                      ? 'bg-warning animate-pulse-optimal'
                      : status === 'error'
                        ? 'bg-error animate-pulse-optimal'
                        : 'bg-success animate-pulse-optimal'
                  }`}
                />
                output
              </span>
              <span className="text-[10px] text-text-hint font-mono">
                {status}
              </span>
            </div>
            <div
              ref={consoleRef}
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-auto font-mono text-[13px] leading-[1.6] p-4 whitespace-pre-wrap break-words"
              role="log"
              aria-live="polite"
            >
              {lines.length === 0 ? (
                <span className="text-text-hint italic">
                  &gt; nothing spilled yet — hit Run it ▶
                </span>
              ) : (
                lines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.error
                        ? 'text-error'
                        : line.meta
                          ? 'text-text-hint'
                          : 'text-text-secondary'
                    }
                  >
                    {line.text === '' ? '\u200b' : line.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DocsSidebar
          open={docsOpen}
          onClose={() => setDocsOpen(false)}
          onRunSnippet={runSnippet}
        />
      </div>
    </div>
  )
}