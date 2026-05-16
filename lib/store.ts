import { ProtoSpec } from './types'

// In-memory store for MVP — survives server restarts on dev, resets on Vercel cold start
const store = new Map<string, ProtoSpec>()

export function saveProto(spec: ProtoSpec): void {
  store.set(spec.id, spec)
}

export function getProto(id: string): ProtoSpec | undefined {
  return store.get(id)
}
