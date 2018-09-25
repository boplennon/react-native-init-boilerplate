import React from 'react';
import { View, TextProps, StyleSheet, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import Theme from '../styles';
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
    const url = this.props.onPressUrlTarget;
    let style = this.props.style;

    let urlProp: TextProps = {};

    if (!_.isNil(url)) {
      urlProp = {
        onPress: () => Linking.openURL(url.toString()),
      };
      style = localStyles.link;
    }

    return (
      <View style={Theme.container}>
        <Text {...this.props} {...urlProp} style={style}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default CrossLabel;
