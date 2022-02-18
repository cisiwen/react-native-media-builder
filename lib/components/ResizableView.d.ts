import { ICollageItem } from '../models/Collage';
export declare const ResizableView: (props: {
    collageItem: ICollageItem;
    allItem: ICollageItem[];
    onStartResizing: (sender: any) => void;
    onAcitveResize: (sender: any) => void;
}) => JSX.Element;
