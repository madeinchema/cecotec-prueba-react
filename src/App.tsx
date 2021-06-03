import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.scss'
import Layout from './components/layout/Layout'
import Clients from './pages/clients/Clients'
import Login from './pages/login/Login'
import Products from './pages/products/Products'
import { loadCurrentUser } from './state/slices/currentUserSlice'

function App(): JSX.Element {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCurrentUser())
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Layout>
              <Login />
            </Layout>
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
