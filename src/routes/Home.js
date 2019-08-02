import React from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'

import PizzaHome from '../assets/images/pizza_home.jpg'

function Home () {
  return (
    <Grid.Column width='10'>
      <Image size='medium' src={PizzaHome} floated='left' />
      <Header as='h2'>
          Order your favorite pizza here at Waldo's Pizza!!
      </Header>
    </Grid.Column>
  )
}

export default Home
