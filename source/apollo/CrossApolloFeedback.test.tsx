import React from 'react';
import TestRenderer from 'react-test-renderer';
import CrossApolloFeedback from './CrossApolloFeedback';
import { FormValidationMessage } from 'react-native-elements';
import CrossBusyIndicator from '../core/CrossBusyIndicator';

jest.unmock('react-native');
jest.unmock('react-native-elements');
jest.mock('../core/CrossBusyIndicator', () => 'View');

const wrapper = (busy: boolean, error: Error) =>
  TestRenderer.create(
    <CrossApolloFeedback
      loading={busy}
      error={error}
      loadingMessage="testing"
    />
  );

describe('components', () => {
  describe('<CrossApolloFeedback />', () => {
    it('should render self and subcomponents', () => {
      const json = wrapper(false, null).toJSON();
      expect(json).toMatchSnapshot();
    });

    it('given loading is true should have <CrossBusyIndicator />', () => {      
      const comp = wrapper(true, undefined);
        const childComponent = comp.root.findByType(CrossBusyIndicator);
        expect(childComponent).toBeDefined();
    });

    it('given error is passed should have <FormValidationMessage />', () => {      
      const comp = wrapper(false, new Error('testing'));
        const childComponent = comp.root.findByType(FormValidationMessage);
        expect(childComponent).toBeDefined();
    });
  });
});
