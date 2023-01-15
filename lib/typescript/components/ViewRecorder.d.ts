import React from 'react';
import { ViewProps } from 'react-native';
import { RecordingResponse, RecordingStartResponse } from 'react-native-record-screen';
interface Props extends ViewProps {
    width?: number;
}
type StartRecording = () => Promise<RecordingStartResponse>;
type StopRecording = () => Promise<RecordingResponse>;
type CleanRecord = () => void;
export declare const useRecordScreenZone: () => {
    startRecording: StartRecording;
    stopRecording: StopRecording;
    cleanRecord: CleanRecord;
    RecordScreenZone: React.FC<Props>;
};
export {};
//# sourceMappingURL=ViewRecorder.d.ts.map