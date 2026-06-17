export interface ProtoRequest {
  idea: string        // "I want to build a dog walking marketplace"
  email?: string      // for delivery / unlock later
}

export interface PageSpec {
  slug: string        // 'home' | 'about' | 'how-it-works' | 'pricing' | 'contact'
  title: string
  headline: string
  subheadline: string
  sections: SectionSpec[]
  ctaText: string
  ctaHref: string
}

export interface SectionSpec {
  type: 'hero' | 'features' | 'how-it-works' | 'testimonials' | 'pricing' | 'faq' | 'cta-band' | 'stats'
  headline: string
  body: string
  items?: ItemSpec[]
}

export interface ItemSpec {
  icon: string        // emoji
  title: string
  body: string
  price?: string
}

export interface TokenStats {
  compressionTokens: number
  mainTokens: number
  savedTokens: number
  savingsPct: number
}

export interface ProtoSpec {
  id: string
  idea: string
  productDNA?: string
  tokenStats?: TokenStats
  name: string          // product name
  tagline: string
  primaryColor: string  // hex (bg color from T1-T17)
  accentColor: string   // hex (accent from T1-T17)
  category: string
  layoutId?: string     // 'T1' … 'T17'
  layoutName?: string
  openDesignSkill?: string
  pipelineSkills?: string[]   // §Z6 mandatory — ui-ux-pro-max, 21st-registry, emil-design-eng + archetype extras, always present, never skipped
  audience: string
  pages: PageSpec[]
  createdAt: string
}
