import { useState } from 'react'
import { Copy, Play, X } from 'lucide-react'
import { DOC_SECTIONS, type DocBlock } from '../data/docs'

function Snippet({
  cap,
  code,
  onRun,
}: {
  cap?: string
  code: string
  onRun: (code: string) => void
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="mt-2 mb-4 border border-divider rounded-lg overflow-hidden bg-background/60">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-divider bg-surface/40">
        <span className="text-[10px] text-text-hint font-mono uppercase tracking-widest">
          {cap ?? 'example'}
        </span>
        <span className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => onRun(code)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-text-secondary border border-divider rounded-md hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            <Play className="w-3 h-3 text-success" /> Run
          </button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-text-secondary border border-divider rounded-md hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
          >
            <Copy className="w-3 h-3 text-text-hint" />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </span>
      </div>
      <pre className="m-0 p-3 overflow-auto text-[13px] leading-relaxed font-mono text-text-primary">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Block({ block, onRun }: { block: DocBlock; onRun: (c: string) => void }) {
  if (block.p !== undefined) {
    return (
      <p
        className="my-2 text-sm text-text-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: block.p }}
      />
    )
  }
  if (block.ul) {
    return (
      <ul className="my-2 pl-5 space-y-1.5 text-sm text-text-secondary list-disc">
        {block.ul.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    )
  }
  if (block.table) {
    return (
      <div className="my-2 overflow-x-auto">
        <table className="w-full border-collapse text-[13px] font-mono">
          <thead>
            <tr>
              {block.table.head.map((h) => (
                <th
                  key={h}
                  className="text-left text-[10px] uppercase tracking-[0.14em] text-text-hint font-medium py-2 pr-4 border-b border-divider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="py-2 pr-4 border-b border-divider text-text-secondary align-top"
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  if (block.snippet) {
    return <Snippet cap={block.snippet.cap} code={block.snippet.code} onRun={onRun} />
  }
  return null
}

/**
 * The full language docs. On desktop it's a fixed-width side panel inside the
 * playground flex layout; on mobile it becomes a full-height drawer overlay.
 */
export default function DocsSidebar({
  open,
  onClose,
  onRunSnippet,
}: {
  open: boolean
  onClose: () => void
  onRunSnippet: (code: string) => void
}) {
  if (!open) return null

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 bg-black/55 z-[60]"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="GenzLang documentation"
        data-lenis-prevent
        className="fixed lg:static right-0 top-0 h-full z-[61] w-[380px] max-w-[92vw] lg:max-w-none bg-surface border-l border-divider flex flex-col"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-divider flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-flow-shell-start animate-pulse-optimal" />
          <h2 className="m-0 text-sm font-mono uppercase tracking-[0.2em] text-text-primary">
            GenzLang // docs
          </h2>
          <span className="ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-text-secondary border border-divider rounded-md hover:text-text-primary hover:border-flow-shell-start/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Close
            </button>
          </span>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-12">
          {DOC_SECTIONS.map((section) => (
            <section key={section.h}>
              <h3 className="mt-7 mb-3 text-sm font-heading font-semibold text-accent border-b border-divider pb-2 uppercase tracking-wide">
                {section.h}
              </h3>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} onRun={onRunSnippet} />
              ))}
            </section>
          ))}
        </div>
      </aside>
    </>
  )
}