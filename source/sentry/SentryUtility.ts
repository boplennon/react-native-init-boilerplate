import { Sentry } from 'react-native-sentry';
import _ from 'lodash';
import CrossConfigReader from '../config/CrossConfigReader';

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
      Sentry.config(
        CrossConfigReader.GetEnv().SENTRY_URI
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
