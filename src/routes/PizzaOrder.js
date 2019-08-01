// @flow
import React from 'react'
import { Grid, Container, Header, Form, Message, Button, Divider, Label, Icon } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'

import { SmallInputSelect } from '../components/Inputs'
import { Toppings } from '../components/Toppings'
import Orders from '../components/Orders'
import { useStore as usePizzaStore } from '../hooks/store/pizzaProvider'
import { useStore as useUserStore } from '../hooks/store/userProvider'
import { LoginModalHOC } from '../hoc'

import { ADD_TOPPING, REMOVE_TOPPING, CHANGE_SIZE, ADD_PIZZA, REMOVE_PIZZA, RESET_PIZZA } from '../hooks/store/actions'

const PIZZASIZE_QUERY = `query PizzaSize {
  pizzaSizes {
    name,
    maxToppings
  }
}`

function getOrdersEl (pizzaOrders, onRemovePizza) {
  const orders = pizzaOrders.map(item => <Orders
    key={item.id}
    onRemovePizza={onRemovePizza}
    {...item} />)
  return orders
}

type Props = {}

function PizzaOrder () {
  const { loading, error, data } = useQuery(PIZZASIZE_QUERY)
  const { state: pizzaState, dispatch: pizzaDispatch } = usePizzaStore()
  const { state: userState, dispatch: userDispatch } = useUserStore()

  function onSelectSize (event, data) {
    if (!data.value) return
    const value = JSON.parse(data.value)
    pizzaDispatch({ type: RESET_PIZZA })
    pizzaDispatch({ type: CHANGE_SIZE,
      payload: {
        size: value.size.toUpperCase(),
        maxToppings: value.maxToppings
      }
    })
  }

  function onSelectTopping (checked, topping) {
    pizzaDispatch({ type: checked ? REMOVE_TOPPING : ADD_TOPPING, payload: topping })
  }

  function onAddOrder () {
    userDispatch({ type: ADD_PIZZA, payload: pizzaState })
    pizzaDispatch({ type: RESET_PIZZA })
  }

  function onCancelOrder () {
    pizzaDispatch({ type: RESET_PIZZA })
  }

  function onRemovePizza (id) {
    userDispatch({ type: REMOVE_PIZZA, payload: id })
  }

  function finishOrder () {
    console.info(JSON.stringify(userState))
  }

  return (
    <Grid.Column width='10'>
      <Header as='h2'>Choose your pizza size and toppings!!!</Header>
      <Form warning={!!pizzaState.maxToppings}>
        <Form.Group>
          <SmallInputSelect
            value={pizzaState.size ? JSON.stringify({ size: pizzaState.size.toLowerCase(), maxToppings: pizzaState.maxToppings }) : null}
            loading={loading}
            datalist={data || {}}
            id='pizza-size'
            label='Size:'
            onChange={onSelectSize}
            placeholder='Size...'/>
        </Form.Group>
        <Message warning>
              You can only choose {pizzaState.maxToppings} toppings!
        </Message>
        <Form.Group>
          {pizzaState.size && <Toppings
            selectedToppings={pizzaState.toppings}
            onSelectTopping={onSelectTopping}
            maxToppings={pizzaState.maxToppings}
            size={pizzaState.size} />}
        </Form.Group>
        { pizzaState.size && <Form.Group>
          <div>
            <Header sub>Current Price</Header>
            <span>$ {pizzaState.price.toFixed(2)}</span>
          </div>
        </Form.Group> }
        { pizzaState.size && <Form.Group>
          <Label.Group>
            <Label color='red' onClick={onCancelOrder} as='a'><Icon name='delete' /></Label>
            <Label color='green' onClick={onAddOrder} as='a'><Icon name='check' /></Label>
          </Label.Group>
        </Form.Group> }
      </Form>
      <Divider />
      <Container>
        {getOrdersEl(userState.orders, onRemovePizza)}
      </Container>
      <Divider />
      <Container>
        <Button.Group floated='right'>
          { userState.logged ? <Button disabled={userState.orders.length === 0} onClick={finishOrder}>Finsh Order</Button>
            : LoginModalHOC(<Button disabled={userState.orders.length === 0}>Finsh Order</Button>)}
        </Button.Group>
      </Container>
    </Grid.Column>
  )
}

export default PizzaOrder
