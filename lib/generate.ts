import Groq from 'groq-sdk'
import { ProtoSpec } from './types'
import { randomUUID } from 'crypto'
import { suggestLayout } from './layoutSystem'

let _groq: Groq | null = null
function getGroq(): Groq {
  if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })
  return _groq
}

async function compressIdeaToDNA(idea: string, category: string, referenceStyle: string): Promise<{ dna: string; compressionTokens: number }> {
  const res = await getGroq().chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{
      role: 'user',
      content: `Compress into 40-token product DNA. Output ONLY the string, no explanation.\nFormat: "[Type]|[User]|[Problem]|[Differentiator]|[Tone]"\nIdea: "${idea}" | Category: ${category} | Style: ${referenceStyle}`,
    }],
    max_tokens: 80,
    temperature: 0.2,
  })
  return {
    dna: res.choices[0]?.message?.content?.trim() ?? idea,
    compressionTokens: (res.usage?.prompt_tokens ?? 0) + (res.usage?.completion_tokens ?? 0),
  }
}

// Simple in-memory cache keyed by normalised idea string (TTL: 1 hour)
const _cache = new Map<string, { spec: ProtoSpec; expires: number }>()
function cacheKey(idea: string) { return idea.toLowerCase().trim().replace(/\s+/g, ' ') }
function fromCache(idea: string): ProtoSpec | null {
  const entry = _cache.get(cacheKey(idea))
  if (!entry || Date.now() > entry.expires) return null
  return entry.spec
}
function toCache(idea: string, spec: ProtoSpec) {
  _cache.set(cacheKey(idea), { spec, expires: Date.now() + 3600_000 })
}

// ─── Design archetypes — picked per category so each proto looks distinct ────
const DESIGN_ARCHETYPES: Record<string, {
  heroStyle: 'centered' | 'split-left' | 'split-right' | 'fullbleed' | 'magazine'
  colorPersonality: string
  navStyle: 'minimal' | 'full' | 'sidebar'
  cardStyle: 'grid' | 'masonry' | 'list' | 'carousel'
  spacing: 'tight' | 'comfortable' | 'generous'
  referenceStyle: string
}> = {
  marketplace:  { heroStyle: 'split-left',   colorPersonality: 'warm amber',    navStyle: 'full',    cardStyle: 'masonry',  spacing: 'comfortable', referenceStyle: 'Airbnb' },
  saas:         { heroStyle: 'centered',      colorPersonality: 'deep indigo',   navStyle: 'minimal', cardStyle: 'grid',     spacing: 'generous',    referenceStyle: 'Linear' },
  ecommerce:    { heroStyle: 'fullbleed',     colorPersonality: 'bold red',      navStyle: 'full',    cardStyle: 'grid',     spacing: 'tight',       referenceStyle: 'Shopify' },
  fintech:      { heroStyle: 'split-right',   colorPersonality: 'dark emerald',  navStyle: 'minimal', cardStyle: 'list',     spacing: 'comfortable', referenceStyle: 'Stripe' },
  health:       { heroStyle: 'centered',      colorPersonality: 'soft teal',     navStyle: 'minimal', cardStyle: 'grid',     spacing: 'generous',    referenceStyle: 'Calm' },
  education:    { heroStyle: 'magazine',      colorPersonality: 'vibrant violet', navStyle: 'full',   cardStyle: 'grid',     spacing: 'comfortable', referenceStyle: 'Duolingo' },
  food:         { heroStyle: 'fullbleed',     colorPersonality: 'warm orange',   navStyle: 'minimal', cardStyle: 'masonry',  spacing: 'comfortable', referenceStyle: 'Deliveroo' },
  travel:       { heroStyle: 'fullbleed',     colorPersonality: 'sky blue gold', navStyle: 'minimal', cardStyle: 'masonry',  spacing: 'generous',    referenceStyle: 'Airbnb' },
  productivity: { heroStyle: 'split-left',    colorPersonality: 'slate purple',  navStyle: 'minimal', cardStyle: 'list',     spacing: 'tight',       referenceStyle: 'Notion' },
  social:       { heroStyle: 'centered',      colorPersonality: 'bright pink',   navStyle: 'full',    cardStyle: 'masonry',  spacing: 'comfortable', referenceStyle: 'Pinterest' },
}

