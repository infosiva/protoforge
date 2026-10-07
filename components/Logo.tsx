// Project logo: glyph + wordmark, key word in the hub-switchable accent.
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, letterSpacing: '-0.02em' }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="color-mix(in oklab, var(--accent) 14%, var(--bg))" />
        <g fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h16M11 22l2-7h6l2 7M16 15V8M12.5 10.5 16 8l3.5 2.5"/></g>
      </svg>
      <span>Proto</span><span style={{ color: 'var(--accent)' }}>Forge</span>
    </span>
  )
}
