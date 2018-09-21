// core/components/BusyIndicator.test
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import CrossLabel from './CrossLabel';
import _ from 'lodash';

jest.unmock('react-native');

function setup(text:string, onPress?: () => void) {

  const enzymeWrapper = shallow(<CrossLabel onPress={!_.isNil(onPress)?onPress:jest.fn()}>{text}</CrossLabel>);

  return {
    enzymeWrapper,
  };
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('CrossLabel', () => {
    it('Without onPress should render', () => {
      const { enzymeWrapper } = setup('Hello');
      expect(enzymeWrapper).toMatchSnapshot();
    });

    it('With onPress should have link style', () => {
        const { enzymeWrapper } = setup('Click me', () =>{});
        expect(enzymeWrapper).toMatchSnapshot();
        // const text = enzymeWrapper.find(CrossLabel).at(0);
        // // @ts-ignore
        // expect(text.props().style).toEqual(styles.link);
      });
  });
});
