import React from 'react'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

import Header from './components/Header'
import { Home, PizzaOrder } from './routes'
import { UserStoreProvider } from './hooks/store/userProvider'
import { PizzaStoreProvider } from './hooks/store/pizzaProvider'

// TODO: should use config.json file?
const GQ_PIZZA_URL = 'https://core-graphql.dev.waldo.photos/pizza' 
const client = new GraphQLClient({
  url: GQ_PIZZA_URL
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <Router>
        <UserStoreProvider>
          <Header/>
          <Grid centered>
            <Switch>
              <Route exact path='/' component={Home} />
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