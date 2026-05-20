'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
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

export default function Home() {
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
          if (data.id) { router.push(`/proto/${data.id}`); return }
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
      setActiveStep(-1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Animated blob bg */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }} aria-hidden>
        <motion.div
          style={{ position: 'absolute', top: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(80px)' }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          style={{ position: 'absolute', bottom: '-10%', right: '-6%', width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', filter: 'blur(90px)' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
        />
      </div>
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="font-black text-lg tracking-tight">
          PROTO<span className="text-indigo-400">FORGE</span>
        </span>
        <span className="text-xs text-white/40 font-medium">Idea → 5-page prototype in seconds</span>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-indigo-400/40 text-indigo-400 mb-6">
            Free · No signup · Instant
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5 bg-gradient-to-br from-white via-indigo-200 to-violet-400 bg-clip-text text-transparent">
            Turn your idea into a prototype
          </h1>
          <p className="text-lg opacity-60 mb-10 max-w-lg mx-auto">
            Describe what you want to build. Get a branded 5-page prototype with real copy, colors,
            and layout — tailored to your product category.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="generate">
            <textarea
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder={'Describe your idea… e.g. "A marketplace for local fitness trainers"'}
              rows={3}
              disabled={loading}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 resize-none focus:outline-none focus:border-indigo-500 transition text-base disabled:opacity-50"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !idea.trim()}
              className="w-full py-4 rounded-2xl font-bold text-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Building…
                </span>
              ) : (
                'Generate prototype →'
              )}
            </button>
            {loading && (
              <div className="mt-2 flex flex-col gap-2">
                {STEPS.map((label, i) => {
                  const done = i < activeStep
                  const active = i === activeStep
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {done ? (
                          <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : active ? (
                          <svg className="animate-spin w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-white/20 mx-auto block" />
                        )}
                      </span>
                      <span className={done ? 'text-emerald-400' : active ? 'text-white' : 'text-white/30'}>
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </form>

          <div className="mt-8">
            <p className="text-xs opacity-40 mb-3 uppercase tracking-wider font-semibold">Try an example</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map(ex => (
                <button
                  key={ex}
                  onClick={() => setIdea(ex)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/60 hover:border-indigo-400/50 hover:text-white/90 transition"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* How it works */}
      <section className="border-t border-white/10 px-8 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '✍️',
              title: 'Describe your idea',
              body: 'One sentence is enough. We detect your category automatically.',
            },
            {
              icon: '🧠',
              title: 'AI builds the spec',
              body: 'Copy, colors, layout — picked from design references that match your product type.',
            },
            {
              icon: '🚀',
              title: 'Share the prototype',
              body: 'Get a shareable link instantly. Show investors, users, or your team.',
            },
          ].map(item => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{item.icon}</span>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm opacity-50">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-8 py-5 text-center text-xs opacity-30">
        ProtoForge · Prototype fast, build smarter
      </footer>
    </div>
  )
}
