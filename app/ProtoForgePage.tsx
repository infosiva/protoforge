'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import type { ContentOverrides } from '@/lib/content'
import { useRouter } from 'next/navigation'
import ProjectsDashboard, { saveToHistory } from '@/components/ProjectsDashboard'

interface LayoutHint {
  id: string
  name: string
  bg: string
  accent: string
  openDesignSkill: string
}

function useLayoutHint(idea: string): LayoutHint | null {
  const [hint, setHint] = useState<LayoutHint | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (idea.trim().length < 8) { setHint(null); return }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/layout-suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: idea }),
        })
        if (!res.ok) return
        const data = await res.json()
        if (data.primary) setHint({
          id: data.primary.id,
          name: data.primary.name,
          bg: data.primary.bg,
          accent: data.primary.accent,
          openDesignSkill: data.primary.openDesignSkill,
        })
      } catch { /* ignore */ }
    }, 600)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [idea])

  return hint
}

const GEN_STEPS = [
  'Analysing your idea…',
  'Picking design archetype…',
  'Generating copy and layout…',
  'Saving prototype…',
  'Done!',
]

const EXAMPLES = [
  'A marketplace for freelance dog trainers',
  'SaaS tool for project managers to track burnout',
  'Online shop for handmade ceramics',
  'Fintech app to help Gen Z invest spare change',
  'Food delivery platform for home cooks',
  'Travel app that builds itineraries from mood boards',
]

// Wireframe-style prototype cards cycling in the right panel
const PROTO_FRAMES = [
  {
    label: 'Marketplace',
    accent: '#7c3aed',
    bg: '#f5f3ff',
    nav: ['Home', 'Browse', 'Post', 'Dashboard'],
    hero: { title: 'Find the right trainer', sub: 'AI-matched professionals near you' },
    cards: ['Sarah M. · Yoga · ★4.9', 'James K. · Boxing · ★4.8', 'Priya S. · Pilates · ★5.0'],
  },
  {
    label: 'SaaS Tool',
    accent: '#0284c7',
    bg: '#f0f9ff',
    nav: ['Overview', 'Team', 'Insights', 'Settings'],
    hero: { title: 'Team burnout at a glance', sub: 'Weekly workload heatmaps + AI alerts' },
    cards: ['Health Score · 82%', 'Overload risk · 2 members', 'Next review · Friday'],
  },
  {
    label: 'E-commerce',
    accent: '#ea580c',
    bg: '#fff7ed',
    nav: ['Shop', 'Collections', 'Cart', 'About'],
    hero: { title: 'Handmade ceramics, crafted with care', sub: 'Each piece unique, made to order' },
    cards: ['Linen Bowl · £48', 'Mug Set · £62', 'Vase – Speckle · £75'],
  },
  {
    label: 'Fintech App',
    accent: '#059669',
    bg: '#f0fdf4',
    nav: ['Portfolio', 'Invest', 'Insights', 'Profile'],
    hero: { title: 'Invest your spare change', sub: 'Round-ups that grow over time' },
    cards: ['Saved this week · £4.20', 'Total invested · £312', 'Returns · +6.3%'],
  },
]

const HOW_STEPS = [
  { num: '1', label: 'Describe', desc: 'One sentence is enough — ProtoForge detects the type of product automatically.' },
  { num: '2', label: 'AI Compresses', desc: 'Idea distilled to its core before generation — the AI focuses on what matters, not filler.' },
  { num: '3', label: 'Prototype ready', desc: 'Five branded pages with real copy, colors, and layout in seconds.' },
  { num: '4', label: 'Agent-ready export', desc: 'Download an AI context file + tool definitions — drop them into Claude, Cursor, or any agent to instantly brief it on your product.' },
]

