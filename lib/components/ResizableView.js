import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, } from 'react-native-reanimated';
import { GlobalSetting } from './GlobalSetting';
const resizerStyle = StyleSheet.create({
    resizeDragerStyle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        position: 'absolute',
        borderStyle: 'solid',
        borderColor: '#ff0000',
        borderWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    resizeDragerKnob: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    bottomResizer: {
        bottom: 0,
        left: '50%',
        marginLeft: -20,
        marginBottom: -20,
    },
    topResizer: {
        top: 0,
        left: '50%',
        marginLeft: -20,
        marginTop: -20,
    },
    leftResizer: {
        top: '50%',
        left: 0,
        marginLeft: -20,
        marginTop: -20,
    },
    rightResizer: {
        top: '50%',
        right: 0,
        marginRight: -20,
        marginTop: -20,
    },
});
export const ResizableView = (props) => {
    const resizerDynamicStyle = useAnimatedStyle(() => {
        return {
            borderRadius: GlobalSetting.radius.value,
            borderStyle: 'solid',
            position: 'relative',
            borderColor: '#ff0000',
            borderWidth: 2,
            flex: 1,
        };
    });
    let style = props.collageItem.style;
    let resizer = props.collageItem.resizerItem; //computeCollageResizer(GlobalSetting.selectedItem, GlobalSetting.newLayout.items);
    //console.log("resizer", resizer);
    //assignValue(props.allItem);
    let minSize = 50;
    const resizeBottomHandler = useAnimatedGestureHandler({
        onStart: (_ev, ctx) => {
            var _a, _b, _c, _d;
            ctx.boxWidth = style.width.value;
            ctx.boxHeight = style.height.value;
            if (resizer.bottomResizerPointLinks) {
                (_b = (_a = resizer.bottomResizerPointLinks.bottom) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                    ctx[`${i}bottomW`] = a.width.value;
                    ctx[`${i}bottomH`] = a.height.value;
                    ctx[`${i}bottomX`] = a.translateX.value;
                    ctx[`${i}bottomY`] = a.translateY.value;
                });
                (_d = (_c = resizer.bottomResizerPointLinks.top) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.forEach((a, i) => {
                    ctx[`${i}topW`] = a.width.value;
                    ctx[`${i}topH`] = a.height.value;
                    ctx[`${i}topX`] = a.translateX.value;
                    ctx[`${i}topY`] = a.translateY.value;
                });
            }
            //props.allItem.forEach((a)=>{});
            //runOnJS(onStartResizing)(_ev);
        },
        onActive: (ev, ctx) => {
            var _a, _b, _c, _d;
            let allGood = () => {
                var _a, _b, _c, _d;
                let ok = true;
                let height = ctx.boxHeight + ev.translationY;
                if (height > minSize) {
                    if (resizer.bottomResizerPointLinks) {
                        (_b = (_a = resizer.bottomResizerPointLinks.bottom) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                            let value = ctx[`${i}bottomH`] + ev.translationY;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                        (_d = (_c = resizer.bottomResizerPointLinks.top) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.forEach((a, i) => {
                            let value = ctx[`${i}topH`] - ev.translationY;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                    }
                }
                else {
                    ok = false;
                }
                return ok;
            };
            if (allGood()) {
                let height = ctx.boxHeight + ev.translationY;
                style.height.value = height;
                if (resizer.bottomResizerPointLinks) {
                    (_b = (_a = resizer.bottomResizerPointLinks.bottom) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                        a.height.value = ctx[`${i}bottomH`] + ev.translationY;
                    });
                    (_d = (_c = resizer.bottomResizerPointLinks.top) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.forEach((a, i) => {
                        a.height.value = ctx[`${i}topH`] - ev.translationY;
                        a.translateY.value = ctx[`${i}topY`] + ev.translationY;
                    });
                }
            }
            //runOnJS(onAcitveBottomResize)(ev);
            //props.allItem[2].resizerItem.height = (ctx.boxHeight + ev.translationY);
        },
        onFinish: () => {
            'worklet';
        },
    });
    const resizeLeftHandler = useAnimatedGestureHandler({
        onStart: (_ev, ctx) => {
            var _a, _b, _c, _d, _e, _f;
            //console.log(JSON.stringify(_ev));
            ctx.boxWidth = style.width.value;
            ctx.boxHeight = style.height.value;
            ctx.offsetX = style.translateX.value;
            ctx.offsetY = style.translateY.value;
            if (resizer.leftResizerPointLinks) {
                (_c = (_b = (_a = resizer.leftResizerPointLinks) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.forEach((a, i) => {
                    ctx[`${i}leftW`] = a.width.value;
                    ctx[`${i}leftH`] = a.height.value;
                    ctx[`${i}leftX`] = a.translateX.value;
                    ctx[`${i}bottomY`] = a.translateY.value;
                });
                (_f = (_e = (_d = resizer.leftResizerPointLinks) === null || _d === void 0 ? void 0 : _d.right) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.forEach((a, i) => {
                    ctx[`${i}rightW`] = a.width.value;
                    ctx[`${i}rightH`] = a.height.value;
                    ctx[`${i}rightX`] = a.translateX.value;
                    ctx[`${i}rightY`] = a.translateY.value;
                });
            }
        },
        onActive: (ev, ctx) => {
            //console.log(ev, JSON.stringify(ctx));
            var _a, _b, _c, _d;
            let allGood = () => {
                var _a, _b, _c, _d;
                let ok = true;
                let width = ctx.boxWidth - ev.translationX;
                if (width > minSize) {
                    if (resizer.leftResizerPointLinks) {
                        (_b = (_a = resizer.leftResizerPointLinks.left) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                            let value = ctx[`${i}leftW`] - ev.translationX;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                        (_d = (_c = resizer.leftResizerPointLinks.right) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.forEach((a, i) => {
                            let value = ctx[`${i}rightW`] + ev.translationX;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                    }
                }
                else {
                    ok = false;
                }
                return ok;
            };
            if (allGood()) {
                style.width.value = ctx.boxWidth - ev.translationX;
                style.translateX.value = ctx.offsetX + ev.translationX;
                if (resizer.leftResizerPointLinks) {
                    (_b = (_a = resizer.leftResizerPointLinks.left) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                        a.width.value = ctx[`${i}leftW`] - ev.translationX;
                        a.translateX.value = ctx[`${i}leftX`] + ev.translationX;
                    });
                    (_d = (_c = resizer.leftResizerPointLinks.right) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.forEach((a, i) => {
                        a.width.value = ctx[`${i}rightW`] + ev.translationX;
                    });
                }
            }
        },
        onFinish: () => {
            'worklet';
        },
    });
    const resizeRightHandler = useAnimatedGestureHandler({
        onStart: (_ev, ctx) => {
            var _a, _b, _c, _d, _e, _f;
            //console.log(JSON.stringify(_ev));
            ctx.boxWidth = style.width.value;
            ctx.boxHeight = style.height.value;
            if (resizer.rightResizerPointLinks) {
                (_c = (_b = (_a = resizer.rightResizerPointLinks) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.forEach((a, i) => {
                    ctx[`${i}leftW`] = a.width.value;
                    ctx[`${i}leftH`] = a.height.value;
                    ctx[`${i}leftX`] = a.translateX.value;
                    ctx[`${i}bottomY`] = a.translateY.value;
                });
                (_f = (_e = (_d = resizer.rightResizerPointLinks) === null || _d === void 0 ? void 0 : _d.right) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.forEach((a, i) => {
                    ctx[`${i}rightW`] = a.width.value;
                    ctx[`${i}rightH`] = a.height.value;
                    ctx[`${i}rightX`] = a.translateX.value;
                    ctx[`${i}rightY`] = a.translateY.value;
                });
            }
        },
        onActive: (ev, ctx) => {
            var _a, _b, _c, _d, _e;
            let allGood = () => {
                var _a, _b, _c, _d, _e;
                let ok = true;
                let width = ev.translationX + ctx.boxWidth;
                if (width > minSize) {
                    if (resizer.rightResizerPointLinks) {
                        (_c = (_b = (_a = resizer.rightResizerPointLinks) === null || _a === void 0 ? void 0 : _a.left) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.forEach((a, i) => {
                            let value = ctx[`${i}leftW`] - ev.translationX;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                        (_e = (_d = resizer.rightResizerPointLinks.right) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.forEach((a, i) => {
                            let value = ctx[`${i}rightW`] + ev.translationX;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                    }
                }
                else {
                    ok = false;
                }
                return ok;
            };
            if (allGood()) {
                let newWidth = ev.translationX + ctx.boxWidth;
                //console.log(newWidth, ev.translationX, JSON.stringify(ctx));
                style.width.value = newWidth;
                if (resizer.rightResizerPointLinks) {
                    (_b = (_a = resizer.rightResizerPointLinks.left) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                        a.width.value = ctx[`${i}leftW`] - ev.translationX;
                        a.translateX.value = ctx[`${i}leftX`] + ev.translationX;
                    });
                    (_e = (_d = (_c = resizer.rightResizerPointLinks) === null || _c === void 0 ? void 0 : _c.right) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.forEach((a, i) => {
                        a.width.value = ctx[`${i}rightW`] + ev.translationX;
                    });
                }
            }
        },
        onFinish: () => {
            'worklet';
        },
    });
    const resizeTopHandler = useAnimatedGestureHandler({
        onStart: (_ev, ctx) => {
            var _a, _b, _c, _d;
            //console.log(JSON.stringify(_ev));
            ctx.boxWidth = style.width.value;
            ctx.boxHeight = style.height.value;
            ctx.offsetX = style.translateX.value;
            ctx.offsetY = style.translateY.value;
            if (resizer.topResizerPointLinks) {
                (_b = (_a = resizer.topResizerPointLinks.bottom) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.forEach((a, i) => {
                    ctx[`${i}bottomW`] = a.width.value;
                    ctx[`${i}bottomH`] = a.height.value;
                    ctx[`${i}bottomX`] = a.translateX.value;
                    ctx[`${i}bottomY`] = a.translateY.value;
                });
                (_d = (_c = resizer.topResizerPointLinks.top) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.forEach((a, i) => {
                    ctx[`${i}topW`] = a.width.value;
                    ctx[`${i}topH`] = a.height.value;
                    ctx[`${i}topX`] = a.translateX.value;
                    ctx[`${i}topY`] = a.translateY.value;
                });
            }
        },
        onActive: (ev, ctx) => {
            //console.log(ctx.boxHeight - ev.translationY, JSON.stringify(ctx));
            var _a, _b, _c, _d, _e, _f;
            let allGood = () => {
                var _a, _b, _c, _d, _e, _f;
                let ok = true;
                let height = ctx.boxHeight - ev.translationY;
                if (height > minSize) {
                    if (resizer.topResizerPointLinks) {
                        (_c = (_b = (_a = resizer.topResizerPointLinks) === null || _a === void 0 ? void 0 : _a.bottom) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.forEach((a, i) => {
                            let value = ctx[`${i}bottomH`] + ev.translationY;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                        (_f = (_e = (_d = resizer.topResizerPointLinks) === null || _d === void 0 ? void 0 : _d.top) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.forEach((a, i) => {
                            let value = ctx[`${i}topH`] - ev.translationY;
                            if (value < minSize) {
                                ok = false;
                            }
                        });
                    }
                }
                else {
                    ok = false;
                }
                return ok;
            };
            if (allGood()) {
                style.height.value = ctx.boxHeight - ev.translationY;
                style.translateY.value = ctx.offsetY + ev.translationY;
                if (resizer.topResizerPointLinks) {
                    (_c = (_b = (_a = resizer.topResizerPointLinks) === null || _a === void 0 ? void 0 : _a.bottom) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.forEach((a, i) => {
                        a.height.value = ctx[`${i}bottomH`] + ev.translationY;
                    });
                    (_f = (_e = (_d = resizer.topResizerPointLinks) === null || _d === void 0 ? void 0 : _d.top) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.forEach((a, i) => {
                        a.height.value = ctx[`${i}topH`] - ev.translationY;
                        a.translateY.value = ctx[`${i}topY`] + ev.translationY;
                    });
                }
            }
        },
        onFinish: () => {
            'worklet';
        },
    });
    return (React.createElement(Animated.View, { style: [resizerDynamicStyle] },
        !props.collageItem.style.bottomEdge.value ? (React.createElement(PanGestureHandler, { onGestureEvent: resizeBottomHandler },
            React.createElement(Animated.View, { style: [resizerStyle.bottomResizer, resizerStyle.resizeDragerStyle] },
                React.createElement(View, { style: [resizerStyle.resizeDragerKnob] })))) : null,
        !props.collageItem.style.topEdge.value ? (React.createElement(PanGestureHandler, { onGestureEvent: resizeTopHandler },
            React.createElement(Animated.View, { style: [resizerStyle.topResizer, resizerStyle.resizeDragerStyle] },
                React.createElement(View, { style: [resizerStyle.resizeDragerKnob] })))) : null,
        !props.collageItem.style.leftEdge.value ? (React.createElement(PanGestureHandler, { onGestureEvent: resizeLeftHandler },
            React.createElement(Animated.View, { style: [resizerStyle.resizeDragerStyle, resizerStyle.leftResizer] },
                React.createElement(View, { style: [resizerStyle.resizeDragerKnob] })))) : null,
        !props.collageItem.style.rightEdge.value ? (React.createElement(PanGestureHandler, { onGestureEvent: resizeRightHandler },
            React.createElement(Animated.View, { style: [resizerStyle.rightResizer, resizerStyle.resizeDragerStyle] },
                React.createElement(View, { style: [resizerStyle.resizeDragerKnob] })))) : null));
};
//# sourceMappingURL=ResizableView.js.map