
import React from 'react'
import { Form, Checkbox, Loader, Segment } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'
 
const PIZZATOPPINGS_QUERY = `query PizzaToppingBySize ($name: PizzaSizes) {
  pizzaSizeByName(name: $name) {
    toppings {
      defaultSelected,
      topping {
        name,
        price
      }
    }
  }
}`

export default function Toppings(props) {
  const { loading, error, data } = useQuery(PIZZATOPPINGS_QUERY, {
    variables: {
      name: props.size
    }
  })
  let element

  if (loading) element = <Segment><Loader active inline='centered' /></Segment>
  if (data) element = data.pizzaSizeByName.toppings.map(item => <Form.Field key={item.topping.name} >
    <Checkbox label={item.topping.name} checked={item.defaultSelected} />
  </Form.Field>)

  return (
    <Form.Group widths='15'>
      {element}
    </Form.Group>
  )
}