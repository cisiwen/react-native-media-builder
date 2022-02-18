import { ICollageItem, IResizerItem } from '../models/Collage';
export declare const CollageItem: (props: {
    allItems: ICollageItem[];
    item: ICollageItem;
    selectedItem?: ICollageItem;
    resizer: IResizerItem;
    onResizerSelected: (item: ICollageItem) => void;
}) => JSX.Element;
