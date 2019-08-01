import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

import pizzaPlaceholder from '../../assets/images/pizza_placeholder.jpg'

export default function PizzaCard({ size, price, toppings, id, onRemovePizza }) {
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image floated='right' size='small' src={pizzaPlaceholder} />
          <Card.Header>Pizza "{size}"</Card.Header>
          <Card.Meta>Price "{price.toFixed(2)}"</Card.Meta>
          <Card.Description>
            Toppings: {toppings.join(' , ')}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui'>
            <Button onClick={() => onRemovePizza(id)} basic color='red'>
              Remove
            </Button>
          </div>
        </Card.Content>
      </Card>
  </Card.Group>
  )
}