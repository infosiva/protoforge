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
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: '#7c3aed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="2.5" width="6" height="1.5" rx="0.75" fill="white"/>
              <rect x="2" y="5.5" width="4" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
              <rect x="2" y="8.5" width="7" height="1.5" rx="0.75" fill="white" opacity="0.85"/>
              <circle cx="11" cy="3.25" r="1.5" fill="white" opacity="0.55"/>
            </svg>
          </div>
          <span style={{
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#0f0f11',
          }}>
            Proto<span style={{ color: '#7c3aed' }}>Forge</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 99,
            background: 'rgba(124,58,237,0.09)',
            border: '1px solid rgba(124,58,237,0.2)',
            color: '#7c3aed',
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
              background: '#7c3aed',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'opacity 160ms cubic-bezier(0.23,1,0.32,1)',
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
