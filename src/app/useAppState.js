import { useContext } from 'react'
import { AppStateContext, AppDispatchContext } from './AppContext.js'

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === null) {
    throw new Error('useAppState must be used within an AppProvider')
  }
  return context
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext)
  if (context === null) {
    throw new Error('useAppDispatch must be used within an AppProvider')
  }
  return context
}
