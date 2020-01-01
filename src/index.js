import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import { render } from 'react-dom'
import App from './App'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: `http://localhost:${process.env.PORT}/graphql`
})

const client = new ApolloClient({
  cache,
  link
})

const root = document.getElementById('root')

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  root
)
