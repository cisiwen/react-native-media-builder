import * as React from 'react';
import { Dimensions, Pressable, StyleSheet, View, } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { ControlBar } from '../components/ControlBar';
import { ControlBorderRadius } from '../components/ControlBorderRadius';
import { MCEventBus, MCEventType } from '../components/EventBus';
import { GlobalSetting } from '../components/GlobalSetting';
//import { ImageViewer } from './ImageViewer';
import { MediaCollage } from '../components/MediaCollage';
import { useRecordScreenZone } from '../components/ViewRecorder';
import { Layout5, Layout5_W2W2W2W2W1 } from '../layouts/Layout5Items';
import { TextTopAndBottomLayout } from '../layouts/TextLayout2Item';
import { collageLayoutToCollageItem, getLinkItemByIds, } from '../utility/Utitliy';
export function CollageLayoutScreen(props) {
    var _a;
    let w, h, borderW, radius, spacing;
    w = h = Dimensions.get('screen').width;
    borderW = 1;
    spacing = 5;
    radius = 10;
    GlobalSetting.spacing = useSharedValue(spacing);
    GlobalSetting.spacingV2 = new Animated.Value(spacing);
    GlobalSetting.radius = useSharedValue(radius);
    let totalSpaceWidth = borderW * 2;
    let lists = Layout5(w, h, totalSpaceWidth);
    let urls = (_a = props === null || props === void 0 ? void 0 : props.mediasUri) !== null && _a !== void 0 ? _a : [
        'https://www.fsbus.com/wp-content/uploads/2016/02/0713084kx.jpg',
        'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F51d76cebj00r2l9oq004wc000ku00tqg.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
        'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2Feec49515j00r2l9oq0048c000ku00v9g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
        'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F8419eac2j00r2l9pc001lc000ku00dwg.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
        'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F11062988j00r2l9q0002sc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
        'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F5f30e2c3j00r2l9q3003dc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    ];
    const defaultLayout5 = {
        title: Layout5_W2W2W2W2W1.name,
        items: collageLayoutToCollageItem(Layout5_W2W2W2W2W1(), w, h, borderW),
    };
    const renderAnimateImage = (url, onLoaded, c) => {
        return (React.createElement(Animated.Image, { onLoad: (evt) => {
                onLoaded(evt.nativeEvent.source);
            }, style: [c], source: { uri: url } }));
    };
    defaultLayout5.items.forEach((a) => {
        a.itemRenderer = (hostProps, b, c) => {
            console.log('itemRenderer', data);
            let result = renderAnimateImage(hostProps.url, b, c);
            return result;
        };
        //a.itemRenderer = null
    });
    //assignValue(defaultLayout5.items);
    defaultLayout5.items.forEach((a, i) => {
        //console.log("bottomResizerPointLinks", a.resizerItem.bottomResizerPointLinks?.value);
        //console.log("topResizerPointLinks", a.resizerItem.topResizerPointLinks?.value);
        //console.log("leftResizerPointLinks", a.resizerItem.leftResizerPointLinks?.value);
        //console.log("rightResizerPointLinks", a.resizerItem.rightResizerPointLinks?.value);
        a.uri = urls[i];
    });
    const onControlItemPressed = (evt, payload) => {
        console.log(evt.nativeEvent);
        MCEventBus.dispatchEevent(MCEventType.LayoutChanged, payload);
        let newLayout = lists.find((a) => a.title === payload.title);
        if (newLayout) {
            GlobalSetting.newLayout = newLayout;
            defaultLayout5.items.forEach((a) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                let newSetting = newLayout === null || newLayout === void 0 ? void 0 : newLayout.items.find((b) => b.id === a.id);
                newSetting.uri = a.uri;
                if (newSetting) {
                    //a.resizerItem = newSetting.resizerItem;
                    //a.resizerItemValue.value = newSetting.resizerItem;
                    a.style.translateX.value = newSetting.style.translateX.value;
                    a.style.translateY.value = newSetting.style.translateY.value;
                    a.style.bottomEdge.value = newSetting.style.bottomEdge.value;
                    a.style.topEdge.value = newSetting.style.topEdge.value;
                    a.style.leftEdge.value = newSetting.style.leftEdge.value;
                    a.style.rightEdge.value = newSetting.style.rightEdge.value;
                    a.style.top.value = withTiming(newSetting.style.top.value, {
                        duration: 500,
                        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
                    });
                    a.style.left.value = withTiming(newSetting.style.left.value, {
                        duration: 500,
                        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
                    });
                    a.style.width.value = withTiming(newSetting === null || newSetting === void 0 ? void 0 : newSetting.style.width.value, {
                        duration: 500,
                        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
                    });
                    a.style.height.value = withTiming(newSetting === null || newSetting === void 0 ? void 0 : newSetting.style.height.value, {
                        duration: 500,
                        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
                    });
                    let newResizer = newSetting.resizerItem;
                    a.resizerItem.bottomResizerPointLinks.bottom.value = getLinkItemByIds(defaultLayout5.items, (_a = newResizer.bottomResizerPointLinks) === null || _a === void 0 ? void 0 : _a.bottomIds);
                    a.resizerItem.bottomResizerPointLinks.top.value = getLinkItemByIds(defaultLayout5.items, (_b = newResizer.bottomResizerPointLinks) === null || _b === void 0 ? void 0 : _b.topIds);
                    a.resizerItem.topResizerPointLinks.bottom.value = getLinkItemByIds(defaultLayout5.items, (_c = newResizer.topResizerPointLinks) === null || _c === void 0 ? void 0 : _c.bottomIds);
                    a.resizerItem.topResizerPointLinks.top.value = getLinkItemByIds(defaultLayout5.items, (_d = newResizer.topResizerPointLinks) === null || _d === void 0 ? void 0 : _d.topIds);
                    a.resizerItem.leftResizerPointLinks.left.value = getLinkItemByIds(defaultLayout5.items, (_e = newResizer.leftResizerPointLinks) === null || _e === void 0 ? void 0 : _e.leftIds);
                    a.resizerItem.leftResizerPointLinks.right.value = getLinkItemByIds(defaultLayout5.items, (_f = newResizer.leftResizerPointLinks) === null || _f === void 0 ? void 0 : _f.rightIds);
                    a.resizerItem.rightResizerPointLinks.left.value = getLinkItemByIds(defaultLayout5.items, (_g = newResizer.rightResizerPointLinks) === null || _g === void 0 ? void 0 : _g.leftIds);
                    a.resizerItem.rightResizerPointLinks.right.value = getLinkItemByIds(defaultLayout5.items, (_h = newResizer.rightResizerPointLinks) === null || _h === void 0 ? void 0 : _h.rightIds);
                }
            });
        }
    };
    const data = {
        onControlItemPressed: (evt, payload) => {
            onControlItemPressed(evt, payload);
        },
        layouts: lists,
    };
    const { startRecording, stopRecording, RecordScreenZone } = useRecordScreenZone();
    let recordBtnWidth = useSharedValue(50);
    let recordBtnRadius = useSharedValue(50);
    let recordButtonStyle = useAnimatedStyle(() => {
        return {
            width: recordBtnWidth.value,
            height: recordBtnWidth.value,
            borderRadius: recordBtnRadius.value,
            backgroundColor: 'green',
        };
    });
    const handleOnStartRecording = async () => {
        recordBtnRadius.value = withTiming(0, {
            duration: 100,
            easing: Easing.elastic(),
        });
        recordBtnWidth.value = withTiming(20, {
            duration: 100,
            easing: Easing.elastic(),
        });
        let result = await startRecording();
        console.log('handleOnStartRecording', result);
    };
    const handleOnStopRecording = async () => {
        recordBtnRadius.value = withTiming(50, {
            duration: 100,
            easing: Easing.elastic(),
        });
        recordBtnWidth.value = withTiming(50, {
            duration: 100,
            easing: Easing.elastic(),
        });
        const res = await stopRecording();
        if (res) {
            console.log('handleOnStopRecording', res);
        }
    };
    let isRecording = false;
    const onRecordButtonPressed = () => {
        if (!isRecording) {
            isRecording = true;
            handleOnStartRecording();
        }
        else {
            isRecording = false;
            handleOnStopRecording();
        }
    };
    let width = Dimensions.get('screen').width;
    let height = 500;
    let allTextLayout = TextTopAndBottomLayout(width, height, 0);
    let fistTextLayout = allTextLayout[0];
    console.log(fistTextLayout.items);
    return (React.createElement(GestureHandlerRootView, { style: styles.container },
        React.createElement(View, { style: [styles.layoutContainer] },
            React.createElement(RecordScreenZone, { style: [styles.collageContainer] },
                React.createElement(MediaCollage, { layout: defaultLayout5 }))),
        React.createElement(View, { style: [styles.controlContainer] },
            React.createElement(View, { style: [styles.recordContainer] },
                React.createElement(Pressable, { onPress: onRecordButtonPressed },
                    React.createElement(Animated.View, { style: [recordButtonStyle] }))),
            React.createElement(ControlBorderRadius, null),
            React.createElement(ControlBar, { data: data }))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        overflow: 'visible',
    },
    recordContainer: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    recordStartButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'green',
    },
    layoutContainer: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        justifyContent: 'center',
    },
    textStyle: {
        color: '#212121',
        fontSize: 40,
        fontFamily: 'GeikaiSuiKou',
        padding: 10,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 1 },
    },
    collageContainer: {
        zIndex: 2,
        opacity: 1,
    },
    controlContainer: {
        display: 'flex',
        paddingBottom: 20,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: 250,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
//# sourceMappingURL=CollageLayoutScreen.js.map