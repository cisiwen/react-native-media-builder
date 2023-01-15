import { ReactNode } from 'react';
import type { ICollageItem } from '../models/Collage';
export interface ISwappableViewItemProps {
    children: ReactNode;
    item: ICollageItem;
    allItems: ICollageItem[];
    moveOnly?: boolean;
}
export declare const SwappableViewItem: (props: ISwappableViewItemProps) => JSX.Element;
//# sourceMappingURL=SwappableViewItem.d.ts.map