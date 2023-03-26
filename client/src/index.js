import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import reportWebVitals from './reportWebVitals';
import {ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink} from '@apollo/client'
import {onError} from '@apollo/client/link/error'
import { typePolicies } from './optionsForCache/typePolicies';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if(graphQLErrors) {
    graphQLErrors.forEach(({messages, locations, path}) => {
      console.log(`[GraphqlError]: Message: ${messages}, Location: ${locations}, Path: ${path}`)
    })
  }
  if(networkError) {
    console.log(`NetworkError: ${networkError}`)
  }
})

const httpLink = new HttpLink({uri: "http://localhost:3000/graphql"})

export const client = new ApolloClient({
  // uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({
    typePolicies
  }),
  link: from([errorLink, httpLink]),
  connectToDevTools: true
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
