// @flow
import * as React from 'react'
import type { UserState, Action } from '../../types'

import { LOGIN, LOGOUT, ADD_PIZZA, REMOVE_PIZZA } from './actions'

const defaultState = {
  name: '',
  email: '',
  avatar: '',
  orders: [],
  logged: false
}

//  Util
function generateRandomId (): string {
  return Math.random().toString(36).slice(-5)
}

function login (oldState, newState): UserState {
  return {
    ...oldState,
    ...newState,
    logged: true
  }
}
function logout (): UserState {
  return defaultState
}

function addOrder (oldState, newState): UserState {
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

function removePizza (oldState, id): UserState {
  return {
    ...oldState,
    ...{ orders: oldState.orders.filter(item => item.id !== id) }
  }
}

function reducer (state: UserState = defaultState, action: Action = {}) {
  switch (action.type) {
    case LOGIN: return login(state, action.payload)
    case LOGOUT: return logout()
    case ADD_PIZZA: return addOrder(state, action.payload)
    case REMOVE_PIZZA: return removePizza(state, action.payload)
    default: return state
  }
}

const StoreContext = React.createContext<null>(null)

type Props = {
  children?: React.Node
}

export function UserStoreProvider ({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext)
