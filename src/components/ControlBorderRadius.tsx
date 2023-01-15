import { Slider } from '@miblanchard/react-native-slider';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { GlobalSetting } from './GlobalSetting';
export const ControlBorderRadius = () => {
  const onValueChange = (value: any) => {
    GlobalSetting.spacing.value = value;
  };
  const onRadiusValueChange = (value: any) => {
    if (value.length > 0) {
      GlobalSetting.radius.value = value[0];
    } else {
      GlobalSetting.radius.value = value;
    }
  };
  const style = StyleSheet.create({
    rootContainer: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 35,
      display: 'flex',
      alignItems: 'center',
    },
    sliderContainer: {
      padding: 0,
      flex: 1,
    },
  });
  const renderPaddingSliderControl = () => {
    return (
      <View style={[style.container]}>
        <View style={[style.iconContainer]} />
        <View style={[style.sliderContainer]}>
          <Slider
            maximumValue={20}
            minimumValue={0}
            value={GlobalSetting.spacing.value}
            onValueChange={onValueChange}
          />
        </View>
      </View>
    );
  };

  const renderRadiusSliderControl = () => {
    return (
      <View style={[style.container]}>
        <View style={[style.iconContainer]} />
        <View style={[style.sliderContainer]}>
          <Slider
            maximumValue={100}
            minimumValue={0}
            value={GlobalSetting.radius.value}
            onValueChange={onRadiusValueChange}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[style.rootContainer]}>
      {renderPaddingSliderControl()}
      {renderRadiusSliderControl()}
    </View>
  );
};
