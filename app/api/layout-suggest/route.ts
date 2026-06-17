import { NextRequest, NextResponse } from 'next/server'
import { suggestLayout, getAllLayouts } from '@/lib/layoutSystem'

export async function POST(req: NextRequest) {
  try {
    const { input, category } = await req.json()
    const query = input ?? category ?? ''
    if (!query) return NextResponse.json({ error: 'input or category required' }, { status: 400 })

    const suggestion = suggestLayout(query)
    return NextResponse.json(suggestion)
  } catch {
    return NextResponse.json({ error: 'Failed to suggest layout' }, { status: 500 })
  }
}

// GET /api/layout-suggest — returns all 17 archetypes
export async function GET() {
  return NextResponse.json({ archetypes: getAllLayouts() })
}
