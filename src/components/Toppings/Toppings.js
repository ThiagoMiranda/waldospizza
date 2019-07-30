
import React, { useEffect } from 'react'
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

export default function Toppings({ selectTopping, selectedToppings, size }) {
  const { loading, error, data } = useQuery(PIZZATOPPINGS_QUERY, {
    variables: {
      name: size
    }
  })
  let element

  useEffect(() => {
    if(data) selectTopping(false, data.pizzaSizeByName.toppings.find(({ defaultSelected }) => defaultSelected).topping)
  }, [data])
  
  if (loading) element = <Segment><Loader active inline='centered' /></Segment>
  if (data) element = data.pizzaSizeByName.toppings.map(({ topping, defaultSelected }) => {
    const checked = selectedToppings.join().indexOf(topping.name) > -1
    
    return (
      <Form.Field key={topping.name} >
        <Checkbox 
          label={topping.name} 
          checked={checked} 
          onChange={event => selectTopping(checked, topping)} />
      </Form.Field>
    )
  })

  return (
    <Form.Group widths='15'>
      {element}
    </Form.Group>
  )
}