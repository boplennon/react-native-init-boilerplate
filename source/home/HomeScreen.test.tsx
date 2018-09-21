import React from 'react';
import { shallow } from 'enzyme';

import HomeScreen from './HomeScreen';

function setup() {
  return shallow(
    // @ts-ignore - Enzyme TypeScript issues
    <HomeScreen />
  );
}

describe('components', () => {
  describe('HomeScreen', () => {
    it('renders correctly with defaults', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
