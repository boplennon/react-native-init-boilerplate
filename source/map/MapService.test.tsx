import * as React from 'react';
import MapService from './MapService';
import MapView from 'react-native-maps'; 


const mapMock = {
        animateToViewingAngle: (angle) => angle * 2,
        animateToBearing: (angle) => angle * 3,
        animateToCoordinate: () => true,
        fitToCoordinates: () => true,
        goToCoordinate: () => true,
      };

describe('services', () => {
  describe('MapService', () => {
    it('Should be singelton instance', () => {
      const map1 = MapService.Instance;
      const map2 = MapService.Instance;
      // @ts-ignore
      map2.map = <MapView />;

      expect(map1).toBe(map2);
    });

    it('goToAngle with 10 returns 20', () => {
      const mapService = MapService.Instance;
      // @ts-ignore
      mapService.map = mapMock;

      expect(mapService.goToAngle(10, 0)).toBe(20);
    });

    it('fitToCoordinates returns true', () => {
      const mapService = MapService.Instance;
      // @ts-ignore
      mapService.map = mapMock;

      expect(mapService.fitToCoordinates([{latitude: 1, longitude: 2}])).toBeTruthy();
    });

    it('goToCoordinate returns true', () => {
      const mapService = MapService.Instance;
      // @ts-ignore
      mapService.map = mapMock;

      expect(mapService.goToCoordinate({latitude: 1, longitude: 2})).toBeTruthy();
    });

    it('goToUserLocation returns true', () => {
      const mapService = MapService.Instance;
      // @ts-ignore
      mapService.map = mapMock;

      expect(mapService.goToUserLocation({latitude: 1, longitude: 2})).toBeTruthy();
    }, 300);
  });
});
