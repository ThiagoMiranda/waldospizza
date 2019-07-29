// @flow
import React, { Fragment } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

type InputProps = {
  id: string,
  label: string,
  placeholder: string,
  datalist: Array<any>
}

export function BasicInput(props: InputProps) {
  return (
    <Form.Input 
      fluid
      width={16}
      {...props} />
  )
}

export function BigInputSelect(props: InputProps) {
  return (
    <Form.Input 
      fluid
      width={10}
      {...props} />
  )
}

export function SmallInputSelect(props: InputProps) {
  const options = (props.datalist.pizzaSizes || []).map(item => ({ key: item.name, text: item.name, value: JSON.stringify({ size: item.name, maxToppings: item.maxToppings }) }))
  
  return (
    <Fragment>
      <Dropdown
        clearable
        selection
        options={options} 
        {...props}/>
    </Fragment>
  )
}

