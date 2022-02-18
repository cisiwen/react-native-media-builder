import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
export declare type OnItemRenderItemLoaded = (dim: {
    width: number;
    height: number;
    uri: string;
}) => void;
export declare type ItemRender = (data: any, callback: OnItemRenderItemLoaded, style: StyleProp<Animated.AnimateStyle<StyleProp<ImageStyle>>>) => React.ReactElement;
export interface IImageViewerV2Props {
    url: string;
    sourceData?: any;
    itemRender?: ItemRender;
}
export declare const ImageViewerV2: (props: IImageViewerV2Props) => JSX.Element;
