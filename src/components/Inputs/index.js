// @flow
import React, { Fragment } from 'react'
import { Form } from 'semantic-ui-react'

type InputProps = {
  id: string,
  label: string,
  placeholder: string,
  datalist: Array<any>
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
  const options = (props.datalist.pizzaSizes || []).map(item => <option key={item.name} value={item.name}/>)
  
  return (
    <Fragment>
      <Form.Input 
        list='sizes'
        fluid
        width={2}
        {...props}/>
      <datalist id={props.list}>{options}</datalist>  
    </Fragment>
  )
}

