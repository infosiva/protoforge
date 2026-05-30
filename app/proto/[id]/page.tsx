'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { ProtoSpec, PageSpec, SectionSpec, ItemSpec } from '@/lib/types'
import Watermark from '@/components/Watermark'
import { loadHistory, saveToHistory } from '@/components/ProjectsDashboard'

type ViewTab = 'preview' | 'code' | 'export'

// ── Per-category visual identity ─────────────────────────────────────────────
// Each category gets a completely different world: light vs dark, font, nav,
// hero structure, section card style, surface tone, CTA shape.
interface Theme {
  bg: string              // page background (CSS)
  surface: string         // card/section surface
  border: string          // card border
  text: string            // primary text color
  muted: string           // muted text
  navBg: string           // top nav background
  navText: string
  heroLayout: 'centered-light' | 'fullbleed-photo' | 'split-terminal' | 'split-warm' | 'editorial' | 'app-ui' | 'bold-dark'
  fontStyle: string       // CSS font-family
  radius: string          // border-radius for cards
  ctaShape: string        // CSS border-radius for CTA buttons
  sectionDivider: string  // border between sections
}

const THEMES: Record<string, Theme> = {
  // Airbnb feel — warm white, serif headline, soft shadows
  marketplace: {
    bg: '#FAFAF8',
    surface: '#FFFFFF',
    border: '#E8E3DC',
    text: '#1A1A1A',
    muted: '#6B6B6B',
    navBg: 'rgba(255,255,255,0.95)',
    navText: '#1A1A1A',
    heroLayout: 'split-warm',
    fontStyle: "'Georgia', 'Times New Roman', serif",
    radius: '16px',
    ctaShape: '8px',
    sectionDivider: '#E8E3DC',
  },
  // Linear feel — dark slate, mono accents, sharp grid
  saas: {
    bg: '#0F0F13',
    surface: '#16161D',
    border: '#2A2A35',
    text: '#F0F0F5',
    muted: '#8080A0',
    navBg: 'rgba(15,15,19,0.95)',
    navText: '#F0F0F5',
    heroLayout: 'bold-dark',
    fontStyle: "'Inter', 'SF Pro Display', system-ui, sans-serif",
    radius: '8px',
    ctaShape: '6px',
    sectionDivider: '#2A2A35',
  },
  // Shopify feel — bold red/white, tight, product-centric
  ecommerce: {
    bg: '#FFFFFF',
    surface: '#F7F7F7',
    border: '#E5E5E5',
    text: '#1C1C1E',
    muted: '#6E6E73',
    navBg: '#1C1C1E',
    navText: '#FFFFFF',
    heroLayout: 'fullbleed-photo',
    fontStyle: "'Helvetica Neue', 'Arial', sans-serif",
    radius: '4px',
    ctaShape: '0px',
    sectionDivider: '#E5E5E5',
  },
  // Stripe/Wise feel — dark emerald terminal, mono numbers, tight list
  fintech: {
    bg: '#0A1628',
    surface: '#0F2040',
    border: '#1A3050',
    text: '#E8F4F0',
    muted: '#7090A0',
    navBg: '#061020',
    navText: '#E8F4F0',
    heroLayout: 'split-terminal',
    fontStyle: "'JetBrains Mono', 'Courier New', monospace",
    radius: '4px',
    ctaShape: '4px',
    sectionDivider: '#1A3050',
  },
  // Calm/Headspace — soft cream, rounded, calming sans
  health: {
    bg: '#F5F0E8',
    surface: '#FFFFFF',
    border: '#E0D8CC',
    text: '#2D2D2D',
    muted: '#8A8070',
    navBg: 'rgba(245,240,232,0.95)',
    navText: '#2D2D2D',
    heroLayout: 'centered-light',
    fontStyle: "'Nunito', 'Rounded', 'system-ui', sans-serif",
    radius: '24px',
    ctaShape: '100px',
    sectionDivider: '#E0D8CC',
  },
  // Duolingo feel — vibrant, gamified, bold sans, full-color
  education: {
    bg: '#FFFFFF',
    surface: '#F8F8FF',
    border: '#E0E0FF',
    text: '#1A1A2E',
    muted: '#5050A0',
    navBg: '#FFFFFF',
    navText: '#1A1A2E',
    heroLayout: 'editorial',
    fontStyle: "'DM Sans', 'Nunito', system-ui, sans-serif",
    radius: '20px',
    ctaShape: '100px',
    sectionDivider: '#E0E0FF',
  },
  // Deliveroo feel — warm orange, photo-heavy, bold
  food: {
    bg: '#FFF8F0',
    surface: '#FFFFFF',
    border: '#FFE4CC',
    text: '#1A0A00',
    muted: '#7A5040',
    navBg: '#1A0A00',
    navText: '#FFFFFF',
    heroLayout: 'fullbleed-photo',
    fontStyle: "'Georgia', 'Playfair Display', serif",
    radius: '12px',
    ctaShape: '8px',
    sectionDivider: '#FFE4CC',
  },
  // Airbnb Travel — airy white, photo fullbleed, elegant sans
  travel: {
    bg: '#FFFFFF',
    surface: '#F8FBFF',
    border: '#D8E8F8',
    text: '#0A1A2E',
    muted: '#5070A0',
    navBg: 'rgba(255,255,255,0.0)',
    navText: '#FFFFFF',
    heroLayout: 'fullbleed-photo',
    fontStyle: "'Garamond', 'Georgia', serif",
    radius: '16px',
    ctaShape: '100px',
    sectionDivider: '#D8E8F8',
  },
  // Notion feel — off-white, clean sans, tight
  productivity: {
    bg: '#FFFFFF',
    surface: '#F7F6F3',
    border: '#E8E8E0',
    text: '#191919',
    muted: '#9B9B9B',
    navBg: '#FFFFFF',
    navText: '#191919',
    heroLayout: 'app-ui',
    fontStyle: "'Inter', system-ui, sans-serif",
    radius: '6px',
    ctaShape: '6px',
    sectionDivider: '#E8E8E0',
  },
  // Pinterest feel — white masonry, pink accents, editorial
  social: {
    bg: '#FFFFFF',
    surface: '#F8F8F8',
    border: '#EBEBEB',
    text: '#111111',
    muted: '#767676',
    navBg: '#FFFFFF',
    navText: '#111111',
    heroLayout: 'editorial',
    fontStyle: "'Helvetica Neue', 'Arial', sans-serif",
    radius: '16px',
    ctaShape: '100px',
    sectionDivider: '#EBEBEB',
  },
}

