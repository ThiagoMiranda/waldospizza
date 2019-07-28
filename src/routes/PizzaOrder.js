import React, { Fragment } from 'react'
import { Grid, Container, Header, Form } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'
 
import { BigInputSelect, SmallInputSelect } from '../components/Inputs'
import Toppings from '../components/Toppings'

const PIZZASIZE_QUERY = `query PizzaSize {
  pizzaSizes {
    name,
    maxToppings
  }
}`

function PizzaOrder() {
  const { loading, error, data } = useQuery(PIZZASIZE_QUERY)

  return (
    <Fragment>
      <Grid.Column>
        <Container>
          <Header as='h2'>Choose your pizza size and toppings!!</Header>
          <Form>
            <Form.Group>
              <BigInputSelect id='pizza-type' label='Pizza:' placeholder='Choose your pizza...' />
              <SmallInputSelect loading={loading} datalist={data || {}} id='pizza-size' list='sizes' label='Size:' placeholder='Size...'/>
            </Form.Group>
            {data && <Toppings size='SMALL' />}
          </Form>
        </Container>
      </Grid.Column>
    </Fragment>
  );
}

export default PizzaOrder
