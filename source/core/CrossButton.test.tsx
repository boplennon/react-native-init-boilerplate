// core/components/BusyIndicator.test
/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import CrossButton from './CrossButton';

jest.unmock('react-native');

function setup(iconName:string, title:string) {

  const enzymeWrapper = shallow(<CrossButton iconName={iconName} title={title} onPress={jest.fn()}/>);

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
  describe('CrossButton', () => {
    it('With title should render', () => {
      const { enzymeWrapper } = setup('home', 'home');
      expect(enzymeWrapper).toMatchSnapshot();
    });

    it('Without title should renders', () => {
        const { enzymeWrapper } = setup('map', null);
        expect(enzymeWrapper).toMatchSnapshot();
      });
  });
});
