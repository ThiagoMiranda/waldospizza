import React from 'react'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

import Header from './components/Header'
import { Home, PizzaMenu, PizzaOrder } from './routes'

// TODO: should use config.json file?
const GQ_PIZZA_URL = 'https://core-graphql.dev.waldo.photos/pizza' 
const client = new GraphQLClient({
  url: GQ_PIZZA_URL
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <Router>
        <Header/>
        <Grid>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/pizzaOrder' component={PizzaOrder} />
            <Route path='/pizzaMenu' component={PizzaMenu} />
          </Switch>
        </Grid>
      </Router>
    </ClientContext.Provider>
  )
}  

export default App