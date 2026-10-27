import React from 'react'
import { HashRouter } from 'react-router-dom'
import AppShell from './AppShell.jsx'
import AppRoutes from './AppRoutes.jsx'

export default function App() {
  return (
    <HashRouter>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </HashRouter>
  )
}
