import React, { Fragment, useEffect } from 'react'
import { Grid, Container, Header, Form, Message } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'
 
import { SmallInputSelect } from '../components/Inputs'
import { Toppings, SelectedToppings } from '../components/Toppings'
import { useStore } from '../hooks/store/pizzaProvider'
import { ADD_TOPPING, REMOVE_TOPPING, CHANGE_SIZE } from '../hooks/store/actions'


const PIZZASIZE_QUERY = `query PizzaSize {
  pizzaSizes {
    name,
    maxToppings
  }
}`

function PizzaOrder() {
  const { loading, error, data } = useQuery(PIZZASIZE_QUERY)
  const { state, dispatch } = useStore()

  function onSelectSize(event, data) {
    const value = JSON.parse(data.value)
    dispatch({ type: CHANGE_SIZE, payload: { 
      size: value.size.toUpperCase(), 
      maxToppings: value.maxToppings } 
    })
  }
  
  function onSelectTopping(checked, topping) {
    dispatch({ type: checked ? REMOVE_TOPPING : ADD_TOPPING, payload: topping })
  }
  
  return (
    <Fragment>
      <Grid.Column width='10'>
        <Container>
          <Header as='h2'>Choose your pizza size and toppings!!</Header>
          <Form warning={!!state.maxToppings}>
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
              You can only choose {state.maxToppings} toppings!
            </Message>
            {state.size && <Toppings 
                        selectedToppings={state.toppings} 
                        selectTopping={onSelectTopping} 
                        size={state.size} />}
          </Form>
          <div>
            <Header sub>Total Price</Header>
            <span>$ {state.price.toFixed(2)}</span>
          </div>
        </Container>
      </Grid.Column>
    </Fragment>
  );
}

export default PizzaOrder
