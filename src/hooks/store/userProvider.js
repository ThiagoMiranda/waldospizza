// @flow
import * as React from 'react'
import type { UserState, Action } from '../../types'

import { LOGIN, LOGOUT, ADD_PIZZA, REMOVE_PIZZA, RESET_ORDERS } from './actions'

const user = window.localStorage.getItem('user')

const defaultState = user ? JSON.parse(user) : {
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
  const loggedUser = {
    ...oldState,
    ...newState,
    logged: true
  }
  window.localStorage.setItem('user', JSON.stringify(loggedUser))
  return loggedUser
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

function resetOrders (oldState): UserState {
  return {
    ...oldState,
    ...{ orders: [] }
  }
}

function logout () {
  window.localStorage.removeItem('user')
  return defaultState
}

function reducer (state: UserState = defaultState, action: Action = {}) {
  switch (action.type) {
    case LOGIN: return login(state, action.payload)
    case ADD_PIZZA: return addOrder(state, action.payload)
    case REMOVE_PIZZA: return removePizza(state, action.payload)
    case RESET_ORDERS: return resetOrders(state)
    case LOGOUT: return logout()
    default: return state
  }
}

const StoreContext = React.createContext<Object, Function>(null)

type Props = {
  children?: React.Node
}

export function UserStoreProvider ({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext)
