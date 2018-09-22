/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * TypeScript implementation:
 * https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import SentryUtility from './sentry/SentryUtility';
import CrossConfigReader from './config/CrossConfigReader';
import CrossApolloClient from './apollo/CrossApolloClient';
import ReactNavigator, { GetAppUri } from './ReactNavigator';

if (!__DEV__) SentryUtility.install();

export default class App extends React.Component {
  render() {  const config = CrossConfigReader.GetEnv();
    return (
      <CrossApolloClient uri={GetAppUri()}>
        <PaperProvider>
          <ReactNavigator uriPrefix={config.APP_PREFIX} />
        </PaperProvider>
      </CrossApolloClient>
    );
  }
}
