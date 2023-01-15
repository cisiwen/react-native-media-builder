import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import type { ICollageItem, IResizerItem } from '../models/Collage';
import { GlobalSetting } from './GlobalSetting';
import { ImageViewerV2 } from './ImageViewerV2';
import { ResizableView } from './ResizableView';
import { SwappableViewItem } from './SwappableViewItem';

export const CollageItem = (props: {
  allItems: ICollageItem[];
  item: ICollageItem;
  selectedItem?: ICollageItem;
  resizer: IResizerItem;
  onResizerSelected: (item: ICollageItem) => void;
}) => {
  const setSelectedItem = (sender: ICollageItem) => {
    props.allItems.forEach((item, i) => {
      if (item.style.zIndex) {
        if (item.id !== sender.id) {
          item.style.zIndex.value = item.id;
        } else {
          item.style.zIndex.value = 9;
        }
      }
    });
  };
  const onTab = (sender: ICollageItem, event: GestureResponderEvent) => {
    //console.log('ontab', event.nativeEvent);
    //sender.resizerItem = sender.resizerItemValue.value;
    GlobalSetting.selectedItem = sender;
    setSelectedItem(sender);
    props.onResizerSelected(sender);
  };

  props.item.style.zIndex = useSharedValue(props.item.id);
  const onStartResizing = (sender: any) => {
    //console.log(sender);
  };

  props.item.element = useAnimatedRef<Animated.View>();
  const onAcitveResizing = (sender: any) => {
    //console.log(onAcitveResizing.name, sender)
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: props.item.style.height.value,
      width: props.item.style.width.value,
      zIndex: props.item.style.zIndex?.value,
      top: props.item.style.top?.value,
      left: props.item.style.left?.value,
      paddingLeft:
        GlobalSetting.spacing.value *
        (props.item.style.leftEdge?.value ? 2 : 1),
      paddingBottom:
        GlobalSetting.spacing.value *
        (props.item.style.bottomEdge?.value ? 2 : 1),
      paddingRight:
        GlobalSetting.spacing.value *
        (props.item.style.rightEdge?.value ? 2 : 1),
      paddingTop:
        GlobalSetting.spacing.value * (props.item.style.topEdge?.value ? 2 : 1),
      transform: [
        {
          translateX: props.item.style.translateX.value,
        },
        {
          translateY: props.item.style.translateY.value,
        },
      ],
      position: 'absolute',
    };
  });

  const mediaContainerStyle = useAnimatedStyle(() => {
    return {
      borderRadius: GlobalSetting.radius.value,
      flex: 1,
      margin: 0,
      overflow: 'hidden',
      backgroundColor: '#fff',
    };
  });

  props.item.uriShareValue = useSharedValue<string>(props.item.uri);
  let [url, setUrl] = useState<string>(props.item.uriShareValue.value);
  props.item.setUrlState = setUrl;

  const style = StyleSheet.create({
    innerContainer: {
      position: 'relative',
      flex: 1,
    },
    touchStyle: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    resizerContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    pressable: {
      width: '100%',
      height: '100%',
      overflow: 'visible',
    },
  });
  return (
    <Animated.View
      ref={props.item.element}
      key={props.item.key.toString()}
      style={[animatedStyle]}
    >
      <View style={[style.innerContainer]}>
        <SwappableViewItem allItems={props.allItems} item={props.item}>
          <TouchableNativeFeedback
            style={[style.touchStyle]}
            onPress={(event: GestureResponderEvent) => {
              onTab(props.item, event);
            }}
          >
            <Animated.View style={[mediaContainerStyle]}>
              <ImageViewerV2
                url={url}
                sourceData={props.item}
                itemRender={props.item.itemRenderer}
              />
            </Animated.View>
          </TouchableNativeFeedback>
        </SwappableViewItem>
        {props.selectedItem?.id === props.item.id ? (
          <View style={[style.resizerContainer]}>
            <Pressable
              style={[style.pressable]}
              onPress={(event: GestureResponderEvent) => {
                onTab(props.item, event);
              }}
            >
              <ResizableView
                allItem={props.allItems}
                onAcitveResize={onAcitveResizing}
                onStartResizing={onStartResizing}
                collageItem={props.item}
              />
            </Pressable>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
};
