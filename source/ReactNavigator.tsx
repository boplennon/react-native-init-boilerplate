import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { HomeScreen } from './HomeScreen';
import { MapScreen } from './MapScreen';

export default createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `user${focused ? '' : '-o'}`;
        } else if (routeName === 'Map') {
          iconName = `map${focused ? '' : '-o'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        // @ts-ignore
        return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);