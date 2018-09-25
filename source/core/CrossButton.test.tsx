// core/components/BusyIndicator.test
/// <reference types="jest"/>
import React from 'react';
import CrossButton from './CrossButton';
import TestRenderer from 'react-test-renderer';

function setup(iconName: string, title: string) {
  return TestRenderer.create(
    <CrossButton iconName={iconName} title={title} onPress={jest.fn()} />
  );
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('<CrossButton />', () => {
    it('With title should render', () => {
      const wrapper = setup('home', 'home');
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('Without title should renders', () => {
      const wrapper = setup('map', null);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
