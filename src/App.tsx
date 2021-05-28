import React from 'react'
import './App.scss'
import Layout from './components/layout/Layout'
import Clients from './pages/clients/Clients'

function App(): JSX.Element {
  return (
    <div className="App">
      <Layout>
        <Clients />
      </Layout>
    </div>
  )
}

export default App
