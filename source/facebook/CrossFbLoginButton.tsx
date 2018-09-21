import React from 'react';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import styles from '../styles';

/**
 * Uses the nativly linked Facebook SDK to log in
 *
 * https://github.com/facebook/react-native-fbsdk
 */
export const CrossFbLoginButton = () => (
    <LoginButton
    style={styles.button}
      onLoginFinished={(error, result) => {
        if (error) {
          console.log('Facebook login has error: ' + result.error);
        } else if (result.isCancelled) {
          console.log('Facebook login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            if (data) console.log(data.accessToken.toString());
          });
        }
      }}
      onLogoutFinished={() => console.log('logout.')}
    />
);

export default CrossFbLoginButton;
