import { NextRequest } from 'next/server'
import { generateProto } from '@/lib/generate'
import { saveProto } from '@/lib/store'

export async function POST(req: NextRequest) {
  const { idea } = await req.json()
  if (!idea || typeof idea !== 'string' || idea.trim().length < 5) {
    return new Response(JSON.stringify({ error: 'Idea too short' }), { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  function send(data: object) {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
  }

  ;(async () => {
    try {
      send({ step: 0, label: 'Analysing your idea…' })
      await new Promise(r => setTimeout(r, 300))

      send({ step: 1, label: 'Picking design archetype…' })
      await new Promise(r => setTimeout(r, 400))

      send({ step: 2, label: 'Generating copy and layout…' })
      const spec = await generateProto(idea.trim())

      send({ step: 3, label: 'Saving prototype…' })
      saveProto(spec)

      send({ step: 4, label: 'Done!', id: spec.id, name: spec.name, category: spec.category })
    } catch (e) {
      console.error('[protoforge][generate]', e)
      send({ error: e instanceof Error ? e.message : 'Generation failed' })
    } finally {
      writer.close()
    }
  })()

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
