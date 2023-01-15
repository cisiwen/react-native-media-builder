"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageViewerV2 = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const styles = _reactNative.StyleSheet.create({
  flexOne: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff',
    overflow: 'visible',
    position: 'relative',
    flex: 1
  },
  pinchableImage: {
    flex: 1
  },
  rootContainer: {
    flex: 1,
    overflow: 'visible'
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#000'
  }
});
const ImageViewerV2 = props => {
  let scale = (0, _reactNativeReanimated.useSharedValue)(1);

  /**
   * Translate
   */

  let translateX = (0, _reactNativeReanimated.useSharedValue)(0);
  let translateY = (0, _reactNativeReanimated.useSharedValue)(0);
  let translateXNumber = 0;
  let translateYNumber = 0;
  let currentMaxTranslateX = (0, _reactNativeReanimated.useSharedValue)(0);
  let currentMaxTranslateY = (0, _reactNativeReanimated.useSharedValue)(0);
  let width = (0, _reactNativeReanimated.useSharedValue)(100);
  let height = (0, _reactNativeReanimated.useSharedValue)(100);
  let srcWidth = (0, _reactNativeReanimated.useSharedValue)(0);
  let srcHeight = (0, _reactNativeReanimated.useSharedValue)(0);
  const longPressed = (0, _reactNativeReanimated.useSharedValue)(0);
  const onPanGestureHandlerV2 = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_ev, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
      ctx.maxTranX = currentMaxTranslateX.value;
      ctx.maxTranY = currentMaxTranslateY.value;
    },
    onActive: (ev, ctx) => {
      if (longPressed.value === 0) {
        let x = ctx.offsetX + ev.translationX;
        let y = ctx.offsetY + ev.translationY;
        if (ev.translationX > 0) {
          // Translate to right
          if (x > 0) {
            x = 0;
          }
        } else if (ev.translationX < 0) {
          if (x < -ctx.maxTranX) {
            x = -ctx.maxTranX;
          }
        }
        if (ev.translationY > 0) {
          if (y > 0) {
            y = 0;
          }
        } else if (ev.translationY < 0) {
          if (y < -ctx.maxTranY) {
            y = -ctx.maxTranY;
          }
        }
        console.log(ev.translationX, ev.translationY, ctx.offsetX, ctx.offsetY, ctx.maxTranX, ctx.maxTranY, y, x);
        translateXNumber = x;
        translateYNumber = 0;
        translateX.value = x; //Math.abs(x) > Math.abs(currentMaxTranslateX.value) ? (x < 0 ? -Math.abs(currentMaxTranslateX.value) : Math.abs(currentMaxTranslateX.value)) : x;
        translateY.value = y;
        //currentTranslateX.value = translateX.value;
      } else {
        console.log(`move me ${props.url}`);
      }
    },
    onFinish: () => {
      console.log('done');
    }
  });
  const onPinchGestureHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (ev, ctx) => {
      ctx.lastScale = scale.value;
    },
    onActive: (ev, ctx) => {
      let value = ctx.lastScale * ev.scale;
      console.log('onPinchGestureHandler', value);
      scale.value = value < 1 ? 1 : value;
    }
  });
  const animatedStyles = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      width: width.value,
      height: height.value,
      transform: [{
        scale: scale.value
      }, {
        translateX: translateX.value
      }, {
        translateY: translateY.value
      }]
    };
  });

  //let [width, setWidth] = useState<number>(0);
  //let [height, setHeight] = useState<number>(0);

  //let [srcWidth, setSrcWidth] = useState<number>(0);
  //let [srcHeight, setSrcHeight] = useState<number>(0);

  let containerWidth = 0;
  let containerHeight = 0;
  let imageWidth = 0;
  let imageHeight = 0;
  const onImageLayoutChange = layout => {
    console.log('onImageLayoutChange', layout.nativeEvent.layout);
  };
  const onLayoutChange = layout => {
    containerWidth = layout.nativeEvent.layout.width;
    containerHeight = layout.nativeEvent.layout.height;
    constraintDimension(srcWidth.value, srcHeight.value, containerWidth, containerHeight, 'onLayoutChange');
  };
  const onImageLoaded = dim => {
    console.log('onImageLoaded', dim.uri);
    imageWidth = dim.width;
    imageHeight = dim.height;
    srcWidth.value = imageWidth;
    srcHeight.value = imageHeight;
    constraintDimension(imageWidth, imageHeight, containerWidth, containerHeight, 'onImageLoaded');
  };
  const constraintDimension = (imgW, imgH, cW, cH, sender) => {
    console.log(sender, imgH, imgW, cW, cH);
    if (imgW > 0 && imgH > 0 && cW > 0 && cH > 0) {
      let newWidth = 0,
        newHeight = 0;
      let ratioW = imgW / cW;
      let ratioH = imgH / cH;
      let min = Math.min(ratioH, ratioW);
      if (min === ratioW) {
        newWidth = cW;
        newHeight = newWidth / imgW * imgH;
      } else {
        newHeight = cH;
        newWidth = newHeight / imgH * imgW;
      }

      //setHeight(newHeight);
      //setWidth(newWidth);
      width.value = newWidth;
      height.value = newHeight;
      currentMaxTranslateX.value = newWidth - cW;
      currentMaxTranslateY.value = newHeight - cH;
      //console.log(constraintDimension.name, imgH, imgW, newHeight, newWidth, cH, cW);

      translateX.value = (cW - newWidth) / 2;
      translateY.value = (cH - newHeight) / 2;
      console.log('translateY', newHeight, cH, currentMaxTranslateY.value, translateY.value);
      //currentTranslateX.value= translateX.value;
    }
  };

  const onHandlerStateChange = evt => {
    console.log(onHandlerStateChange.name, evt.nativeEvent.state);
    if (evt.nativeEvent.state === _reactNativeGestureHandler.State.BEGAN) {
      longPressed.value = 0;
    } else if (evt.nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE) {
      console.log(onHandlerStateChange.name, evt.nativeEvent.state);
      longPressed.value = 1;
      //topStyle.value = evt.nativeEvent.absoluteY;
      //topStyle.value = evt.nativeEvent.absoluteX;
    }
  };

  const onLongPressGestureEvent = evt => {
    if (evt.nativeEvent.state === _reactNativeGestureHandler.State.ACTIVE) {}
  };
  const renderAnimateImage = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Image, {
      onLayout: onImageLayoutChange,
      onLoadStart: () => {
        console.log('onLoadStart');
      },
      onLoadEnd: () => {
        console.log('onLoadEnd');
      },
      onError: err => {
        console.log('onImageError', err.nativeEvent.error);
      },
      onPartialLoad: () => {
        console.log('onPartialLoad');
      },
      onLoad: evt => {
        onImageLoaded(evt.nativeEvent.source);
      },
      style: [animatedStyles],
      source: {
        uri: props.url
      }
    });
  };
  const renderTestImage = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: [styles.image],
      onError: error => {
        console.log(error.nativeEvent.error);
      },
      source: {
        uri: props.url
      }
    });
  };
  console.log('ImageViewerV2', props.url);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    maxPointers: 1,
    onGestureEvent: onPanGestureHandlerV2
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    onLayout: evt => {
      onLayoutChange(evt);
    },
    style: [styles.rootContainer]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.flexOne]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PinchGestureHandler, {
    onGestureEvent: onPinchGestureHandler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.container],
    collapsable: false
  }, props.itemRender ? props.itemRender(props, onImageLoaded, animatedStyles) : renderAnimateImage())))));
};
exports.ImageViewerV2 = ImageViewerV2;
//# sourceMappingURL=ImageViewerV2.js.map