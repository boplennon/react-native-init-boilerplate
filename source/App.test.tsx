import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

function setup() {
  return shallow(<App />);
}

describe('components', () => {
  describe('ApolloContainer', () => {
    it('renders correctly with defaults', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
