'use client'
import { useState } from 'react'
import GammaPromptCard from './GammaPromptCard'

const SUGGESTIONS = [
  'MVP for a B2B SaaS invoicing tool, React + Supabase, solo founder',
  'Mobile app for tracking daily habits, freemium, React Native',
  'AI-powered resume builder — features, tech stack, monetisation',
  'Marketplace for freelancers, two-sided, MVP in 4 weeks',
  'Browser extension that summarises any webpage with AI',
]

export default function GammaHero() {
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  async function handlePrompt(prompt: string) {
    setError(''); setOutput('')
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        system: `You are ProtoForge AI — rapid prototyping expert. Given a product idea, output a structured prototype plan:

## Product Overview
[1 sentence]

## Core MVP Features (top 5, prioritised)
1. ...

## Recommended Stack
- Frontend: ...
- Backend: ...
- Database: ...
- AI/APIs: ...

## User Flow (3 steps)
1. User does X → sees Y
2. ...

## Build Timeline
- Week 1: ...
- Week 2: ...

## Monetisation
- Free tier: ...
- Paid: ...

Be specific, practical, opinionated. No fluff.`,
      }),
    })

    if (!res.ok) { setError('Generation failed — try again'); return }
    const data = await res.json()
    if (data.text) setOutput(data.text)
    else setError('No output — try again')
  }

  return (
    <GammaPromptCard
      label="ProtoForge"
      labelBadge="AI"
      placeholder="MVP for a B2B SaaS invoicing tool — React, Supabase, solo founder, 4-week build..."
      onSubmit={handlePrompt}
      bgGradient="linear-gradient(135deg, #0b1120 0%, #0f1a35 50%, #080d1a 100%)"
      accentColor="#6366f1"
      suggestions={SUGGESTIONS}
      outputSlot={
        error ? (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">{error}</div>
        ) : output ? (
          <ProtoPlan markdown={output} />
        ) : null
      }
    />
  )
}

function ProtoPlan({ markdown }: { markdown: string }) {
  // Simple markdown → HTML render (headings, lists, bold)
  const html = markdown
    .replace(/^## (.+)$/gm, '<h3 class="text-sm font-bold text-gray-800 mt-4 mb-1 uppercase tracking-wide">$1</h3>')
    .replace(/^### (.+)$/gm, '<h4 class="text-sm font-semibold text-indigo-700 mt-3 mb-1">$1</h4>')
    .replace(/^\d+\. (.+)$/gm, '<li class="text-sm text-gray-700 ml-4 list-decimal">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="text-sm text-gray-700 ml-4 list-disc">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '')

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'rgba(255,255,255,0.96)' }}>
      <div className="p-5 border-b border-gray-100 flex items-center gap-2">
        <span className="text-lg">⚡</span>
        <h2 className="text-base font-bold text-gray-900">Your prototype plan</h2>
      </div>
      <div
        className="p-5 max-h-[60vh] overflow-y-auto text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="p-4 border-t border-gray-100 flex gap-3">
        <a href="/prototype" className="text-sm text-indigo-600 underline">Open in builder →</a>
      </div>
    </div>
  )
}
