// @flow
import React from 'react'
import { Card, Image, Button, Header } from 'semantic-ui-react'

import pizzaPlaceholder from '../../assets/images/pizza_placeholder.jpg'

type Props = {
  size: string,
  price: number,
  toppings: Array<string>,
  id: string,
  onRemovePizza: Function
}

export default function PizzaCard ({ size, price, toppings, id, onRemovePizza }: Props) {
  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Image floated='right' size='tiny' src={pizzaPlaceholder} />
          <Card.Header>Pizza: {size}</Card.Header>
          <Card.Meta>Price: ${price.toFixed(2)}</Card.Meta>
          <Card.Description>
            <Header as='h3' dividing>
              Toppings
            </Header>
            {toppings.join(' , ')}
          </Card.Description>
        </Card.Content>
        { onRemovePizza && <Card.Content extra>
          <div className='ui'>
            <Button onClick={() => onRemovePizza(id)} basic color='red'>
              Remove
            </Button>
          </div>
        </Card.Content> }
      </Card>
    </Card.Group>
  )
}
