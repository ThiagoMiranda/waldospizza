
import React from 'react'
import { Button, Image, List } from 'semantic-ui-react'
 

export default function SelectedToppings(props) {
  return (
    <List divided verticalAlign='middle'>
      <List.Item>
        <List.Content floated='right'>
          <Button>Remove</Button>
        </List.Content>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
        <List.Content>Lena</List.Content>
      </List.Item>
    </List>
  )
}