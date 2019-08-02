// @flow
import React from 'react'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

import Header from './components/Header'
import { Home, PizzaOrder, Status } from './routes'
import { UserStoreProvider } from './hooks/store/userProvider'
import { PizzaStoreProvider } from './hooks/store/pizzaProvider'

// TODO: should use config.json file?
const GQ_PIZZA_URL: string = 'https://core-graphql.dev.waldo.photos/pizza'
const client: GraphQLClient = new GraphQLClient({
  url: GQ_PIZZA_URL
})

function App () {
  return (
    <ClientContext.Provider value={client}>
      <Router>
        <UserStoreProvider>
          <Header/>
          <Grid centered>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/status' component={Status} />
              <PizzaStoreProvider>
                <Route path='/pizzaOrder' component={PizzaOrder} />
              </PizzaStoreProvider>
            </Switch>
          </Grid>
        </UserStoreProvider>
      </Router>
    </ClientContext.Provider>
  )
}

export default App
