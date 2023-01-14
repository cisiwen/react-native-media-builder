import React from 'react'
import Animated from 'react-native-reanimated'

import { ItemRender } from '../components/ImageViewerV2'

export interface IPointStyleItem {
  height: Animated.SharedValue<number>
  width: Animated.SharedValue<number>
  translateX: Animated.SharedValue<number>
  translateY: Animated.SharedValue<number>
}

export interface IResizerPointLink {
  topIds?: number[]
  bottomIds?: number[]
  leftIds?: number[]
  rightIds?: number[]
  top?: Animated.SharedValue<IPointStyleItem[]>
  bottom?: Animated.SharedValue<IPointStyleItem[]>
  left?: Animated.SharedValue<IPointStyleItem[]>
  right?: Animated.SharedValue<IPointStyleItem[]>
  hasAny?: boolean
}

export interface IResizerItem {
  //animatedStyle:any;
  id: number
  topResizerPointLinks?: IResizerPointLink
  leftResizerPointLinks?: IResizerPointLink
  bottomResizerPointLinks?: IResizerPointLink
  rightResizerPointLinks?: IResizerPointLink
}

export interface ICollageItemStyle {
  height: Animated.SharedValue<number>
  width: Animated.SharedValue<number>
  translateX: Animated.SharedValue<number>
  translateY: Animated.SharedValue<number>
  zIndex: Animated.SharedValue<number>
  top: Animated.SharedValue<number>
  left: Animated.SharedValue<number>

  topEdge: Animated.SharedValue<boolean>
  leftEdge: Animated.SharedValue<boolean>
  rightEdge: Animated.SharedValue<boolean>
  bottomEdge: Animated.SharedValue<boolean>
  hitTestOpacity: Animated.SharedValue<number>

  oriHeight: number
  oriWidth: number
  oriTop: number
  oriLeft: number

  oriTopEdge: boolean
  oriLeftEdge: boolean
  oriRightEdge: boolean
  oriBottomEdge: boolean
}

export interface ICollageItemLayout {
  percentWidth: number
  percentHeight: number
  percentTop: number
  percentLeft: number
}

export interface ICollageItem {
  id: number
  key: number

  resizerItem: IResizerItem
  resizerItemValue: Animated.SharedValue<IResizerItem>
  uri: string
  uriShareValue?: Animated.SharedValue<string>

  style: ICollageItemStyle

  setUrlState?: React.Dispatch<React.SetStateAction<string>>
  onResizerSelected?: (item: ICollageItem) => void
  element?: React.RefObject<Animated.View>

  itemRenderer?: ItemRender
  sourceLayout: ICollageItemLayout
  layout?: Animated.SharedValue<{
    width: number
    height: number
    x: number
    y: number
    pageX: number
    pageY: number
  }>
}

export interface ICollageLayout {
  items: ICollageItem[]
  title: string
}
