import * as React from 'react';

import _ from 'lodash';
import { Text, Alert, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationBottomTabScreenOptions } from 'react-navigation';
import styles, { TabIconSize } from '../styles';
import MapService from './MapService';
import MapView, {
// @ts-ignore - missing in definition
  PROVIDER_GOOGLE,
  MarkerAnimated,
  Callout,
} from 'react-native-maps';
import * as types from './types';
import { Colors } from '../styles';
import LocationService from './LocationService';

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
    this.updateCoordinate = this.updateCoordinate.bind(this);
    this.getPredefinedPlaces = this.getPredefinedPlaces.bind(this);
    this.goToUserLocation = this.goToUserLocation.bind(this);
  }
  static navigationOptions: NavigationBottomTabScreenOptions = {
    tabBarIcon: <FontAwesome name="map-o" size={TabIconSize} color="white" />,
    tabBarLabel: <Text style={styles.tabBarLabel}>Map</Text>,
  };

  onMapReady() {
    this.setState({ mapMargin: 0 });
  }

  async componentDidMount() {
    this.goToUserLocation();
  }

  async goToUserLocation() {
    const coordinate = await LocationService.getCurrentLocation();
    this.updateCoordinate(coordinate, true);
  }

  /**
   * Get list of predefined places available in autocomplete
   */
  getPredefinedPlaces(): Array<Object> {
    const { userLocation } = this.state;
    if (!_.isNil(userLocation)) {
      const userPlace = {
        description: 'Min nuvarande plats',
        geometry: {
          location: {
            lat: userLocation.latitude,
            lng: userLocation.longitude,
          },
        },
      };
      return [userPlace];
    }

    return [];
  }

  /**
   * Update current coordinate on map
   * @param coordinate new lat ; lng
   * @param isUserLocation `true` if user's physical location
   */
  updateCoordinate(coordinate: types.ILatLng, isUserLocation: boolean = false) {
    if (!isUserLocation) {
      return;
    }

    this.setState({
      userLocation: coordinate,
    });

    console.log('** MapPage: go to user location **');
    MapService.Instance.goToUserLocation(coordinate);
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
      <MapView
        maxZoomLevel={18}
        loadingEnabled
        showsBuildings={true}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={true}
        onRegionChangeComplete={(region: types.IRegion) => {
          if (_.isEqual(region, this.state.region)) {
            return;
          }

          this.setState({
            region,
          });
        }}
        loadingIndicatorColor={Colors.CrossLightBlue}
        showsCompass={true}
        ref={this.setMap}
        onMapReady={this.onMapReady}
        style={[styles.container, { marginBottom: this.state.mapMargin }]}
        provider={PROVIDER_GOOGLE}
      >
        {this.state.userLocation ? (
          <MarkerAnimated
            key={0}
            draggable={true}
            coordinate={this.state.userLocation}
          >
            <Callout tooltip onPress={() => Alert.alert('Pressed marker!')}>
            <View style={[styles.centerVerticalAndHorizontal, {backgroundColor: Colors.CrossLightBlue, padding: 10}]}>
              <Text style={[{color: 'white'}, styles.textCenter]}>Try pressing me or dragging the marker</Text>
              </View>
            </Callout>
          </MarkerAnimated>
        ) : null}
      </MapView>
    );
  }
}

export default MapScreen;