// ── Section renderer ──────────────────────────────────────────────────────────

function SectionView({
  section,
  theme,
  primary,
  accent,
}: {
  section: SectionSpec
  theme: Theme
  primary: string
  accent: string
}) {
  const items = section.items ?? []

  if (section.type === 'hero') return null // handled in hero area

  if (section.type === 'cta-band') return (
    <div style={{ background: primary, padding: '64px 32px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: 12 }}>{section.headline}</h2>
      <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>{section.body}</p>
      <a href="/signup" style={{
        display: 'inline-block', background: '#fff', color: primary,
        fontWeight: 700, padding: '14px 36px', borderRadius: theme.ctaShape, textDecoration: 'none'
      }}>Get started free</a>
    </div>
  )

  if (section.type === 'stats') return (
    <div style={{ padding: '48px 32px', borderTop: `1px solid ${theme.sectionDivider}`, borderBottom: `1px solid ${theme.sectionDivider}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 32, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: primary, fontFamily: 'inherit' }}>{item.title}</div>
            <div style={{ fontSize: '0.85rem', color: theme.muted, marginTop: 4 }}>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  )

  if (section.type === 'pricing') return (
    <div style={{ padding: '72px 32px', background: theme.bg }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: theme.text, marginBottom: 8 }}>{section.headline}</h2>
        <p style={{ color: theme.muted, marginBottom: 48 }}>{section.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: i === 1 ? primary : theme.surface,
              color: i === 1 ? '#fff' : theme.text,
              border: `2px solid ${i === 1 ? primary : theme.border}`,
              borderRadius: theme.radius,
              padding: 28,
              display: 'flex', flexDirection: 'column', gap: 12,
              transform: i === 1 ? 'scale(1.04)' : 'none',
            }}>
              <span style={{ fontSize: '2rem' }}>{item.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900 }}>{item.price}</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.75, lineHeight: 1.5 }}>{item.body}</div>
              <a href="/signup" style={{
                marginTop: 'auto', textAlign: 'center', padding: '10px 0',
                borderRadius: theme.ctaShape,
                background: i === 1 ? '#fff' : primary,
                color: i === 1 ? primary : '#fff',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
              }}>Get started</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (section.type === 'faq') return (
    <div style={{ padding: '64px 32px', maxWidth: 720, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: theme.text, marginBottom: 32 }}>{section.headline}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, i) => (
          <details key={i} style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: theme.radius, padding: '16px 20px',
          }}>
            <summary style={{ fontWeight: 600, color: theme.text, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
              {item.title} <span style={{ color: theme.muted }}>▾</span>
            </summary>
            <p style={{ marginTop: 12, color: theme.muted, fontSize: '0.9rem', lineHeight: 1.6 }}>{item.body}</p>
          </details>
        ))}
      </div>
    </div>
  )

  if (section.type === 'testimonials') return (
    <div style={{ padding: '64px 32px', background: theme.surface }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: theme.text, marginBottom: 40, textAlign: 'center' }}>{section.headline}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              background: theme.bg, border: `1px solid ${theme.border}`,
              borderRadius: theme.radius, padding: 24,
            }}>
              <p style={{ color: theme.muted, fontStyle: 'italic', marginBottom: 16, fontSize: '0.95rem', lineHeight: 1.6 }}>
                "{item.body}"
              </p>
              <p style={{ fontWeight: 600, color: theme.text, fontSize: '0.85rem' }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (section.type === 'how-it-works') return (
    <div style={{ padding: '72px 32px', maxWidth: 900, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: theme.text, marginBottom: 8 }}>{section.headline}</h2>
      <p style={{ color: theme.muted, marginBottom: 48 }}>{section.body}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', flexShrink: 0,
            }}>{item.icon}</div>
            <div style={{ fontWeight: 700, color: theme.text }}>{item.title}</div>
            <div style={{ fontSize: '0.9rem', color: theme.muted, lineHeight: 1.6 }}>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  )

  // features default
  return (
    <div style={{ padding: '64px 32px', maxWidth: 960, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: theme.text, marginBottom: 8 }}>{section.headline}</h2>
      {section.body && <p style={{ color: theme.muted, marginBottom: 40 }}>{section.body}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            background: theme.surface, border: `1px solid ${theme.border}`,
            borderRadius: theme.radius, padding: 24,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <span style={{ fontSize: '2rem' }}>{item.icon}</span>
            <div style={{ fontWeight: 700, color: theme.text }}>{item.title}</div>
            <div style={{ fontSize: '0.9rem', color: theme.muted, lineHeight: 1.5 }}>{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hero variants ─────────────────────────────────────────────────────────────

function HeroArea({ spec, theme, page }: { spec: ProtoSpec; theme: Theme; page: PageSpec }) {
  const { heroLayout } = theme
  const primary = spec.primaryColor
  const accent = spec.accentColor

  if (heroLayout === 'fullbleed-photo') return (
    <div style={{
      minHeight: '70vh', position: 'relative', display: 'flex', alignItems: 'flex-end',
      background: `linear-gradient(150deg, ${primary} 0%, ${accent} 100%)`,
      overflow: 'hidden',
    }}>
      {/* texture overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '64px 48px', color: '#fff', maxWidth: 800 }}>
        <p style={{ fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.75rem', opacity: 0.7, marginBottom: 16, textTransform: 'uppercase' }}>{spec.audience}</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: 20, fontFamily: theme.fontStyle }}>{page.headline}</h1>
        <p style={{ fontSize: '1.15rem', opacity: 0.85, marginBottom: 32, maxWidth: 520 }}>{page.subheadline}</p>
        <a href={page.ctaHref} style={{
          display: 'inline-block', background: '#fff', color: primary,
          fontWeight: 700, padding: '16px 40px', borderRadius: theme.ctaShape,
          textDecoration: 'none', fontSize: '1rem',
        }}>{page.ctaText}</a>
      </div>
    </div>
  )

  if (heroLayout === 'split-terminal') return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '75vh', paddingTop: 88 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: primary, marginBottom: 16, letterSpacing: '0.1em' }}>
          {`$ ${spec.name} --start`}
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, color: theme.text, marginBottom: 20, fontFamily: theme.fontStyle }}>{page.headline}</h1>
        <p style={{ color: theme.muted, marginBottom: 32, lineHeight: 1.7, fontSize: '1rem' }}>{page.subheadline}</p>
        <a href={page.ctaHref} style={{
          alignSelf: 'flex-start', background: primary, color: '#fff',
          fontWeight: 700, padding: '14px 32px', borderRadius: theme.ctaShape,
          textDecoration: 'none', fontFamily: 'monospace',
        }}>{page.ctaText}</a>
      </div>
      <div style={{
        background: '#061020', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40,
        fontFamily: 'monospace',
      }}>
        <div style={{
          background: '#0A1628', borderRadius: 8, padding: 24, width: '100%', maxWidth: 360,
          border: '1px solid #1A3050',
        }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          {[
            `> balance: $2,847.00`,
            `> return_7d: +3.2%`,
            `> portfolio: diversified`,
            `> risk_score: moderate`,
            `> next_action: invest`,
          ].map((line, i) => (
            <div key={i} style={{ color: i % 2 === 0 ? primary : '#7090A0', fontSize: '0.8rem', marginBottom: 6 }}>{line}</div>
          ))}
          <div style={{ marginTop: 16, background: primary, height: 2, borderRadius: 4, width: '60%' }} />
        </div>
      </div>
    </div>
  )

  if (heroLayout === 'split-warm') return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', paddingTop: 72 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 56px' }}>
        <p style={{ fontSize: '0.8rem', color: theme.muted, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>{spec.audience}</p>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, color: theme.text, marginBottom: 20, fontFamily: theme.fontStyle }}>{page.headline}</h1>
        <p style={{ color: theme.muted, marginBottom: 36, lineHeight: 1.7, fontSize: '1.05rem' }}>{page.subheadline}</p>
        <a href={page.ctaHref} style={{
          alignSelf: 'flex-start', background: primary, color: '#fff',
          fontWeight: 600, padding: '14px 32px', borderRadius: theme.ctaShape,
          textDecoration: 'none',
        }}>{page.ctaText}</a>
        <p style={{ marginTop: 20, fontSize: '0.8rem', color: theme.muted }}>No commitment · Free to browse</p>
      </div>
      <div style={{
        background: `linear-gradient(135deg, ${primary}15, ${accent}25)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40,
      }}>
        {/* Simulated listing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%', maxWidth: 340 }}>
          {['⭐ Top Rated','🆕 New','💰 Best Value','🎯 Expert'].map((label, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: 16,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ width: '100%', height: 60, background: `${primary}20`, borderRadius: 8 }} />
              <div style={{ fontWeight: 600, fontSize: '0.8rem', color: theme.text }}>{label}</div>
              <div style={{ fontSize: '0.7rem', color: theme.muted }}>from $45/hr</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (heroLayout === 'bold-dark') return (
    <div style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 48, paddingRight: 48, maxWidth: 960, margin: '0 auto' }}>
      <div style={{
        display: 'inline-block', fontSize: '0.7rem', fontWeight: 700,
        letterSpacing: '0.12em', color: primary, border: `1px solid ${primary}40`,
        borderRadius: 4, padding: '4px 10px', marginBottom: 28,
        textTransform: 'uppercase',
      }}>New — {spec.tagline}</div>
      <h1 style={{
        fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.0,
        color: theme.text, marginBottom: 24, fontFamily: theme.fontStyle,
        letterSpacing: '-0.02em',
      }}>{page.headline}</h1>
      <p style={{ color: theme.muted, fontSize: '1.15rem', maxWidth: 560, marginBottom: 40, lineHeight: 1.7 }}>{page.subheadline}</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href={page.ctaHref} style={{
          background: theme.text, color: theme.bg,
          fontWeight: 700, padding: '14px 28px', borderRadius: theme.ctaShape,
          textDecoration: 'none',
        }}>{page.ctaText}</a>
        <a href="#demo" style={{ color: theme.muted, fontSize: '0.9rem', textDecoration: 'none' }}>
          Watch demo →
        </a>
      </div>
      {/* metric strip */}
      <div style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 32, borderTop: `1px solid ${theme.border}` }}>
        {['50k+ users','99.9% uptime','4.9★ rating'].map(m => (
          <div key={m} style={{ fontSize: '0.85rem', color: theme.muted }}>{m}</div>
        ))}
      </div>
    </div>
  )

  if (heroLayout === 'editorial') return (
    <div style={{ paddingTop: 80, background: theme.bg }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 40, alignItems: 'center', minHeight: '55vh' }}>
          <div>
            <div style={{
              display: 'inline-block', background: primary, color: '#fff',
              fontWeight: 800, padding: '4px 14px', borderRadius: 100, fontSize: '0.8rem', marginBottom: 24,
            }}>{spec.category}</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, color: theme.text, marginBottom: 20, fontFamily: theme.fontStyle }}>{page.headline}</h1>
            <p style={{ color: theme.muted, fontSize: '1.05rem', marginBottom: 32, lineHeight: 1.7 }}>{page.subheadline}</p>
            <a href={page.ctaHref} style={{
              display: 'inline-block', background: primary, color: '#fff',
              fontWeight: 700, padding: '14px 36px', borderRadius: theme.ctaShape,
              textDecoration: 'none', fontSize: '1rem',
            }}>{page.ctaText}</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[primary, accent, `${primary}60`, `${accent}60`].map((c, i) => (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: theme.radius,
                background: c, opacity: 0.6 + i * 0.1,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  if (heroLayout === 'app-ui') return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: theme.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{spec.tagline}</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.15, color: theme.text, marginBottom: 20 }}>{page.headline}</h1>
          <p style={{ color: theme.muted, marginBottom: 32, lineHeight: 1.7 }}>{page.subheadline}</p>
          <a href={page.ctaHref} style={{
            display: 'inline-block', background: primary, color: '#fff',
            fontWeight: 600, padding: '12px 28px', borderRadius: theme.ctaShape,
            textDecoration: 'none',
          }}>{page.ctaText}</a>
        </div>
        {/* Fake app UI mockup */}
        <div style={{
          background: theme.surface, borderRadius: 12, border: `1px solid ${theme.border}`,
          padding: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
        }}>
          <div style={{ height: 32, background: theme.bg, borderRadius: 6, marginBottom: 12, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
            <div style={{ width: 80, height: 8, background: primary, borderRadius: 4, opacity: 0.3 }} />
            <div style={{ flex: 1 }} />
            <div style={{ width: 8, height: 8, background: theme.border, borderRadius: '50%' }} />
          </div>
          {[1,2,3,4].map(n => (
            <div key={n} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: `1px solid ${theme.sectionDivider}`, alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: `${primary}${20 + n * 10}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 8, background: theme.border, borderRadius: 4, marginBottom: 6, width: `${40 + n * 12}%` }} />
                <div style={{ height: 6, background: theme.border, borderRadius: 4, opacity: 0.5, width: '60%' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: primary, fontWeight: 600 }}>→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // centered-light fallback
  return (
    <div style={{ paddingTop: 100, paddingBottom: 64, textAlign: 'center', padding: '100px 32px 64px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontSize: '0.8rem', color: theme.muted, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>{spec.tagline}</p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, color: theme.text, marginBottom: 20, fontFamily: theme.fontStyle }}>{page.headline}</h1>
        <p style={{ color: theme.muted, fontSize: '1.1rem', marginBottom: 36, lineHeight: 1.7 }}>{page.subheadline}</p>
        <a href={page.ctaHref} style={{
          display: 'inline-block', background: primary, color: '#fff',
          fontWeight: 700, padding: '16px 40px', borderRadius: theme.ctaShape,
          textDecoration: 'none', fontSize: '1rem',
        }}>{page.ctaText}</a>
      </div>
    </div>
  )
}

// ── Inner page header (non-home pages) ────────────────────────────────────────

function InnerPageHeader({ page, theme, primary }: { page: PageSpec; theme: Theme; primary: string }) {
  return (
    <div style={{
      padding: '80px 32px 48px',
      background: `${primary}10`,
      borderBottom: `1px solid ${theme.border}`,
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: theme.text, marginBottom: 12, fontFamily: theme.fontStyle }}>{page.headline}</h1>
        <p style={{ color: theme.muted, fontSize: '1.05rem', lineHeight: 1.6 }}>{page.subheadline}</p>
      </div>
    </div>
  )
}

// ── Main viewer ───────────────────────────────────────────────────────────────

export default function ProtoViewer() {
  const { id } = useParams<{ id: string }>()
  const [spec, setSpec] = useState<ProtoSpec | null>(null)
  const [activeSlug, setActiveSlug] = useState('home')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Tab switcher state
  const [activeTab, setActiveTab] = useState<ViewTab>('preview')
  const [codeCopied, setCodeCopied] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [buildHistory, setBuildHistory] = useState<ReturnType<typeof loadHistory>>([])

  useEffect(() => {
    fetch(`/api/proto/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return }
        setSpec(data)
        // save to history when viewed
        saveToHistory({
          id: data.id,
          name: data.name,
          category: data.category,
          createdAt: data.createdAt,
          prompt: data.idea ?? '',
        })
      })
      .catch(() => setError('Failed to load prototype'))
      .finally(() => setLoading(false))
    // load build history
    setBuildHistory(loadHistory())
  }, [id])

  const theme: Theme = spec ? (THEMES[spec.category] ?? THEMES.saas) : THEMES.saas
  const activePage = spec?.pages.find(p => p.slug === activeSlug) ?? spec?.pages[0]
  const isLight = theme.bg.startsWith('#F') || theme.bg === '#FFFFFF' || theme.bg === '#FAFAF8'

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12', color: '#fff' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #6060ff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ opacity: 0.5 }}>Loading prototype…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )

  if (error || !spec) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12', color: '#fff' }}>
      <p style={{ opacity: 0.5 }}>{error || 'Prototype not found'}</p>
    </div>
  )

  const primary = spec.primaryColor
  const navIsTransparent = theme.heroLayout === 'fullbleed-photo' && activeSlug === 'home'

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: theme.fontStyle, position: 'relative', overflowX: 'hidden' }}>
      {/* Animated ambient gradient blobs — unique per prototype's color palette */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${primary}22 0%, transparent 70%)`,
          top: '-10%', left: '-5%',
          animation: 'blob1 18s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${spec.accentColor}18 0%, transparent 70%)`,
          bottom: '5%', right: '-8%',
          animation: 'blob2 22s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: `radial-gradient(circle, ${primary}12 0%, transparent 70%)`,
          top: '45%', left: '40%',
          animation: 'blob3 28s ease-in-out infinite',
        }}/>
      </div>
      <style>{`
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,40px) scale(1.08)} 66%{transform:translate(-30px,60px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,-40px) scale(1.06)} 66%{transform:translate(40px,-60px) scale(0.97)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-40px,30px) scale(1.12)} }
        @media (prefers-reduced-motion: reduce) { [style*="blob"] { animation: none !important; } }
      `}</style>
      <Watermark />

      {/* ProtoForge top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 20px', gap: 8,
        background: 'rgba(10,10,18,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {/* Logo mark */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect width="20" height="20" rx="5" fill={primary} opacity="0.9"/>
              <path d="M5 6h6M5 10h4M5 14h8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="15" cy="6" r="2" fill="#fff" opacity="0.7"/>
            </svg>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)' }}>PROTOFORGE</span>
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>›</span>
          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{spec.name}</span>
          <span style={{
            flexShrink: 0, fontSize: '0.6rem', padding: '2px 7px',
            borderRadius: 100, border: '1px solid rgba(251,191,36,0.4)',
            color: 'rgba(251,191,36,0.8)', fontWeight: 700, letterSpacing: '0.1em',
          }}>PROTOTYPE</span>
          {spec.tokenStats && (
            <span title={`Compression: ${spec.tokenStats.compressionTokens} tokens | Main: ${spec.tokenStats.mainTokens} tokens | Saved: ${spec.tokenStats.savedTokens}`} style={{
              flexShrink: 0, fontSize: '0.6rem', padding: '2px 7px',
              borderRadius: 100, background: 'rgba(96,96,255,0.15)',
              border: '1px solid rgba(96,96,255,0.35)',
              color: 'rgba(180,180,255,0.9)', fontWeight: 700, cursor: 'default',
            }}>⚡ {spec.tokenStats.savingsPct}% fewer tokens</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <a href={`/api/proto/${id}/llms`} download="llms.txt" style={{
            fontSize: '0.68rem', fontWeight: 600, padding: '5px 10px',
            borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            transition: 'all 0.15s',
          }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.target as HTMLElement).style.color = '#fff' }}
             onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}>
            llms.txt
          </a>
          <a href={`/api/proto/${id}/mcp`} download="mcp.json" style={{
            fontSize: '0.68rem', fontWeight: 600, padding: '5px 10px',
            borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            transition: 'all 0.15s',
          }} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.target as HTMLElement).style.color = '#fff' }}
             onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}>
            MCP tool
          </a>
          {buildHistory.length > 0 && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setHistoryOpen(v => !v)}
                style={{
                  fontSize: '0.68rem', fontWeight: 600, padding: '5px 10px',
                  borderRadius: 100,
                  border: `1px solid ${historyOpen ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.15)'}`,
                  background: historyOpen ? 'rgba(99,102,241,0.12)' : 'transparent',
                  color: historyOpen ? '#a5b4fc' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                History ({buildHistory.length})
              </button>
              {historyOpen && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  width: 280, maxHeight: 320, overflowY: 'auto',
                  background: 'rgba(10,10,18,0.97)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                  zIndex: 200,
                }}>
                  <div style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                  }}>
                    Build History
                  </div>
                  <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {buildHistory.map(h => (
                      <a
                        key={h.id}
                        href={`/proto/${h.id}`}
                        style={{
                          display: 'flex', flexDirection: 'column', gap: 2,
                          padding: '8px 10px', borderRadius: 8,
                          background: h.id === id ? 'rgba(99,102,241,0.12)' : 'transparent',
                          border: `1px solid ${h.id === id ? 'rgba(99,102,241,0.25)' : 'transparent'}`,
                          textDecoration: 'none', transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => { if (h.id !== id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                        onMouseLeave={e => { if (h.id !== id) e.currentTarget.style.background = 'transparent' }}
                      >
                        <div style={{
                          fontSize: '0.78rem', fontWeight: 600,
                          color: h.id === id ? '#a5b4fc' : '#f4f4f5',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {h.name}
                          {h.id === id && <span style={{ marginLeft: 6, fontSize: '0.6rem', color: '#a5b4fc' }}>← current</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span style={{
                            fontSize: '0.6rem', fontWeight: 700, padding: '1px 6px',
                            borderRadius: 99, background: 'rgba(255,255,255,0.07)',
                            color: 'rgba(255,255,255,0.4)',
                          }}>{h.category}</span>
                          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>
                            {new Date(h.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                          {h.prompt && (
                            <span style={{
                              fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                            }}>
                              · {h.prompt.slice(0, 40)}{h.prompt.length > 40 ? '…' : ''}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <a href="/#generate" style={{
            fontSize: '0.75rem', fontWeight: 700, padding: '6px 14px',
            borderRadius: 100, background: primary, color: '#fff', textDecoration: 'none',
          }}>Build yours →</a>
        </div>
      </div>

      {/* Product nav */}
      <nav style={{
        position: 'fixed', top: 41, left: 0, right: 0, zIndex: 40,
        display: 'flex', gap: 4, padding: '8px 16px',
        background: navIsTransparent ? 'transparent' : theme.navBg,
        borderBottom: navIsTransparent ? 'none' : `1px solid ${theme.border}`,
        backdropFilter: 'blur(8px)',
        overflowX: 'auto',
        transition: 'background 0.3s',
      }}>
        {spec.pages.map(p => {
          const active = activeSlug === p.slug
          return (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              style={{
                padding: '6px 16px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontWeight: active ? 700 : 500, fontSize: '0.85rem',
                background: active ? primary : 'transparent',
                color: active ? '#fff' : (navIsTransparent ? 'rgba(255,255,255,0.8)' : theme.navText),
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
            >{p.title}</button>
          )
        })}
      </nav>

      {/* Content */}
      <div style={{ paddingTop: 84, position: 'relative', zIndex: 1 }}>
        {activePage && (
          <>
            {activeSlug === 'home' ? (
              <HeroArea spec={spec} theme={theme} page={activePage} />
            ) : (
              <InnerPageHeader page={activePage} theme={theme} primary={primary} />
            )}
            {/* render non-hero sections */}
            {activePage.sections.filter(s => s.type !== 'hero').map((section, i) => (
              <SectionView
                key={i}
                section={section}
                theme={theme}
                primary={primary}
                accent={spec.accentColor}
              />
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${theme.border}`, padding: '32px',
        textAlign: 'center', fontSize: '0.8rem', color: theme.muted,
        position: 'relative', zIndex: 1,
      }}>
        <p>Prototype generated by <strong>ProtoForge</strong> · Not a real product</p>
        <a href="/" style={{ color: primary, textDecoration: 'none', marginTop: 4, display: 'inline-block' }}>
          Create your own →
        </a>
      </div>

      {/* Floating product chatbot */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
        {chatOpen && (
          <div style={{
            width: 340, height: 460, marginBottom: 12,
            background: 'rgba(14,14,22,0.97)', backdropFilter: 'blur(20px)',
            border: `1px solid ${primary}40`, borderRadius: 16,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${primary}20`,
          }}>
            {/* Chat header */}
            <div style={{
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: `1px solid rgba(255,255,255,0.07)`,
              background: `linear-gradient(135deg, ${primary}18, transparent)`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, background: primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0,
              }}>🤖</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>{spec.name} AI</p>
                <p style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>Powered by ProtoForge</p>
              </div>
              <button onClick={() => setChatOpen(false)} style={{
                marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1,
              }}>×</button>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {chatMessages.length === 0 && (
                <div style={{
                  margin: 'auto', textAlign: 'center', color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.78rem', padding: '0 16px',
                }}>
                  <p style={{ margin: '0 0 6px' }}>👋 Hi! Ask me anything about {spec.name}.</p>
                  <p style={{ margin: 0, fontSize: '0.7rem' }}>{spec.tagline}</p>
                </div>
              )}
              {chatMessages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '8px 12px', borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                  background: m.role === 'user' ? primary : 'rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '0.8rem', lineHeight: 1.5,
                }}>{m.content}</div>
              ))}
              {chatLoading && (
                <div style={{
                  alignSelf: 'flex-start', padding: '8px 12px', borderRadius: '12px 12px 12px 4px',
                  background: 'rgba(255,255,255,0.08)', display: 'flex', gap: 4,
                }}>
                  {[0,1,2].map(d => (
                    <span key={d} style={{
                      width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.4)',
                      display: 'inline-block', animation: `chatdot 1.2s ${d * 0.2}s ease-in-out infinite`,
                    }}/>
                  ))}
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            {/* Input */}
            <form onSubmit={async e => {
              e.preventDefault()
              const text = chatInput.trim()
              if (!text || chatLoading) return
              const msgs = [...chatMessages, { role: 'user' as const, content: text }]
              setChatMessages(msgs)
              setChatInput('')
              setChatLoading(true)
              try {
                const systemPrompt = `You are the AI assistant for ${spec.name}. ${spec.tagline}. Target audience: ${spec.audience}. Product idea: ${spec.idea}. Answer questions helpfully and concisely, staying in character as a product expert.`
                const res = await fetch('/api/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ messages: msgs.map(m => ({ role: m.role, content: m.content })), system: systemPrompt }),
                })
                const data = await res.json()
                setChatMessages([...msgs, { role: 'assistant', content: data.text ?? 'Sorry, something went wrong.' }])
              } catch {
                setChatMessages([...msgs, { role: 'assistant', content: 'Connection error. Try again.' }])
              } finally {
                setChatLoading(false)
                setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
              }
            }} style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8 }}>
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder={`Ask about ${spec.name}…`}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: '0.8rem', outline: 'none',
                }}
              />
              <button type="submit" disabled={chatLoading} style={{
                padding: '8px 12px', borderRadius: 8, border: 'none',
                background: primary, color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                opacity: chatLoading ? 0.5 : 1,
              }}>↑</button>
            </form>
          </div>
        )}
        {/* Toggle button */}
        <button onClick={() => setChatOpen(v => !v)} style={{
          width: 52, height: 52, borderRadius: '50%', border: 'none',
          background: `linear-gradient(135deg, ${primary}, ${spec.accentColor})`,
          color: '#fff', fontSize: '1.3rem', cursor: 'pointer',
          boxShadow: `0 4px 24px ${primary}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.15s cubic-bezier(0.23,1,0.32,1)',
        }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
           onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
          {chatOpen ? '×' : '💬'}
        </button>
      </div>

      <style>{`
        @keyframes chatdot {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
