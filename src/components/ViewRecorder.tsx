import {
  FFmpegKit,
  FFmpegKitConfig,
  Session,
  SessionState,
} from 'ffmpeg-kit-react-native';
import React, { useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  View,
  ViewProps,
} from 'react-native';
import RecordScreen, {
  RecordingResponse,
  RecordingStartResponse,
} from 'react-native-record-screen';

import { calcCropLayout, createNewFilePath } from '../utility/RecorderUtility';

interface Props extends ViewProps {
  width?: number;
}

type StartRecording = () => Promise<RecordingStartResponse>;
type StopRecording = () => Promise<RecordingResponse>;
type CleanRecord = () => void;

const useComponentLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const size = event.nativeEvent.layout;
    setLayout((l) => Object.assign(l, size));
  }, []);

  return { layout, onLayout };
};

FFmpegKitConfig.enableLogCallback((log) => {
  const message = log.getMessage();
  console.log(message);
});
export const useRecordScreenZone = () => {
  const { layout, onLayout } = useComponentLayout();

  const startRecording: StartRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await RecordScreen.startRecording({ mic: false }).catch(
        reject
      );
      if (res) {
        resolve(res);
      }
    });
  };

  const stopRecording: StopRecording = () => {
    return new Promise(async (resolve, reject) => {
      const res = await RecordScreen.stopRecording();
      if (res) {
        const newPath = createNewFilePath(res.result.outputURL);
        const { width, height, x, y } = calcCropLayout(layout);
        console.log(res.result, newPath);
        let inputSrc = res.result.outputURL;
        let outputUri = newPath; //await FFmpegKitConfig.getSafParameterForWrite(newPath);
        let args = [
          '-i',
          inputSrc,
          '-vf',
          `crop=w=${width}:h=${height}:x=${x}:y=${y}`,
          '-c:v',
          'h264',
          outputUri,
        ];
        args = [
          '-i',
          inputSrc,
          '-vf',
          `crop=w=${width}:h=${height}:x=${x}:y=${y}`,
          '-c:v',
          'hevc',
          outputUri,
        ];
        console.log(args.join(' '));
        FFmpegKit.executeAsync(
          args.join(' '),
          async (session: Session) => {
            const state = FFmpegKitConfig.sessionStateToString(
              await session.getState()
            );
            const returnCode = await session.getReturnCode();
            if (
              state === SessionState.FAILED.toString() ||
              !returnCode.isValueSuccess()
            ) {
              reject('failed');
            } else {
              res.result.outputURL = outputUri;
              resolve(res);
            }
          },
          (log) => {
            console.log(log.getMessage());
          }
        );
      }
    });
  };

  const cleanRecord: CleanRecord = () => {
    RecordScreen.clean();
  };

  const Wrapper: React.FC<Props> = (props) => {
    return (
      <View {...props} onLayout={onLayout}>
        {props.children}
      </View>
    );
  };

  return {
    startRecording,
    stopRecording,
    cleanRecord,
    RecordScreenZone: Wrapper,
  };
};
