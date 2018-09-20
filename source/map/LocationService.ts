import { ILatLng, IRegion } from './types';
import _ from 'lodash';

export type LocationChangedCallback = (newLocation: ILatLng) => void;

const watchOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
};

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

class LocationServiceImplementation {
  /**
   * Watch for location changes
   * @param locationChanged Callback that occurs when location changes
   */
  watchLocation(locationChanged: LocationChangedCallback): void {
    // @ts-ignore - bad mappings
    navigator.geolocation.stopObserving();

    // Get the user's current location and watch
    navigator.geolocation.watchPosition(
      (location) => {
        if (_.isNil(location)) {
          return new Error('Failed to get location');
        }

        const result: ILatLng = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        // Send result to callback
        if (!_.isNil(locationChanged)) {
          locationChanged(result);
        }

        // Returns number?
        return 0;
      },
      async (error) => {
        return new Error(error.message);
      },
      watchOptions
    );
  }

  /**
   * Calculates area including delta for a collection of coordiantes
   * @param {Array<Coordinates>} - array of coordinates
   */
  getMapPointForCoordiantes = (coordinates: Array<ICoordinate>): IRegion => {
    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(coordinates[0]);

    _.map(coordinates, (point: ILatLng) =>
      // calculate rect
      ({
        minX: Math.min(minX, point.latitude),
        maxX: Math.max(maxX, point.latitude),
        minY: Math.min(minY, point.longitude),
        maxY: Math.max(maxY, point.longitude),
      })
    );

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = maxX - minX;
    const deltaY = maxY - minY;

    /**
     * @type {MapPoint}
     */
    const location: IRegion = {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
    };

    return location;
  };

  getCurrentLocation = (): Promise<ILatLng> => {
    return new Promise<ILatLng>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('** LocationService: user location **');
          console.log(position);
          const result: ILatLng = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log(result);
          resolve(result);
        },
        (error) => {
          console.error(error);
          throw Error(error.message);
        }
      );
    });
  };
}

const LocationService = new LocationServiceImplementation();

export default LocationService;
