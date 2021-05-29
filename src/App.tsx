import React from 'react'
import './App.scss'
import Layout from './components/layout/Layout'
import Clients from './pages/clients/Clients'
import Login from './pages/login/Login'

function App(): JSX.Element {
  return (
    <div className="App">
      {/* <Login />
      <div style={{ height: '200px' }} /> */}
      <Layout>
        <Clients />
      </Layout>
    </div>
  )
}

export default App
