'use client'
import Link from 'next/link'

const LAYOUTS = [
  {
    id: 'T1', name: 'Split Hero (SaaS)', bg: '#ffffff', accent: '#2563eb', dark: false,
    projects: ['taskflow', 'zerostaff', 'replydesk', 'draftcal'],
    skills: ['/frontend-design', '/interface-design', '/shadcn-ui', '/animate'],
    desc: 'lg:grid-cols-2 split. Left=hero+CTA, right=animated product demo. Standard SaaS above-fold.',
    demo: (
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, minHeight: 80 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>Ship faster with AI.</div>
            <div style={{ fontSize: 8, color: '#64748b', marginBottom: 8 }}>Zero setup. Real output.</div>
            <div style={{ width: 60, height: 20, background: '#2563eb', borderRadius: 5 }} />
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Task A', 'Task B', 'Task C'].map(t => (
                <div key={t} style={{ background: '#fff', border: '1px solid #dbeafe', borderRadius: 4, padding: '3px 6px', fontSize: 8, color: '#1e40af' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T2', name: 'Dark Terminal (Dev Tools)', bg: '#0b1120', accent: '#6366f1', dark: true,
    projects: ['agenttrace', 'neuralos', 'protoforge'],
    skills: ['/interface-design', '/gsap-timeline', '/animate', '/shader-dev'],
    desc: 'Flat dark navy. Terminal/log stream right panel. JetBrains Mono. No blobs.',
    demo: (
      <div style={{ background: '#0b1120', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, minHeight: 80 }}>
          <div>
            <div style={{ fontSize: 8, color: '#6366f1', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>Dev Tools</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>Trace every agent.</div>
            <div style={{ width: 60, height: 20, background: '#6366f1', borderRadius: 5 }} />
          </div>
          <div style={{ background: '#030712', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 6, padding: 8, fontFamily: 'monospace' }}>
            {['→ agent:start', '✓ task:run', '▸ log:stream', '█'].map((l, i) => (
              <div key={i} style={{ fontSize: 8, color: i === 3 ? '#6366f1' : '#4ade80', marginBottom: 2 }}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T3', name: 'Light Centered (Quiz/Education)', bg: '#f0f9ff', accent: '#0284c7', dark: false,
    projects: ['kwizzo', 'tutiq', 'quizbites', 'quizbytesdaily'],
    skills: ['/frontend-design', '/21st-registry', '/animate', '/emil-design-eng'],
    desc: 'Sky-tint bg. Wide centered card. Interactive demo above fold. Playful.',
    demo: (
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: 12 }}>
        <div style={{ textAlign: 'center', minHeight: 80 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#0c4a6e', marginBottom: 4 }}>Daily quiz. 60 seconds.</div>
          <div style={{ background: '#fff', border: '2px solid #0284c7', borderRadius: 8, padding: 8, margin: '0 auto', maxWidth: 160 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#0c4a6e', marginBottom: 4 }}>Who invented the web?</div>
            {['Tim Berners-Lee', 'Bill Gates'].map((o, i) => (
              <div key={o} style={{ background: i === 0 ? '#e0f2fe' : '#f8fafc', border: `1px solid ${i === 0 ? '#0284c7' : '#e2e8f0'}`, borderRadius: 4, padding: '3px 6px', fontSize: 8, color: i === 0 ? '#0284c7' : '#64748b', marginBottom: 2, fontWeight: i === 0 ? 600 : 400 }}>{o}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T4', name: 'Warm Centered (Health/Wellness)', bg: '#f8fafc', accent: '#0d9488', dark: false,
    projects: ['myvitals', 'aicoachlab', 'speakiq'],
    skills: ['/frontend-design', '/theme-factory', '/animate', '/fixing-accessibility'],
    desc: 'White/near-white. Calm teal. Form-first hero. Trust signals inline.',
    demo: (
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12, minHeight: 90 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#0f172a' }}>Track your vitals daily.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, width: '100%' }}>
            {[['💓', '72 bpm'], ['🩸', '120/80'], ['😴', '7.2h']].map(([e, v]) => (
              <div key={v} style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: 6, padding: '4px 6px', textAlign: 'center' }}>
                <div style={{ fontSize: 10 }}>{e}</div>
                <div style={{ fontSize: 8, color: '#0d9488', fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T5', name: 'Travel Green-Tint', bg: '#f0fdf4', accent: '#059669', dark: false,
    projects: ['roamplan', 'bookingcall', 'anylocal'],
    skills: ['/frontend-design', '/d3-visualization', '/animate', '/emil-design-eng'],
    desc: 'Green-tint bg. Map/itinerary panel right. Steps row visible above fold.',
    demo: (
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, minHeight: 80 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#064e3b', marginBottom: 4 }}>Plan any trip, free.</div>
            <div style={{ fontSize: 8, color: '#6b7280', marginBottom: 8 }}>AI builds full itinerary</div>
            <div style={{ width: 60, height: 20, background: '#059669', borderRadius: 5 }} />
          </div>
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 8, padding: 8 }}>
            {['Day 1 — Arrive', 'Day 2 — Explore', 'Day 3 — Depart'].map(d => (
              <div key={d} style={{ fontSize: 8, color: '#166534', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 4, height: 4, background: '#059669', borderRadius: '50%' }} />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T6', name: 'Finance Dark Navy', bg: '#0b1420', accent: '#f59e0b', dark: true,
    projects: ['trackwealth', 'invoicemint', 'billslash'],
    skills: ['/d3-visualization', '/gsap-core', '/animate', '/interface-design'],
    desc: 'Dark navy. Gold accent. D3 chart right panel. Metric row. Tabular nums.',
    demo: (
      <div style={{ background: '#0b1420', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, minHeight: 80 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>Track every penny.</div>
            <div style={{ fontSize: 8, color: '#94a3b8', marginBottom: 8 }}>Real-time portfolio</div>
            <div style={{ width: 60, height: 20, background: '#f59e0b', borderRadius: 5 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2 }}>
            {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
              <div key={i} style={{ width: `${h}%`, height: 7, background: i === 6 ? '#f59e0b' : 'rgba(245,158,11,0.25)', borderRadius: 2 }} />
            ))}
            <div style={{ fontSize: 8, color: '#f59e0b', fontFamily: 'monospace' }}>+18.4%</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T7', name: 'Warm Food/Cultural', bg: '#fffbf5', accent: '#ea580c', dark: false,
    projects: ['nammatamil', 'mandirates', 'worldtrends'],
    skills: ['/frontend-design', '/gsap-scrolltrigger', '/animate', '/emil-design-eng'],
    desc: 'Warm white. Orange accent. Editorial/bento above fold. Serif optional.',
    demo: (
      <div style={{ background: '#fffbf5', border: '1px solid #fed7aa', borderRadius: 10, padding: 12, minHeight: 80 }}>
        <div style={{ borderBottom: '2px solid #ea580c', paddingBottom: 4, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 8, color: '#ea580c', fontWeight: 700, textTransform: 'uppercase' }}>Culture</span>
          <span style={{ fontSize: 8, color: '#9a7b5a' }}>June 2026</span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#1c0a00', fontStyle: 'italic' }}>Stories that connect us.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, marginTop: 6 }}>
          {['Cinema', 'Music', 'Food'].map(t => (
            <div key={t} style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: 5, padding: '4px 6px', fontSize: 8, fontWeight: 600, color: '#431407' }}>{t}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'T8', name: 'Swiss Editorial Grid', bg: '#f9fafb', accent: '#dc2626', dark: false,
    projects: ['worldtrends', 'mandirates'],
    skills: ['/swiss-creative-mode-template', '/digits-fintech-swiss-template', '/d3-visualization', '/gsap-core'],
    desc: '12-col strict grid. Full-width. Large type. Metric cards. Data IS the hero.',
    demo: (
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', marginBottom: 3 }}>Market prices. Real time.</div>
        <div style={{ width: '50%', height: 1, background: '#dc2626', marginBottom: 8 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
          {[['₹2,840', 'Wheat/q'], ['₹4,120', 'Rice/q'], ['↑ 3.2%', 'Avg']].map(([v, l]) => (
            <div key={l} style={{ border: '1px solid #e5e7eb', borderRadius: 5, padding: '5px 7px' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0a0a0a', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ fontSize: 8, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'T9', name: 'Bento Grid Dashboard', bg: '#ffffff', accent: '#0ea5e9', dark: false,
    projects: ['meetscribe', 'weekendai', 'zerostaff'],
    skills: ['/shadcn-ui', '/ui-skills', '/animate', '/transitions-dev'],
    desc: 'Mosaic of unequal cards above fold. No split hero. Grid IS the layout.',
    demo: (
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: 'auto auto', gap: 6 }}>
          <div style={{ gridColumn: '1', gridRow: '1/span 2', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>Meet notes, instantly.</div>
            <div style={{ fontSize: 8, color: '#64748b', marginBottom: 6 }}>AI transcribes every meeting</div>
            <div style={{ width: 60, height: 18, background: '#0ea5e9', borderRadius: 5 }} />
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: 7 }}>
            <div style={{ fontSize: 8, color: '#059669', fontWeight: 600 }}>Last meeting</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#0f172a' }}>Q2 Planning</div>
          </div>
          <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: 8, padding: 7 }}>
            <div style={{ fontSize: 8, color: '#ca8a04', fontWeight: 600 }}>This week</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#0f172a' }}>4 meetings</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'T10', name: 'Cinematic Full-Bleed', bg: '#0a0a0f', accent: '#e879f9', dark: true,
    projects: ['clipforge', 'nammatamil', 'ninjapa'],
    skills: ['/after-hours-editorial-template', '/gsap-scrolltrigger', '/fal-kling-o3'],
    desc: 'Full-viewport video/generative bg. Dark overlay. Centered text. Scroll scrubs.',
    demo: (
      <div style={{ background: 'linear-gradient(135deg,#0a0a0f 0%,#1a0a2e 50%,#0a0a0f 100%)', border: '1px solid rgba(232,121,249,0.2)', borderRadius: 10, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 90, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(232,121,249,0.07) 0%, transparent 70%)' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 8, color: '#e879f9', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>AI Video</div>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#fff' }}>Cut. Create. Ship.</div>
          <div style={{ width: 60, height: 18, background: '#e879f9', borderRadius: 5, margin: '6px auto 0' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'T11', name: 'Typewriter Terminal (Centered)', bg: '#060d1a', accent: '#22d3ee', dark: true,
    projects: ['neuralos', 'ninjapa', 'rideflow'],
    skills: ['/interface-design', '/gsap-timeline', '/animate'],
    desc: 'Single centered column. Terminal sequence IS the demo. Cursor blink. No split.',
    demo: (
      <div style={{ background: '#060d1a', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 10, padding: 12, minHeight: 90 }}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc' }}>Run agents in production.</div>
        </div>
        <div style={{ background: '#030712', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 6, padding: '8px 10px', fontFamily: 'monospace' }}>
          {['$ init neuralos...', '✓ connected', '$ run task', '█'].map((l, i) => (
            <div key={i} style={{ fontSize: 8, color: i === 3 ? '#22d3ee' : i === 1 ? '#4ade80' : '#94a3b8', marginBottom: 2 }}>{l}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'T12', name: 'Magazine Editorial', bg: '#fffbf5', accent: '#f97316', dark: false,
    projects: ['nammatamil', 'bookingcall'],
    skills: ['/field-notes-editorial-template', '/editorial-burgundy-principles-template', '/gsap-scrolltrigger', '/emil-design-eng'],
    desc: 'Serif headline. 2-col editorial grid. Masonry cards stagger on scroll.',
    demo: (
      <div style={{ background: '#fffbf5', border: '1px solid #fed7aa', borderRadius: 10, padding: 12, minHeight: 88 }}>
        <div style={{ borderBottom: '1px solid #f97316', paddingBottom: 5, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 8, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Tamil Culture</span>
          <span style={{ fontSize: 7, color: '#9a7b5a' }}>June 2026</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#1c0a00', fontStyle: 'italic', lineHeight: 1.2 }}>Stories that bind us.</div>
      </div>
    ),
  },
  {
    id: 'T13', name: 'Floating Cards / Orbit', bg: '#fff7ed', accent: '#ea580c', dark: false,
    projects: ['aicoachlab', 'weekendai', 'playsmart'],
    skills: ['/algorithmic-art', '/animate', '/emil-design-eng'],
    desc: 'Center headline + CTA. Topic cards orbit at random rotations. Drift animation.',
    demo: (
      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: 12, minHeight: 90, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[{ label: 'Interview', top: 8, left: 8, rot: -8 }, { label: 'Resume', top: 8, right: 8, rot: 6 }, { label: 'Salary', bottom: 8, left: 8, rot: 5 }, { label: 'Career', bottom: 8, right: 8, rot: -7 }].map((c, i) => (
          <div key={i} style={{ position: 'absolute', top: c.top, left: (c as {left?: number}).left, bottom: (c as {bottom?: number}).bottom, right: (c as {right?: number}).right, background: '#fff', border: '1px solid #fed7aa', borderRadius: 6, padding: '4px 7px', fontSize: 8, fontWeight: 600, color: '#431407', transform: `rotate(${c.rot}deg)` }}>{c.label}</div>
        ))}
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#1c0a00', marginBottom: 4 }}>Your AI career coach</div>
          <div style={{ width: 60, height: 18, background: '#ea580c', borderRadius: 5, margin: '0 auto' }} />
        </div>
      </div>
    ),
  },
  {
    id: 'T14', name: 'Generative Art Background', bg: '#0e0e16', accent: '#a78bfa', dark: true,
    projects: ['pixelforge', 'playsmart', 'clipforge'],
    skills: ['/shader-dev', '/algorithmic-art', '/threejs', '/animate'],
    desc: 'WebGL/canvas procedural bg unique per visit. Mouse-reactive. Content overlaid.',
    demo: (
      <div style={{ background: '#0e0e16', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 10, padding: 12, minHeight: 90, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(10,1fr)', gridTemplateRows: 'repeat(5,1fr)', gap: 1, opacity: 0.25 }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} style={{ background: i % 7 === 0 ? '#a78bfa' : i % 5 === 0 ? '#7c3aed' : i % 3 === 0 ? '#4c1d95' : 'transparent', borderRadius: 1 }} />
          ))}
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', paddingTop: 10 }}>
          <div style={{ fontSize: 8, color: '#a78bfa', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>Pixel Art Studio</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Create. Play. Ship.</div>
          <div style={{ width: 60, height: 18, background: '#a78bfa', borderRadius: 5 }} />
        </div>
      </div>
    ),
  },
  {
    id: 'T15', name: 'D3 Live Data Hero', bg: '#0b1420', accent: '#f59e0b', dark: true,
    projects: ['trackwealth', 'mandirates', 'agenttrace'],
    skills: ['/d3-visualization', '/gsap-core', '/animate'],
    desc: 'D3 chart IS the right panel. Animates in on mount. Updates every 5s.',
    demo: (
      <div style={{ background: '#0b1420', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: 12, display: 'flex', gap: 8, minHeight: 88 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 8, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>Portfolio Analytics</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>Track every penny.</div>
          <div style={{ width: 50, height: 18, background: '#f59e0b', borderRadius: 5 }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2 }}>
          {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
            <div key={i} style={{ width: `${h}%`, height: 7, background: i === 6 ? '#f59e0b' : 'rgba(245,158,11,0.25)', borderRadius: 2 }} />
          ))}
          <div style={{ fontSize: 7, color: '#f59e0b', fontFamily: 'monospace' }}>+18.4%</div>
        </div>
      </div>
    ),
  },
  {
    id: 'T16', name: 'Full-Width Input Hero', bg: '#fdf4ff', accent: '#9333ea', dark: false,
    projects: ['speakiq', 'resumevault', 'pdfideas'],
    skills: ['/frontend-design', '/shadcn-ui', '/transitions-dev', '/animate'],
    desc: 'Giant input IS the hero. Placeholder cycles. Real API on submit. Result slides in.',
    demo: (
      <div style={{ background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: 10, padding: 12, minHeight: 90 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#1e1b4b', textAlign: 'center', marginBottom: 8 }}>Speak any language.</div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
          <div style={{ flex: 1, background: '#fff', border: '2px solid #9333ea', borderRadius: 8, padding: '6px 10px', fontSize: 9, color: '#6b21a8' }}>Type a word…</div>
          <div style={{ width: 30, height: 30, background: '#9333ea', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: 11 }}>→</span>
          </div>
        </div>
        <div style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: 7, padding: '6px 10px' }}>
          <div style={{ fontSize: 8, color: '#7e22ce', fontWeight: 600 }}>bonjour → "Good day" (French)</div>
        </div>
      </div>
    ),
  },
  {
    id: 'T17', name: 'Asymmetric Split (60/40)', bg: '#f0f9ff', accent: '#7c3aed', dark: false,
    projects: ['quizbytesdaily', 'replydesk', 'draftcal'],
    skills: ['/ui-skills', '/frontend-design', '/gsap-scrolltrigger', '/animate', '/transitions-dev'],
    desc: 'lg:grid-cols-[3fr_2fr]. Dominant side = product demo sticky. Minor = headline scrolls.',
    demo: (
      <div style={{ background: '#f0f9ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: 10, display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 7, minHeight: 90 }}>
        <div style={{ background: '#fff', border: '2px solid #7c3aed', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 8, color: '#7c3aed', fontWeight: 600, marginBottom: 4 }}>Daily Quiz</div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#0f172a', marginBottom: 5 }}>Who wrote Hamlet?</div>
          {['Marlowe', 'Shakespeare'].map((o, i) => (
            <div key={o} style={{ background: i === 1 ? '#ede9fe' : '#f8fafc', border: `1px solid ${i === 1 ? '#7c3aed' : '#e2e8f0'}`, borderRadius: 4, padding: '3px 6px', fontSize: 8, color: i === 1 ? '#7c3aed' : '#64748b', marginBottom: 2, fontWeight: i === 1 ? 600 : 400 }}>{o}</div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>One quiz. Every day.</div>
          <div style={{ width: 50, height: 18, background: '#7c3aed', borderRadius: 5 }} />
        </div>
      </div>
    ),
  },
]

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Dev Tools', value: 'dev' },
  { label: 'Light Theme', value: 'light' },
  { label: 'Dark Theme', value: 'dark' },
]

const CATEGORY_MAP: Record<string, string[]> = {
  saas: ['T1', 'T9', 'T17'],
  dev: ['T2', 'T11', 'T14'],
  light: ['T1', 'T3', 'T4', 'T5', 'T7', 'T8', 'T9', 'T12', 'T13', 'T16', 'T17'],
  dark: ['T2', 'T6', 'T10', 'T11', 'T14', 'T15'],
}

export default function DemosPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '48px 32px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: '#7c3aed', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Design System</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', margin: 0, marginBottom: 10 }}>
          17 Layout Archetypes
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, maxWidth: 560, margin: '0 auto 20px', lineHeight: 1.6 }}>
          Every portfolio project is built on one of these. Unique bg/accent per project, animated demo panel, mandatory skill pipeline. Research-driven, not copy-paste.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Open Design', 'Emil Kowalski', 'Framer Motion', 'D3.js', 'GSAP', 'Shader Dev'].map(t => (
            <span key={t} style={{ background: '#f3e8ff', color: '#7c3aed', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, border: '1px solid #e9d5ff' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        {[['17', 'Layout archetypes'], ['33', 'Portfolio projects'], ['6+', 'Design skill pipelines'], ['100%', 'Unique bg/accent']].map(([v, l]) => (
          <div key={l} style={{ padding: '16px 24px', textAlign: 'center', borderRight: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{v}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {LAYOUTS.map(layout => (
            <div key={layout.id} style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              overflow: 'hidden',
              transition: 'box-shadow 200ms, transform 200ms',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
            >
              {/* Demo preview */}
              <div style={{ padding: 14 }}>
                {layout.demo}
              </div>

              {/* Card body */}
              <div style={{ padding: '0 16px 16px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 5,
                      background: layout.dark ? 'rgba(99,102,241,0.15)' : '#f1f5f9',
                      color: layout.dark ? '#a5b4fc' : '#475569',
                      fontFamily: 'monospace',
                    }}>{layout.id}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{layout.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: layout.bg, border: '1px solid #e2e8f0' }} title={`bg: ${layout.bg}`} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: layout.accent }} title={`accent: ${layout.accent}`} />
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 10px', lineHeight: 1.5 }}>{layout.desc}</p>

                {/* Projects */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Used in</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {layout.projects.map(p => (
                      <span key={p} style={{ fontSize: 10, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 4, padding: '2px 7px', color: '#475569' }}>{p}</span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Skill pipeline</div>
                  <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {layout.skills.map(s => (
                      <span key={s} style={{ fontSize: 9, background: '#fdf4ff', border: '1px solid #e9d5ff', borderRadius: 4, padding: '2px 6px', color: '#7c3aed', fontFamily: 'monospace' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 60, textAlign: 'center', padding: '40px 24px', background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Build your prototype</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Describe your idea — ProtoForge picks the right archetype automatically.</p>
          <Link href="/" style={{ display: 'inline-block', background: '#7c3aed', color: '#fff', fontSize: 14, fontWeight: 700, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>
            Try ProtoForge free →
          </Link>
        </div>
      </div>
    </div>
  )
}
