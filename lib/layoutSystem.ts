// T1-T17 Layout Archetype System
// Merged from agents/design-system/MASTER.md + taskflow/app/admin/layouts/page.tsx
// Used by: ProtoForge layout suggestion, generate.ts archetype picking, /demos page

export interface LayoutArchetype {
  id: string          // 'T1' … 'T17'
  name: string
  category: string[]  // portfolio categories this matches
  bg: string          // hex
  accent: string      // hex
  accent2?: string
  heroPattern: 'split-left' | 'split-right' | 'centered' | 'fullbleed' | 'terminal' | 'magazine' | 'bento' | 'asymmetric' | 'wide-input'
  demoPanel: string   // what the animated right panel shows
  openDesignSkill: string   // primary OD skill to invoke
  extraSkills: string[]     // supporting skills
  projects: string[]        // real portfolio projects using this
  description: string
}

export const LAYOUT_ARCHETYPES: LayoutArchetype[] = [
  {
    id: 'T1',
    name: 'SaaS Split Hero',
    category: ['productivity', 'saas'],
    bg: '#ffffff',
    accent: '#2563eb',
    heroPattern: 'split-left',
    demoPanel: 'Kanban board with animated task cards cycling',
    openDesignSkill: '/frontend-design',
    extraSkills: ['/interface-design', '/shadcn-ui', '/animate'],
    projects: ['taskflow', 'zerostaff', 'outreach-crm'],
    description: 'White bg, blue accent, split lg:grid-cols-2, animated product UI right panel',
  },
  {
    id: 'T2',
    name: 'Dev Tools Dark Terminal',
    category: ['devtools', 'agents', 'ai-infra'],
    bg: '#0b1120',
    accent: '#6366f1',
    heroPattern: 'terminal',
    demoPanel: 'Code editor / terminal output typing animation',
    openDesignSkill: '/interface-design',
    extraSkills: ['/gsap-timeline', '/animate', '/transitions-dev'],
    projects: ['agenttrace', 'neuralos', 'rideflow'],
    description: 'Dark navy, indigo accent, typewriter terminal hero, mono font',
  },
  {
    id: 'T3',
    name: 'Education Split Light',
    category: ['education', 'quiz', 'learning'],
    bg: '#f0f9ff',
    accent: '#0284c7',
    heroPattern: 'split-left',
    demoPanel: 'Quiz card flipping + score counter animating',
    openDesignSkill: '/frontend-design',
    extraSkills: ['/shadcn-ui', '/animate', '/transitions-dev'],
    projects: ['tutiq', 'kwizzo', 'quizbites'],
    description: 'Sky-tint bg, sky-blue accent, quiz/flash-card demo panel',
  },
  {
    id: 'T4',
    name: 'Health Centered Calm',
    category: ['health', 'wellness', 'fitness'],
    bg: '#f0fdfa',
    accent: '#0d9488',
    heroPattern: 'centered',
    demoPanel: 'Vitals dashboard with pulse line animating',
    openDesignSkill: '/frontend-design',
    extraSkills: ['/animate', '/fixing-accessibility'],
    projects: ['myvitals', 'aicoachlab'],
    description: 'Teal-tint bg, teal accent, centered hero, calm motion',
  },
  {
    id: 'T5',
    name: 'Travel Green Split',
    category: ['travel', 'local', 'marketplace'],
    bg: '#f0fdf4',
    accent: '#059669',
    heroPattern: 'split-left',
    demoPanel: 'Itinerary builder with destinations animating in',
    openDesignSkill: '/frontend-design',
    extraSkills: ['/animate', '/transitions-dev'],
    projects: ['roamplan', 'bookingcall', 'anylocal'],
    description: 'Green-tint bg, emerald accent, map/itinerary demo panel',
  },
  {
    id: 'T6',
    name: 'Finance Dark Navy',
    category: ['finance', 'fintech', 'billing'],
    bg: '#0b1420',
    accent: '#10b981',
    accent2: '#f59e0b',
    heroPattern: 'split-right',
    demoPanel: 'Portfolio chart with animated line graph growing',
    openDesignSkill: '/interface-design',
    extraSkills: ['/d3-visualization', '/animate', '/transitions-dev'],
    projects: ['trackwealth', 'invoicemint', 'billslash'],
    description: 'Dark navy, emerald/gold accent, finance metrics demo panel',
  },
  {
    id: 'T7',
    name: 'Food Warm White',
    category: ['food', 'restaurant', 'cultural'],
    bg: '#fffbf5',
    accent: '#ea580c',
    heroPattern: 'fullbleed',
    demoPanel: 'Menu cards sliding in, cuisine category tabs switching',
    openDesignSkill: '/frontend-design',
    extraSkills: ['/animate', '/gsap-scrolltrigger'],
    projects: ['nammatamil', 'mandirates'],
    description: 'Warm white, orange accent, food photography hero',
  },
  {
    id: 'T8',
    name: 'Swiss Editorial Grid',
    category: ['news', 'trends', 'data', 'media'],
    bg: '#f9fafb',
    accent: '#dc2626',
    heroPattern: 'magazine',
    demoPanel: 'News grid with headlines cycling, trend chart updating',
    openDesignSkill: '/swiss-creative-mode-template',
    extraSkills: ['/d3-visualization', '/gsap-core', '/gsap-scrolltrigger'],
    projects: ['worldtrends', 'mandirates'],
    description: 'Editorial grid, red accent, data-dense, Space Grotesk typography',
  },
  {
    id: 'T9',
    name: 'Bento Grid SaaS',
    category: ['saas', 'productivity', 'content', 'social'],
    bg: '#ffffff',
    accent: '#0ea5e9',
    heroPattern: 'bento',
    demoPanel: 'Bento grid cells animating in with stagger delay',
    openDesignSkill: '/shadcn-ui',
    extraSkills: ['/animate', '/transitions-dev', '/ui-skills'],
    projects: ['meetscribe', 'weekendai', 'zerostaff'],
    description: 'CSS Grid bento layout, sky-blue accent, staggered cell reveals',
  },
  {
    id: 'T10',
    name: 'Cinematic Dark',
    category: ['media', 'video', 'creative', 'gaming'],
    bg: '#0a0a0f',
    accent: '#e879f9',
    heroPattern: 'fullbleed',
    demoPanel: 'Video reel preview with parallax scroll effect',
    openDesignSkill: '/after-hours-editorial-template',
    extraSkills: ['/gsap-scrolltrigger', '/fal-kling-o3', '/shader-dev'],
    projects: ['clipforge', 'nammatamil', 'pixelforge'],
    description: 'Near-black bg, fuchsia accent, parallax cinematic hero',
  },
  {
    id: 'T11',
    name: 'Typewriter Terminal',
    category: ['ai-infra', 'devtools', 'agents'],
    bg: '#060d1a',
    accent: '#22d3ee',
    heroPattern: 'terminal',
    demoPanel: 'AI agent output typing in terminal, log stream',
    openDesignSkill: '/interface-design',
    extraSkills: ['/gsap-timeline', '/animate', '/transitions-dev'],
    projects: ['neuralos', 'ninjapa', 'rideflow'],
    description: 'Very dark bg, cyan accent, monospace font, typewriter animation',
  },
  {
    id: 'T12',
    name: 'Magazine Editorial Warm',
    category: ['food', 'cultural', 'local', 'lifestyle'],
    bg: '#fffbf5',
    accent: '#f97316',
    heroPattern: 'magazine',
    demoPanel: 'Magazine-style article grid with hover state transitions',
    openDesignSkill: '/field-notes-editorial-template',
    extraSkills: ['/gsap-scrolltrigger', '/emil-design-eng', '/transitions-dev'],
    projects: ['nammatamil', 'bookingcall'],
    description: 'Warm editorial grid, orange accent, print-inspired typography',
  },
  {
    id: 'T13',
    name: 'Floating Cards Warm',
    category: ['coaching', 'career', 'social', 'lifestyle'],
    bg: '#fff7ed',
    accent: '#ea580c',
    heroPattern: 'centered',
    demoPanel: 'Cards floating in with spring physics, stagger cascade',
    openDesignSkill: '/algorithmic-art',
    extraSkills: ['/animate', '/emil-design-eng', '/transitions-dev'],
    projects: ['aicoachlab', 'weekendai', 'playsmart'],
    description: 'Warm orange-tint, cards with spring physics entry animations',
  },
  {
    id: 'T14',
    name: 'Generative Art Dark',
    category: ['creative', 'gaming', 'media', 'ai-infra'],
    bg: '#0e0e16',
    accent: '#a78bfa',
    heroPattern: 'fullbleed',
    demoPanel: 'WebGL shader / particle system animating in hero',
    openDesignSkill: '/shader-dev',
    extraSkills: ['/threejs', '/animate', '/algorithmic-art'],
    projects: ['pixelforge', 'playsmart', 'clipforge'],
    description: 'Deep dark bg, violet accent, WebGL generative visuals',
  },
  {
    id: 'T15',
    name: 'D3 Data Hero',
    category: ['finance', 'data', 'analytics', 'devtools'],
    bg: '#0b1420',
    accent: '#f59e0b',
    heroPattern: 'split-left',
    demoPanel: 'Live D3 chart animating — candlestick, line, or bubble',
    openDesignSkill: '/d3-visualization',
    extraSkills: ['/gsap-core', '/animate', '/interface-design'],
    projects: ['trackwealth', 'mandirates', 'agenttrace'],
    description: 'Dark navy, amber accent, D3 data visualization in hero',
  },
  {
    id: 'T16',
    name: 'Full-Width Input Hero',
    category: ['ai-tool', 'language', 'resume', 'generator'],
    bg: '#fdf4ff',
    accent: '#9333ea',
    heroPattern: 'wide-input',
    demoPanel: 'Giant input bar → AI output appearing below with typewriter',
    openDesignSkill: '/frontend-design',
    extraSkills: ['/shadcn-ui', '/transitions-dev', '/animate'],
    projects: ['speakiq', 'resumevault', 'pdfideas'],
    description: 'Light violet-tint, purple accent, centered full-width input CTA',
  },
  {
    id: 'T17',
    name: 'Asymmetric Split',
    category: ['productivity', 'calendar', 'quiz', 'education'],
    bg: '#f0f9ff',
    accent: '#7c3aed',
    heroPattern: 'asymmetric',
    demoPanel: 'Off-center layout, 60/40 grid, animated content panel right',
    openDesignSkill: '/ui-skills',
    extraSkills: ['/gsap-scrolltrigger', '/animate', '/transitions-dev'],
    projects: ['quizbytesdaily', 'replydesk', 'draftcal'],
    description: 'Sky-tint bg, violet accent, asymmetric 40/60 column hero',
  },
]

