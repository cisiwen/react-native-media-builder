import React, { ReactNode, useState } from 'react';
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

export const MoveResizeView = (props: {
  allItems: ICollageItem[];
  item: ICollageItem;
  selectedItem?: ICollageItem;
  children: ReactNode;
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
    //GlobalSetting.selectedItem = sender;
    setSelectedItem(sender);
    //props.onResizerSelected(sender);
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
      zIndex: 9,
      top: props.item.style.top?.value,
      left: props.item.style.left?.value,
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
        <SwappableViewItem
          moveOnly={true}
          allItems={props.allItems}
          item={props.item}
        >
          <TouchableNativeFeedback
            style={[style.touchStyle]}
            onPress={(event: GestureResponderEvent) => {
              onTab(props.item, event);
            }}
          >
            <Animated.View style={[mediaContainerStyle]}>
              {props.children}
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
