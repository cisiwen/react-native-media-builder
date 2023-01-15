function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { FFmpegKit, FFmpegKitConfig, SessionState } from 'ffmpeg-kit-react-native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import RecordScreen from 'react-native-record-screen';
import { calcCropLayout, createNewFilePath } from '../utility/RecorderUtility';
const useComponentLayout = () => {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });
  const onLayout = useCallback(event => {
    const size = event.nativeEvent.layout;
    setLayout(l => Object.assign(l, size));
  }, []);
  return {
    layout,
    onLayout
  };
};
FFmpegKitConfig.enableLogCallback(log => {
  const message = log.getMessage();
  console.log(message);
});
export const useRecordScreenZone = () => {
  const {
    layout,
    onLayout
  } = useComponentLayout();
  const startRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await RecordScreen.startRecording({
        mic: false
      }).catch(reject);
      if (res) {
        resolve(res);
      }
    });
  };
  const stopRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await RecordScreen.stopRecording();
      if (res) {
        const newPath = createNewFilePath(res.result.outputURL);
        const {
          width,
          height,
          x,
          y
        } = calcCropLayout(layout);
        console.log(res.result, newPath);
        let inputSrc = res.result.outputURL;
        let outputUri = newPath; //await FFmpegKitConfig.getSafParameterForWrite(newPath);
        let args = ['-i', inputSrc, '-vf', `crop=w=${width}:h=${height}:x=${x}:y=${y}`, '-c:v', 'h264', outputUri];
        args = ['-i', inputSrc, '-vf', `crop=w=${width}:h=${height}:x=${x}:y=${y}`, '-c:v', 'hevc', outputUri];
        console.log(args.join(' '));
        FFmpegKit.executeAsync(args.join(' '), async session => {
          const state = FFmpegKitConfig.sessionStateToString(await session.getState());
          const returnCode = await session.getReturnCode();
          if (state === SessionState.FAILED.toString() || !returnCode.isValueSuccess()) {
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
    RecordScreen.clean();
  };
  const Wrapper = props => {
    return /*#__PURE__*/React.createElement(View, _extends({}, props, {
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
//# sourceMappingURL=ViewRecorder.js.map