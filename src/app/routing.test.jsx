import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AppShell from './AppShell.jsx'
import AppRoutes from './AppRoutes.jsx'
import { AppProvider } from './AppProvider.jsx'

function renderRoute(initialEntry) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppProvider>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </AppProvider>
    </MemoryRouter>
  )
}

describe('routing', () => {
  it('dashboard route renders heading and only dashboard link has aria-current', () => {
    renderRoute('/')
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeDefined()
    const links = screen.getAllByRole('link')
    const current = links.filter(l => l.getAttribute('aria-current') === 'page')
    expect(current.length).toBe(1)
    expect(current[0].textContent).toMatch(/dashboard/i)
  })

  it('subjects route renders heading and only subjects link has aria-current', () => {
    renderRoute('/subjects')
    expect(screen.getByRole('heading', { name: /subjects/i })).toBeDefined()
    const links = screen.getAllByRole('link')
    const current = links.filter(l => l.getAttribute('aria-current') === 'page')
    expect(current.length).toBe(1)
    expect(current[0].textContent).toMatch(/subjects/i)
  })

  it('analysis route renders heading and only analysis link has aria-current', () => {
    renderRoute('/analysis')
    expect(screen.getByRole('heading', { name: /analysis/i })).toBeDefined()
    const links = screen.getAllByRole('link')
    const current = links.filter(l => l.getAttribute('aria-current') === 'page')
    expect(current.length).toBe(1)
    expect(current[0].textContent).toMatch(/analysis/i)
  })
})
