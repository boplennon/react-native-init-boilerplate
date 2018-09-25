/// <reference types="jest"/>
import React from 'react';
import TestRenderer from 'react-test-renderer';
import CrossFbLoginButton from './CrossFbLoginButton';
import { LoginButton } from 'react-native-fbsdk';
import styles from '../styles';


function setup() {
  return TestRenderer.create(<CrossFbLoginButton />);
}

describe('components', () => {
  describe('<CrossFbLoginButton />', () => {
    const  wrapper = setup();

    it('should match snapshot', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should have button style', () => {
      const button = wrapper.root.findByType(LoginButton);
      expect(button.props.style).toEqual(styles.button);
    });
  });
});
