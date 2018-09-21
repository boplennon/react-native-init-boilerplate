import * as React from 'react';
import { ScrollView, Text, View, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CrossTabStatelessComponent } from '../ReactNavigator';
import styles, { TabIconSize } from '../styles';
import CrossLabel from '../core/CrossLabel';

export const HomeScreen: CrossTabStatelessComponent = () => (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.container}>
        <CrossLabel
          style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
        >
          React Native Init Boilerplate
        </CrossLabel>
        <CrossLabel>Tested Libraries:</CrossLabel>
        <CrossLabel>- 16.5.0 react</CrossLabel>
        <CrossLabel>- 0.57.0 react-native</CrossLabel>
        <CrossLabel
          onPress={() => Linking.openURL('https://www.typescriptlang.org/')}
        >
          - 3.0.3 typescript
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/kulshekhar/ts-jest')
          }
        >
          - 23.1.4 ts-jest
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/getsentry/react-native-sentry')
          }
        >
          - 0.39.0 react-native-sentry
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL(
              'https://github.com/react-community/react-native-maps'
            )
          }
        >
          - 0.21.0 react-native-maps
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/react-navigation/')
          }
        >
          - 2.14.2 react-navigation
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://callstack.github.io/react-native-paper/')
          }
        >
          - ^2.0.1 react-native-paper
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL(
              'https://github.com/react-navigation/react-navigation-material-bottom-tab-navigator'
            )
          }
        >
          - ^0.4.0 react-navigation-material-bottom-tabs
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL(
              'https://github.com/oblador/react-native-vector-icons'
            )
          }
        >
          - 5.0.0 react-native-vector-icons
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL(
              'https://github.com/react-native-training/react-native-elements'
            )
          }
        >
          - 0.19.0 react-native-elements
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/apollographql/react-apollo/')
          }
        >
          - 2.1.11 react-apollo
        </CrossLabel>
        <CrossLabel
          onPress={() => Linking.openURL('https://graphql.org/graphql-js/')}
        >
          - 14.0.2 graphql
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/aws-amplify/amplify-js')
          }
        >
          - 1.1.1 aws-amplify
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/facebook/react-native-fbsdk')
          }
        >
          - 0.8.0 react-native-fbsdk
        </CrossLabel>
        <CrossLabel
          onPress={() =>
            Linking.openURL('https://github.com/react-native-community/react-native-google-signin')
          }
        >
          - 1.0.0-rc5 react-native-google-signin
        </CrossLabel>
      </View>
    </ScrollView>
  </View>
);

HomeScreen.navigationOptions = {
  tabBarIcon: <FontAwesome name='home' size={TabIconSize} color='white' />,
  tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
};

export default HomeScreen;
