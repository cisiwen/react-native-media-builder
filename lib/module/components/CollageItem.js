import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedRef, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { GlobalSetting } from './GlobalSetting';
import { ImageViewerV2 } from './ImageViewerV2';
import { ResizableView } from './ResizableView';
import { SwappableViewItem } from './SwappableViewItem';
export const CollageItem = props => {
  var _props$selectedItem;
  const setSelectedItem = sender => {
    props.allItems.forEach((item, _i) => {
      if (item.style.zIndex) {
        if (item.id !== sender.id) {
          item.style.zIndex.value = item.id;
        } else {
          item.style.zIndex.value = 9;
        }
      }
    });
  };
  const onTab = (sender, _event) => {
    //console.log('ontab', event.nativeEvent);
    //sender.resizerItem = sender.resizerItemValue.value;
    GlobalSetting.selectedItem = sender;
    setSelectedItem(sender);
    props.onResizerSelected(sender);
  };
  props.item.style.zIndex = useSharedValue(props.item.id);
  const onStartResizing = _sender => {
    //console.log(sender);
  };
  props.item.element = useAnimatedRef();
  const onAcitveResizing = _sender => {
    //console.log(onAcitveResizing.name, sender)
  };
  const animatedStyle = useAnimatedStyle(() => {
    var _props$item$style$zIn, _props$item$style$top, _props$item$style$lef, _props$item$style$lef2, _props$item$style$bot, _props$item$style$rig, _props$item$style$top2;
    return {
      height: props.item.style.height.value,
      width: props.item.style.width.value,
      zIndex: (_props$item$style$zIn = props.item.style.zIndex) === null || _props$item$style$zIn === void 0 ? void 0 : _props$item$style$zIn.value,
      top: (_props$item$style$top = props.item.style.top) === null || _props$item$style$top === void 0 ? void 0 : _props$item$style$top.value,
      left: (_props$item$style$lef = props.item.style.left) === null || _props$item$style$lef === void 0 ? void 0 : _props$item$style$lef.value,
      paddingLeft: GlobalSetting.spacing.value * ((_props$item$style$lef2 = props.item.style.leftEdge) !== null && _props$item$style$lef2 !== void 0 && _props$item$style$lef2.value ? 2 : 1),
      paddingBottom: GlobalSetting.spacing.value * ((_props$item$style$bot = props.item.style.bottomEdge) !== null && _props$item$style$bot !== void 0 && _props$item$style$bot.value ? 2 : 1),
      paddingRight: GlobalSetting.spacing.value * ((_props$item$style$rig = props.item.style.rightEdge) !== null && _props$item$style$rig !== void 0 && _props$item$style$rig.value ? 2 : 1),
      paddingTop: GlobalSetting.spacing.value * ((_props$item$style$top2 = props.item.style.topEdge) !== null && _props$item$style$top2 !== void 0 && _props$item$style$top2.value ? 2 : 1),
      transform: [{
        translateX: props.item.style.translateX.value
      }, {
        translateY: props.item.style.translateY.value
      }],
      position: 'absolute'
    };
  });
  const mediaContainerStyle = useAnimatedStyle(() => {
    return {
      borderRadius: GlobalSetting.radius.value,
      flex: 1,
      margin: 0,
      overflow: 'hidden',
      backgroundColor: '#fff'
    };
  });
  props.item.uriShareValue = useSharedValue(props.item.uri);
  let [url, setUrl] = useState(props.item.uriShareValue.value);
  props.item.setUrlState = setUrl;
  const style = StyleSheet.create({
    innerContainer: {
      position: 'relative',
      flex: 1
    },
    touchStyle: {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    resizerContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    pressable: {
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    ref: props.item.element,
    key: props.item.key.toString(),
    style: [animatedStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: [style.innerContainer]
  }, /*#__PURE__*/React.createElement(SwappableViewItem, {
    allItems: props.allItems,
    item: props.item
  }, /*#__PURE__*/React.createElement(TouchableNativeFeedback, {
    style: [style.touchStyle],
    onPress: event => {
      onTab(props.item, event);
    }
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [mediaContainerStyle]
  }, /*#__PURE__*/React.createElement(ImageViewerV2, {
    url: url,
    sourceData: props.item,
    itemRender: props.item.itemRenderer
  })))), ((_props$selectedItem = props.selectedItem) === null || _props$selectedItem === void 0 ? void 0 : _props$selectedItem.id) === props.item.id ? /*#__PURE__*/React.createElement(View, {
    style: [style.resizerContainer]
  }, /*#__PURE__*/React.createElement(Pressable, {
    style: [style.pressable],
    onPress: event => {
      onTab(props.item, event);
    }
  }, /*#__PURE__*/React.createElement(ResizableView, {
    allItem: props.allItems,
    onAcitveResize: onAcitveResizing,
    onStartResizing: onStartResizing,
    collageItem: props.item
  }))) : null));
};
//# sourceMappingURL=CollageItem.js.map