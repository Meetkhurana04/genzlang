/** Radar / GSM signal meter: counter-rotating rings + pulsing signal bars. */
export default function RadarRings() {
  const bars = [8, 16, 24, 32, 40]

  return (
    <div
      className="absolute right-[-20vw] md:right-[-10vw] top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] opacity-10 md:opacity-20 pointer-events-none"
      aria-hidden="true"
    >
      {/* Outer ring — 12s CW */}
      <div className="absolute inset-0 rounded-full border-[1px] border-divider animate-spin-optimal" />
      {/* Inner ring — 9s CCW */}
      <div className="absolute inset-[10%] rounded-full border-[1px] border-divider animate-spin-optimal-reverse" />
      {/* Innermost ring — 12s CW */}
      <div className="absolute inset-[20%] rounded-full border-[1px] border-divider animate-spin-optimal" />

      {/* Center: vertical signal-strength meter */}
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-1 pb-[15%]">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-2 bg-success"
            style={{
              height: h,
              opacity: i <= 3 ? 1 : 0.3,
              animation: `pulse-optimal ${Math.max(i * 0.25, 0.01)}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-accent rounded-full animate-pulse-optimal" />
      </div>
    </div>
  )
}