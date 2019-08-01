import React, { createContext, useReducer, useContext } from 'react'

import { LOGIN, LOGOUT, ADD_ORDER } from './actions'

const defaultState = {
  name: '',
  email: '',
  avatar: '',
  orders: [],
  logged: false
}

//  Util
function generateRandomId() {
  return Math.random().toString(36).slice(-5)
}

function login(oldState, newState) {
  return {
    ...oldState,
    ...newState,
    logged: true
  }
}
function logout() {
  return defaultState
}

function addOrder(oldState, newState) {
  return {
    ...oldState,
    ...{ orders: oldState.orders.concat([{ 
      price: Math.round(newState.price * 1e2) / 1e2,
      size: newState.size,
      toppings: newState.toppings,
      id: generateRandomId()
     }]) }
  }
}

function reducer(state = defaultState, action={}) {
  switch (action.type) {
    case LOGIN: return login(state, action.payload)
    case LOGOUT: return logout()
    case ADD_ORDER: return addOrder(state, action.payload)
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