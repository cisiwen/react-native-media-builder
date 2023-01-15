"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveResizeView = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _GlobalSetting = require("./GlobalSetting");
var _ResizableView = require("./ResizableView");
var _SwappableViewItem = require("./SwappableViewItem");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MoveResizeView = props => {
  var _props$selectedItem;
  const setSelectedItem = sender => {
    props.allItems.forEach((item, _i) => {
      if (item.style.zIndex) {
        if (item.id !== sender.id) {
          item.style.zIndex.value = item.id;
        } else {
          item.style.zIndex.value = 9;
        }
      }
    });
  };
  const onTab = (sender, _event) => {
    //console.log('ontab', event.nativeEvent);
    //sender.resizerItem = sender.resizerItemValue.value;
    //GlobalSetting.selectedItem = sender;
    setSelectedItem(sender);
    //props.onResizerSelected(sender);
  };

  props.item.style.zIndex = (0, _reactNativeReanimated.useSharedValue)(props.item.id);
  const onStartResizing = _sender => {
    //console.log(sender);
  };
  props.item.element = (0, _reactNativeReanimated.useAnimatedRef)();
  const onAcitveResizing = _sender => {
    //console.log(onAcitveResizing.name, sender)
  };
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    var _props$item$style$top, _props$item$style$lef;
    return {
      zIndex: 9,
      top: (_props$item$style$top = props.item.style.top) === null || _props$item$style$top === void 0 ? void 0 : _props$item$style$top.value,
      left: (_props$item$style$lef = props.item.style.left) === null || _props$item$style$lef === void 0 ? void 0 : _props$item$style$lef.value,
      transform: [{
        translateX: props.item.style.translateX.value
      }, {
        translateY: props.item.style.translateY.value
      }],
      position: 'absolute'
    };
  });
  const mediaContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      borderRadius: _GlobalSetting.GlobalSetting.radius.value,
      flex: 1,
      margin: 0,
      overflow: 'hidden'
    };
  });
  props.item.uriShareValue = (0, _reactNativeReanimated.useSharedValue)(props.item.uri);
  let [url, setUrl] = (0, _react.useState)(props.item.uriShareValue.value);
  props.item.setUrlState = setUrl;
  const style = _reactNative.StyleSheet.create({
    innerContainer: {
      position: 'relative',
      flex: 1
    },
    touchStyle: {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    resizerContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    pressable: {
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    ref: props.item.element,
    key: props.item.key.toString(),
    style: [animatedStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.innerContainer]
  }, /*#__PURE__*/_react.default.createElement(_SwappableViewItem.SwappableViewItem, {
    moveOnly: true,
    allItems: props.allItems,
    item: props.item
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TouchableNativeFeedback, {
    style: [style.touchStyle],
    onPress: event => {
      onTab(props.item, event);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [mediaContainerStyle]
  }, props.children))), ((_props$selectedItem = props.selectedItem) === null || _props$selectedItem === void 0 ? void 0 : _props$selectedItem.id) === props.item.id ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.resizerContainer]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: [style.pressable],
    onPress: event => {
      onTab(props.item, event);
    }
  }, /*#__PURE__*/_react.default.createElement(_ResizableView.ResizableView, {
    allItem: props.allItems,
    onAcitveResize: onAcitveResizing,
    onStartResizing: onStartResizing,
    collageItem: props.item
  }))) : null));
};
exports.MoveResizeView = MoveResizeView;
//# sourceMappingURL=MoveResizeView.js.map