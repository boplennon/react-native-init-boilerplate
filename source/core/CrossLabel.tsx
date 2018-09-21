import React from 'react';
import { Text } from 'react-native-paper';
import Theme from '../styles';
import { View, TextProps } from 'react-native';
import styles from '../styles';
import _ from 'lodash';

/**
 * A custom text compoent that displays as a link if {@param onPress} is supplied
 *
 * @param param0 {@link TextProps}
 */
export class CrossLabel extends React.Component<TextProps> {
  constructor(props: TextProps) {
    super(props);
  }

  render() {
    const style = !_.isNil(this.props.onPress) ? styles.link : this.props.style;
    return (
      <View style={Theme.container}>
        <Text {...this.props} style={style}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

export default CrossLabel;