function detectCategory(idea: string): string {
  const i = idea.toLowerCase()
  if (/marketplace|connect|hire|book|find.*provider/i.test(i)) return 'marketplace'
  if (/saas|software|platform|tool|dashboard/i.test(i)) return 'saas'
  if (/shop|sell|store|buy|ecomm/i.test(i)) return 'ecommerce'
  if (/finance|invest|money|bank|pay|crypto/i.test(i)) return 'fintech'
  if (/health|fitness|workout|medic|wellness/i.test(i)) return 'health'
  if (/learn|course|tutor|school|educat/i.test(i)) return 'education'
  if (/food|recipe|meal|restaurant|delivery|cook/i.test(i)) return 'food'
  if (/travel|trip|hotel|flight|holiday/i.test(i)) return 'travel'
  if (/productivity|task|project|note|organiz/i.test(i)) return 'productivity'
  if (/social|community|network|chat|forum/i.test(i)) return 'social'
  return 'saas'
}

export async function generateProto(idea: string): Promise<ProtoSpec> {
  const cached = fromCache(idea)
  if (cached) return { ...cached, id: randomUUID().split('-')[0], createdAt: new Date().toISOString() }

  const category = detectCategory(idea)
  const archetype = DESIGN_ARCHETYPES[category]

  // Pick T1-T17 layout archetype from design system
  const layoutSuggestion = suggestLayout(idea)
  const layoutArchetype = layoutSuggestion.primary

  // Step 1: compress idea to ~40-token DNA (saves ~85% tokens in main call)
  const naiveTokenEstimate = Math.ceil(idea.split(' ').length * 1.3)
  const { dna, compressionTokens } = await compressIdeaToDNA(idea, category, archetype.referenceStyle)

  const prompt = `You are a product designer and copywriter creating a prototype specification.

Product DNA: "${dna}"
Category: ${category} | Style: ${archetype.referenceStyle} | Hero: ${archetype.heroStyle} | Colors: ${archetype.colorPersonality} | Cards: ${archetype.cardStyle}
Layout Archetype: ${layoutArchetype.id} — ${layoutArchetype.name} | BG: ${layoutArchetype.bg} | Accent: ${layoutArchetype.accent} | Pattern: ${layoutArchetype.heroPattern}

Generate a complete 5-page website prototype spec. Return ONLY valid JSON, no markdown:

{
  "name": "Product name (catchy, 1-2 words)",
  "tagline": "One powerful line, max 10 words",
  "primaryColor": "#hexcode matching the ${archetype.colorPersonality} personality",
  "accentColor": "#hexcode complementary accent",
  "audience": "Who this is for (one sentence)",
  "pages": [
    {
      "slug": "home",
      "title": "Home",
      "headline": "Bold hero headline, max 8 words",
      "subheadline": "Supporting sentence, max 20 words",
      "ctaText": "CTA button text",
      "ctaHref": "/signup",
      "sections": [
        {
          "type": "hero",
          "headline": "same as page headline",
          "body": "same as subheadline",
          "items": []
        },
        {
          "type": "features",
          "headline": "Why [ProductName]?",
          "body": "Short intro sentence",
          "items": [
            {"icon": "🎯", "title": "Feature 1", "body": "Description"},
            {"icon": "⚡", "title": "Feature 2", "body": "Description"},
            {"icon": "🔒", "title": "Feature 3", "body": "Description"}
          ]
        },
        {
          "type": "stats",
          "headline": "Trusted by thousands",
          "body": "",
          "items": [
            {"icon": "📊", "title": "10,000+", "body": "Happy users"},
            {"icon": "⭐", "title": "4.9/5", "body": "Average rating"},
            {"icon": "🚀", "title": "60s", "body": "Time to get started"}
          ]
        },
        {
          "type": "cta-band",
          "headline": "Ready to get started?",
          "body": "Join thousands already using [ProductName].",
          "items": []
        }
      ]
    },
    {
      "slug": "how-it-works",
      "title": "How It Works",
      "headline": "Up and running in 3 steps",
      "subheadline": "No technical knowledge needed.",
      "ctaText": "Get started free",
      "ctaHref": "/signup",
      "sections": [
        {
          "type": "how-it-works",
          "headline": "Simple. Fast. Effective.",
          "body": "Three steps to [outcome]",
          "items": [
            {"icon": "1️⃣", "title": "Step 1 title", "body": "What happens"},
            {"icon": "2️⃣", "title": "Step 2 title", "body": "What happens"},
            {"icon": "3️⃣", "title": "Step 3 title", "body": "What happens"}
          ]
        },
        {
          "type": "faq",
          "headline": "Frequently asked questions",
          "body": "",
          "items": [
            {"icon": "❓", "title": "Question 1?", "body": "Answer 1"},
            {"icon": "❓", "title": "Question 2?", "body": "Answer 2"},
            {"icon": "❓", "title": "Question 3?", "body": "Answer 3"}
          ]
        }
      ]
    },
    {
      "slug": "pricing",
      "title": "Pricing",
      "headline": "Simple, transparent pricing",
      "subheadline": "Start free. Upgrade when ready.",
      "ctaText": "Start for free",
      "ctaHref": "/signup",
      "sections": [
        {
          "type": "pricing",
          "headline": "Choose your plan",
          "body": "All plans include a 14-day free trial",
          "items": [
            {"icon": "🌱", "title": "Free", "price": "$0/mo", "body": "Feature 1, Feature 2, Feature 3"},
            {"icon": "🚀", "title": "Pro", "price": "$19/mo", "body": "Everything in Free, plus Feature 4, Feature 5"},
            {"icon": "🏢", "title": "Business", "price": "$49/mo", "body": "Everything in Pro, plus Feature 6, Priority support"}
          ]
        }
      ]
    },
    {
      "slug": "about",
      "title": "About",
      "headline": "Built by people who understand the problem",
      "subheadline": "Our story and mission.",
      "ctaText": "Join us",
      "ctaHref": "/signup",
      "sections": [
        {
          "type": "features",
          "headline": "Our mission",
          "body": "What drives the team to build this product. Why it matters.",
          "items": [
            {"icon": "💡", "title": "Our vision", "body": "What we're working towards"},
            {"icon": "🤝", "title": "Our values", "body": "How we operate"},
            {"icon": "🌍", "title": "Our impact", "body": "What change we want to make"}
          ]
        },
        {
          "type": "testimonials",
          "headline": "What our users say",
          "body": "",
          "items": [
            {"icon": "⭐", "title": "User Name, Role", "body": "Testimonial quote about the product"},
            {"icon": "⭐", "title": "User Name, Role", "body": "Testimonial quote about the product"},
            {"icon": "⭐", "title": "User Name, Role", "body": "Testimonial quote about the product"}
          ]
        }
      ]
    },
    {
      "slug": "contact",
      "title": "Contact",
      "headline": "Let's talk",
      "subheadline": "We respond within 24 hours.",
      "ctaText": "Send message",
      "ctaHref": "#contact-form",
      "sections": [
        {
          "type": "features",
          "headline": "Get in touch",
          "body": "Multiple ways to reach us",
          "items": [
            {"icon": "📧", "title": "Email", "body": "hello@product.com"},
            {"icon": "💬", "title": "Live chat", "body": "Available Mon-Fri 9am-6pm"},
            {"icon": "📞", "title": "Phone", "body": "+1 (555) 000-0000"}
          ]
        }
      ]
    }
  ]
}

Make all copy specific to the DNA above. Every item must be relevant to this specific product. Do NOT use placeholder text.`

  const response = await getGroq().chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 3000,
    temperature: 0.7,
  })

  const mainTokens = (response.usage?.prompt_tokens ?? 0) + (response.usage?.completion_tokens ?? 0)
  // naive estimate: full idea repeated in 3000-token prompt
  const naiveTokens = naiveTokenEstimate + 3000
  const savedTokens = Math.max(0, naiveTokens - (compressionTokens + mainTokens))
  const savingsPct = Math.round((savedTokens / naiveTokens) * 100)

  const content = response.choices[0]?.message?.content ?? '{}'
  const clean = content.replace(/```json\n?|\n?```/g, '').trim()
  const parsed = JSON.parse(clean)

  const spec: ProtoSpec = {
    id: randomUUID().split('-')[0],
    idea,
    productDNA: dna,
    tokenStats: { compressionTokens, mainTokens, savedTokens, savingsPct },
    name: parsed.name,
    tagline: parsed.tagline,
    primaryColor: layoutArchetype.bg,   // use T1-T17 theme, not hallucinated color
    accentColor: layoutArchetype.accent,
    category,
    layoutId: layoutArchetype.id,
    layoutName: layoutArchetype.name,
    openDesignSkill: layoutArchetype.openDesignSkill,
    audience: parsed.audience,
    pages: parsed.pages,
    createdAt: new Date().toISOString(),
  }
  toCache(idea, spec)
  return spec
}
