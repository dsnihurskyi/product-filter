import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './global/styles.css';

const client = new ApolloClient({
  uri: 'https://hydrogen-preview.myshopify.com/api/2022-07/graphql.json',
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': '3b580e70970c4528da70c98e097c2fa0',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
