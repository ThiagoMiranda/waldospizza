// @flow
import React, { useEffect } from 'react'
import { Form, Checkbox, Loader, Segment, Grid } from 'semantic-ui-react'
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

type Props = {
  onSelectTopping: Function,
  selectedToppings: Array<string>,
  size: string,
  maxToppings: number
}

export default function Toppings ({ onSelectTopping, selectedToppings, size, maxToppings }: Props) {
  const { loading, error, data } = useQuery(PIZZATOPPINGS_QUERY, {
    variables: {
      name: size
    }
  })
  let element

  useEffect(() => {
    if (data) onSelectTopping(false, data.pizzaSizeByName.toppings.find(({ defaultSelected }) => defaultSelected).topping)
  }, [data])

  if (error) return <Grid.Column size='10'>Couldn't connect to the server!!</Grid.Column>
  if (loading) element = <Segment><Loader active inline='centered' /></Segment>
  if (data) {
    element = data.pizzaSizeByName.toppings.map(({ topping, defaultSelected }) => {
      const checked = selectedToppings.join().indexOf(topping.name) > -1
      const disabled = !checked && selectedToppings.length === maxToppings

      return (
        <Form.Field key={topping.name} >
          <Checkbox
            disabled={disabled}
            label={topping.name}
            checked={checked}
            onChange={event => onSelectTopping(checked, topping)} />
        </Form.Field>
      )
    })
  }

  return (
    <Form.Group widths='15'>
      {element}
    </Form.Group>
  )
}
