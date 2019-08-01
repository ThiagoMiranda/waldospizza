// @flow
import React from 'react'
import LoginModal from '../components/LoginModal'

export default function LoginModalHOC (component: any) {
  return <LoginModal trigger={component} />
}
