/**
 * The standard section micro-label pattern:
 * ── Label // Sub ──
 */
export default function SectionLabel({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-4 mb-8 md:mb-16 ${className ?? ''}`}
    >
      <div className="h-px flex-1 bg-divider" />
      <span className="text-text-hint text-xs font-mono uppercase tracking-[0.3em] whitespace-nowrap">
        {label}
      </span>
      <div className="h-px flex-1 bg-divider" />
    </div>
  )
}