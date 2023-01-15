"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageViewer = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _ImageViewerV = require("../components/ImageViewerV2");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'visible',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    width: 300,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1,
    aspectRatio: 1,
    backgroundColor: '#ffcc00',
    overflow: 'visible'
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: 'black'
  }
});
const ImageViewer = () => {
  let url = 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F51d76cebj00r2l9oq004wc000ku00tqg.jpg&thumbnail=650x2147483647&quality=80&type=jpg';
  //url = 'file:///storage/emulated/0/Pictures/WeChat/mmexport1635114586604.jpg'
  return /*#__PURE__*/React.createElement(_reactNativeGestureHandler.GestureHandlerRootView, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.wrapper]
  }, /*#__PURE__*/React.createElement(_ImageViewerV.ImageViewerV2, {
    url: url
  })));
};
exports.ImageViewer = ImageViewer;
//# sourceMappingURL=ImageViewer.js.map