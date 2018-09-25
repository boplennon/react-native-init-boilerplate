/**
 * Type mapping for the `.env` config file in application root
 */
export interface IEnv {
  /**
   * App common name
   */
  APP_NAME: string;
  /**
   * URI to the apps backend
   */
  API_URL: string;
  /**
   * Prefix used to identify this app
   */
  APP_PREFIX: string;
  GOOGLE_MAPS_API_KEY: string;
  /**
   * Google authentication. Client ID of type WEB for your server (needed to verify user ID and offline access)
   *
   * https://github.com/react-native-community/react-native-google-signin
   */
  GOOGLE_AUTH_WEBCLIENT_ID: string;
  SENTRY_URI: string;
  FACEBOOK_APP_ID: string;
  FACEBOOK_DISPLAY_NAME: string;
  /**
   * The Android numeric version code. Must be integer
   */
  ANDROID_VERSION_CODE: number;
  /**
   * The android string version code, e.g "1.0"
   */
  ANDROID_VERSION_NAME: string;
  IOS_VERSION: string;
}
