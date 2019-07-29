import React, { createContext, useReducer, useContext } from 'react'

import { ADD_TOPPING, REMOVE_TOPPING, CHANGE_SIZE } from './actions'

const defaultState = {
  size: null,
  price: 0,
  toppings: []
}

function addTopping() {}
function removeTopping() {}
function changeSize() {}

function reducer(state = defaultState, action={}) {
  switch (action.type) {
    case ADD_TOPPING: return addTopping(state)
    case REMOVE_TOPPING: return removeTopping(state)
    case CHANGE_SIZE: return changeSize(state)
    default: return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)