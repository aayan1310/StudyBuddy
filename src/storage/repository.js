import { createEmptyDocument } from '../domain/model.js'

const STORAGE_KEY = 'studyflow.data'

export function createRepository(storage = typeof window !== 'undefined' ? window.localStorage : null) {
  return {
    load() {
      if (!storage) {
        return { ok: true, data: createEmptyDocument(), inMemory: true }
      }
      try {
        const raw = storage.getItem(STORAGE_KEY)
        if (raw === null) {
          return { ok: true, data: createEmptyDocument() }
        }
        let parsed
        try {
          parsed = JSON.parse(raw)
        } catch {
          return { ok: false, error: 'invalid_json', data: createEmptyDocument() }
        }
        if (!parsed || typeof parsed !== 'object' || parsed.schemaVersion !== 1) {
          return { ok: false, error: 'invalid_schema', data: createEmptyDocument() }
        }
        if (!Array.isArray(parsed.subjects) || !Array.isArray(parsed.chapters) || 
            !Array.isArray(parsed.topics) || !Array.isArray(parsed.ratings) ||
            !Array.isArray(parsed.revisions) || !Array.isArray(parsed.exams)) {
          return { ok: false, error: 'invalid_shape', data: createEmptyDocument() }
        }
        return { ok: true, data: parsed }
      } catch {
        return { ok: true, data: createEmptyDocument(), inMemory: true }
      }
    },
    save(state) {
      if (!storage) {
        return { ok: false, inMemory: true }
      }
      try {
        const serialized = JSON.stringify(state)
        storage.setItem(STORAGE_KEY, serialized)
        return { ok: true }
      } catch {
        return { ok: false, inMemory: true }
      }
    }
  }
}

export const repository = createRepository()