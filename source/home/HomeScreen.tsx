import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FormLabel, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CrossTabStatelessComponent } from '../ReactNavigator';
import styles, { TabIconSize } from '../styles';

export const HomeScreen: CrossTabStatelessComponent = () => (
  <View style={styles.container}>
    <Text>React Native "native" SanityCheck</Text>
    <Text>Tested Libraries:</Text>
    <ScrollView>
      <View>
        <FormLabel>- 16.5.0 react</FormLabel>
        <FormLabel>- 0.57.0 react-native</FormLabel>
        <FormLabel>- 3.0.3 typescript</FormLabel>
        <FormLabel>- 23.1.4 ts-jest</FormLabel>
        <FormLabel>- 0.39.0 react-native-sentry</FormLabel>
        <FormLabel>- 0.21.0 react-native-maps</FormLabel>
        <FormLabel>- 2.14.2 react-navigation</FormLabel>
        <FormLabel>- ^2.0.1 react-native-paper</FormLabel>
        <FormLabel>- ^0.4.0 react-navigation-material-bottom-tabs</FormLabel>
        <FormLabel>- 5.0.0 react-native-vector-icons</FormLabel>
        <FormLabel>- 0.19.0 react-native-elements</FormLabel>
        <FormLabel>- 2.1.11 react-apollo</FormLabel>
        <FormLabel>- 14.0.2 graphql</FormLabel>
        <FormLabel>- 0.1.16 apollo-boost</FormLabel>
        <FormLabel>- 1.1.1 aws-amplify</FormLabel>
      </View>
    </ScrollView>
    <FormLabel>Basic icon and one from Elements</FormLabel>
    <FontAwesome name='map-o' color='blue' size={48} />
    <Icon type='font-awesome' color='purple' name='user-o' size={48} />
  </View>
);

HomeScreen.navigationOptions = {
  tabBarIcon: <FontAwesome name='home' size={TabIconSize} color='white' />,
  tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
};

export default HomeScreen;
