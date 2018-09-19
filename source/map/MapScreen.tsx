import * as React from 'react';

import _ from 'lodash';
import * as types from './types';
import MapService from './MapService';
import { Text, View } from 'react-native';
import styles, { TabIconSize } from '../styles';
import { NavigationBottomTabScreenOptions } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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
  static navigationOptions: NavigationBottomTabScreenOptions = {
    tabBarIcon: <FontAwesome name='map-o' size={TabIconSize} color='white' />,
    tabBarLabel: <Text style={styles.tabBarLabel}>Map</Text>
  }

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
    return (
      <View style={styles.container}>
        <Text>TODO: Map</Text>
      </View>
      // <MapView
      //   maxZoomLevel={18}
      //   loadingEnabled
      //   showsBuildings={false}
      //   showsUserLocation
      //   showsMyLocationButton={true}
      //   toolbarEnabled={false}
      //   onRegionChangeComplete={(region: types.IRegion) => {
      //     if (_.isEqual(region, this.state.region)) {
      //       return;
      //     }

      //     this.setState({
      //       region,
      //     });
      //   }}
      //   loadingIndicatorColor='#00539b'
      //   region={this.state.region}
      //   showsCompass={true}
      //   ref={this.setMap}
      //   onMapReady={this.onMapReady}
      //   style={[Theme.container, { marginBottom: this.state.mapMargin }]}
      //   provider={PROVIDER_GOOGLE}
      // >
      // </MapView>
    );
  }
}

export default MapScreen;
