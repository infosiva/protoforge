import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

let _groq: Groq | null = null
function groq() { if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! }); return _groq }

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json()
    const sysPrompt = system ?? 'You are ProtoForge AI — a rapid prototyping and product design expert. Help users go from idea to prototype: wireframes, user flows, MVP features, tech stack choices. Be concise and practical.'
    const res = await groq().chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: sysPrompt }, ...messages],
      max_tokens: 500,
    })
    return NextResponse.json({ text: res.choices[0]?.message?.content ?? 'Tell me about your product idea!' })
  } catch (e) {
    console.error('[protoforge][chat]', e)
    return NextResponse.json({ text: 'Start prototyping your idea above!' }, { status: 200 })
  }
}
