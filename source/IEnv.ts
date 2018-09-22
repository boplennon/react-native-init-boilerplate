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
  SENTRY_URI: string;
}
