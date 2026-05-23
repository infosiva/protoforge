import { NextRequest, NextResponse } from 'next/server'
import { getProto } from '@/lib/store'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const spec = getProto(id)
  if (!spec) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const mcpServer = {
    name: `${spec.name.toLowerCase().replace(/\s+/g, '-')}-mcp`,
    version: '0.1.0',
    description: `MCP server stub for ${spec.name} — ${spec.tagline}`,
    metadata: {
      product: spec.name,
      tagline: spec.tagline,
      category: spec.category,
      audience: spec.audience,
      generatedBy: 'ProtoForge',
      protoId: spec.id,
    },
    tools: spec.pages.map(page => ({
      name: `get_${page.slug.replace(/-/g, '_')}_content`,
      description: `Get ${page.title} page content for ${spec.name}`,
      inputSchema: {
        type: 'object',
        properties: {
          format: {
            type: 'string',
            enum: ['full', 'headline', 'cta'],
            description: 'Level of detail to return',
            default: 'full',
          },
        },
        required: [],
      },
      returns: {
        headline: page.headline,
        subheadline: page.subheadline,
        ctaText: page.ctaText,
        ctaHref: page.ctaHref,
        sections: page.sections.map(s => ({ type: s.type, headline: s.headline })),
      },
    })),
    resources: [
      {
        uri: `proto://${spec.id}/spec`,
        name: 'Full prototype spec',
        description: 'Complete JSON spec for this prototype',
        mimeType: 'application/json',
      },
      {
        uri: `proto://${spec.id}/llms.txt`,
        name: 'AI context document',
        description: 'llms.txt — structured context for AI agents',
        mimeType: 'text/plain',
      },
    ],
    prompts: [
      {
        name: 'describe_product',
        description: `Describe ${spec.name} to a potential customer`,
        template: `You are a product expert for ${spec.name}. ${spec.tagline}. Target audience: ${spec.audience}. Answer questions about this product helpfully and concisely.`,
      },
      {
        name: 'generate_marketing_copy',
        description: 'Generate marketing copy for this product',
        arguments: [
          { name: 'format', description: 'tweet | email | ad | landing', required: true },
          { name: 'tone', description: 'professional | casual | urgent', required: false },
        ],
      },
    ],
  }

  return NextResponse.json(mcpServer, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  })
}
