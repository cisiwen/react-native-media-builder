import { GestureResponderEvent } from 'react-native';
import { ICollageLayout } from '../models/Collage';
export interface IControlBarProps {
    onControlItemPressed: (event: GestureResponderEvent, payload: ICollageLayout) => void;
    layouts: ICollageLayout[];
}
export declare const ControlBar: (props: {
    data: IControlBarProps;
}) => JSX.Element;
