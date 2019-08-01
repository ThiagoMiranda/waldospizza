import React, { Fragment, useState } from 'react'
import { Grid, Container, Header, Form, Message, Button, Divider } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'
 
import { SmallInputSelect } from '../components/Inputs'
import { Toppings } from '../components/Toppings'
import Orders from '../components/Orders'
import { useStore as usePizzaStore } from '../hooks/store/pizzaProvider'
import { useStore as useUserStore } from '../hooks/store/userProvider'
import { ADD_TOPPING, REMOVE_TOPPING, CHANGE_SIZE, ADD_ORDER, RESET_PIZZA } from '../hooks/store/actions'


const PIZZASIZE_QUERY = `query PizzaSize {
  pizzaSizes {
    name,
    maxToppings
  }
}`

function getOrdersEl(pizzaOrders, onRemovePizza) {
  console.info(pizzaOrders)
  const orders = pizzaOrders.map(item => <Orders 
    key={item.id}
    onRemovePizza={onRemovePizza}
    {...item} />)
  return orders
}

function PizzaOrder() {
  const { loading, error, data } = useQuery(PIZZASIZE_QUERY)
  const { state: pizzaState, dispatch: pizzaDispatch } = usePizzaStore()
  const { state: userState, dispatch: userDispatch } = useUserStore()

  function onSelectSize(event, data) {
    if (!data.value) return
    const value = JSON.parse(data.value)
    pizzaDispatch({ type: CHANGE_SIZE, payload: { 
      size: value.size.toUpperCase(), 
      maxToppings: value.maxToppings } 
    })
  }
  
  function onSelectTopping(checked, topping) {
    pizzaDispatch({ type: checked ? REMOVE_TOPPING : ADD_TOPPING, payload: topping })
  }

  function onAddOrder() {
    userDispatch({ type: ADD_ORDER, payload: pizzaState })
    pizzaDispatch({ type: RESET_PIZZA })
  }

  function onCancelOrder() {
    pizzaDispatch({ type: RESET_PIZZA })
  }

  function onRemovePizza() {
    
  }
  
  return (
    <Fragment>
      <Grid.Column width='10'>
        <Container>
          <Header as='h2'>Choose your pizza size and toppings!!</Header>
          <Form warning={!!pizzaState.maxToppings}>
            <Form.Group>
              <SmallInputSelect 
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
                          selectTopping={onSelectTopping} 
                          size={pizzaState.size} />}
            </Form.Group>
            <Form.Group>
              <div>
                <Header sub>Total Price</Header>
                <span>$ {pizzaState.price.toFixed(2)}</span>
              </div>
              <Button.Group floated='right'>
                <Button onClick={onCancelOrder}>Cancel</Button>
                <Button positive onClick={onAddOrder}>Finish</Button>
              </Button.Group>
            </Form.Group>
          </Form>
        </Container>
        <Divider />
        <Container>
            {getOrdersEl(userState.orders, onRemovePizza)}
        </Container>
      </Grid.Column>
    </Fragment>
  );
}

export default PizzaOrder
