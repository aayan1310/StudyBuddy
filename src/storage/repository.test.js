import { describe, it, expect, beforeEach } from 'vitest'
import { createRepository } from './repository.js'
import { createEmptyDocument } from '../domain/model.js'

describe('repository', () => {
  let fakeStorage
  let repo

  beforeEach(() => {
    fakeStorage = {
      store: {},
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null
      },
      setItem(key, value) {
        this.store[key] = String(value)
      }
    }
    repo = createRepository(fakeStorage)
  })

  it('round-trip saves and loads state', () => {
    const state = createEmptyDocument()
    state.subjects.push({ id: 's1', name: 'Math', order: 0 })
    const saveResult = repo.save(state)
    expect(saveResult.ok).toBe(true)
    const loadResult = repo.load()
    expect(loadResult.ok).toBe(true)
    expect(loadResult.data.subjects).toHaveLength(1)
    expect(loadResult.data.subjects[0].name).toBe('Math')
  })

  it('missing key returns empty document', () => {
    const result = repo.load()
    expect(result.ok).toBe(true)
    expect(result.data.schemaVersion).toBe(1)
    expect(result.data.subjects).toEqual([])
  })

  it('invalid JSON is not overwritten', () => {
    fakeStorage.setItem('studyflow.data', '{invalid json')
    const result = repo.load()
    expect(result.ok).toBe(false)
    expect(result.error).toBe('invalid_json')
    // Should not have overwritten
    expect(fakeStorage.store['studyflow.data']).toBe('{invalid json')
  })

  it('unknown version is not overwritten', () => {
    fakeStorage.setItem('studyflow.data', JSON.stringify({ schemaVersion: 2, subjects: [] }))
    const result = repo.load()
    expect(result.ok).toBe(false)
    expect(result.error).toBe('invalid_schema')
    expect(fakeStorage.store['studyflow.data']).toContain('schemaVersion')
  })

  it('throwing storage does not crash', () => {
    const throwingStorage = {
      getItem() { throw new Error('fail') },
      setItem() { throw new Error('fail') }
    }
    const throwingRepo = createRepository(throwingStorage)
    const loadResult = throwingRepo.load()
    expect(loadResult.ok).toBe(true)
    expect(loadResult.data.schemaVersion).toBe(1)
    const saveResult = throwingRepo.save(createEmptyDocument())
    expect(saveResult.ok).toBe(false)
  })
})