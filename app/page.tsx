'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const EXAMPLES = [
  'A marketplace for freelance dog trainers',
  'SaaS tool for project managers to track burnout',
  'Online shop for handmade ceramics',
  'Fintech app to help Gen Z invest spare change',
  'Food delivery platform for home cooks',
  'Travel app that builds itineraries from mood boards',
]

export default function Home() {
  const router = useRouter()
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!idea.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      router.push(`/proto/${data.id}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
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
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 resize-none focus:outline-none focus:border-indigo-500 transition text-base"
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
                  Generating your prototype…
                </span>
              ) : (
                'Generate prototype →'
              )}
            </button>
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
