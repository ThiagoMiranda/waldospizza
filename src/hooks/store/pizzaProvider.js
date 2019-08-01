// @flow
import * as React from 'react'

import type { PizzaState, Action } from '../../types'
import { ADD_TOPPING, REMOVE_TOPPING, CHANGE_SIZE, RESET_PIZZA } from './actions'

const defaultState = {
  size: null,
  price: 0,
  toppings: [],
  maxToppings: null
}

function addTopping (oldState, newState): PizzaState {
  return {
    ...oldState,
    ...{ toppings: oldState.toppings.concat(newState.name), price: oldState.price + newState.price }
  }
}

function removeTopping (oldState, newState): PizzaState {
  return {
    ...oldState,
    ...{ toppings: oldState.toppings.filter((value) => value !== newState.name), price: oldState.price - newState.price }
  }
}

function changeSize (oldState, newState): PizzaState {
  return {
    ...oldState,
    ...newState
  }
}

function reducer (state: PizzaState = defaultState, action: Action = {}) {
  switch (action.type) {
    case ADD_TOPPING: return addTopping(state, action.payload)
    case REMOVE_TOPPING: return removeTopping(state, action.payload)
    case CHANGE_SIZE: return changeSize(state, action.payload)
    case RESET_PIZZA: return defaultState// resetPizza(state, action.payload)
    default: return state
  }
}

const StoreContext = React.createContext<null>(null)

type Props = {
  children?: React.Node
}

export function PizzaStoreProvider ({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => React.useContext(StoreContext)
