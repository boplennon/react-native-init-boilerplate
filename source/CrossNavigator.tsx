import { Platform } from 'react-native';
import {
  NavigationBottomTabScreenOptions,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  createMaterialBottomTabNavigator,
  TabConfig,
} from 'react-navigation-material-bottom-tabs';
import { HomeScreen } from './home/HomeScreen';
import { MapScreen } from './map/MapScreen';
import { Colors } from './styles';
import CrossConfigReader from './config/CrossConfigReader';
import ProfileScreen from './profile/ProfileScreen';

const tabBarOptions: TabConfig = {
  activeTintColor: Colors.CrossYellow,
  barStyle: { backgroundColor: Colors.CrossLightBlue },
  inactiveTintColor: Colors.CrossDarkBlue,
  initialRouteName: 'Home',
};

/**
 * Uri used to navigate to this app
 *
 * On Android, the URI prefix typically contains a host in addition to scheme
 *
 * On Android, note the required / (slash) at the end of the host property
 */
export const GetAppUri = () => {
  const appPrefix = CrossConfigReader.GetEnv().APP_PREFIX;
  return Platform.OS === 'android'
    ? `${appPrefix}://${appPrefix}/`
    : `${appPrefix}://`;
};

export interface CrossTabStatelessComponent extends React.StatelessComponent {
  navigationOptions?: NavigationBottomTabScreenOptions;
}

const routeConfig: NavigationRouteConfigMap = {
  Home: HomeScreen,
  Map: MapScreen,
  Profile: ProfileScreen,
};

export const CrossNavigator = createMaterialBottomTabNavigator(
  routeConfig,
  tabBarOptions
);

export default CrossNavigator;
