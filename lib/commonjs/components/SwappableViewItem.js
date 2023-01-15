"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwappableViewItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UIStyle = _reactNative.StyleSheet.create({
  flexOne: {
    flex: 1
  }
});
const SwappableViewItem = props => {
  const originX = (0, _reactNativeReanimated.useSharedValue)(0);
  const originY = (0, _reactNativeReanimated.useSharedValue)(0);
  const originW = (0, _reactNativeReanimated.useSharedValue)(0);
  const originH = (0, _reactNativeReanimated.useSharedValue)(0);
  const centerX = (0, _reactNativeReanimated.useSharedValue)(0);
  const centerY = (0, _reactNativeReanimated.useSharedValue)(0);
  let currentTranslateX;
  let currentTranslateY;
  const scale = (0, _reactNativeReanimated.useSharedValue)(0);
  props.item.style.hitTestOpacity = (0, _reactNativeReanimated.useSharedValue)(1);
  props.item.element = (0, _reactNativeReanimated.useAnimatedRef)();
  props.item.layout = (0, _reactNativeReanimated.useSharedValue)({
    x: 0,
    pageX: 0,
    y: 0,
    pageY: 0,
    width: 0,
    height: 0
  });
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    var _props$item$style$hit;
    return {
      padding: scale.value,
      opacity: (_props$item$style$hit = props.item.style.hitTestOpacity) === null || _props$item$style$hit === void 0 ? void 0 : _props$item$style$hit.value
    };
  });
  const setSelectedItem = sender => {
    props.allItems.forEach((item, i) => {
      if (item.id !== sender.id) {
        item.style.zIndex.value = item.id;
      } else {
        item.style.zIndex.value = 9;
      }
    });
  };
  const onHandlerStateChange = evt => {
    console.log('onHandlerStateChange', evt.nativeEvent);
    if (evt.nativeEvent.state === _reactNativeGestureHandler.State.BEGAN) {} else if (evt.nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE) {
      centerX.value = originW.value / 2 - evt.nativeEvent.x;
      centerY.value = originH.value / 2 - evt.nativeEvent.y;
      currentTranslateX = props.item.style.translateX.value;
      currentTranslateY = props.item.style.translateY.value;
      setSelectedItem(props.item);
      let padding = Math.min(originH.value, originW.value) * 0.2;
      scale.value = (0, _reactNativeReanimated.withTiming)(10, {
        duration: 300,
        easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
      });
    }
  };
  let hitTarget = null;
  const hitTest = evt => {
    let hitted = false;
    for (let i = 0; i < props.allItems.length; i++) {
      let item = props.allItems[i];
      if (item.id !== props.item.id) {
        //console.log(item.id, item.layout, evt.nativeEvent);
        if (item.layout) {
          let value = item.layout.value;
          let x2 = value.pageX + value.width;
          let y2 = value.pageY + value.height;
          let xMeeted = evt.nativeEvent.absoluteX > value.pageX && evt.nativeEvent.absoluteX < x2;
          let yMeeted = evt.nativeEvent.absoluteY > value.pageY && evt.nativeEvent.absoluteY < y2;
          if (xMeeted && yMeeted) {
            if (item.style.hitTestOpacity) {
              item.style.hitTestOpacity.value = 0.5;
            }
            hitted = true;
            hitTarget = item;
          } else {
            if (item.style.hitTestOpacity) {
              item.style.hitTestOpacity.value = 1;
            }
          }
        }
      }
    }
    if (!hitted) {
      hitTarget = null;
    }
  };
  const onMoveGestureEvent = evt => {
    //console.log("onMoveGestureEvent", evt.nativeEvent.state);
    if (evt.nativeEvent.state === _reactNativeGestureHandler.State.BEGAN) {} else if (evt.nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE) {
      let tranX = evt.nativeEvent.absoluteX - originW.value / 2 - originX.value;
      let tranY = evt.nativeEvent.absoluteY - originH.value / 2 - originY.value;
      tranY = tranY - 30;
      console.log('StatusBar height', _reactNative.Dimensions.get('screen').height - _reactNative.Dimensions.get('window').height);
      //console.log("onMoveGestureEvent", tranX, tranY, centerX.value, centerY.value, originW.value, originH.value, evt.nativeEvent.absoluteX, evt.nativeEvent.absoluteY, evt.nativeEvent.x, evt.nativeEvent.y);
      props.item.style.translateX.value = tranX + centerX.value + currentTranslateX;
      props.item.style.translateY.value = tranY + centerY.value + currentTranslateY;
      if (!props.moveOnly) {
        hitTest(evt);
      }
      //console.log(originX.value, originY.value);
      //props.item.resizerItem.translateX.value = evt.nativeEvent.absoluteX - originW.value / 2 - originX.value;
      //props.item.resizerItem.translateY.value = evt.nativeEvent.absoluteY - originH.value / 2 - originY.value;
    }
  };

  const handler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: ev => {
      if (props.item.element) {
        let measured = (0, _reactNativeReanimated.measure)(props.item.element);
        originX.value = measured.pageX;
        originY.value = measured.pageY;
        originW.value = measured.width;
        originH.value = measured.height;
        //console.log("measured", measured);
        props.allItems.forEach(item => {
          if (item.id !== props.item.id) {
            if (item.element != null) {
              let eMeasured = (0, _reactNativeReanimated.measure)(item.element);
              if (item.layout) {
                item.layout.value = eMeasured;
              }
              //measureedLayout.push({ layout: measured });
              //console.log("computeLayout", item.id, measured);
            }
          }
        });
      }
    }
  });

  const onDragEnded = () => {
    if (!props.moveOnly) {
      props.item.style.translateX.value = (0, _reactNativeReanimated.withTiming)(currentTranslateX, {
        duration: 500,
        easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
      });
      props.item.style.translateY.value = (0, _reactNativeReanimated.withTiming)(currentTranslateY, {
        duration: 500,
        easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
      });
    }
    originH.value = 0;
    originW.value = 0;
    originX.value = 0;
    originY.value = 0;
    centerX.value = 0;
    centerY.value = 0;
    scale.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 300,
      easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
    });
    if (!props.moveOnly) {
      props.allItems.forEach(a => {
        if (a.style.hitTestOpacity) {
          a.style.hitTestOpacity.value = 1;
        }
      });
      if (hitTarget) {
        if (hitTarget.setUrlState && props.item.setUrlState) {
          var _hitTarget$uriShareVa;
          let targetUrl = (_hitTarget$uriShareVa = hitTarget.uriShareValue) === null || _hitTarget$uriShareVa === void 0 ? void 0 : _hitTarget$uriShareVa.value;
          if (targetUrl) {
            var _props$item$uriShareV;
            let myUrl = (_props$item$uriShareV = props.item.uriShareValue) === null || _props$item$uriShareV === void 0 ? void 0 : _props$item$uriShareV.value;
            if (myUrl) {
              hitTarget.setUrlState(myUrl);
              props.item.setUrlState(targetUrl);
              if (props.item.uriShareValue) {
                props.item.uriShareValue.value = targetUrl;
              }
              if (hitTarget.uriShareValue) {
                hitTarget.uriShareValue.value = myUrl;
              }
            }
          }
        }
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TapGestureHandler, {
    onHandlerStateChange: handler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    ref: props.item.element,
    style: [UIStyle.flexOne]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.LongPressGestureHandler, {
    onHandlerStateChange: onHandlerStateChange,
    onEnded: onDragEnded,
    maxDist: 10050,
    onGestureEvent: onMoveGestureEvent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [UIStyle.flexOne]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [UIStyle.flexOne, style]
  }, props.children)))));
};
exports.SwappableViewItem = SwappableViewItem;
//# sourceMappingURL=SwappableViewItem.js.map