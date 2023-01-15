import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
const styles = StyleSheet.create({
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
export const ImageViewerV2 = props => {
  let scale = useSharedValue(1);

  /**
   * Translate
   */

  let translateX = useSharedValue(0);
  let translateY = useSharedValue(0);
  let translateXNumber = 0;
  let translateYNumber = 0;
  let currentMaxTranslateX = useSharedValue(0);
  let currentMaxTranslateY = useSharedValue(0);
  let width = useSharedValue(100);
  let height = useSharedValue(100);
  let srcWidth = useSharedValue(0);
  let srcHeight = useSharedValue(0);
  const longPressed = useSharedValue(0);
  const onPanGestureHandlerV2 = useAnimatedGestureHandler({
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
  const onPinchGestureHandler = useAnimatedGestureHandler({
    onStart: (ev, ctx) => {
      ctx.lastScale = scale.value;
    },
    onActive: (ev, ctx) => {
      let value = ctx.lastScale * ev.scale;
      console.log('onPinchGestureHandler', value);
      scale.value = value < 1 ? 1 : value;
    }
  });
  const animatedStyles = useAnimatedStyle(() => {
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
    if (evt.nativeEvent.state === State.BEGAN) {
      longPressed.value = 0;
    } else if (evt.nativeEvent.state === State.ACTIVE) {
      console.log(onHandlerStateChange.name, evt.nativeEvent.state);
      longPressed.value = 1;
      //topStyle.value = evt.nativeEvent.absoluteY;
      //topStyle.value = evt.nativeEvent.absoluteX;
    }
  };

  const onLongPressGestureEvent = evt => {
    if (evt.nativeEvent.state === State.ACTIVE) {}
  };
  const renderAnimateImage = () => {
    return /*#__PURE__*/React.createElement(Animated.Image, {
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
    return /*#__PURE__*/React.createElement(Image, {
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
  return /*#__PURE__*/React.createElement(PanGestureHandler, {
    maxPointers: 1,
    onGestureEvent: onPanGestureHandlerV2
  }, /*#__PURE__*/React.createElement(Animated.View, {
    onLayout: evt => {
      onLayoutChange(evt);
    },
    style: [styles.rootContainer]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.flexOne]
  }, /*#__PURE__*/React.createElement(PinchGestureHandler, {
    onGestureEvent: onPinchGestureHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.container],
    collapsable: false
  }, props.itemRender ? props.itemRender(props, onImageLoaded, animatedStyles) : renderAnimateImage())))));
};
//# sourceMappingURL=ImageViewerV2.js.map