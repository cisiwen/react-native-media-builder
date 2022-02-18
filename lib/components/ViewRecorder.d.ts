import React from 'react';
import { ViewProps } from 'react-native';
import { RecordingResponse, RecordingStartResponse } from 'react-native-record-screen';
interface Props extends ViewProps {
    width?: number;
}
declare type StartRecording = () => Promise<RecordingStartResponse>;
declare type StopRecording = () => Promise<RecordingResponse>;
declare type CleanRecord = () => void;
export declare const useRecordScreenZone: () => {
    startRecording: StartRecording;
    stopRecording: StopRecording;
    cleanRecord: CleanRecord;
    RecordScreenZone: React.FC<Props>;
};
export {};
