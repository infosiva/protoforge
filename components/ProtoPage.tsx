'use client'
import { PageSpec, SectionSpec, ItemSpec } from '@/lib/types'

interface Props {
  page: PageSpec
  primaryColor: string
  accentColor: string
  name: string
  heroStyle: 'centered' | 'split-left' | 'split-right' | 'fullbleed' | 'magazine'
  cardStyle: 'grid' | 'masonry' | 'list' | 'carousel'
  spacing: 'tight' | 'comfortable' | 'generous'
}

const spacingClass = {
  tight: 'py-10',
  comfortable: 'py-16',
  generous: 'py-24',
}

function ItemCard({ item, cardStyle }: { item: ItemSpec; cardStyle: string }) {
  const isList = cardStyle === 'list'
  return isList ? (
    <div className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/10">
      <span className="text-3xl shrink-0">{item.icon}</span>
      <div>
        <p className="font-semibold text-base">{item.title}</p>
        {item.price && <p className="text-2xl font-bold mt-1">{item.price}</p>}
        <p className="text-sm opacity-70 mt-1">{item.body}</p>
      </div>
    </div>
  ) : (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
      <span className="text-3xl">{item.icon}</span>
      <p className="font-semibold">{item.title}</p>
      {item.price && <p className="text-2xl font-bold">{item.price}</p>}
      <p className="text-sm opacity-70">{item.body}</p>
    </div>
  )
}

function Section({
  section,
  primaryColor,
  accentColor,
  cardStyle,
  spacing,
}: {
  section: SectionSpec
  primaryColor: string
  accentColor: string
  cardStyle: string
  spacing: string
}) {
  const pad = spacingClass[spacing as keyof typeof spacingClass] ?? 'py-16'
  const items = section.items ?? []

  if (section.type === 'hero') {
    return (
      <section className={`${pad} px-6 md:px-12 max-w-5xl mx-auto w-full`}>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          {section.headline}
        </h1>
        <p className="text-lg md:text-xl opacity-75 max-w-2xl">{section.body}</p>
      </section>
    )
  }

  if (section.type === 'cta-band') {
    return (
      <section
        className={`${pad} px-6 text-center`}
        style={{ background: `${primaryColor}22` }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">{section.headline}</h2>
          <p className="opacity-75 mb-6">{section.body}</p>
          <a
            href="/signup"
            className="inline-block px-8 py-3 rounded-full font-semibold text-white"
            style={{ background: primaryColor }}
          >
            Get started free
          </a>
        </div>
      </section>
    )
  }

  if (section.type === 'pricing') {
    return (
      <section className={`${pad} px-6 max-w-5xl mx-auto w-full`}>
        <h2 className="text-3xl font-bold mb-2 text-center">{section.headline}</h2>
        <p className="text-center opacity-60 mb-10">{section.body}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border flex flex-col gap-3 ${
                i === 1
                  ? 'border-2 scale-105'
                  : 'border-white/10 bg-white/5'
              }`}
              style={i === 1 ? { borderColor: primaryColor, background: `${primaryColor}15` } : {}}
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="font-bold text-xl">{item.title}</p>
              <p className="text-3xl font-extrabold">{item.price}</p>
              <p className="text-sm opacity-70">{item.body}</p>
              <a
                href="/signup"
                className="mt-auto text-center py-2 rounded-lg font-semibold text-sm"
                style={
                  i === 1
                    ? { background: primaryColor, color: '#fff' }
                    : { background: 'rgba(255,255,255,0.1)' }
                }
              >
                {i === 0 ? 'Start free' : 'Get started'}
              </a>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (section.type === 'stats') {
    return (
      <section className={`${pad} px-6 max-w-5xl mx-auto w-full`}>
        <div className="grid grid-cols-3 gap-6 text-center">
          {items.map((item, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold" style={{ color: primaryColor }}>{item.title}</p>
              <p className="text-sm opacity-60 mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (section.type === 'faq') {
    return (
      <section className={`${pad} px-6 max-w-3xl mx-auto w-full`}>
        <h2 className="text-3xl font-bold mb-8">{section.headline}</h2>
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <details key={i} className="group p-4 rounded-xl bg-white/5 border border-white/10">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                {item.title}
                <span className="opacity-50 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm opacity-70">{item.body}</p>
            </details>
          ))}
        </div>
      </section>
    )
  }

  if (section.type === 'testimonials') {
    return (
      <section className={`${pad} px-6 max-w-5xl mx-auto w-full`}>
        <h2 className="text-3xl font-bold mb-8 text-center">{section.headline}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm opacity-75 italic mb-4">"{item.body}"</p>
              <p className="font-semibold text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // features / how-it-works / default
  const colClass = cardStyle === 'list' ? 'grid-cols-1 max-w-2xl' : 'md:grid-cols-3'
  return (
    <section className={`${pad} px-6 max-w-5xl mx-auto w-full`}>
      <h2 className="text-3xl font-bold mb-2">{section.headline}</h2>
      {section.body && <p className="opacity-60 mb-8">{section.body}</p>}
      <div className={`grid ${colClass} gap-6`}>
        {items.map((item, i) => (
          <ItemCard key={i} item={item} cardStyle={cardStyle} />
        ))}
      </div>
    </section>
  )
}

export default function ProtoPage({
  page,
  primaryColor,
  accentColor,
  name,
  heroStyle,
  cardStyle,
  spacing,
}: Props) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Page hero header (non-home pages) */}
      {page.slug !== 'home' && (
        <div className={`w-full px-6 py-14 text-center`} style={{ background: `${primaryColor}18` }}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{page.headline}</h1>
          <p className="opacity-70 text-lg max-w-xl mx-auto">{page.subheadline}</p>
          {page.ctaText && page.slug !== 'contact' && (
            <a
              href={page.ctaHref}
              className="mt-6 inline-block px-8 py-3 rounded-full font-semibold text-white"
              style={{ background: primaryColor }}
            >
              {page.ctaText}
            </a>
          )}
        </div>
      )}

      {page.sections.map((section, i) => (
        <Section
          key={i}
          section={section}
          primaryColor={primaryColor}
          accentColor={accentColor}
          cardStyle={cardStyle}
          spacing={spacing}
        />
      ))}
    </div>
  )
}
