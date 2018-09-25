/// <reference types="jest"/>
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { SocialIcon } from 'react-native-elements';
import CrossGoogleLoginButton from './CrossGoogleLoginButton';

jest.unmock('react-native');

function setup() {
  const wrapper = TestRenderer.create(<CrossGoogleLoginButton />);

  return {
    wrapper,
  };
}

describe('components', () => {
  describe('<CrossGoogleLoginButton />', () => {
    const { wrapper } = setup();
    const loginBase = wrapper;

    it('should match snapshot', () => {
      expect(loginBase.toJSON()).toMatchSnapshot();
    });

    it('type should be google-plus-official', () => {
      const buttonGoogle = loginBase.root.findByType(SocialIcon);
      expect(buttonGoogle.props.type).toEqual('google-plus-official');
    });

    it('should be able to press', () => {
      const buttonGoogle = loginBase.root.findByType(SocialIcon);
      buttonGoogle.props.onPress();
    });
  });
});
