'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SavedProto {
  id: string
  name: string
  category: string
  createdAt: string
  prompt: string
}

const STORAGE_KEY = 'protoforge_history'

export function loadHistory(): SavedProto[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function saveToHistory(entry: SavedProto) {
  if (typeof window === 'undefined') return
  try {
    const existing = loadHistory()
    const filtered = existing.filter(e => e.id !== entry.id)
    const updated = [entry, ...filtered].slice(0, 20) // keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore storage errors
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      padding: '14px 16px',
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, color: '#a5b4fc', lineHeight: 1, marginBottom: sub ? 4 : 0 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export default function ProjectsDashboard() {
  const [history, setHistory] = useState<SavedProto[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setHistory(loadHistory())
    // listen for storage changes from other tabs
    const onStorage = () => setHistory(loadHistory())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  if (!mounted) return null

  const total = history.length
  const last = history[0]
  const categoryCount: Record<string, number> = {}
  for (const h of history) {
    categoryCount[h.category] = (categoryCount[h.category] ?? 0) + 1
  }
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
  const recent = history.slice(0, 3)

  if (total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{
          marginTop: 28,
          padding: '16px 18px',
          background: 'rgba(99,102,241,0.06)',
          border: '1px dashed rgba(99,102,241,0.25)',
          borderRadius: 12,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
          No prototypes yet
        </div>
        <div style={{ fontSize: 11, color: 'rgba(99,102,241,0.7)', fontWeight: 600 }}>
          Build your first prototype above →
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{ marginTop: 28 }}
    >
      {/* Stat cards row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Built', value: String(total) },
          { label: 'Last built', value: last ? last.name : '—', sub: last ? formatDate(last.createdAt) : undefined },
          { label: 'Top type', value: topCategory },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
            style={{ flex: 1 }}
          >
            <StatCard label={card.label} value={card.value} sub={card.sub} />
          </motion.div>
        ))}
      </div>

      {/* Recent prototypes list */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>
          Recent Prototypes
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {recent.map((proto, i) => (
            <motion.div
              key={proto.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(99,102,241,0.15)' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                padding: '9px 12px',
                cursor: 'default',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#f4f4f5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {proto.name}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                  {formatDate(proto.createdAt)} · {proto.category}
                </div>
              </div>
              <motion.a
                href={`/proto/${proto.id}`}
                whileTap={{ scale: 0.97 }}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 99,
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  color: '#a5b4fc',
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'background 160ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.22)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.12)')}
              >
                Open
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
