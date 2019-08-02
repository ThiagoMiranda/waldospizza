// @flow
import React from 'react'
import { Menu, Image, Header as SemanticHeader, Label, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import type { Location } from 'react-router-dom'

import DefaultAvatar from '../../assets/images/avatar/default_avatar.png'
import { useStore } from '../../hooks/store/userProvider'
import { LoginModalHOC } from '../../hoc'
import { LOGOUT } from '../../hooks/store/actions'
import type { UserState } from '../../types'

function LoginMenuItem () {
  return LoginModalHOC(<Menu.Item
    name='Login'
    active={false}
    position='right'
  >
    <SemanticHeader as='h2'>
      <Image size='huge' circular bordered src={DefaultAvatar} />
    </SemanticHeader>
    Login
  </Menu.Item>)
}

function LoggedMenuItem ({ name, avatar }: UserState, cb: Function) {
  return (
    <Menu.Item
      name={`Hello ${name}`}
      active={false}
      position='right'
    >
      <SemanticHeader as='h2'>
        <Image size='huge' circular bordered src={avatar} />
      </SemanticHeader>
      {`Welcome back, ${name}`}
      <SemanticHeader floated='left'>
        <Label size='small' onClick={cb} as='a'><Icon name='sign out alternate' /></Label>
      </SemanticHeader>
    </Menu.Item>
  )
}

type Props = {
  location: Location
}

export default withRouter(function Header (props: Props) {
  const { state, dispatch } = useStore()
  const { location: { pathname } } = props
  const profile = state.logged ? LoggedMenuItem(state, logout) : LoginMenuItem()

  function logout () {
    dispatch({ type: LOGOUT })
  }

  return (
    <Menu>
      <Menu.Item
        name='Home'
        as='span'
        active={pathname === '/'}>
        <Link to='/'>Home</Link>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
          name='Order a Pizza'
          as='span'
          active={pathname === '/pizzaOrder'}
          position='right'
        >
          <Link to='/pizzaOrder'>Order a Pizza</Link>
        </Menu.Item>
        {profile}
      </Menu.Menu>
    </Menu>
  )
})
