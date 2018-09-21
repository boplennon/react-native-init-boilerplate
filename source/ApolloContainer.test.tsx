import React from 'react';
import { shallow } from 'enzyme';

import ApolloContainer from './ApolloContainer';


function setup() {
  return shallow(<ApolloContainer />);
}

describe('components', () => {
  describe('ApolloContainer', () => {
    it('renders correctly with defaults', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
