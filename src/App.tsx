import React from 'react'
import './App.scss'
import Header from './components/layout/Header'
import Clients from './pages/clients/Clients'

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Clients />
    </div>
  )
}

export default App
