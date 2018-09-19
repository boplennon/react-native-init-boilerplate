import * as React from 'react';

import _ from 'lodash';
import { Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationBottomTabScreenOptions } from 'react-navigation';
import styles, { TabIconSize } from '../styles';
import MapService from './MapService';
import * as types from './types';

interface IState {
  region?: types.IRegion;
  /**
   * User's physical location
   */
  userLocation?: types.ILatLng;
  mapMargin: number;
}

interface IProps {
  initialRegion?: types.IRegion;
}

export class MapScreen extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      mapMargin: 1,
      region: props.initialRegion || {
        latitude: 59.330839,
        longitude: 18.062976,
        latitudeDelta: 0.0059397161733585335,
        longitudeDelta: 0.005845874547958374,
      },
    };

    this.setMap = this.setMap.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.onUserLocationChange = this.onUserLocationChange.bind(this);
  }
  static navigationOptions: NavigationBottomTabScreenOptions = {
    tabBarIcon: <FontAwesome name="map-o" size={TabIconSize} color="white" />,
    tabBarLabel: <Text style={styles.tabBarLabel}>Map</Text>,
  };

  onMapReady() {
    this.setState({ mapMargin: 0 });
  }

  setMap(ref: any) {
    let mapInstance: any = null;
    if (ref && ref.root) {
      mapInstance = ref.root;
    } else if (ref) {
      mapInstance = ref;
    }

    if (mapInstance) {
      MapService.Instance.setMap(mapInstance);
    }
  }

  onUserLocationChange(coordiante: types.ILocation) {
    if (
      _.isEqual(this.state.userLocation, coordiante) ||
      MapService.Instance.isOnUserLocation
    ) {
      return;
    }

    this.setState({ userLocation: coordiante });
  }

  render() {
    return <Text>TODO</Text>;
  }
}

export default MapScreen;