const AI_FEATURES = [
  {
    icon: '⚡',
    label: 'Smarter AI generation',
    desc: 'Your idea is distilled to its core before generation — the AI focuses on what matters, not filler. Faster results, more relevant copy.',
    badge: 'Unique',
    badgeColor: '#7c3aed',
  },
  {
    icon: '📄',
    label: 'AI context export',
    desc: 'Every prototype gets a structured AI-readable context file. Drop it into Claude, GPT, or Cursor and they instantly understand your product.',
    badge: 'AI-native',
    badgeColor: '#0284c7',
  },
  {
    icon: '🔧',
    label: 'Agent tool definitions',
    desc: "Export ready-made tool definitions. Any agent can call your prototype's pages as structured tools — no code needed.",
    badge: 'Agent-ready',
    badgeColor: '#ea580c',
  },
  {
    icon: '💬',
    label: 'Built-in AI Chat',
    desc: 'Every prototype has a pre-loaded AI assistant that knows your product. Pitch it, test it, or have users explore it.',
    badge: 'Live',
    badgeColor: '#059669',
  },
]

function DemoPanel() {
  const [idx, setIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setPrevIdx(idx)
      setIdx(i => (i + 1) % PROTO_FRAMES.length)
    }, 3400)
    return () => clearInterval(t)
  }, [idx, paused])

  const frame = PROTO_FRAMES[idx]

  return (
    <div
      className="demo-screen"
      style={{ overflow: 'hidden' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Browser chrome */}
      <div style={{
        background: '#f3f4f6',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['#ff5f57','#ffbd2e','#28ca41'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          fontSize: 10,
          color: 'rgba(0,0,0,0.45)',
          background: '#fff',
          borderRadius: 6,
          padding: '4px 8px',
          fontFamily: 'monospace',
          border: '1px solid rgba(0,0,0,0.09)',
        }}>
          protofast.app/proto/preview
        </div>
      </div>

      {/* Simulated navbar */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`nav-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: 6,
              background: frame.accent,
              flexShrink: 0,
            }} />
            <div style={{ display: 'flex', gap: 10 }}>
              {frame.nav.map((item, i) => (
                <div key={item} style={{
                  fontSize: 10,
                  fontWeight: i === 0 ? 700 : 500,
                  color: i === 0 ? frame.accent : 'rgba(0,0,0,0.4)',
                  padding: '2px 0',
                  borderBottom: i === 0 ? `2px solid ${frame.accent}` : '2px solid transparent',
                }}>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '4px 8px',
          borderRadius: 6,
          background: frame.accent,
          color: '#fff',
        }}>
          {frame.label}
        </div>
      </div>

      {/* Hero area */}
      <div style={{ padding: '16px 16px 12px', background: frame.bg }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.23,1,0.32,1] }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0f0f11', lineHeight: 1.25, marginBottom: 5, letterSpacing: '-0.01em' }}>
              {frame.hero.title}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.5)', marginBottom: 10 }}>
              {frame.hero.sub}
            </div>
            <div style={{
              display: 'inline-block',
              fontSize: 9,
              fontWeight: 700,
              padding: '5px 13px',
              borderRadius: 8,
              background: frame.accent,
              color: '#fff',
            }}>
              Get started free →
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content cards */}
      <div style={{ padding: '12px 16px 16px', background: '#fff' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          Example outputs
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`cards-${idx}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: [0.23,1,0.32,1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
          >
            {frame.cards.map((card, i) => (
              <div key={i} style={{
                padding: '8px 12px',
                borderRadius: 8,
                background: '#f9fafb',
                border: '1px solid rgba(0,0,0,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ fontSize: 10, color: '#0f0f11', fontWeight: 600 }}>{card}</div>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: frame.accent, opacity: 0.5,
                }} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Skeleton rows */}
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[75, 55, 40].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 8, width: `${w}%` }} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{
        padding: '10px 16px',
        background: '#fff',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 9, color: 'rgba(0,0,0,0.35)' }}>
          {frame.label} prototype
        </div>
        <div role="tablist" aria-label="Prototype examples" style={{ display: 'flex', gap: 4 }}>
          {PROTO_FRAMES.map((f, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-label={`View ${f.label} example`}
              onClick={() => { setPrevIdx(idx); setIdx(i) }}
              style={{
                width: i === idx ? 14 : 5,
                height: 5,
                borderRadius: 99,
                background: i === idx ? frame.accent : 'rgba(0,0,0,0.15)',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 4px',
                margin: '-8px -2px',
                transition: 'width 280ms cubic-bezier(0.23,1,0.32,1), background-color 280ms cubic-bezier(0.23,1,0.32,1)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProtoForgePage({ overrides = {} }: { overrides?: ContentOverrides }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const router = useRouter()
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [error, setError] = useState('')
  const [clickedEx, setClickedEx] = useState<string | null>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmedIdea = idea.trim()
    if (!trimmedIdea || loading) return
    setLoading(true)
    setError('')
    setActiveStep(0)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: trimmedIdea }),
        signal: controller.signal,
      })
      if (!res.ok) {
        if (res.status === 429) throw new Error('Rate limit')
        const errText = await res.text().catch(() => '')
        throw new Error(errText || 'No stream')
      }
      if (!res.body) throw new Error('No stream')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n\n')
        buf = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          let data: Record<string, unknown>
          try { data = JSON.parse(line.slice(6)) } catch { continue }
          if (data.error) throw new Error(typeof data.error === 'string' ? data.error : 'API error')
          if (typeof data.step === 'number') setActiveStep(data.step as number)
          if (data.id) {
            saveToHistory({
              id: data.id as string,
              name: (data.name as string) ?? trimmedIdea.split(' ').slice(0, 3).join(' '),
              category: (data.category as string) ?? 'general',
              createdAt: new Date().toISOString(),
              prompt: trimmedIdea,
            })
            router.push(`/proto/${data.id}`)
            return
          }
        }
      }
    } catch (e: unknown) {
      const isAbort = e instanceof Error && (e.name === 'AbortError' || e.message === 'AbortError')
      const raw = e instanceof Error ? e.message : ''
      const friendly = isAbort
        ? 'Generation timed out — please try again.'
        : raw === 'No stream' || raw === 'Failed to fetch'
          ? 'Generation failed — please try again.'
          : raw.startsWith('Rate limit')
            ? 'Too many requests — wait a moment and try again.'
            : 'Something went wrong. Try a different idea or check back in a moment.'
      setError(friendly)
      setLoading(false)
      setActiveStep(-1)
      setTimeout(() => errorRef.current?.focus(), 50)
    } finally {
      clearTimeout(timeoutId)
    }
  }

  const layoutHint = useLayoutHint(idea)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#080d1a' }}>

      {/* ── Hero: split 2-col ── */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '40px 24px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 40,
          alignItems: 'center',
        }}
          className="lg-grid-2"
        >
          {/* Left: copy + form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23,1,0.32,1] }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 16px', borderRadius: 9999,
              background: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
              marginBottom: 16,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--accent)', display: 'inline-block',
                flexShrink: 0,
              }} />
              Free · No signup · Instant results
            </div>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#e8eaf0',
              marginBottom: 16,
            }}>
              {overrides.headline ?? (
                <>Turn ideas into{' '}
                <span style={{
                  color: 'var(--accent)',
                  display: 'inline-block',
                }}>
                  prototypes
                </span>
                {' '}instantly.</>
              )}
            </h1>

            <p style={{
              fontSize: 15,
              color: 'rgba(232,234,240,0.6)',
              lineHeight: 1.65,
              marginBottom: 20,
              maxWidth: 480,
            }}>
              {overrides.subheadline ?? <>Describe your idea. Get a 5-page branded prototype with real copy, colors, and layout in seconds — plus{' '}
                <strong style={{ color: '#e8eaf0', fontWeight: 700 }}>AI-ready export files</strong>{' '}
                so your agents and co-pilots instantly understand your product. No login required.</>}
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {[
                { label: '⚡ Instant results', color: '#4f46e5' },
                { label: '🎨 Branded design', color: '#0284c7' },
                { label: '📱 Mobile-first', color: '#0d9488' },
                { label: '🤖 AI-powered', color: '#ea580c' },
                { label: '🗂 5 pages, ready to use', color: 'rgba(15,15,17,0.45)' },
              ].map(feat => (
                <span key={feat.label} style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 99,
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.1)',
                  color: feat.color,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}>
                  {feat.label}
                </span>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} id="generate" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label htmlFor="idea-input" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
                Describe your product idea
              </label>
              <textarea
                id="idea-input"
                value={idea}
                onChange={e => setIdea(e.target.value)}
                placeholder='Describe your idea… e.g. "A marketplace for local fitness trainers"'
                rows={3}
                disabled={loading}
                aria-describedby={error ? 'idea-error' : undefined}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: 12,
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.12)',
                  color: '#0f0f11',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  opacity: loading ? 0.55 : 1,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}
              />
              {error && <p ref={errorRef} id="idea-error" role="alert" tabIndex={-1} style={{ color: '#dc2626', fontSize: 13, margin: 0 }}>{error}</p>}

              {/* Layout archetype badge — shows as user types */}
              <AnimatePresence>
                {layoutHint && !loading && (
                  <motion.div
                    key={layoutHint.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: [0.23,1,0.32,1] }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 12px', borderRadius: 8,
                      background: '#fff',
                      border: `1px solid ${layoutHint.accent}33`,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: layoutHint.bg, border: '1px solid rgba(0,0,0,0.12)', flexShrink: 0 }} />
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: layoutHint.accent, flexShrink: 0 }} />
                    </span>
                    <span style={{ color: 'rgba(15,15,17,0.45)', fontWeight: 500 }}>Detected layout:</span>
                    <span style={{ fontWeight: 700, color: layoutHint.accent, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {layoutHint.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading || !idea.trim()}
                aria-busy={loading}
                aria-label={loading ? 'Generating prototype, please wait' : undefined}
                className="btn-primary"
                style={{ padding: '14px 24px', fontSize: 15, width: '100%' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: [0.23,1,0.32,1] }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                    >
                      <svg className="spin-icon" style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Building…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15, ease: [0.23,1,0.32,1] }}
                    >
                      Generate prototype →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {loading && (
                <div aria-live="polite" aria-label="Generation progress" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                  {GEN_STEPS.map((label, i) => {
                    const done = i < activeStep
                    const active = i === activeStep
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                        <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {done ? (
                            <motion.svg
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.2, ease: [0.23,1,0.32,1] }}
                              style={{ width: 16, height: 16, color: '#059669' }}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          ) : active ? (
                            <svg className="spin-icon" style={{ width: 15, height: 15, color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none">
                              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                          ) : (
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'block' }} />
                          )}
                        </span>
                        <span style={{ color: done ? '#059669' : active ? '#e8eaf0' : 'rgba(232,234,240,0.4)' }}>
                          {label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </form>

            {/* Examples */}
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 10, color: 'rgba(232,234,240,0.4)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                Try an example
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {EXAMPLES.map(ex => (
                  <button
                    key={ex}
                    onClick={() => {
                      setIdea(ex)
                      setClickedEx(ex)
                      setTimeout(() => setClickedEx(null), 600)
                    }}
                    className="example-pill"
                    aria-label={`Use example: ${ex}`}
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 99,
                      background: '#fff',
                      border: `1px solid ${clickedEx === ex ? 'rgba(79,70,229,0.5)' : 'rgba(0,0,0,0.1)'}`,
                      color: clickedEx === ex ? '#4f46e5' : 'rgba(15,15,17,0.5)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      transition: 'border-color 150ms ease, color 150ms ease',
                    }}
                    onMouseEnter={e => {
                      if (clickedEx !== ex) {
                        e.currentTarget.style.borderColor = 'rgba(79,70,229,0.4)'
                        e.currentTarget.style.color = '#4f46e5'
                      }
                    }}
                    onMouseLeave={e => {
                      if (clickedEx !== ex) {
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                        e.currentTarget.style.color = 'rgba(15,15,17,0.5)'
                      }
                    }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects dashboard — reads localStorage */}
            <ProjectsDashboard />
          </motion.div>

          {/* Right: animated prototype demo panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.23,1,0.32,1] }}
            style={{ display: mounted ? 'block' : 'none' }}
          >
            <DemoPanel />
          </motion.div>
        </div>
      </main>

      {/* ── How it works ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '56px 24px',
        background: '#080d1a',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'rgba(232,234,240,0.4)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            How it works
          </p>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            color: '#e8eaf0',
            letterSpacing: '-0.025em',
            marginBottom: 40,
          }}>
            From idea to prototype in 4 steps
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {HOW_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: [0.23,1,0.32,1] }}
                style={{
                  borderRadius: 14,
                  padding: '20px 20px',
                  background: '#0f172a',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span className="step-badge">{step.num}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e8eaf0', marginBottom: 5 }}>{step.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(232,234,240,0.6)', lineHeight: 1.6 }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI-native differentiators ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '56px 24px', background: '#0f172a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            textAlign: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8,
          }}>
            Built for the AI age
          </p>
          <h2 style={{
            textAlign: 'center', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
            color: '#e8eaf0', letterSpacing: '-0.025em', marginBottom: 12,
          }}>
            What no other prototyper does
          </h2>
          <p style={{
            textAlign: 'center', fontSize: 14, color: 'rgba(232,234,240,0.5)',
            maxWidth: 560, margin: '0 auto 40px',
          }}>
            Other tools make pretty screens. ProtoForge makes prototypes your AI tools can actually read, use, and build on.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {AI_FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: [0.23,1,0.32,1] }}
                style={{
                  borderRadius: 14,
                  padding: '20px 18px',
                  background: '#080d1a',
                  border: `1px solid ${f.badgeColor}33`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 99,
                    background: `${f.badgeColor}22`, color: f.badgeColor, letterSpacing: '0.06em',
                  }}>{f.badge}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#e8eaf0', marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(232,234,240,0.6)', lineHeight: 1.6 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '20px 24px',
        background: '#080d1a',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
          fontSize: 11, color: 'rgba(232,234,240,0.6)',
        }}>
          <span>{'© '}{new Date().getFullYear()}{' ProtoForge · Prototype fast, build smarter'}</span>
          <nav aria-label="Footer" style={{ display: 'flex', gap: 16 }}>
            <a href="/privacy" style={{ color: 'rgba(232,234,240,0.6)', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: 'rgba(232,234,240,0.6)', textDecoration: 'none' }}>Terms</a>
          </nav>
        </div>
      </footer>

      <style>{`
        :root {
          --accent: #4f46e5;
          --accent-subtle: rgba(79,70,229,0.12);
          --accent-border: rgba(79,70,229,0.3);
          --fg: #e8eaf0;
          --fg-muted: rgba(232,234,240,0.6);
          --fg-faint: rgba(232,234,240,0.4);
          --bg-page: #080d1a;
          --bg-surface: #fff;
          --border: rgba(255,255,255,0.08);
          --success: #059669;
          --radius-sm: 6px;
          --radius-md: 8px;
          --radius-lg: 12px;
          --radius-xl: 14px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-icon { animation: spin 1s linear infinite; }
        .feature-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.07); }
        @media (prefers-reduced-motion: reduce) {
          .spin-icon { animation: none; opacity: 0.5; }
          [style*="animation"] { animation: none !important; }
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
        @media (min-width: 1024px) {
          .lg-grid-2 { grid-template-columns: 1fr 1fr !important; }
        }
        .example-pill:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        [role="tab"]:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 4px;
        }
        .btn-primary:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        textarea:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 0;
          border-color: var(--accent) !important;
        }
      `}</style>
    </div>
  )
}
