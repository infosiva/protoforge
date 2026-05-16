import { NextRequest, NextResponse } from 'next/server'
import { generateProto } from '@/lib/generate'
import { saveProto } from '@/lib/store'

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json()
    if (!idea || typeof idea !== 'string' || idea.trim().length < 5) {
      return NextResponse.json({ error: 'Idea too short' }, { status: 400 })
    }
    const spec = await generateProto(idea.trim())
    saveProto(spec)
    return NextResponse.json({ id: spec.id })
  } catch (e) {
    console.error('generate error', e)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
