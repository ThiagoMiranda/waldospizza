import React, { createContext, useReducer, useContext } from 'react'

import { ADD_TOPPING, REMOVE_TOPPING, CHANGE_SIZE } from './actions'

const defaultState = {
  size: null,
  price: 0,
  toppings: [],
  maxToopings: null
}

function addTopping() {}
function removeTopping() {}
function changeSize(state) {
  return {
    ...defaultState,
    ...state
  }
}

function reducer(state = defaultState, action={}) {
  switch (action.type) {
    case ADD_TOPPING: return addTopping(action.payload)
    case REMOVE_TOPPING: return removeTopping(action.payload)
    case CHANGE_SIZE: return changeSize(action.payload)
    default: return state
  }
}

const StoreContext = createContext(null)

export function PizzaStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)