import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.scss'
import Layout from './components/layout/Layout'
import Clients from './pages/clients/Clients'
import Login from './pages/login/Login'
import Products from './pages/products/Products'

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/clients">
            <Layout>
              <Clients />
            </Layout>
          </Route>
          <Route path="/products">
            <Layout>
              <Products />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
