import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AppProvider, useAppState } from './AppProvider.jsx'
import { createRepository } from '../storage/repository.js'

function TestComponent() {
  const state = useAppState()
  return <div data-testid='count'>{state.subjects.length}</div>
}

describe('provider', () => {
  it('loads stored state and saves changes through the repository', async () => {
    const fakeStorage = {
      store: {},
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null
      },
      setItem(key, value) {
        this.store[key] = String(value)
      }
    }
    fakeStorage.setItem('studyflow.data', JSON.stringify({
      schemaVersion: 1,
      subjects: [{ id: 's1', name: 'Test', order: 0 }],
      chapters: [],
      topics: [],
      ratings: [],
      revisions: [],
      exams: []
    }))
    const repo = createRepository(fakeStorage)
    render(
      <AppProvider repository={repo}>
        <TestComponent />
      </AppProvider>
    )
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('1')
    })
    expect(fakeStorage.store['studyflow.data']).toBeDefined()
  })
})