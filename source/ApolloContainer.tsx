import React, { Component } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import ReactNavigator from './ReactNavigator';
import { appUri } from './ReactNavigator';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.github.com/graphql'
  },
  )
});

export default class ApolloContainer extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReactNavigator uriPrefix={appUri} />
      </ApolloProvider>
    );
  }
}
