import SentryUtility from './SentryUtility';

describe('components', () => {
  describe('SentryUtility', () => {
    it('should match snapshot', () => {
      expect(SentryUtility).toMatchSnapshot();
    });

    it('install should match snapshot', () => {
      expect(SentryUtility.install()).toMatchSnapshot();
    });
  });
});
