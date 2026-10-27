import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../features/dashboard/DashboardPage.jsx'
import SubjectsPage from '../features/subjects/SubjectsPage.jsx'
import AnalysisPage from '../features/analysis/AnalysisPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashboardPage />} />
      <Route path='/subjects' element={<SubjectsPage />} />
      <Route path='/analysis' element={<AnalysisPage />} />
    </Routes>
  )
}
