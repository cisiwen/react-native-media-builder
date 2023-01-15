"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollageLayoutScreen = CollageLayoutScreen;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeMediaBuilder = require("react-native-media-builder");
var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//import { ImageViewer } from './ImageViewer';

function CollageLayoutScreen(props) {
  let w, h, borderW, radius, spacing;
  w = h = _reactNative.Dimensions.get('screen').width;
  borderW = 1;
  spacing = 5;
  radius = 10;
  _reactNativeMediaBuilder.GlobalSetting.spacing = (0, _reactNativeReanimated.useSharedValue)(spacing);
  _reactNativeMediaBuilder.GlobalSetting.spacingV2 = new _reactNativeReanimated.default.Value(spacing);
  _reactNativeMediaBuilder.GlobalSetting.radius = (0, _reactNativeReanimated.useSharedValue)(radius);
  let totalSpaceWidth = borderW * 2;
  let lists = (0, _reactNativeMediaBuilder.Layout5)(w, h, totalSpaceWidth);
  let urls = (props === null || props === void 0 ? void 0 : props.mediasUri) ?? ['https://www.fsbus.com/wp-content/uploads/2016/02/0713084kx.jpg', 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F51d76cebj00r2l9oq004wc000ku00tqg.jpg&thumbnail=650x2147483647&quality=80&type=jpg', 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2Feec49515j00r2l9oq0048c000ku00v9g.jpg&thumbnail=650x2147483647&quality=80&type=jpg', 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F8419eac2j00r2l9pc001lc000ku00dwg.jpg&thumbnail=650x2147483647&quality=80&type=jpg', 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F11062988j00r2l9q0002sc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg', 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F5f30e2c3j00r2l9q3003dc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg'];
  const defaultLayout5 = {
    title: _reactNativeMediaBuilder.Layout5_W2W2W2W2W1.name,
    items: (0, _reactNativeMediaBuilder.collageLayoutToCollageItem)((0, _reactNativeMediaBuilder.Layout5_W2W2W2W2W1)(), w, h, borderW)
  };
  const renderAnimateImage = (url, onLoaded, c) => {
    return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.Image, {
      onLoad: evt => {
        onLoaded(evt.nativeEvent.source);
      },
      style: [c],
      source: {
        uri: url
      }
    });
  };
  const renderVideo = (url, onLoaded, c) => {
    return /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: [c, {
        flex: 1,
        width: '100%',
        backgroundColor: '#000'
      }]
    }, /*#__PURE__*/React.createElement(_reactNativeVideo.default, {
      useTextureView: false,
      muted: true,
      repeat: true,
      resizeMode: "cover",
      onVideoLoad: () => {
        onLoaded({
          width: 400,
          height: 400,
          uri: url
        });
      },
      style: {
        flex: 1,
        width: '100%',
        height: '100%'
      },
      source: {
        uri: url
      }
    }));
  };
  const renderItems = (hostProps, b, c) => {
    let url = hostProps.url;
    let isImage = _reactNativeMediaBuilder.Helper.isImageExtension(url);
    const [isVideo, setIsVideo] = React.useState(!isImage);
    React.useEffect(() => {
      console.log(`renderItems-${hostProps.sourceData.id}-${isVideo}`, hostProps.url);
    }, [hostProps, isVideo]);
    return isVideo ? renderVideo(hostProps.url, b, c) : renderAnimateImage(hostProps.url, b, c);
  };
  defaultLayout5.items.forEach(a => {
    a.itemRenderer = (hostProps, b, c) => {
      console.log('itemRenderer', data);
      let result = renderItems(hostProps, b, c);
      return result;
    };
    //a.itemRenderer = null
  });
  //assignValue(defaultLayout5.items);
  defaultLayout5.items.forEach((a, i) => {
    //console.log("bottomResizerPointLinks", a.resizerItem.bottomResizerPointLinks?.value);
    //console.log("topResizerPointLinks", a.resizerItem.topResizerPointLinks?.value);
    //console.log("leftResizerPointLinks", a.resizerItem.leftResizerPointLinks?.value);
    //console.log("rightResizerPointLinks", a.resizerItem.rightResizerPointLinks?.value);
    a.uri = urls[i];
  });
  const onControlItemPressed = (evt, payload) => {
    console.log(evt.nativeEvent);
    _reactNativeMediaBuilder.MCEventBus.dispatchEevent(_reactNativeMediaBuilder.MCEventType.LayoutChanged, payload);
    let newLayout = lists.find(a => a.title === payload.title);
    if (newLayout) {
      _reactNativeMediaBuilder.GlobalSetting.newLayout = newLayout;
      defaultLayout5.items.forEach(a => {
        let newSetting = newLayout === null || newLayout === void 0 ? void 0 : newLayout.items.find(b => b.id === a.id);
        newSetting.uri = a.uri;
        if (newSetting) {
          var _newResizer$bottomRes, _newResizer$bottomRes2, _newResizer$topResize, _newResizer$topResize2, _newResizer$leftResiz, _newResizer$leftResiz2, _newResizer$rightResi, _newResizer$rightResi2;
          //a.resizerItem = newSetting.resizerItem;
          //a.resizerItemValue.value = newSetting.resizerItem;
          a.style.translateX.value = newSetting.style.translateX.value;
          a.style.translateY.value = newSetting.style.translateY.value;
          a.style.bottomEdge.value = newSetting.style.bottomEdge.value;
          a.style.topEdge.value = newSetting.style.topEdge.value;
          a.style.leftEdge.value = newSetting.style.leftEdge.value;
          a.style.rightEdge.value = newSetting.style.rightEdge.value;
          a.style.top.value = (0, _reactNativeReanimated.withTiming)(newSetting.style.top.value, {
            duration: 500,
            easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
          });
          a.style.left.value = (0, _reactNativeReanimated.withTiming)(newSetting.style.left.value, {
            duration: 500,
            easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
          });
          a.style.width.value = (0, _reactNativeReanimated.withTiming)(newSetting === null || newSetting === void 0 ? void 0 : newSetting.style.width.value, {
            duration: 500,
            easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
          });
          a.style.height.value = (0, _reactNativeReanimated.withTiming)(newSetting === null || newSetting === void 0 ? void 0 : newSetting.style.height.value, {
            duration: 500,
            easing: _reactNativeReanimated.Easing.bezierFn(0.25, 0.1, 0.25, 1)
          });
          let newResizer = newSetting.resizerItem;
          a.resizerItem.bottomResizerPointLinks.bottom.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$bottomRes = newResizer.bottomResizerPointLinks) === null || _newResizer$bottomRes === void 0 ? void 0 : _newResizer$bottomRes.bottomIds);
          a.resizerItem.bottomResizerPointLinks.top.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$bottomRes2 = newResizer.bottomResizerPointLinks) === null || _newResizer$bottomRes2 === void 0 ? void 0 : _newResizer$bottomRes2.topIds);
          a.resizerItem.topResizerPointLinks.bottom.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$topResize = newResizer.topResizerPointLinks) === null || _newResizer$topResize === void 0 ? void 0 : _newResizer$topResize.bottomIds);
          a.resizerItem.topResizerPointLinks.top.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$topResize2 = newResizer.topResizerPointLinks) === null || _newResizer$topResize2 === void 0 ? void 0 : _newResizer$topResize2.topIds);
          a.resizerItem.leftResizerPointLinks.left.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$leftResiz = newResizer.leftResizerPointLinks) === null || _newResizer$leftResiz === void 0 ? void 0 : _newResizer$leftResiz.leftIds);
          a.resizerItem.leftResizerPointLinks.right.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$leftResiz2 = newResizer.leftResizerPointLinks) === null || _newResizer$leftResiz2 === void 0 ? void 0 : _newResizer$leftResiz2.rightIds);
          a.resizerItem.rightResizerPointLinks.left.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$rightResi = newResizer.rightResizerPointLinks) === null || _newResizer$rightResi === void 0 ? void 0 : _newResizer$rightResi.leftIds);
          a.resizerItem.rightResizerPointLinks.right.value = (0, _reactNativeMediaBuilder.getLinkItemByIds)(defaultLayout5.items, (_newResizer$rightResi2 = newResizer.rightResizerPointLinks) === null || _newResizer$rightResi2 === void 0 ? void 0 : _newResizer$rightResi2.rightIds);
        }
      });
    }
  };
  const data = {
    onControlItemPressed: (evt, payload) => {
      onControlItemPressed(evt, payload);
    },
    layouts: lists
  };
  const {
    startRecording,
    stopRecording,
    RecordScreenZone
  } = (0, _reactNativeMediaBuilder.useRecordScreenZone)();
  let recordBtnWidth = (0, _reactNativeReanimated.useSharedValue)(50);
  let recordBtnRadius = (0, _reactNativeReanimated.useSharedValue)(50);
  let recordButtonStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      width: recordBtnWidth.value,
      height: recordBtnWidth.value,
      borderRadius: recordBtnRadius.value,
      backgroundColor: 'green'
    };
  });
  const handleOnStartRecording = async () => {
    recordBtnRadius.value = (0, _reactNativeReanimated.withTiming)(0, {
      duration: 100,
      easing: _reactNativeReanimated.Easing.elastic()
    });
    recordBtnWidth.value = (0, _reactNativeReanimated.withTiming)(20, {
      duration: 100,
      easing: _reactNativeReanimated.Easing.elastic()
    });
    let result = await startRecording();
    console.log('handleOnStartRecording', result);
  };
  const handleOnStopRecording = async () => {
    recordBtnRadius.value = (0, _reactNativeReanimated.withTiming)(50, {
      duration: 100,
      easing: _reactNativeReanimated.Easing.elastic()
    });
    recordBtnWidth.value = (0, _reactNativeReanimated.withTiming)(50, {
      duration: 100,
      easing: _reactNativeReanimated.Easing.elastic()
    });
    const res = await stopRecording();
    if (res) {
      console.log('handleOnStopRecording', res);
    }
  };
  let isRecording = false;
  const onRecordButtonPressed = () => {
    if (!isRecording) {
      isRecording = true;
      handleOnStartRecording();
    } else {
      isRecording = false;
      handleOnStopRecording();
    }
  };
  let width = _reactNative.Dimensions.get('screen').width;
  let height = 500;
  let allTextLayout = (0, _reactNativeMediaBuilder.TextTopAndBottomLayout)(width, height, 0);
  let fistTextLayout = allTextLayout[0];
  console.log(fistTextLayout.items);
  return /*#__PURE__*/React.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.layoutContainer]
  }, /*#__PURE__*/React.createElement(RecordScreenZone, {
    style: [styles.collageContainer]
  }, /*#__PURE__*/React.createElement(_reactNativeMediaBuilder.MediaCollage, {
    layout: defaultLayout5
  }))), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.controlContainer]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.recordContainer]
  }, /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: onRecordButtonPressed
  }, /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
    style: [recordButtonStyle]
  }))), /*#__PURE__*/React.createElement(_reactNativeMediaBuilder.ControlBorderRadius, null), /*#__PURE__*/React.createElement(_reactNativeMediaBuilder.ControlBar, {
    data: data
  })));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'visible'
  },
  recordContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  recordStartButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'green'
  },
  layoutContainer: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    justifyContent: 'center'
  },
  textStyle: {
    color: '#212121',
    fontSize: 40,
    fontFamily: 'GeikaiSuiKou',
    padding: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
    textShadowOffset: {
      width: 1,
      height: 1
    }
  },
  collageContainer: {
    zIndex: 2,
    opacity: 1
  },
  controlContainer: {
    display: 'flex',
    paddingBottom: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 250
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
//# sourceMappingURL=CollageLayoutScreen.js.map