// Category → best layout(s) mapping
const CATEGORY_LAYOUT_MAP: Record<string, string[]> = {
  productivity: ['T1', 'T9', 'T17'],
  saas:         ['T1', 'T9'],
  devtools:     ['T2', 'T11', 'T15'],
  'ai-infra':   ['T2', 'T11', 'T14'],
  agents:       ['T2', 'T11'],
  education:    ['T3', 'T17'],
  quiz:         ['T3', 'T17'],
  learning:     ['T3', 'T4'],
  health:       ['T4'],
  wellness:     ['T4'],
  fitness:      ['T4'],
  travel:       ['T5'],
  local:        ['T5', 'T7', 'T12'],
  marketplace:  ['T5', 'T1'],
  finance:      ['T6', 'T15'],
  fintech:      ['T6', 'T15'],
  billing:      ['T6'],
  food:         ['T7', 'T12'],
  restaurant:   ['T7', 'T12'],
  cultural:     ['T7', 'T12'],
  news:         ['T8'],
  trends:       ['T8'],
  data:         ['T8', 'T15'],
  media:        ['T10', 'T14'],
  video:        ['T10'],
  gaming:       ['T10', 'T14'],
  creative:     ['T13', 'T14'],
  content:      ['T9', 'T12'],
  social:       ['T9', 'T13'],
  coaching:     ['T13'],
  career:       ['T13', 'T16'],
  'ai-tool':    ['T16', 'T11'],
  language:     ['T16'],
  resume:       ['T16'],
  generator:    ['T16'],
  calendar:     ['T17'],
  analytics:    ['T15', 'T8'],
}

