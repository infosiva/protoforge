import { NextRequest, NextResponse } from 'next/server'
import { geminiGenerateImage } from '@/lib/geminiImage'

const PROMPTS: Record<string, string> = {
  'photo-restore': 'photorealistic restored vintage family portrait photo, warm tones, 1960s style, high detail, cinematic',
  'interior': 'beautiful modern Scandinavian living room interior design, natural light, minimalist, cozy, professional photography',
  'travel': 'stunning aerial view of tropical island paradise, turquoise water, white sand beach, golden hour',
  'ai-art': 'abstract digital artwork with flowing neon light streams, deep space background, vibrant purple and cyan, ultra HD',
}

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') ?? 'photo-restore'
  const prompt = PROMPTS[category] ?? PROMPTS['photo-restore']

  const imageDataUrl = await geminiGenerateImage(prompt)

  if (!imageDataUrl) {
    return NextResponse.json({ error: 'Image generation failed — check GEMINI_API_KEY' }, { status: 503 })
  }

  return NextResponse.json({ imageDataUrl, prompt, category })
}
