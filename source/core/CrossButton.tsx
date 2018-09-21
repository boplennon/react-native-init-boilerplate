import React from 'react';
// @ts-ignore
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Theme from '../Styles';
import { ViewStyle, StyleProp, View, ButtonProps } from 'react-native';
import { Color } from 'csstype';
import _ from 'lodash';

/**
 * Extends button props. Remarks: use custom {@link onPressButton} event
 */
export interface IButtonProps extends ButtonProps {
  textColor?: Color;
  iconName?: string;
  backgroundColor?: Color;
  style?: StyleProp<ViewStyle>;
  /**
   * Custom pressed event to use instead of `onPress`
   */
  onPressButton?: () => void;
}

/**
 * A custom button that displays as an icon if {@param title} is not supplied
 *
 * Remarks: use custom {@param onPressButton} event
 * @param param0 params
 */
export class CrossButton extends React.Component<IButtonProps> {
  render() {
  return (
    <View style={Theme.container}>
      {_.isNil(this.props.title) ? (
        <Icon
          reverse
          {...this.props}
          onPress={this.props.onPressButton ? this.props.onPressButton : () => console.log('CrossButton')}
          name={_.isNil(this.props.iconName) ? 'house' : this.props.iconName.toString()}
          type='font-awesome'
          color={this.props.backgroundColor}
        />
      ) : (
        <Button
          color={this.props.backgroundColor}
          {...this.props}
          style={this.props.style || Theme.button}
          onPress={this.props.onPressButton ? this.props.onPressButton : () =>  console.log('CrossButton')}
          mode='contained'
        >
          {this.props.title}
        </Button>
      )}
    </View>
  ); }
}

export default CrossButton;