export function detectLayoutCategory(input: string): string {
  const s = input.toLowerCase()
  if (/quiz|flash.?card|game|trivia/i.test(s)) return 'quiz'
  if (/learn|cours|tutor|school|educat/i.test(s)) return 'education'
  if (/health|fitness|workout|medic|wellnes|vital/i.test(s)) return 'health'
  if (/travel|trip|hotel|flight|holiday|itinerar/i.test(s)) return 'travel'
  if (/food|recipe|meal|restaurant|deliver|cook|cuisine/i.test(s)) return 'food'
  if (/news|trend|world|global|headline/i.test(s)) return 'trends'
  if (/finance|invest|money|bank|pay|crypto|stock|wealth|portfoli/i.test(s)) return 'finance'
  if (/invoice|bill|billing|payment/i.test(s)) return 'billing'
  if (/agent|ai infra|llm|model|mcp|trace|log/i.test(s)) return 'ai-infra'
  if (/dev.*tool|code|terminal|cli|engineer|debug/i.test(s)) return 'devtools'
  if (/resume|cv|job|career|hire|recruit/i.test(s)) return 'career'
  if (/language|speak|voice|transcri|speech/i.test(s)) return 'language'
  if (/video|clip|film|cinema|media/i.test(s)) return 'video'
  if (/gaming|game|arcade|pixel|creative/i.test(s)) return 'gaming'
  if (/pdf|document|generat|convert|tool/i.test(s)) return 'ai-tool'
  if (/calendar|draft|schedul|content|post/i.test(s)) return 'calendar'
  if (/marketplace|connect|hire|book|find.*provider/i.test(s)) return 'marketplace'
  if (/social|community|network|chat|forum/i.test(s)) return 'social'
  if (/task|project|note|organiz|productiv/i.test(s)) return 'productivity'
  if (/coach|mentor|advisor/i.test(s)) return 'coaching'
  if (/data|analytic|chart|dashboard/i.test(s)) return 'analytics'
  return 'saas'
}

