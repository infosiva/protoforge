'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { ContentOverrides } from '@/lib/content'
import { useRouter } from 'next/navigation'
import ProjectsDashboard, { saveToHistory } from '@/components/ProjectsDashboard'

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

const DEMO_PROTOTYPES = [
  {
    name: 'FitMatch',
    tag: 'Marketplace',
    color: '#6366f1',
    tagBg: 'rgba(99,102,241,0.15)',
    tagColor: '#a5b4fc',
    pages: ['Home', 'Browse Trainers', 'Trainer Profile', 'Book Session', 'Dashboard'],
    preview: 'AI-matched fitness marketplace with trainer profiles, booking calendar, and stripe payments.',
  },
  {
    name: 'CeramicShop',
    tag: 'E-commerce',
    color: '#f59e0b',
    tagBg: 'rgba(245,158,11,0.15)',
    tagColor: '#fcd34d',
    pages: ['Home', 'Shop', 'Product Detail', 'Cart', 'Checkout'],
    preview: 'Artisan ceramics shop with product gallery, custom sizing options, and checkout flow.',
  },
  {
    name: 'BurnoutOS',
    tag: 'SaaS Tool',
    color: '#10b981',
    tagBg: 'rgba(16,185,129,0.15)',
    tagColor: '#6ee7b7',
    pages: ['Dashboard', 'Team Health', 'Insights', 'Settings', 'Reports'],
    preview: 'Project burnout tracker with workload heatmaps, AI alerts, and weekly health reports.',
  },
]

const HOW_STEPS = [
  { icon: '✍️', label: 'Describe', desc: 'One sentence is enough. We detect your category automatically.' },
  { icon: '🧠', label: 'AI Compresses', desc: 'Your idea is compressed to a ~40-token product DNA first — saving 85%+ tokens before the main call.' },
  { icon: '🔗', label: 'Share', desc: 'Get a shareable link instantly. Show investors, users, or your team.' },
  { icon: '🤖', label: 'AI-Ready', desc: 'Every prototype ships with llms.txt + MCP tool stubs. Drop straight into any AI agent workflow.' },
]

const AI_FEATURES = [
  {
    icon: '⚡',
    label: 'Prompt DNA Compression',
    desc: 'Your idea is compressed to a 40-token DNA before the main LLM call. 85%+ fewer tokens. Visible savings on every prototype.',
    badge: 'Unique',
    badgeColor: '#6366f1',
  },
  {
    icon: '📄',
    label: 'llms.txt Export',
    desc: 'Every prototype gets a structured AI-readable context file. Drop it into Claude, GPT, or Cursor and they instantly understand your product.',
    badge: 'AI-native',
    badgeColor: '#10b981',
  },
  {
    icon: '🔧',
    label: 'MCP Tool Stubs',
    desc: 'Export a ready-made MCP server definition. Any agent can call your prototype\'s pages as structured tools — no code needed.',
    badge: 'Agent-ready',
    badgeColor: '#f59e0b',
  },
  {
    icon: '💬',
    label: 'Built-in AI Chat',
    desc: 'Every prototype has a pre-loaded AI assistant that knows your product. Pitch it, test it, or have users explore it — no setup.',
    badge: 'Live',
    badgeColor: '#ec4899',
  },
]

