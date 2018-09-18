import * as React from 'react';
import styles from './styles';
import { Text, View } from "react-native";
import { FormLabel, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const HomeScreen = () => (
    <View style={styles.container}>
        <Text style={styles.welcome}>React Native "native" SanityCheck</Text>
        <Text style={styles.instructions}>Tested Libraries:</Text>
        <View>
            <FormLabel>- react-native-vector-icons</FormLabel>
            <FormLabel>- react-native-elements</FormLabel>
            <FormLabel>- react-apollo</FormLabel>
            <FormLabel>- graphql</FormLabel>
            <FormLabel>- apollo-boost</FormLabel>
            <FormLabel>- aws-amplify</FormLabel>
        </View>
        <FormLabel>React-Native Elements with icons</FormLabel>
        <FontAwesome name='map-o' color='blue' size={48} />
        <Icon type='font-awesome' color='purple' name='user-o' size={48} />
    </View>);

export default HomeScreen;