/// <reference types="jest"/>
import React from 'react';
import { shallow } from 'enzyme';
import { SocialIcon } from 'react-native-elements';
import CrossGoogleLoginButton from './CrossGoogleLoginButton';

jest.unmock('react-native');
jest.unmock('react-native-elements');

function setup() {
  // @ts-ignore - Enzyme TypeScript issues
  const enzymeWrapper = shallow(
    <CrossGoogleLoginButton />
  );

  return {
    enzymeWrapper,
  };
}

describe('components', () => {
  describe('GoogleLogin', () => {
    const { enzymeWrapper } = setup();
    const loginBase = enzymeWrapper;

    it('should match snapshot', () => {
      expect(loginBase).toMatchSnapshot();
    });

    it('type should be google-plus-official', () => {
      const buttonGoogle = loginBase
        .find(SocialIcon)
        .first()
        .props();
      expect(buttonGoogle.type).toEqual('google-plus-official');
    });

    it('should be able to press', () => {
      const buttonGoogle = loginBase.find(SocialIcon).first();
      buttonGoogle.simulate('onPress');
    });
  });
});
