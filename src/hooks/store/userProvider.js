import React, { createContext, useReducer, useContext } from 'react'

import { LOGIN, LOGOUT } from './actions'

const defaultState = {
  name: '',
  email: '',
  avatar: '',
  orders: [],
  logged: false
}

function login(state) {
  return {
    ...defaultState,
    ...state,
    logged: true
  }
}
function logout() {
  return defaultState
}

function reducer(state = defaultState, action={}) {
  switch (action.type) {
    case LOGIN: return login(action.payload)
    case LOGOUT: return logout()
    default: return state
  }
}

const StoreContext = createContext(null)

export function UserStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)