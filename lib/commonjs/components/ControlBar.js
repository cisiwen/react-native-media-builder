"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlBar = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _Utitliy = require("../utility/Utitliy");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ControlBar = props => {
  let w = 50;
  let h = 50;
  let borderW = 1;
  let lists = props.data.layouts;
  const style = _reactNative.StyleSheet.create({
    continaer: {
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: 1,
      marginRight: 10,
      width: w,
      height: h
    },
    scrollView: {
      display: 'flex',
      margin: 10,
      flexDirection: 'row'
    },
    itemStyle: {
      position: 'absolute',
      backgroundColor: '#fff'
    }
  });
  const render = (layout, index) => {
    return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
      key: `${layout.title}${index}`,
      onPress: evt => props.data.onControlItemPressed(evt, layout)
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      key: `${layout.title}`,
      style: [style.continaer]
    }, layout.items.map((a, i) => {
      return /*#__PURE__*/React.createElement(_reactNative.View, {
        key: `${layout.title}${a.id}${i}`,
        style: [style.itemStyle, {
          left: (0, _Utitliy.getValue)(a.sourceLayout.percentLeft, w, h, borderW),
          top: (0, _Utitliy.getValue)(a.sourceLayout.percentTop, w, h, borderW)
        }, {
          width: (0, _Utitliy.getValue)(a.sourceLayout.percentWidth, w, h, borderW) - 1,
          height: (0, _Utitliy.getValue)(a.sourceLayout.percentHeight, w, h, borderW) - 1
        }]
      });
    })));
  };
  return /*#__PURE__*/React.createElement(_reactNative.View, null, /*#__PURE__*/React.createElement(_reactNativeGestureHandler.ScrollView, {
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    style: [style.scrollView]
  }, lists.map((item, i) => {
    return render(item, i);
  })));
};
exports.ControlBar = ControlBar;
//# sourceMappingURL=ControlBar.js.map