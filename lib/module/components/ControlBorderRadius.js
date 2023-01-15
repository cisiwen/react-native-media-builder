import { Slider } from '@miblanchard/react-native-slider';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalSetting } from './GlobalSetting';
export const ControlBorderRadius = () => {
  const onValueChange = value => {
    GlobalSetting.spacing.value = value;
  };
  const onRadiusValueChange = value => {
    if (value.length > 0) {
      GlobalSetting.radius.value = value[0];
    } else {
      GlobalSetting.radius.value = value;
    }
  };
  const style = StyleSheet.create({
    rootContainer: {
      paddingLeft: 20,
      paddingRight: 20
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconContainer: {
      width: 35,
      display: 'flex',
      alignItems: 'center'
    },
    sliderContainer: {
      padding: 0,
      flex: 1
    }
  });
  const renderPaddingSliderControl = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [style.container]
    }, /*#__PURE__*/React.createElement(View, {
      style: [style.iconContainer]
    }), /*#__PURE__*/React.createElement(View, {
      style: [style.sliderContainer]
    }, /*#__PURE__*/React.createElement(Slider, {
      maximumValue: 20,
      minimumValue: 0,
      value: GlobalSetting.spacing.value,
      onValueChange: onValueChange
    })));
  };
  const renderRadiusSliderControl = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [style.container]
    }, /*#__PURE__*/React.createElement(View, {
      style: [style.iconContainer]
    }), /*#__PURE__*/React.createElement(View, {
      style: [style.sliderContainer]
    }, /*#__PURE__*/React.createElement(Slider, {
      maximumValue: 100,
      minimumValue: 0,
      value: GlobalSetting.radius.value,
      onValueChange: onRadiusValueChange
    })));
  };
  return /*#__PURE__*/React.createElement(View, {
    style: [style.rootContainer]
  }, renderPaddingSliderControl(), renderRadiusSliderControl());
};
//# sourceMappingURL=ControlBorderRadius.js.map