import React, { useContext } from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { useStore, PizzaStoreProvider } from '../hooks/store/pizzaProvider'
import { CHANGE_SIZE } from '../hooks/store/actions'

function FakeComponent () {
  const { state, dispatch } = useStore()

  function updateState () {
    dispatch({ type: CHANGE_SIZE,
      payload: {
        size: 'small',
        maxToppings: 3,
        toppings: ['banana']
      }
    })
  }

  if (!state.size) return <div>{`Pizza size ${state.size} and maxToppings ${state.maxToppings}`} <button data-testid='updatePizza' onClick={updateState}></button></div>
  else return <div>{`Pizza size ${state.size} and maxToppings ${state.maxToppings} and toppings ${state.toppings.join('')}`}</div>
}

test('PizzaContext should be default', () => {
  const { getByText } = render(
    <PizzaStoreProvider value={{}}>
      <FakeComponent />
    </PizzaStoreProvider>
  )
  expect(getByText(`Pizza size null and maxToppings null`)).toBeInTheDocument()
})

test('PizzaContext should have size and toppings', () => {
  const { container, getByText, rerender } = render(
    <PizzaStoreProvider>
      <FakeComponent />
    </PizzaStoreProvider>
  )
  const pizzaUpdateButton = getByTestId(container, 'updatePizza')
  fireEvent.click(pizzaUpdateButton)
  rerender(<PizzaStoreProvider>
    <FakeComponent />
  </PizzaStoreProvider>)
  expect(getByText(`Pizza size small and maxToppings 3 and toppings banana`)).toBeInTheDocument()
})
