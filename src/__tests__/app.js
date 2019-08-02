import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

it('Renders app without crashing it', () => {
  const container = document.createElement('div')
  ReactDOM.render(<App />, container)
  ReactDOM.unmountComponentAtNode(container)
})
