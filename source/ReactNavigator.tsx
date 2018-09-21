import { Platform } from 'react-native';
import {
  NavigationBottomTabScreenOptions,
  NavigationRouteConfigMap
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator,
  TabConfig
} from 'react-navigation-material-bottom-tabs';
import { HomeScreen } from './home/HomeScreen';
import { MapScreen } from './map/MapScreen';
import { Colors } from './styles';

const tabBarOptions: TabConfig = {
  activeTintColor: Colors.CrossYellow,
  barStyle: { backgroundColor: Colors.CrossLightBlue },
  inactiveTintColor: Colors.CrossDarkBlue,
  initialRouteName: 'Home',
};

/**
 * Prefix used to identify this app
 */
export const appPrefix = 'myapp';

// on Android, the URI prefix typically contains a host in addition to scheme
// on Android, note the required / (slash) at the end of the host property
/**
 * Uri used to navigate to this app
 */
export const appUri =
  Platform.OS === 'android'
    ? `${appPrefix}://${appPrefix}/`
    : `${appPrefix}://`;

export interface CrossTabStatelessComponent extends React.StatelessComponent {
  navigationOptions?: NavigationBottomTabScreenOptions;
}

const routeConfig: NavigationRouteConfigMap = {
  Home: HomeScreen,
  Map: MapScreen,
};

export const ReactNavigator = createMaterialBottomTabNavigator(
  routeConfig,
  tabBarOptions
);

export default ReactNavigator;
