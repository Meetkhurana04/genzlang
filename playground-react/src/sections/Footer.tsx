import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GitBranch, TerminalSquare } from 'lucide-react'

function useBlink(interval = 500): boolean {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const id = window.setInterval(() => setVisible((v) => !v), interval)
    return () => window.clearInterval(id)
  }, [interval])
  return visible
}

export default function Footer() {
  const cursorOn = useBlink()

  return (
    <footer className="bg-background/60 backdrop-blur-sm py-8 sm:py-12 px-4 sm:px-8 md:px-24 border-t border-divider flex flex-col md:flex-row justify-between items-start md:items-end min-h-[20vh] sm:min-h-[30vh] gap-8">
      <div className="font-mono text-sm text-text-secondary">
        <span className="text-text-primary">&gt;</span> GenzLang.terminate()
        <span
          className={`inline-block w-2 h-4 bg-text-primary ml-1 align-middle ${
            cursorOn ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col items-start md:items-end gap-3">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            to="/playground"
            state={{ docs: true }}
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-hint hover:text-text-primary transition-colors"
          >
            Documentation
          </Link>
          <Link
            to="/playground"
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-hint hover:text-text-primary transition-colors"
          >
            Examples
          </Link>
          <Link
            to="/problems"
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-hint hover:text-text-primary transition-colors"
          >
            Problems
          </Link>
          <a
            href="https://github.com/xOAviOx/yap-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-hint hover:text-text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <GitBranch className="w-3 h-3" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/genzlang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-hint hover:text-text-primary transition-colors inline-flex items-center gap-1.5"
          >
            <TerminalSquare className="w-3 h-3" aria-hidden="true" />
            npm
          </a>
        </nav>
        <span className="text-[10px] font-mono uppercase tracking-widest text-text-hint">
          © 2026 GENZLANG PROTOCOL
        </span>
      </div>
    </footer>
  )
}