import React from 'react'
import { Menu, Image, Header as SemanticHeader } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import DefaultAvatar from '../../assets/images/default_avatar.png'

export default withRouter(function Header(props) {
  const { location: { pathname } } = props

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
        <Menu.Item 
          name='Check our menu'
          as='span'
          active={pathname === '/pizzaMenu'}
          position='right'
        >
          <Link to='/pizzaMenu'>Check our Menu</Link>
        </Menu.Item>
        <Menu.Item 
          name='Login'
          as='span'
          active={false}
          position='right'
        >
        <SemanticHeader as='h2'>
          <Image circular bordered src={DefaultAvatar} />  
        </SemanticHeader>
          Login
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
})