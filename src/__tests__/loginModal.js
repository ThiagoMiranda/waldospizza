import React, { useContext } from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import LoginModal from '../components/LoginModal'
import { UserStoreProvider } from '../hooks/store/userProvider'

test('Login Modal should open and present title', () => {
  const { getByText, container } = render(
    <UserStoreProvider>
      <LoginModal trigger={<button data-testid='button'></button>} />
    </UserStoreProvider>
  )
  const button = getByTestId(container, 'button')
  fireEvent.click(button)
  expect(getByText(`Please login`)).toBeInTheDocument()
})
