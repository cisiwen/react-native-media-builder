import React, { useState } from 'react';
import { Pressable, StyleSheet, View, } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedRef, useAnimatedStyle, useSharedValue, } from 'react-native-reanimated';
import { GlobalSetting } from './GlobalSetting';
import { ResizableView } from './ResizableView';
import { SwappableViewItem } from './SwappableViewItem';
export const MoveResizeView = (props) => {
    var _a;
    const setSelectedItem = (sender) => {
        props.allItems.forEach((item, i) => {
            if (item.style.zIndex) {
                if (item.id !== sender.id) {
                    item.style.zIndex.value = item.id;
                }
                else {
                    item.style.zIndex.value = 9;
                }
            }
        });
    };
    const onTab = (sender, event) => {
        //console.log('ontab', event.nativeEvent);
        //sender.resizerItem = sender.resizerItemValue.value;
        //GlobalSetting.selectedItem = sender;
        setSelectedItem(sender);
        //props.onResizerSelected(sender);
    };
    props.item.style.zIndex = useSharedValue(props.item.id);
    const onStartResizing = (sender) => {
        //console.log(sender);
    };
    props.item.element = useAnimatedRef();
    const onAcitveResizing = (sender) => {
        //console.log(onAcitveResizing.name, sender)
    };
    const animatedStyle = useAnimatedStyle(() => {
        var _a, _b;
        return {
            zIndex: 9,
            top: (_a = props.item.style.top) === null || _a === void 0 ? void 0 : _a.value,
            left: (_b = props.item.style.left) === null || _b === void 0 ? void 0 : _b.value,
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
    props.item.uriShareValue = useSharedValue(props.item.uri);
    let [url, setUrl] = useState(props.item.uriShareValue.value);
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
    return (React.createElement(Animated.View, { ref: props.item.element, key: props.item.key.toString(), style: [animatedStyle] },
        React.createElement(View, { style: [style.innerContainer] },
            React.createElement(SwappableViewItem, { moveOnly: true, allItems: props.allItems, item: props.item },
                React.createElement(TouchableNativeFeedback, { style: [style.touchStyle], onPress: (event) => {
                        onTab(props.item, event);
                    } },
                    React.createElement(Animated.View, { style: [mediaContainerStyle] }, props.children))),
            ((_a = props.selectedItem) === null || _a === void 0 ? void 0 : _a.id) === props.item.id ? (React.createElement(View, { style: [style.resizerContainer] },
                React.createElement(Pressable, { style: [style.pressable], onPress: (event) => {
                        onTab(props.item, event);
                    } },
                    React.createElement(ResizableView, { allItem: props.allItems, onAcitveResize: onAcitveResizing, onStartResizing: onStartResizing, collageItem: props.item })))) : null)));
};
//# sourceMappingURL=MoveResizeView.js.map