export interface LayoutSuggestion {
  primary: LayoutArchetype
  alternatives: LayoutArchetype[]
  category: string
  reasoning: string
  openDesignPrompt: string
}

export function suggestLayout(input: string): LayoutSuggestion {
  const category = detectLayoutCategory(input)
  const ids = CATEGORY_LAYOUT_MAP[category] ?? ['T1']
  const primary = LAYOUT_ARCHETYPES.find(l => l.id === ids[0]) ?? LAYOUT_ARCHETYPES[0]
  const alternatives = ids.slice(1)
    .map(id => LAYOUT_ARCHETYPES.find(l => l.id === id))
    .filter(Boolean) as LayoutArchetype[]

  const reasoning = `Detected category: ${category}. ${primary.name} (${primary.id}) matches because: ${primary.description}.`

  const openDesignPrompt = `Invoke ${primary.openDesignSkill} with these parameters:
- Product: "${input}"
- Category: ${category}
- Background: ${primary.bg}
- Accent: ${primary.accent}
- Hero pattern: ${primary.heroPattern}
- Demo panel: ${primary.demoPanel}
${primary.extraSkills.length ? `- Then apply: ${primary.extraSkills.join(', ')}` : ''}
After generation, run /emil-design-eng for polish pass, then /animate for motion.`

  return { primary, alternatives, category, reasoning, openDesignPrompt }
}

export function getLayoutById(id: string): LayoutArchetype | undefined {
  return LAYOUT_ARCHETYPES.find(l => l.id === id)
}

export function getAllLayouts(): LayoutArchetype[] {
  return LAYOUT_ARCHETYPES
}
