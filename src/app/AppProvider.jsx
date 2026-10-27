import React, { useReducer, useEffect } from 'react'
import { createEmptyDocument } from '../domain/model.js'
import { createRepository } from '../storage/repository.js'
import { AppStateContext, AppDispatchContext } from './AppContext.js'

function appReducer(state, action) {
  switch (action.type) {
    case 'REPLACE_STATE':
      return action.payload
    default:
      return state
  }
}

export function AppProvider({ children, repository: repo } = {}) {
  const repository = repo || createRepository()
  const [state, dispatch] = useReducer(appReducer, createEmptyDocument())

  useEffect(() => {
    const result = repository.load()
    if (result.data) {
      dispatch({ type: 'REPLACE_STATE', payload: result.data })
    }
  }, [repository])

  useEffect(() => {
    repository.save(state)
  }, [repository, state])

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
