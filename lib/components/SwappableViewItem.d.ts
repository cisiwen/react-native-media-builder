import { ReactNode } from 'react';
import { ICollageItem } from '../models/Collage';
export interface ISwappableViewItemProps {
    children: ReactNode;
    item: ICollageItem;
    allItems: ICollageItem[];
    moveOnly?: boolean;
}
export declare const SwappableViewItem: (props: ISwappableViewItemProps) => JSX.Element;
