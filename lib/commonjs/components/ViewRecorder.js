"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRecordScreenZone = void 0;
var _ffmpegKitReactNative = require("ffmpeg-kit-react-native");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeRecordScreen = _interopRequireDefault(require("react-native-record-screen"));
var _RecorderUtility = require("../utility/RecorderUtility");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const useComponentLayout = () => {
  const [layout, setLayout] = (0, _react.useState)({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });
  const onLayout = (0, _react.useCallback)(event => {
    const size = event.nativeEvent.layout;
    setLayout(l => Object.assign(l, size));
  }, []);
  return {
    layout,
    onLayout
  };
};
_ffmpegKitReactNative.FFmpegKitConfig.enableLogCallback(log => {
  const message = log.getMessage();
  console.log(message);
});
const useRecordScreenZone = () => {
  const {
    layout,
    onLayout
  } = useComponentLayout();
  const startRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await _reactNativeRecordScreen.default.startRecording({
        mic: false
      }).catch(reject);
      if (res) {
        resolve(res);
      }
    });
  };
  const stopRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await _reactNativeRecordScreen.default.stopRecording();
      if (res) {
        const newPath = (0, _RecorderUtility.createNewFilePath)(res.result.outputURL);
        const {
          width,
          height,
          x,
          y
        } = (0, _RecorderUtility.calcCropLayout)(layout);
        console.log(res.result, newPath);
        let inputSrc = res.result.outputURL;
        let outputUri = newPath; //await FFmpegKitConfig.getSafParameterForWrite(newPath);
        let args = ['-i', inputSrc, '-vf', `crop=w=${width}:h=${height}:x=${x}:y=${y}`, '-c:v', 'h264', outputUri];
        args = ['-i', inputSrc, '-vf', `crop=w=${width}:h=${height}:x=${x}:y=${y}`, '-c:v', 'hevc', outputUri];
        console.log(args.join(' '));
        _ffmpegKitReactNative.FFmpegKit.executeAsync(args.join(' '), async session => {
          const state = _ffmpegKitReactNative.FFmpegKitConfig.sessionStateToString(await session.getState());
          const returnCode = await session.getReturnCode();
          if (state === _ffmpegKitReactNative.SessionState.FAILED.toString() || !returnCode.isValueSuccess()) {
            reject('failed');
          } else {
            res.result.outputURL = outputUri;
            resolve(res);
          }
        }, log => {
          console.log(log.getMessage());
        });
      }
    });
  };
  const cleanRecord = () => {
    _reactNativeRecordScreen.default.clean();
  };
  const Wrapper = props => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, props, {
      onLayout: onLayout
    }), props.children);
  };
  return {
    startRecording,
    stopRecording,
    cleanRecord,
    RecordScreenZone: Wrapper
  };
};
exports.useRecordScreenZone = useRecordScreenZone;
//# sourceMappingURL=ViewRecorder.js.map