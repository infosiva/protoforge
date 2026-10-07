'use client'
import Logo from './Logo'

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
        <Logo />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 99,
            background: 'color-mix(in oklab, var(--accent) 14%, transparent)',
            border: '1px solid color-mix(in oklab, var(--accent) 30%, transparent)',
            color: 'var(--accent)',
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
              background: 'var(--accent)',
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
