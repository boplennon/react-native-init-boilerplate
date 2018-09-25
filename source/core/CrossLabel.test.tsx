// core/components/BusyIndicator.test
/// <reference types="jest"/>
import React from 'react';
import CrossLabel from './CrossLabel';
import _ from 'lodash';
import TestRenderer from 'react-test-renderer';

jest.unmock('react-native');

function setup(text:string, targetUri?: string) {
  return TestRenderer.create(<CrossLabel onPressUrlTarget={targetUri}>{text}</CrossLabel>);
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('<CrossLabel />', () => {
    it('Without onPress should render', () => {
      const wrapper = setup('Hello', null);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('With onPressUrlTarget render', () => {
        const wrapper = setup('Click me', 'https://www.crossplatform.se/');
        expect(wrapper.toJSON()).toMatchSnapshot();
        // const text = enzymeWrapper.find(CrossLabel).at(0);
        // // @ts-ignore
        // expect(text.props().style).toEqual(styles.link);
      });
  });
});
