import React, { Fragment } from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'

import PizzaHome from '../assets/images/pizza_home.jpg'

function Home() {
  return (
    <Fragment>
      <Grid.Column width={4}>
        <Image src={PizzaHome} />
      </Grid.Column>
      <Grid.Column width={9}>
        <Header as='h1'>
          Order your favorite pizza here at Waldo's Pizza!!
        </Header>
      </Grid.Column>
      <Grid.Column width={3}>
      </Grid.Column>
    </Fragment>
  );
}

export default Home
