import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import store from './state/store'

import App from './App'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
)
