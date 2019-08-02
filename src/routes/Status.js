// @flow
import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Grid, Header, Container, Progress, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { useStore as useUserStore } from '../hooks/store/userProvider'
import { RESET_ORDERS } from '../hooks/store/actions'
import Orders from '../components/Orders'

//  const teste = { name: 'John Waldo', email: 'john.waldo@waldo.com', avatar: '/static/media/user_avatar.62701a40.png', orders: [{ price: 2.28, size: 'SMALL', toppings: ['cheese', 'bannana peps', 'sausage'], id: 'ne3mf' }, { price: 2.58, size: 'LARGE', toppings: ['pepperoni', 'bannana peps', 'sausage'], id: 'i5pba' }, { price: 1.98, size: 'LARGE', toppings: ['pepperoni', 'onion', 'sausage'], id: 'owjg5' }, { price: 2.58, size: 'LARGE', toppings: ['pepperoni', 'bannana peps', 'sausage'], id: 'gzunl' }], logged: true, password: '123456' }

function useInterval (cb, time) {
  const saved = useRef()

  useEffect(() => {
    saved.current = cb
  })

  useEffect(() => {
    if (saved.current) {
      const id = setInterval(saved.current, time)
      return () => clearInterval(id)
    }
  })
}

function OrderStatus () {
  const { state, dispatch } = useUserStore()
  const [status, setStatus] = useState({ color: 'grey', percent: 33, message: 'Baking your fresh pizza!!!' })
  let total = 0

  useEffect(() => {
    let id

    function clearOrders () {
      dispatch({ type: RESET_ORDERS })
    }
    if (status.percent === 100) id = setTimeout(clearOrders, 3000)
    return () => clearTimeout(id)
  }, [status.percent])

  function callback () {
    const percent = (status.percent + 33) > 100 ? 100 : status.percent + 33

    setStatus({
      percent: percent,
      message: percent === 100 ? 'Enjoy your pizza!!!' : 'The delivery guy is going to your house!!',
      color: percent === 100 ? 'green' : 'grey'
    })
  }

  useInterval(callback, 3000)

  const orders = state.orders.map(item => {
    total += item.price
    return (<Orders
      key={item.id}
      {...item} />)
  })

  return (
    <Grid.Column width='10'>
      { state.orders.length > 0 ? <Fragment><Header as='h2'>Thanks for ordering!!!</Header>
        <Container>{orders}</Container>
        <Divider />
        <Container>
          <Header as='h3'>{`Your total is $${total.toFixed(2)} + taxes`}</Header>
          <Progress active={status.percent !== 100} color={status.color} percent={status.percent}>{status.message}</Progress>
        </Container></Fragment> : <Header as='h2'>There are no orders!!! <Link to='pizzaOrder'>Make one</Link></Header>}
    </Grid.Column>
  )
}

export default OrderStatus
