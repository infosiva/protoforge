'use client'

export default function Navbar() {
  return (
    <nav className="navbar" style={{ padding: '0 16px' }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#f4f4f5',
          }}>
            Proto<span style={{ color: '#6366f1' }}>Forge</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 99,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            color: '#a5b4fc',
            letterSpacing: '0.04em',
          }}>
            FREE
          </span>
          <a
            href="#generate"
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '7px 16px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'opacity 160ms',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Try now
          </a>
        </div>
      </div>
    </nav>
  )
}
