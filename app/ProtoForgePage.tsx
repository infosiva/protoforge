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
  { num: '1', label: 'Describe', desc: 'One sentence is enough. Category is detected automatically.' },
  { num: '2', label: 'AI Compresses', desc: 'Idea compressed to 40-token DNA — 85%+ fewer tokens before the main call.' },
  { num: '3', label: 'Prototype ready', desc: 'Five branded pages with real copy, colors, and layout in seconds.' },
  { num: '4', label: 'AI-Ready', desc: 'Every prototype ships with llms.txt + MCP stubs for any agent workflow.' },
]

const AI_FEATURES = [
  {
    icon: '⚡',
    label: 'Prompt DNA Compression',
    desc: 'Your idea is compressed to a 40-token DNA before the main LLM call — 85%+ fewer tokens, visible savings on every prototype.',
    badge: 'Unique',
    badgeColor: '#7c3aed',
  },
  {
    icon: '📄',
    label: 'llms.txt Export',
    desc: 'Every prototype gets a structured AI-readable context file. Drop it into Claude, GPT, or Cursor and they instantly understand your product.',
    badge: 'AI-native',
    badgeColor: '#0284c7',
  },
  {
    icon: '🔧',
    label: 'MCP Tool Stubs',
    desc: "Export a ready-made MCP server definition. Any agent can call your prototype's pages as structured tools — no code needed.",
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

  useEffect(() => {
    const t = setInterval(() => {
      setPrevIdx(idx)
      setIdx(i => (i + 1) % PROTO_FRAMES.length)
    }, 3400)
    return () => clearInterval(t)
  }, [idx])

  const frame = PROTO_FRAMES[idx]

  return (
    <div className="demo-screen" style={{ overflow: 'hidden' }}>
      {/* Browser chrome */}
      <div style={{
        background: '#f3f4f6',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#ffbd2e','#28ca41'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          fontSize: 10,
          color: 'rgba(0,0,0,0.35)',
          background: '#fff',
          borderRadius: 6,
          padding: '3px 10px',
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
              width: 22, height: 22, borderRadius: 6,
              background: frame.accent,
              flexShrink: 0,
            }} />
            <div style={{ display: 'flex', gap: 10 }}>
              {frame.nav.map((item, i) => (
                <div key={item} style={{
                  fontSize: 9,
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
          fontSize: 8,
          fontWeight: 700,
          padding: '4px 9px',
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
          Featured
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`cards-${idx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
          >
            {frame.cards.map((card, i) => (
              <div key={i} style={{
                padding: '7px 10px',
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
        <div style={{ display: 'flex', gap: 4 }}>
          {PROTO_FRAMES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrevIdx(idx); setIdx(i) }}
              style={{
                width: i === idx ? 14 : 5,
                height: 5,
                borderRadius: 99,
                background: i === idx ? frame.accent : 'rgba(0,0,0,0.15)',
                border: 'none',
                cursor: 'pointer',
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!idea.trim() || loading) return
    setLoading(true)
    setError('')
    setActiveStep(0)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      })
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
          const data = JSON.parse(line.slice(6))
          if (data.error) throw new Error(data.error)
          if (typeof data.step === 'number') setActiveStep(data.step)
          if (data.id) {
            saveToHistory({
              id: data.id,
              name: data.name ?? idea.trim().split(' ').slice(0, 3).join(' '),
              category: data.category ?? 'general',
              createdAt: new Date().toISOString(),
              prompt: idea.trim(),
            })
            router.push(`/proto/${data.id}`)
            return
          }
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
      setActiveStep(-1)
    }
  }

  const layoutHint = useLayoutHint(idea)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>

      {/* ── Hero: split 2-col ── */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '36px 24px 40px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 40,
          alignItems: 'center',
        }}
          className="lg-grid-2"
        >
          {/* Left: copy + form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.23,1,0.32,1] }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
              padding: '5px 14px', borderRadius: 9999,
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.18)',
              color: '#7c3aed',
              marginBottom: 18,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#7c3aed', display: 'inline-block',
                flexShrink: 0,
              }} />
              Free · No signup · AI-native
            </div>

            <h1 style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              color: '#0f0f11',
              marginBottom: 14,
            }}>
              {overrides.headline ?? (
                <>Turn ideas into{' '}
                <span style={{
                  color: '#7c3aed',
                  display: 'inline-block',
                }}>
                  prototypes
                </span>
                {' '}instantly.</>
              )}
            </h1>

            <p style={{
              fontSize: 15,
              color: 'rgba(15,15,17,0.55)',
              lineHeight: 1.65,
              marginBottom: 20,
              maxWidth: 480,
            }}>
              {overrides.subheadline ?? <>Describe your idea. Get a 5-page branded prototype with real copy, colors, and layout — plus{' '}
                <strong style={{ color: '#0f0f11', fontWeight: 700 }}>llms.txt and MCP tool stubs</strong>{' '}
                ready for any AI workflow. No login required.</>}
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
              {[
                { label: '⚡ Instant results', color: '#7c3aed' },
                { label: '🎨 Branded design', color: '#0284c7' },
                { label: '📱 Mobile-first', color: '#059669' },
                { label: '🤖 AI-powered', color: '#ea580c' },
                { label: '85% fewer tokens', color: 'rgba(15,15,17,0.45)' },
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
            <form onSubmit={handleSubmit} id="generate" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <textarea
                value={idea}
                onChange={e => setIdea(e.target.value)}
                placeholder='Describe your idea… e.g. "A marketplace for local fitness trainers"'
                rows={3}
                disabled={loading}
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
              {error && <p style={{ color: '#dc2626', fontSize: 13 }}>{error}</p>}

              {/* Layout archetype badge — shows as user types */}
              <AnimatePresence>
                {layoutHint && !loading && (
                  <motion.div
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
                    <span style={{ color: 'rgba(15,15,17,0.45)', fontWeight: 500 }}>Layout:</span>
                    <span style={{ fontWeight: 700, color: layoutHint.accent }}>
                      {layoutHint.id} — {layoutHint.name}
                    </span>
                    <span style={{
                      marginLeft: 'auto', fontSize: 10, fontWeight: 600,
                      color: 'rgba(15,15,17,0.35)',
                      padding: '2px 6px', borderRadius: 4,
                      background: 'rgba(0,0,0,0.04)',
                    }}>
                      {layoutHint.openDesignSkill}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={loading || !idea.trim()}
                className="btn-primary"
                style={{ padding: '14px 24px', fontSize: 15, width: '100%' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <svg style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }} viewBox="0 0 24 24" fill="none">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Building…
                  </span>
                ) : (
                  'Generate prototype →'
                )}
              </motion.button>

              {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 2 }}>
                  {GEN_STEPS.map((label, i) => {
                    const done = i < activeStep
                    const active = i === activeStep
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                        <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {done ? (
                            <svg style={{ width: 16, height: 16, color: '#059669' }} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : active ? (
                            <svg style={{ animation: 'spin 1s linear infinite', width: 15, height: 15, color: '#7c3aed' }} viewBox="0 0 24 24" fill="none">
                              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                          ) : (
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(0,0,0,0.15)', display: 'block' }} />
                          )}
                        </span>
                        <span style={{ color: done ? '#059669' : active ? '#0f0f11' : 'rgba(15,15,17,0.35)' }}>
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
              <p style={{ fontSize: 10, color: 'rgba(15,15,17,0.35)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                Try an example
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {EXAMPLES.map(ex => (
                  <button
                    key={ex}
                    onClick={() => setIdea(ex)}
                    className="example-pill"
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 99,
                      background: '#fff',
                      border: '1px solid rgba(0,0,0,0.1)',
                      color: 'rgba(15,15,17,0.5)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                      e.currentTarget.style.color = '#7c3aed'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                      e.currentTarget.style.color = 'rgba(15,15,17,0.5)'
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.23,1,0.32,1] }}
            style={{ display: mounted ? 'block' : 'none' }}
          >
            <DemoPanel />
          </motion.div>
        </div>
      </main>

      {/* ── How it works ── */}
      <section style={{
        borderTop: '1px solid rgba(0,0,0,0.07)',
        padding: '56px 24px',
        background: '#fff',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'rgba(15,15,17,0.35)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            How it works
          </p>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            color: '#0f0f11',
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
                whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(124,58,237,0.1)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: [0.23,1,0.32,1] }}
                style={{
                  borderRadius: 14,
                  padding: '20px 18px',
                  background: '#fafafa',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span className="step-badge">{step.num}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0f11', marginBottom: 5 }}>{step.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(15,15,17,0.5)', lineHeight: 1.6 }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI-native differentiators ── */}
      <section style={{ borderTop: '1px solid rgba(0,0,0,0.07)', padding: '56px 24px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            textAlign: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            color: '#7c3aed', textTransform: 'uppercase', marginBottom: 8,
          }}>
            Built for the AI age
          </p>
          <h2 style={{
            textAlign: 'center', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
            color: '#0f0f11', letterSpacing: '-0.025em', marginBottom: 12,
          }}>
            What no other prototyper does
          </h2>
          <p style={{
            textAlign: 'center', fontSize: 14, color: 'rgba(15,15,17,0.45)',
            maxWidth: 560, margin: '0 auto 40px',
          }}>
            Claude Design makes pretty mockups. Google Stitch generates screens. ProtoForge makes prototypes that AI agents can actually use.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {AI_FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, boxShadow: `0 8px 28px ${f.badgeColor}20` }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: [0.23,1,0.32,1] }}
                style={{
                  borderRadius: 14,
                  padding: '20px 18px',
                  background: '#fff',
                  border: `1px solid ${f.badgeColor}22`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 99,
                    background: `${f.badgeColor}14`, color: f.badgeColor, letterSpacing: '0.08em',
                  }}>{f.badge}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f0f11', marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(15,15,17,0.5)', lineHeight: 1.6 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid rgba(0,0,0,0.07)',
        padding: '20px 24px',
        textAlign: 'center',
        fontSize: 11,
        color: 'rgba(15,15,17,0.3)',
        background: '#fff',
      }}>
        ProtoForge · Prototype fast, build smarter · AI-native
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
        @media (min-width: 1024px) {
          .lg-grid-2 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
