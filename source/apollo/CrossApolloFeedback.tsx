import * as React from 'react';
import { View } from 'react-native';
import { FormValidationMessage } from 'react-native-elements';
import { styles } from '../styles';
import CrossBusyIndicator from '../core/CrossBusyIndicator';

interface IProps {
  error?: Error;
  loading?: boolean;
  loadingMessage?: string;
}

/**
 * Takes loading and error from GraphQL Apollo queries / mutations and displays the appropriate feedback
 * @param param0 {@link IProps} props
 */
export const CrossApolloFeedback = ({
  loading,
  error = undefined,
  loadingMessage = undefined,
}: IProps) => {
  if (loading === true) {
    console.log('** MOBILE: Loading ** ' + loadingMessage);
  }

  return (
    <View style={styles.container}>
      {error ? (
        <FormValidationMessage>{error.message}</FormValidationMessage>
      ) : null}
      {loading === true ? (
        <CrossBusyIndicator isBusy message={loadingMessage} />
      ) : null}
    </View>
  );
};

export default CrossApolloFeedback;
