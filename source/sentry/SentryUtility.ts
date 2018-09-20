import { Sentry } from 'react-native-sentry';
import _ from 'lodash';

/**
 * Utility for Sentry bug tracking (@see https://sentry.io/)
 *
 * Will configure tracking based on "config.expo.extra.sentryPublicDsn" expo configuration in app.json
 *
 * @class SentryUtility
 */
class SentryUtilityInternal {
  install() {
    if (_.isNil(Sentry)) {
      console.log(
        '** Warning: Sentry install called but module not found (SentryUtility) **'
      );
      return;
    }
    try {
      // Set up sentry bug tracking
      // TODO: Move to secret config
      Sentry.config(
        'https://6bedde4a9c0b4bc5b5a2b17973edc460@sentry.io/1284889'
      ).install();
      console.log('** Sentry installed and initiated (SentryUtility) **');
    } catch (e) {
      console.log(e);
    }
  }
}

// Global instance
const SentryUtility = new SentryUtilityInternal();
export default SentryUtility;
