import React from 'react';
import CrossApolloClient from './CrossApolloClient';
import { Button, View } from 'react-native';
import TestRenderer from 'react-test-renderer';
import styles from '../styles';
import CrossBusyIndicator from '../core/CrossBusyIndicator';

jest.unmock('react-native');

const wrapper = TestRenderer.create(
  <CrossApolloClient>
    <Button onPress={() => console.log('Click')} title="child" />
  </CrossApolloClient>);

describe('components', () => {
  describe('CrossApolloClient', () => {
    it('should render self and subcomponents', () => {
      const json = wrapper.toJSON();
      expect(json).toMatchSnapshot();
    });

    it('should have child <CrossBusyIndicator />', () => {
      const child = wrapper.root.findByType(CrossBusyIndicator)
      expect(child).toBeDefined();
    });
  });
});
