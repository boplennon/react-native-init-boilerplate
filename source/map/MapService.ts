// map/reducers/index
// @ts-ignore
import _ from "lodash";
import * as types from "./types";

export interface IFitToCoordOptions {
  edgePadding: types.IEdgePadding;
  animated: boolean;
}

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 0;
// const LONGITUDE = 0;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const LATITUDE_DELTA = 0.0922;

/**
 * Provides functions for working with a {@link setMap} instance.
 *
 * Use static {@link Instance} Instance getter
 *
 * @public
 * @module MapService
 * @class MapService
 * @namespace MapService
 */
class MapService {
  /**
   * Get the service instance. Static.
   * @memberof MapService
   */
  static get Instance(): MapService {
    if (!this.classInstance) {
      this.classInstance = new MapService();
    }

    return this.classInstance;
  }

  static classInstance: any = null;

  /**
   * Sets the Map instance, required to use this service
   * @param {Object} mapInstance
   * @memberof MapService
   * @public
   */
  setMap(mapInstance: any) {
    if (mapInstance) {
      this.map = mapInstance;
      console.log("** MapService got instance **");
      console.log(mapInstance);
    }
  }

  //   onLongPress = (event) => {
  //     if (_.isNil(this.map)) {
  //       return;
  //     }

  //     this.map.animateToCoordinate(event.nativeEvent.coordinate);

  //     const marker = {
  //       key: 'second',
  //       latlng: event.nativeEvent.coordinate,
  //       title: 'this is the title',
  //       description: 'This is the description',
  //     };

  //     const markers = this.state.markers.slice();
  //     markers.push(marker);
  //     this.setState({ markers });
  //     this.setState(this.state.region: marker);
  //   };

  /**
   * Animates map to the specified coordinates
   *
   * @param {number} lat
   * @param {number} long
   * @memberof MapService
   * @public
   */
  goToCoordinate(coordinate: types.ILatLng) {
    if (_.isNil(this.map)) {
      return;
    }

    const targetCoords = {
      latitude: Number(coordinate.latitude),
      longitude: Number(coordinate.longitude),
    };

    console.log("** MapService: goToCoordinate **");
    console.log(targetCoords);
    this.map.animateToCoordinate(targetCoords, 2000);
  }

  /**
   * Animate to the specified viewing angle
   *
   * @see https://github.com/react-community/react-native-maps/blob/master/docs/mapview.md#methods
   *
   * @param {number} angle
   * @param {number} duration animation speed
   * @returns
   * @memberof MapService
   */
  goToAngle(angle: number, duration?: number) {
    if (_.isNil(this.map)) {
      return;
    }

    console.log("** MapService: GoToAngle " + angle + " **");
    this.map.animateToViewingAngle(angle, duration);
  }

  /**
   * Animate to the specified bearing
   *
   * @see https://github.com/react-community/react-native-maps/blob/master/docs/mapview.md#methods
   *
   * @param {number} bearing
   * @param {number} duration animation speed
   * @returns
   * @memberof MapService
   */
  goToBearing(bearing: number, duration?: number) {
    if (_.isNil(this.map)) {
      return;
    }

    console.log("** MapService: goToBearing " + bearing + " **");
    setTimeout(this.map.animateToBearing(bearing, duration), 10);
  }

  /**
   * Fit the map to supplied coordinates
   *
   * @param {Array<types.ILatLng>} coordinates
   * @param {{ edgePadding: types.IEdgePadding, animated: Boolean }} options
   * @returns
   * @memberof MapService
   */
  fitToCoordinates(coordinates: types.ILatLng[], options?: IFitToCoordOptions) {
    if (_.isNil(this.map)) {
      return;
    }

    console.log("** MapService: fitToCoordinates **");
    this.map.fitToCoordinates(coordinates, options);
  }

  /**
   * Animate to location in map state if available
   *
   * @memberof MapService
   * @public
   *
   * @param {Object} userLocation
   */
  goToUserLocation(userLocation: types.ILatLng) {
    if (_.isNil(userLocation)) {
      return;
    }

    this.isOnUserLocation = false;

    try {
      if (!_.get(userLocation, ["latitude"], false)) {
        return;
      }

      setTimeout(() => {
        if (this.map) {
          this.goToCoordinate(userLocation);

          this.goToAngle(45);
          const targetCord = new Array<types.ILatLng>({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          });
          this.fitToCoordinates(targetCord);

          this.isOnUserLocation = true;
        }
      }, 200);
    } catch (ex) {
      console.log(ex);
      this.isOnUserLocation = false;
    }
  }

  /**
   * Add location to map markers
   *
   * @memberof MapService
   * @public
   *
   * @param {Object} mapState Redux state property for MapReducer
   */
  addLocationToMarkers = (mapState: types.IMapState) => {
    if (_.isNil(mapState)) {
      return;
    }

    try {
      // const { markers } = this.state;
      if (_.isNil(mapState.location) || _.isNil(mapState.location.latitude)) {
        return;
      }

      // this.setState({ isBusy: true });

      // "Your location pin" functionality
      // TODO: Move to "create ad"
      /*
            const title = 'Din position';
            const userPin = {
              isUser: true,
              location: map.location,
              title,
              description: '',
            };
            const user = _.indexOf(_.find(markers, t => t.title === title));
            if (user) {
              return;
              // markers.splice(user, 1, userPin);
            }

            // Add user position to markers
            markers.push(userPin);

            this.setState({ markers });

            // const defaultPadding = 80;
            // const edgePadding = {
            //   top: defaultPadding, right: defaultPadding, bottom: defaultPadding, left: defaultPadding,
            // };
          */

      if (mapState) {
        this.goToCoordinate({
          latitude: mapState.location.latitude,
          longitude: mapState.location.longitude,
        });
        // this.map.fitToCoordinates(_.map(this.state.markers, m => m.location), {
        //   edgePadding,
        //   animated: true,
        // });
      }
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
    } finally {
      // this.setState({ isBusy: false });
    }
  };

  /**
   * Instance of React-Native Map
   */
  map: any = null;

  /**
   * Determines if the user location has been found
   * @type {boolean}
   * @public
   * @property
   */
  isOnUserLocation: boolean = false;
}

export default MapService;
