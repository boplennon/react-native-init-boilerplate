import * as React from 'react';
import { CrossFbLoginButton } from '../facebook/CrossFbLoginButton';
import styles, { TabIconSize } from '../styles';
import { View, Text } from 'react-native';
import { CrossTabStatelessComponent } from '../CrossNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ProfileScreen:CrossTabStatelessComponent = () => (
  <View style={[styles.container, styles.paddingDefault]}>
    <CrossFbLoginButton />
  </View>
);

ProfileScreen.navigationOptions = {
  tabBarIcon: <FontAwesome name="user" size={TabIconSize} color="white" />,
  tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
};

export default ProfileScreen;
