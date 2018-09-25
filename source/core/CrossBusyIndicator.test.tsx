// core/components/BusyIndicator.test
/// <reference types="jest"/>
import React from 'react';
import TestRenderer from 'react-test-renderer';

import CrossBusyIndicator, {
  IBusyIndicatorProps,
  IndicatorType,
  Spinner,
} from './CrossBusyIndicator';

jest.unmock('react-native');

function setup(type = IndicatorType.MaterialIndicator) {
  const props: IBusyIndicatorProps = {
    isBusy: true,
    type,
  };

  const wrapper = TestRenderer.create(<CrossBusyIndicator {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components', () => {
  /**
   * Test component rendering. Properties of children might be tested by importing their type:
   *
   *    const busyProps = enzymeWrapper.find(BusyIndicator).props();
   *    expect(busyProps.isBusy).toBe(false);
   */
  describe('<CrossBusyIndicator />', () => {
    it('should render self and subcomponents', () => {
      const { wrapper } = setup();
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should use DotIndicator type', () => {
      const { wrapper } = setup(IndicatorType.DotIndicator);
      expect(wrapper.root.findByType(Spinner)).toBeDefined();
    });
  });
});
