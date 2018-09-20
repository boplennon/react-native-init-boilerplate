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
import ApolloContainer from './ApolloContainer';
import SentryUtility from './sentry/SentryUtility';

if (!__DEV__) SentryUtility.install();

export default class App extends React.Component {
  render() {
    return <ApolloContainer />;
  }
}
