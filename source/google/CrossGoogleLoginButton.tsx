import React from 'react';
import { SocialIcon } from 'react-native-elements';
import { GoogleSignin, ConfigureParams, User } from 'react-native-google-signin';
import { Platform } from 'react-native';
import CrossConfigReader from '../config/CrossConfigReader';

export interface ICrossGoogleProps {
  /**
   * Occurs when login succeeds. Passes the Google user
   */
  onLoggedIn?: (user: User) => void;
  /**
   * Occurs when login fails. Passes the exception
   */
  onLoginFailed?: (error: Error) => void;
}

/**
 * Google login button using React Native Elements button and `react-native-google-signin`
 *
 * https://github.com/react-native-community/react-native-google-signin
 *
 * @property onLoggedIn - occurs when login succeeds
 * @property onLoginFailed - occurs when login fails
 */
export class CrossGoogleLoginButton extends React.Component<ICrossGoogleProps> {

  constructor(props: ICrossGoogleProps) {
    super(props);
    this.googleAuthConfig = {
      webClientId: CrossConfigReader.GetEnv().GOOGLE_AUTH_WEBCLIENT_ID,
      offlineAccess: false,
    };

    if (Platform.OS === 'ios') {
      this.googleAuthConfig.iosClientId = 'TODO';
    }
  }
  async onPress() {
    await GoogleSignin.configure(this.googleAuthConfig);
    try {
      await GoogleSignin.hasPlayServices();

      console.log('** Google Signin begin **');
      const result = await GoogleSignin.signIn();

      console.log('** Google Signin returned **');
      console.log(result);
      if (this.props.onLoggedIn) {
        this.props.onLoggedIn(result);
      }

      // google services are available
    } catch (err) {
      console.error('play services are not available');
      if (this.props.onLoginFailed) {
        this.props.onLoginFailed(err);
      }
    }
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
  googleAuthConfig: ConfigureParams;
}

export default CrossGoogleLoginButton;
