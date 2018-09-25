import React from 'react';
import HomeScreen from './HomeScreen';
import TestRenderer from 'react-test-renderer';

function setup() {
  return TestRenderer.create(
    <HomeScreen />
  );
}

describe('components', () => {
  describe('<HomeScreen />', () => {
    it('renders correctly with defaults', () => {
      const wrapper = setup();
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});
