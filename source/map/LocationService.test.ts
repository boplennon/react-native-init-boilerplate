import LocationService from './LocationService';

describe('components', () => {
  describe('LocationService', () => {
    it('should match snapshot', () => {
      expect(LocationService).toMatchSnapshot();
    });
  });
});
