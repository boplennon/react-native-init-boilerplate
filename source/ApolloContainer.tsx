import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactNavigator, { appUri } from './ReactNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
  }),
});

export default class ApolloContainer extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PaperProvider>
          <ReactNavigator uriPrefix={appUri} />
        </PaperProvider>
      </ApolloProvider>
    );
  }
}
