import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import styles, { Colors } from '../styles';

/**
 * Type of indicator
 *
 * @export
 * @enum {string}
 */
export enum IndicatorType {
  BallIndicator = 'BallIndicator',
  BarIndicator = 'BarIndicator',
  DotIndicator = 'DotIndicator',
  MaterialIndicator = 'MaterialIndicator',
  PacmanIndicator = 'PacmanIndicator',
  PulseIndicator = 'PulseIndicator',
  SkypeIndicator = 'SkypeIndicator',
  UIActivityIndicator = 'UIActivityIndicator',
  WaveIndicator = 'WaveIndicator',
}

/**
 * Generates a spinner of the provided type
 * @param param0 type and style
 */
export const Spinner = ({
  type,
  style = null,
  color = Colors.CrossLightBlue,
}: {
  type: IndicatorType;
  style?: any;
  color?: string;
}) => {
  switch (type) {
    case 'BallIndicator':
      return (
        <BallIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'BarIndicator':
      return (
        <BarIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'DotIndicator':
      return (
        <DotIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'PacmanIndicator':
      return (
        <PacmanIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'PulseIndicator':
      return (
        <PulseIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'SkypeIndicator':
      return (
        <SkypeIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'UIActivityIndicator':
      return (
        <UIActivityIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    case 'WaveIndicator':
      return (
        <WaveIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
    default:
      return (
        <MaterialIndicator
          // @ts-ignore
          style={style}
          color={color}
        />
      );
  }
};

/**
 * Describes the props BusyIndicator accepts
 *
 * @export
 * @interface IBusyIndicatorProps
 */
export interface IBusyIndicatorProps {
  /**
   * Determines if the indicator is animating or not. Default value is true
   *
   * @type {boolean}
   * @memberof IBusyIndicatorProps
   */
  isBusy: boolean;
  /**
   * Optional message to show while busy. Defaults to empty string.
   *
   * @type {string}
   * @memberof IBusyIndicatorProps
   */
  message?: string;
  /**
   * Type of spinner to use
   *
   * @type {IndicatorType}
   * @memberof IBusyIndicatorProps
   */
  type?: IndicatorType;
  /**
   * Test id to assign this component
   *
   * @type {string}
   * @memberof IBusyIndicatorProps
   */
  testID?: string;
  /**
   * User pressed cancel
   */
  onCancel?: () => void;
}

/**
 * Displays a busy indicator (spinner) when the parameter is true
 * @param {bool} isBusy determines if the indicator is animating or not. Default value is true
 * @param {string} message optional message to show while busy. Defaults to empty string.
 * @param {IndicatorType} type of spinner.Defaults to "MaterialIndicator"
 */
const CrossBusyIndicator = ({
  isBusy = true,
  message = '',
  type = IndicatorType.MaterialIndicator,
  testID = '1',
  onCancel,
}: IBusyIndicatorProps) =>
  isBusy ? (
    <View style={styles.overlay} testID={testID}>
      <View style={[styles.absoluteCentered]}>
        <View style={[styles.columnContentTopCenter]}>
          <Spinner type={type} style={[styles.spinner]} />
        </View>
        <View style={styles.columnContentTopCenter}>
          <Text style={styles.textSpinner}>{message}</Text>
          {onCancel ? (
            <TouchableOpacity onPress={onCancel}>
              <Text style={[styles.textSpinner, { color: Colors.CancelButton }]}>
                Avbryt
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  ) : null;

export default CrossBusyIndicator;
