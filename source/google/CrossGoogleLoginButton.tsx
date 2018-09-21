import React from 'react';
import { SocialIcon } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import { Platform, StyleProp, ViewStyle } from 'react-native';

const configParam =
  Platform.OS === 'ios'
    ? {
        iosClientId: 'TODO: Settings',
      }
    : {};

    export interface ICrossGoogleLoginButtonProps {
      color?: string;
      style?: StyleProp<ViewStyle>;
    }

/**
 * Google login button using React Native Elements button and `react-native-google-signin`
 */
export class CrossGoogleLoginButton extends React.Component<ICrossGoogleLoginButtonProps> {
  async onPress() {
    await GoogleSignin.configure({
      ...configParam,
      webClientId: 'TODO: Settings',
      offlineAccess: false,
    });

    // Google native signin

    const result = await GoogleSignin.signIn();

    console.log('** Google Signin **');
    console.log(result);
  }

  render() {
    // Social icon's click works badly in debug so we return a normal button
    // if (__DEV__)
    //     return <Button title='Google debug' onPress={() => onPress()} />;
    return (
      <SocialIcon
      {...this.props}
        title='Log in with Google'
        button
        onPress={this.onPress.bind(this)}
        type='google-plus-official'
      />
    );
  }
}

export default CrossGoogleLoginButton;
