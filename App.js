/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FormLabel, Icon } from 'react-native-elements';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.github.com/graphql'
  },
  )
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text style={styles.welcome}>React Native "native" SanityCheck</Text>
          <Text style={styles.instructions}>Libraries:</Text>
          <View>
            <FormLabel>- react-native-vector-icons</FormLabel>
            <FormLabel>- react-native-elements</FormLabel>
            <FormLabel>- react-apollo</FormLabel>
            <FormLabel>- graphql</FormLabel>
            <FormLabel>- apollo-boost</FormLabel>
          </View>
          <FormLabel>React-Native Elements with icons</FormLabel>
          <FontAwesome name='map-o' color='blue' size={48} />
          <Icon type='font-awesome' color='purple' name='user-o' size={48} />
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    margin: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
