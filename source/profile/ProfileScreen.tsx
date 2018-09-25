import * as React from 'react';
import { CrossFbLoginButton } from '../facebook/CrossFbLoginButton';
import styles from '../styles';
import { View } from 'react-native';

export const ProfileScreen = () => (
  <View style={styles.container}>
    <CrossFbLoginButton />
  </View>
);

export default ProfileScreen;
