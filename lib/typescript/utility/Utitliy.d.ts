import type { ICollageItem, ICollageItemLayout, ICollageItemStyle, IPointStyleItem, IResizerItem, IResizerPointLink } from '../models/Collage';
export declare const getValue: (percent: number, rootW?: number, rootH?: number, borderWidth?: number) => number;
export declare const computeCollageResizerAll: (all: ICollageItem[]) => void;
export declare const computeCollageResizer: (item: ICollageItem, all: ICollageItem[]) => IResizerItem;
export declare const collageLayoutToCollageItem: (layout: ICollageItemLayout[], w: number, h: number, borderW: number) => ICollageItem[];
export declare const computeCollageStyle: (layout: ICollageItemLayout, w: number, h: number, borderW: number, index: number) => ICollageItemStyle;
export declare const getLinkItemByIds: (layout: ICollageItem[], ids?: number[]) => IPointStyleItem[] | undefined;
export declare const findValues: (layout: ICollageItem[], pointsLink?: IResizerPointLink) => void;
export declare const assignValue: (layout: ICollageItem[]) => void;
//# sourceMappingURL=Utitliy.d.ts.map