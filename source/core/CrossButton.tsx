import React from 'react';
// @ts-ignore
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Theme from '../Styles';
import { ViewStyle, StyleProp, View } from 'react-native';
import { Color } from 'csstype';
import { Colors } from '../Styles';
import _ from 'lodash';

export interface IButtonProps {
  onPress: Function;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textColor?: Color;
  iconName?: string;
  backgroundColor?: Color;
  title?: string;
}

/**
 * A custom button that displays as an icon if {@link title} is not supplied
 * @param param0 params
 */
export const CrossButton = ({
  onPress,
  disabled = false,
  style = null,
  title = undefined,
  iconName = undefined,
  backgroundColor = Colors.NextButton,
}: IButtonProps) => {
  return (
    <View style={Theme.container}>
      {_.isNil(title) ? (
        <Icon
          reverse
          onPress={() => onPress()}
          name={_.isNil(iconName) ? 'house' : iconName.toString()}
          type="font-awesome"
          color={backgroundColor}
        />
      ) : (
        <Button
          // @ts-ignore
          color={backgroundColor}
          disabled={disabled}
          style={style || Theme.button}
          onPress={() => onPress()}
          mode="contained"
        >
          {title}
        </Button>
      )}
    </View>
  );
};

export default CrossButton;
