"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlBorderRadius = void 0;
var _reactNativeSlider = require("@miblanchard/react-native-slider");
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _GlobalSetting = require("./GlobalSetting");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ControlBorderRadius = () => {
  const onValueChange = value => {
    _GlobalSetting.GlobalSetting.spacing.value = value;
  };
  const onRadiusValueChange = value => {
    if (value.length > 0) {
      _GlobalSetting.GlobalSetting.radius.value = value[0];
    } else {
      _GlobalSetting.GlobalSetting.radius.value = value;
    }
  };
  const style = _reactNative.StyleSheet.create({
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.container]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.iconContainer]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.sliderContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNativeSlider.Slider, {
      maximumValue: 20,
      minimumValue: 0,
      value: _GlobalSetting.GlobalSetting.spacing.value,
      onValueChange: onValueChange
    })));
  };
  const renderRadiusSliderControl = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.container]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.iconContainer]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [style.sliderContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNativeSlider.Slider, {
      maximumValue: 100,
      minimumValue: 0,
      value: _GlobalSetting.GlobalSetting.radius.value,
      onValueChange: onRadiusValueChange
    })));
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.rootContainer]
  }, renderPaddingSliderControl(), renderRadiusSliderControl());
};
exports.ControlBorderRadius = ControlBorderRadius;
//# sourceMappingURL=ControlBorderRadius.js.map