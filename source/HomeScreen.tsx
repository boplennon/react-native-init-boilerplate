import * as React from 'react';
import styles from './styles';
import { Text, View, ScrollView } from "react-native";
import { FormLabel, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const HomeScreen = () => (
    <View style={styles.container}>
        <Text style={styles.welcome}>React Native "native" SanityCheck</Text>
        <Text style={styles.instructions}>Tested Libraries:</Text>
        <ScrollView>
        <View>
            <FormLabel>- 16.5.0 react</FormLabel>
            <FormLabel>- 0.57.0 react-native</FormLabel>
            <FormLabel>- 3.0.3 typescript</FormLabel>
            <FormLabel>- 23.1.4 ts-jest</FormLabel>
            <FormLabel>- 2.14.2 react-navigation</FormLabel>
            <FormLabel>- 5.0.0 react-native-vector-icons</FormLabel>
            <FormLabel>- 0.19.0 react-native-elements</FormLabel>
            <FormLabel>- 2.1.11 react-apollo</FormLabel>
            <FormLabel>- 14.0.2 graphql</FormLabel>
            <FormLabel>- 0.1.16 apollo-boost</FormLabel>
            <FormLabel>- 1.1.1 aws-amplify</FormLabel>
        </View>
        </ScrollView>
        <FormLabel>React-Native Elements with icons</FormLabel>
        <FontAwesome name='map-o' color='blue' size={48} />
        <Icon type='font-awesome' color='purple' name='user-o' size={48} />
    </View>);

export default HomeScreen;