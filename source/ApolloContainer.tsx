import React, { Component } from 'react';
import ReactNavigator, { appUri } from './ReactNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { CrossApolloClient } from './apollo/CrossApolloClient';

export default class ApolloContainer extends Component {
  render() {
    return (
      <CrossApolloClient uri='https://api.github.com/graphql'>
        <PaperProvider>
          <ReactNavigator uriPrefix={appUri} />
        </PaperProvider>
      </CrossApolloClient>
    );
  }
}
