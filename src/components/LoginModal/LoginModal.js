// @flow
import React, { useState } from 'react'
import { Button, Form, Modal, Grid, Message } from 'semantic-ui-react'

import { BasicInput } from '../Inputs'
import { LOGIN } from '../../hooks/store/actions'
import { useStore } from '../../hooks/store/userProvider'
import { useForm } from '../../hooks/forms'
import JohnAvatar from '../../assets/images/avatar/user_avatar.png'

const User = {
  name: 'John Waldo',
  email: 'john.waldo@waldo.com',
  password: '123456',
  avatar: JohnAvatar
}

const loginValidation = {
  email: {
    required: true,
    validator: {
      // eslint-disable-next-line
      regEx: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //  not mine regex!!
      error: 'Invalid email'
    }
  },
  password: {
    required: true
  }
}

const loginForm = {
  email: { value: '', error: '' },
  password: { value: '', error: '' }
}

export default function LoginModal (props) {
  const { dispatch } = useStore()
  const { formState, disable, onChangeHandler, onSubmitHandler } = useForm(loginForm, loginValidation, onLogin)
  const [innvalidUser, setInvalidUser] = useState(false)
  const [loading, setLoading] = useState(false)

  function onLogin ({ email, password }) {
    setLoading(true)
    setTimeout(function () {
      setLoading(false)
      if (email.value !== User.email || password.value !== User.password) {
        setInvalidUser(true)
      } else {
        dispatch({ type: LOGIN, payload: User })
      }
    }, 1500)
  }

  return (
    <Modal trigger={props.trigger} size='small'>
      <Modal.Header>Please login</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Column width='10'>
            <Form error={innvalidUser} onSubmit={onSubmitHandler}>
              <Form.Field>
                <BasicInput
                  type='email'
                  label='Email:'
                  placeholder='Type your email...'
                  name='email'
                  value={formState.email.value}
                  onChange={onChangeHandler}
                  error={(formState.email.error.length > 0) ? formState.email.error : false } />
              </Form.Field>
              <Form.Field>
                <BasicInput
                  type='password'
                  label='Password:'
                  placeholder='Type your password...'
                  name='password'
                  value={formState.password.value}
                  onChange={onChangeHandler}
                  error={(formState.password.error > 0) ? formState.password.error : false } />
              </Form.Field>
              <Message
                error
                content='Invalid user!!!'
              />
              <Button loading={loading} disabled={disable} type='submit'>Login</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}
