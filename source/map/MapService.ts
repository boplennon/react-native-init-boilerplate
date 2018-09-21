import _ from 'lodash';
import * as types from './types';

export interface IFitToCoordOptions {
  edgePadding: types.IEdgePadding;
  animated: boolean;
}

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
      console.log('** MapService got instance **');
      console.log(mapInstance);
    }
  }

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

    console.log('** MapService: goToCoordinate **');
    console.log(targetCoords);
    return this.map.animateToCoordinate(targetCoords, 2000);
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

    console.log('** MapService: GoToAngle ' + angle + ' **');
    return this.map.animateToViewingAngle(angle, duration);
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

    console.log('** MapService: goToBearing ' + bearing + ' **');
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

    console.log('** MapService: fitToCoordinates **');
    return this.map.fitToCoordinates(coordinates, options);
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
      if (!_.get(userLocation, ['latitude'], false)) {
        return;
      }

      return setTimeout(() => {
        if (this.map) {
          this.goToCoordinate(userLocation);

          this.goToAngle(45);
          const targetCord = new Array<types.ILatLng>({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          });
          this.fitToCoordinates(targetCord);

          this.isOnUserLocation = true;
          return true;
        }
        return false;
      }, 200);
      return true;
    } catch (ex) {
      console.log(ex);
      this.isOnUserLocation = false;
      return false;
    }
  }

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
