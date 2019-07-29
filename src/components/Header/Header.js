import React from 'react'
import { Menu, Image, Header as SemanticHeader } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import DefaultAvatar from '../../assets/images/avatar/default_avatar.png'
import LoginModal from '../LoginModal'
import { useStore } from '../../hooks/store/userProvider'

function LoginMenuItem() {
  return (
    <LoginModal trigger={
      <Menu.Item 
      name='Login'
      active={false}
      position='right'
      >
        <SemanticHeader as='h2'>
          <Image size='huge' circular bordered src={DefaultAvatar} />  
        </SemanticHeader>
        Login
      </Menu.Item>
    } />
  )
}

function LoggedMenuItem({ name, avatar }) {
  return (
    <Menu.Item 
    name={`Hello ${name}`}
    active={false}
    position='right'
    >
      <SemanticHeader as='h2'>
        <Image size='huge' circular bordered src={avatar} />  
      </SemanticHeader>
      {`Welcome back ${name}`}
    </Menu.Item>
  )
}

export default withRouter(function Header(props) {
  const { state } = useStore()
  const { location: { pathname } } = props
  let profile = state.logged ? LoggedMenuItem(state) : LoginMenuItem()

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