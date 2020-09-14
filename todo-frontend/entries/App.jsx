import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Todo from '../components/Todo';
import Layout from '../components/Layout';

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: "http://localhost:3000/graphql"
});

/** apollo client setup */
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const ApolloApp = (
  <ApolloProvider client={client}>
      <Layout heading="Anywhere Todo">
        <Todo/>
      </Layout>
  </ApolloProvider>
);

render(ApolloApp, document.getElementById('app'));