function DemoPanel() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % DEMO_PROTOTYPES.length), 3200)
    return () => clearInterval(t)
  }, [])
  const proto = DEMO_PROTOTYPES[idx]

  return (
    <div className="demo-screen" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Browser chrome */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#ff5f57','#ffbd2e','#28ca41'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 6,
          padding: '3px 10px',
          fontFamily: 'monospace',
        }}>
          protofast.app/proto/preview
        </div>
      </div>

      {/* Proto content */}
      <div style={{ padding: '20px 20px 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.23,1,0.32,1] }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#f4f4f5', letterSpacing: '-0.02em' }}>{proto.name}</div>
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 99,
                  background: proto.tagBg,
                  color: proto.tagColor,
                  letterSpacing: '0.04em',
                }}>
                  {proto.tag}
                </span>
              </div>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 8,
                background: proto.color,
                color: '#fff',
                opacity: 0.9,
              }}>
                View prototype →
              </div>
            </div>

            {/* Page nav pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
              {proto.pages.map((page, i) => (
                <div key={page} style={{
                  fontSize: 9,
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: 99,
                  background: i === 0 ? proto.tagBg : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i === 0 ? proto.tagColor + '44' : 'rgba(255,255,255,0.07)'}`,
                  color: i === 0 ? proto.tagColor : 'rgba(255,255,255,0.4)',
                }}>
                  {page}
                </div>
              ))}
            </div>

            {/* Preview text */}
            <div style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
              padding: '10px 12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {proto.preview}
            </div>

            {/* Skeleton rows */}
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[80, 60, 45].map((w, i) => (
                <div key={i} className="skeleton" style={{ height: 10, width: `${w}%` }} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 16 }}>
          {DEMO_PROTOTYPES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 16 : 6,
                height: 6,
                borderRadius: 99,
                background: i === idx ? '#6366f1' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 280ms cubic-bezier(0.23,1,0.32,1)',
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
            // save to local history before navigating
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Animated gradient blobs */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          top: '-15%', left: '-10%',
          animation: 'blob1 20s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', width: 550, height: 550, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          bottom: '0%', right: '-5%',
          animation: 'blob2 25s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
          top: '50%', left: '50%',
          animation: 'blob3 30s ease-in-out infinite',
        }}/>
      </div>

      {/* ── Hero ── */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '28px 24px 32px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 32,
          alignItems: 'center',
        }}
          className="lg-grid-2"
        >
          {/* Left: copy + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23,1,0.32,1] }}
          >
            {/* Logo mark + wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="4" width="10" height="2" rx="1" fill="white"/>
                  <rect x="3" y="8.5" width="7" height="2" rx="1" fill="white" opacity="0.7"/>
                  <rect x="3" y="13" width="12" height="2" rx="1" fill="white" opacity="0.85"/>
                  <circle cx="17" cy="5" r="2.5" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#f4f4f5' }}>ProtoForge</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.06em' }}>AI PROTOTYPE BUILDER</div>
              </div>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.06em',
              padding: '4px 12px',
              borderRadius: 99,
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: '#a5b4fc',
              marginBottom: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              FREE · NO SIGNUP · AI-NATIVE
            </div>

            <h1 style={{
              fontSize: 'clamp(1.7rem, 4vw, 2.8rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#f4f4f5',
              marginBottom: 10,
            }}>
              {overrides.headline ?? (
                <>Prototype + AI{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #818cf8, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  scaffolding,
                </span>
                {' '}instantly.</>
              )}
            </h1>

            <p style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: 16,
              maxWidth: 500,
            }}>
              {overrides.subheadline ?? <>Describe your idea. Get a 5-page prototype with real copy, colors, layout — plus <strong style={{ color: 'rgba(255,255,255,0.75)' }}>llms.txt and MCP tool stubs</strong> ready to hand to any AI builder. No login required.</>}
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {[
                { label: '⚡ Instant', color: '#a5b4fc' },
                { label: '🎨 Beautiful', color: '#f9a8d4' },
                { label: '📱 Mobile-first', color: '#6ee7b7' },
                { label: '🤖 AI-powered', color: '#fcd34d' },
                { label: '⚡ 85% fewer tokens', color: 'rgba(255,255,255,0.45)' },
              ].map(feat => (
                <span key={feat.label} style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 99,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: feat.color,
                }}>
                  {feat.label}
                </span>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} id="generate" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <textarea
                value={idea}
                onChange={e => setIdea(e.target.value)}
                placeholder='Describe your idea… e.g. "A marketplace for local fitness trainers"'
                rows={3}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f4f4f5',
                  fontSize: 14,
                  fontFamily: 'inherit',
                  opacity: loading ? 0.5 : 1,
                }}
              />
              {error && <p style={{ color: '#f87171', fontSize: 13 }}>{error}</p>}
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                  {GEN_STEPS.map((label, i) => {
                    const done = i < activeStep
                    const active = i === activeStep
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                        <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {done ? (
                            <svg style={{ width: 18, height: 18, color: '#34d399' }} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : active ? (
                            <svg style={{ animation: 'spin 1s linear infinite', width: 16, height: 16, color: '#818cf8' }} viewBox="0 0 24 24" fill="none">
                              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                          ) : (
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'block' }} />
                          )}
                        </span>
                        <span style={{ color: done ? '#34d399' : active ? '#f4f4f5' : 'rgba(255,255,255,0.3)' }}>
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
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
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
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.85)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
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

          {/* Right: animated demo panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.23,1,0.32,1] }}
            style={{ display: mounted ? 'block' : 'none' }}
          >
            <DemoPanel />
          </motion.div>
        </div>
      </main>

      {/* ── How it works ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '56px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            textAlign: 'center',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            How it works
          </p>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            color: '#f4f4f5',
            letterSpacing: '-0.02em',
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
                className="glass"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(99,102,241,0.18)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23,1,0.32,1] }}
                style={{ borderRadius: 16, padding: '20px 18px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span className="step-badge">{i + 1}</span>
                  <span style={{ fontSize: 18 }}>{step.icon}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4f4f5', marginBottom: 6 }}>{step.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI-native differentiators ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '56px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            textAlign: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            color: 'rgba(99,102,241,0.7)', textTransform: 'uppercase', marginBottom: 8,
          }}>
            Built for the AI age
          </p>
          <h2 style={{
            textAlign: 'center', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800,
            color: '#f4f4f5', letterSpacing: '-0.02em', marginBottom: 12,
          }}>
            What no other prototyper does
          </h2>
          <p style={{
            textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.4)',
            maxWidth: 560, margin: '0 auto 40px',
          }}>
            Claude Design makes pretty mockups. Google Stitch generates screens. ProtoForge makes prototypes that AI agents can actually use.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {AI_FEATURES.map((f, i) => (
              <motion.div
                key={f.label}
                className="glass"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, boxShadow: `0 8px 32px ${f.badgeColor}28` }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23,1,0.32,1] }}
                style={{ borderRadius: 16, padding: '20px 18px', borderColor: `${f.badgeColor}22` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 99,
                    background: `${f.badgeColor}18`, color: f.badgeColor, letterSpacing: '0.08em',
                  }}>{f.badge}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f4f4f5', marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 24px',
        textAlign: 'center',
        fontSize: 11,
        color: 'rgba(255,255,255,0.25)',
        position: 'relative', zIndex: 1,
      }}>
        ProtoForge · Prototype fast, build smarter · AI-native
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,50px) scale(1.07)} 66%{transform:translate(-40px,70px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,-50px) scale(1.05)} 66%{transform:translate(50px,-70px) scale(0.97)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,40px) scale(1.1)} }
        @media (prefers-reduced-motion: reduce) { [style*="blob"] { animation: none !important; } }
        @media (min-width: 1024px) {
          .lg-grid-2 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
