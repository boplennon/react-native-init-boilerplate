import React from 'react';
import { View, TextProps, StyleSheet, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../styles';
import _ from 'lodash';

export interface ICrossLabelProps extends TextProps {
  /**
   * An url to open when user clicks the label. Styles the label as a clickable "link"
   */
  onPressUrlTarget?: string;
}

/**
 * A custom text compoent that displays as a link if {@param onPressUrlTarget} is supplied
 *
 * @param param0 {@link TextProps}
 */
export class CrossLabel extends React.Component<ICrossLabelProps> {
  constructor(props: ICrossLabelProps) {
    super(props);
  }

  render() {
    const url = _.get(this.props, ['onPressUrlTarget']);

    if (!_.isNil(url)) {
      return (
        <View style={styles.container}>
          <Text
            onPress={() => Linking.openURL(url.toString())}
            style={localStyles.link}
          />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text {...this.props}>{this.props.children}</Text>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  link: {
    color: 'blue',
    fontWeight: 'bold',
  }
});

export default CrossLabel;
