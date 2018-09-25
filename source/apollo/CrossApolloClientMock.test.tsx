import React from 'react';
import CrossApolloClientMock, { DefaultOptions } from './CrossApolloClientMock';
import { Button } from 'react-native';
import TestRenderer from 'react-test-renderer';

jest.unmock('react-native');

const wrapper = TestRenderer.create(
  <CrossApolloClientMock options={DefaultOptions}>
    <Button onPress={() => console.log('Click')} title="child" />
  </CrossApolloClientMock>
);

describe('components', () => {
  describe('<CrossApolloClientMock />', () => {
    it('should render self and subcomponents', () => {
      const json = wrapper.toJSON();
      expect(json).toMatchSnapshot();
    });

    it('button chould have title child', () => {
      const btn = wrapper.root.findByType(Button);
      expect(btn.props.title).toBe('child');
    });
  });
});
