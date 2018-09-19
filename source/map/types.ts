// map/types/index

/**
 * Map action types
 * @constant
 * @public
 * @typedef MapConstants
 * @type {Object}
 */
export enum MapConstants {
    MAP_LOCATION_BUSY = 'Letar upp dig',
    MAP_LOCATION_SUCCESS = 'MAP = GET LOCATION SUCCESS',
    MAP_LOCATION_FAILED = 'MAP = GET LOCATION FAILED',
  }
  
  /**
   * Describes coordiantes for a location on the map
   * @typedef ILocation
   * @type {Object}
   * @public
   * @export
   * @property {number?} latitude
   * @property {number?} longitude
   * @public
   */
  export interface ILatLng {
    latitude: number;
    longitude: number;
  }
  
  /**
   * Describes an area on the map
   *
   * @export
   * @interface ILocation
   * @extends {ILatLng}
   * @property {number?} latitudeDelta
   * @property {number?} longitudeDelta
   */
  export interface IRegion extends ILatLng {
    latitudeDelta: number;
    longitudeDelta: number;
  }
  
  export interface ILocation extends ILatLng {
    altitude: Number;
    timestamp: Number; // Milliseconds since Unix epoch
    accuracy: Number;
    altitudeAccuracy: Number;
    speed: Number;
  }
  
  /**
   * Describes padding on the map
   *
   * @export
   * @interface IEdgePadding
   */
  export interface IEdgePadding {
    top: Number;
    right: Number;
    bottom: Number;
    left: Number;
  }
  
  /**
   * Describes a pin on the map
   *
   * @export
   * @interface IMapPin
   */
  
  export interface IMapPin {
    isUser: boolean;
    location: string;
    title?: string;
    description?: string;
  }
  
  /**
   * Reduced properties passed down from LoginReducer
   * @typedef IMapState
   * @export
   * @public
   * @property {ILocation} location
   * @property {boolean} isUserSearch
   */
  export interface IMapState {
    location: IRegion;
    /**
     * determines if the location changed from user search. Default is false
     *
     * @type {boolean}
     * @memberof IMapState
     */
    isUserSearch: boolean;
    __typename: MapConstants;
  }
  
  /**
   * Creates a new {IMapState}
   * @param location user location
   * @param isUserSearch determines if the location changed from user search. Default is false
   * @param type action type
   */
  export const MapState = (
    location: IRegion = {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    isUserSearch = false,
    __typename = MapConstants.MAP_LOCATION_BUSY
  ) => {
    const r: IMapState = {
      location,
      isUserSearch,
      __typename,
    };
    return r;
  };
  