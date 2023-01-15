import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated';
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
    backgroundColor: 'transparent'
  },
  resizeDragerKnob: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 30
  },
  bottomResizer: {
    bottom: 0,
    left: '50%',
    marginLeft: -20,
    marginBottom: -20
  },
  topResizer: {
    top: 0,
    left: '50%',
    marginLeft: -20,
    marginTop: -20
  },
  leftResizer: {
    top: '50%',
    left: 0,
    marginLeft: -20,
    marginTop: -20
  },
  rightResizer: {
    top: '50%',
    right: 0,
    marginRight: -20,
    marginTop: -20
  }
});
export const ResizableView = props => {
  const resizerDynamicStyle = useAnimatedStyle(() => {
    return {
      borderRadius: GlobalSetting.radius.value,
      borderStyle: 'solid',
      position: 'relative',
      borderColor: '#ff0000',
      borderWidth: 2,
      flex: 1
    };
  });
  let style = props.collageItem.style;
  let resizer = props.collageItem.resizerItem; //computeCollageResizer(GlobalSetting.selectedItem, GlobalSetting.newLayout.items);
  //console.log("resizer", resizer);
  //assignValue(props.allItem);
  let minSize = 50;
  const resizeBottomHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.boxWidth = style.width.value;
      ctx.boxHeight = style.height.value;
      if (resizer.bottomResizerPointLinks) {
        var _resizer$bottomResize, _resizer$bottomResize2, _resizer$bottomResize3, _resizer$bottomResize4;
        (_resizer$bottomResize = resizer.bottomResizerPointLinks.bottom) === null || _resizer$bottomResize === void 0 ? void 0 : (_resizer$bottomResize2 = _resizer$bottomResize.value) === null || _resizer$bottomResize2 === void 0 ? void 0 : _resizer$bottomResize2.forEach((a, i) => {
          ctx[`${i}bottomW`] = a.width.value;
          ctx[`${i}bottomH`] = a.height.value;
          ctx[`${i}bottomX`] = a.translateX.value;
          ctx[`${i}bottomY`] = a.translateY.value;
        });
        (_resizer$bottomResize3 = resizer.bottomResizerPointLinks.top) === null || _resizer$bottomResize3 === void 0 ? void 0 : (_resizer$bottomResize4 = _resizer$bottomResize3.value) === null || _resizer$bottomResize4 === void 0 ? void 0 : _resizer$bottomResize4.forEach((a, i) => {
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
      let allGood = () => {
        let ok = true;
        let height = ctx.boxHeight + ev.translationY;
        if (height > minSize) {
          if (resizer.bottomResizerPointLinks) {
            var _resizer$bottomResize5, _resizer$bottomResize6, _resizer$bottomResize7, _resizer$bottomResize8;
            (_resizer$bottomResize5 = resizer.bottomResizerPointLinks.bottom) === null || _resizer$bottomResize5 === void 0 ? void 0 : (_resizer$bottomResize6 = _resizer$bottomResize5.value) === null || _resizer$bottomResize6 === void 0 ? void 0 : _resizer$bottomResize6.forEach((a, i) => {
              let value = ctx[`${i}bottomH`] + ev.translationY;
              if (value < minSize) {
                ok = false;
              }
            });
            (_resizer$bottomResize7 = resizer.bottomResizerPointLinks.top) === null || _resizer$bottomResize7 === void 0 ? void 0 : (_resizer$bottomResize8 = _resizer$bottomResize7.value) === null || _resizer$bottomResize8 === void 0 ? void 0 : _resizer$bottomResize8.forEach((a, i) => {
              let value = ctx[`${i}topH`] - ev.translationY;
              if (value < minSize) {
                ok = false;
              }
            });
          }
        } else {
          ok = false;
        }
        return ok;
      };
      if (allGood()) {
        let height = ctx.boxHeight + ev.translationY;
        style.height.value = height;
        if (resizer.bottomResizerPointLinks) {
          var _resizer$bottomResize9, _resizer$bottomResize10, _resizer$bottomResize11, _resizer$bottomResize12;
          (_resizer$bottomResize9 = resizer.bottomResizerPointLinks.bottom) === null || _resizer$bottomResize9 === void 0 ? void 0 : (_resizer$bottomResize10 = _resizer$bottomResize9.value) === null || _resizer$bottomResize10 === void 0 ? void 0 : _resizer$bottomResize10.forEach((a, i) => {
            a.height.value = ctx[`${i}bottomH`] + ev.translationY;
          });
          (_resizer$bottomResize11 = resizer.bottomResizerPointLinks.top) === null || _resizer$bottomResize11 === void 0 ? void 0 : (_resizer$bottomResize12 = _resizer$bottomResize11.value) === null || _resizer$bottomResize12 === void 0 ? void 0 : _resizer$bottomResize12.forEach((a, i) => {
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
    }
  });
  const resizeLeftHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      //console.log(JSON.stringify(_ev));
      ctx.boxWidth = style.width.value;
      ctx.boxHeight = style.height.value;
      ctx.offsetX = style.translateX.value;
      ctx.offsetY = style.translateY.value;
      if (resizer.leftResizerPointLinks) {
        var _resizer$leftResizerP, _resizer$leftResizerP2, _resizer$leftResizerP3, _resizer$leftResizerP4, _resizer$leftResizerP5, _resizer$leftResizerP6;
        (_resizer$leftResizerP = resizer.leftResizerPointLinks) === null || _resizer$leftResizerP === void 0 ? void 0 : (_resizer$leftResizerP2 = _resizer$leftResizerP.left) === null || _resizer$leftResizerP2 === void 0 ? void 0 : (_resizer$leftResizerP3 = _resizer$leftResizerP2.value) === null || _resizer$leftResizerP3 === void 0 ? void 0 : _resizer$leftResizerP3.forEach((a, i) => {
          ctx[`${i}leftW`] = a.width.value;
          ctx[`${i}leftH`] = a.height.value;
          ctx[`${i}leftX`] = a.translateX.value;
          ctx[`${i}bottomY`] = a.translateY.value;
        });
        (_resizer$leftResizerP4 = resizer.leftResizerPointLinks) === null || _resizer$leftResizerP4 === void 0 ? void 0 : (_resizer$leftResizerP5 = _resizer$leftResizerP4.right) === null || _resizer$leftResizerP5 === void 0 ? void 0 : (_resizer$leftResizerP6 = _resizer$leftResizerP5.value) === null || _resizer$leftResizerP6 === void 0 ? void 0 : _resizer$leftResizerP6.forEach((a, i) => {
          ctx[`${i}rightW`] = a.width.value;
          ctx[`${i}rightH`] = a.height.value;
          ctx[`${i}rightX`] = a.translateX.value;
          ctx[`${i}rightY`] = a.translateY.value;
        });
      }
    },
    onActive: (ev, ctx) => {
      //console.log(ev, JSON.stringify(ctx));

      let allGood = () => {
        let ok = true;
        let width = ctx.boxWidth - ev.translationX;
        if (width > minSize) {
          if (resizer.leftResizerPointLinks) {
            var _resizer$leftResizerP7, _resizer$leftResizerP8, _resizer$leftResizerP9, _resizer$leftResizerP10;
            (_resizer$leftResizerP7 = resizer.leftResizerPointLinks.left) === null || _resizer$leftResizerP7 === void 0 ? void 0 : (_resizer$leftResizerP8 = _resizer$leftResizerP7.value) === null || _resizer$leftResizerP8 === void 0 ? void 0 : _resizer$leftResizerP8.forEach((a, i) => {
              let value = ctx[`${i}leftW`] - ev.translationX;
              if (value < minSize) {
                ok = false;
              }
            });
            (_resizer$leftResizerP9 = resizer.leftResizerPointLinks.right) === null || _resizer$leftResizerP9 === void 0 ? void 0 : (_resizer$leftResizerP10 = _resizer$leftResizerP9.value) === null || _resizer$leftResizerP10 === void 0 ? void 0 : _resizer$leftResizerP10.forEach((a, i) => {
              let value = ctx[`${i}rightW`] + ev.translationX;
              if (value < minSize) {
                ok = false;
              }
            });
          }
        } else {
          ok = false;
        }
        return ok;
      };
      if (allGood()) {
        style.width.value = ctx.boxWidth - ev.translationX;
        style.translateX.value = ctx.offsetX + ev.translationX;
        if (resizer.leftResizerPointLinks) {
          var _resizer$leftResizerP11, _resizer$leftResizerP12, _resizer$leftResizerP13, _resizer$leftResizerP14;
          (_resizer$leftResizerP11 = resizer.leftResizerPointLinks.left) === null || _resizer$leftResizerP11 === void 0 ? void 0 : (_resizer$leftResizerP12 = _resizer$leftResizerP11.value) === null || _resizer$leftResizerP12 === void 0 ? void 0 : _resizer$leftResizerP12.forEach((a, i) => {
            a.width.value = ctx[`${i}leftW`] - ev.translationX;
            a.translateX.value = ctx[`${i}leftX`] + ev.translationX;
          });
          (_resizer$leftResizerP13 = resizer.leftResizerPointLinks.right) === null || _resizer$leftResizerP13 === void 0 ? void 0 : (_resizer$leftResizerP14 = _resizer$leftResizerP13.value) === null || _resizer$leftResizerP14 === void 0 ? void 0 : _resizer$leftResizerP14.forEach((a, i) => {
            a.width.value = ctx[`${i}rightW`] + ev.translationX;
          });
        }
      }
    },
    onFinish: () => {
      'worklet';
    }
  });
  const resizeRightHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      //console.log(JSON.stringify(_ev));
      ctx.boxWidth = style.width.value;
      ctx.boxHeight = style.height.value;
      if (resizer.rightResizerPointLinks) {
        var _resizer$rightResizer, _resizer$rightResizer2, _resizer$rightResizer3, _resizer$rightResizer4, _resizer$rightResizer5, _resizer$rightResizer6;
        (_resizer$rightResizer = resizer.rightResizerPointLinks) === null || _resizer$rightResizer === void 0 ? void 0 : (_resizer$rightResizer2 = _resizer$rightResizer.left) === null || _resizer$rightResizer2 === void 0 ? void 0 : (_resizer$rightResizer3 = _resizer$rightResizer2.value) === null || _resizer$rightResizer3 === void 0 ? void 0 : _resizer$rightResizer3.forEach((a, i) => {
          ctx[`${i}leftW`] = a.width.value;
          ctx[`${i}leftH`] = a.height.value;
          ctx[`${i}leftX`] = a.translateX.value;
          ctx[`${i}bottomY`] = a.translateY.value;
        });
        (_resizer$rightResizer4 = resizer.rightResizerPointLinks) === null || _resizer$rightResizer4 === void 0 ? void 0 : (_resizer$rightResizer5 = _resizer$rightResizer4.right) === null || _resizer$rightResizer5 === void 0 ? void 0 : (_resizer$rightResizer6 = _resizer$rightResizer5.value) === null || _resizer$rightResizer6 === void 0 ? void 0 : _resizer$rightResizer6.forEach((a, i) => {
          ctx[`${i}rightW`] = a.width.value;
          ctx[`${i}rightH`] = a.height.value;
          ctx[`${i}rightX`] = a.translateX.value;
          ctx[`${i}rightY`] = a.translateY.value;
        });
      }
    },
    onActive: (ev, ctx) => {
      let allGood = () => {
        let ok = true;
        let width = ev.translationX + ctx.boxWidth;
        if (width > minSize) {
          if (resizer.rightResizerPointLinks) {
            var _resizer$rightResizer7, _resizer$rightResizer8, _resizer$rightResizer9, _resizer$rightResizer10, _resizer$rightResizer11;
            (_resizer$rightResizer7 = resizer.rightResizerPointLinks) === null || _resizer$rightResizer7 === void 0 ? void 0 : (_resizer$rightResizer8 = _resizer$rightResizer7.left) === null || _resizer$rightResizer8 === void 0 ? void 0 : (_resizer$rightResizer9 = _resizer$rightResizer8.value) === null || _resizer$rightResizer9 === void 0 ? void 0 : _resizer$rightResizer9.forEach((a, i) => {
              let value = ctx[`${i}leftW`] - ev.translationX;
              if (value < minSize) {
                ok = false;
              }
            });
            (_resizer$rightResizer10 = resizer.rightResizerPointLinks.right) === null || _resizer$rightResizer10 === void 0 ? void 0 : (_resizer$rightResizer11 = _resizer$rightResizer10.value) === null || _resizer$rightResizer11 === void 0 ? void 0 : _resizer$rightResizer11.forEach((a, i) => {
              let value = ctx[`${i}rightW`] + ev.translationX;
              if (value < minSize) {
                ok = false;
              }
            });
          }
        } else {
          ok = false;
        }
        return ok;
      };
      if (allGood()) {
        let newWidth = ev.translationX + ctx.boxWidth;
        //console.log(newWidth, ev.translationX, JSON.stringify(ctx));
        style.width.value = newWidth;
        if (resizer.rightResizerPointLinks) {
          var _resizer$rightResizer12, _resizer$rightResizer13, _resizer$rightResizer14, _resizer$rightResizer15, _resizer$rightResizer16;
          (_resizer$rightResizer12 = resizer.rightResizerPointLinks.left) === null || _resizer$rightResizer12 === void 0 ? void 0 : (_resizer$rightResizer13 = _resizer$rightResizer12.value) === null || _resizer$rightResizer13 === void 0 ? void 0 : _resizer$rightResizer13.forEach((a, i) => {
            a.width.value = ctx[`${i}leftW`] - ev.translationX;
            a.translateX.value = ctx[`${i}leftX`] + ev.translationX;
          });
          (_resizer$rightResizer14 = resizer.rightResizerPointLinks) === null || _resizer$rightResizer14 === void 0 ? void 0 : (_resizer$rightResizer15 = _resizer$rightResizer14.right) === null || _resizer$rightResizer15 === void 0 ? void 0 : (_resizer$rightResizer16 = _resizer$rightResizer15.value) === null || _resizer$rightResizer16 === void 0 ? void 0 : _resizer$rightResizer16.forEach((a, i) => {
            a.width.value = ctx[`${i}rightW`] + ev.translationX;
          });
        }
      }
    },
    onFinish: () => {
      'worklet';
    }
  });
  const resizeTopHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      //console.log(JSON.stringify(_ev));
      ctx.boxWidth = style.width.value;
      ctx.boxHeight = style.height.value;
      ctx.offsetX = style.translateX.value;
      ctx.offsetY = style.translateY.value;
      if (resizer.topResizerPointLinks) {
        var _resizer$topResizerPo, _resizer$topResizerPo2, _resizer$topResizerPo3, _resizer$topResizerPo4;
        (_resizer$topResizerPo = resizer.topResizerPointLinks.bottom) === null || _resizer$topResizerPo === void 0 ? void 0 : (_resizer$topResizerPo2 = _resizer$topResizerPo.value) === null || _resizer$topResizerPo2 === void 0 ? void 0 : _resizer$topResizerPo2.forEach((a, i) => {
          ctx[`${i}bottomW`] = a.width.value;
          ctx[`${i}bottomH`] = a.height.value;
          ctx[`${i}bottomX`] = a.translateX.value;
          ctx[`${i}bottomY`] = a.translateY.value;
        });
        (_resizer$topResizerPo3 = resizer.topResizerPointLinks.top) === null || _resizer$topResizerPo3 === void 0 ? void 0 : (_resizer$topResizerPo4 = _resizer$topResizerPo3.value) === null || _resizer$topResizerPo4 === void 0 ? void 0 : _resizer$topResizerPo4.forEach((a, i) => {
          ctx[`${i}topW`] = a.width.value;
          ctx[`${i}topH`] = a.height.value;
          ctx[`${i}topX`] = a.translateX.value;
          ctx[`${i}topY`] = a.translateY.value;
        });
      }
    },
    onActive: (ev, ctx) => {
      //console.log(ctx.boxHeight - ev.translationY, JSON.stringify(ctx));

      let allGood = () => {
        let ok = true;
        let height = ctx.boxHeight - ev.translationY;
        if (height > minSize) {
          if (resizer.topResizerPointLinks) {
            var _resizer$topResizerPo5, _resizer$topResizerPo6, _resizer$topResizerPo7, _resizer$topResizerPo8, _resizer$topResizerPo9, _resizer$topResizerPo10;
            (_resizer$topResizerPo5 = resizer.topResizerPointLinks) === null || _resizer$topResizerPo5 === void 0 ? void 0 : (_resizer$topResizerPo6 = _resizer$topResizerPo5.bottom) === null || _resizer$topResizerPo6 === void 0 ? void 0 : (_resizer$topResizerPo7 = _resizer$topResizerPo6.value) === null || _resizer$topResizerPo7 === void 0 ? void 0 : _resizer$topResizerPo7.forEach((a, i) => {
              let value = ctx[`${i}bottomH`] + ev.translationY;
              if (value < minSize) {
                ok = false;
              }
            });
            (_resizer$topResizerPo8 = resizer.topResizerPointLinks) === null || _resizer$topResizerPo8 === void 0 ? void 0 : (_resizer$topResizerPo9 = _resizer$topResizerPo8.top) === null || _resizer$topResizerPo9 === void 0 ? void 0 : (_resizer$topResizerPo10 = _resizer$topResizerPo9.value) === null || _resizer$topResizerPo10 === void 0 ? void 0 : _resizer$topResizerPo10.forEach((a, i) => {
              let value = ctx[`${i}topH`] - ev.translationY;
              if (value < minSize) {
                ok = false;
              }
            });
          }
        } else {
          ok = false;
        }
        return ok;
      };
      if (allGood()) {
        style.height.value = ctx.boxHeight - ev.translationY;
        style.translateY.value = ctx.offsetY + ev.translationY;
        if (resizer.topResizerPointLinks) {
          var _resizer$topResizerPo11, _resizer$topResizerPo12, _resizer$topResizerPo13, _resizer$topResizerPo14, _resizer$topResizerPo15, _resizer$topResizerPo16;
          (_resizer$topResizerPo11 = resizer.topResizerPointLinks) === null || _resizer$topResizerPo11 === void 0 ? void 0 : (_resizer$topResizerPo12 = _resizer$topResizerPo11.bottom) === null || _resizer$topResizerPo12 === void 0 ? void 0 : (_resizer$topResizerPo13 = _resizer$topResizerPo12.value) === null || _resizer$topResizerPo13 === void 0 ? void 0 : _resizer$topResizerPo13.forEach((a, i) => {
            a.height.value = ctx[`${i}bottomH`] + ev.translationY;
          });
          (_resizer$topResizerPo14 = resizer.topResizerPointLinks) === null || _resizer$topResizerPo14 === void 0 ? void 0 : (_resizer$topResizerPo15 = _resizer$topResizerPo14.top) === null || _resizer$topResizerPo15 === void 0 ? void 0 : (_resizer$topResizerPo16 = _resizer$topResizerPo15.value) === null || _resizer$topResizerPo16 === void 0 ? void 0 : _resizer$topResizerPo16.forEach((a, i) => {
            a.height.value = ctx[`${i}topH`] - ev.translationY;
            a.translateY.value = ctx[`${i}topY`] + ev.translationY;
          });
        }
      }
    },
    onFinish: () => {
      'worklet';
    }
  });
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [resizerDynamicStyle]
  }, !props.collageItem.style.bottomEdge.value ? /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: resizeBottomHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [resizerStyle.bottomResizer, resizerStyle.resizeDragerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: [resizerStyle.resizeDragerKnob]
  }))) : null, !props.collageItem.style.topEdge.value ? /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: resizeTopHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [resizerStyle.topResizer, resizerStyle.resizeDragerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: [resizerStyle.resizeDragerKnob]
  }))) : null, !props.collageItem.style.leftEdge.value ? /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: resizeLeftHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [resizerStyle.resizeDragerStyle, resizerStyle.leftResizer]
  }, /*#__PURE__*/React.createElement(View, {
    style: [resizerStyle.resizeDragerKnob]
  }))) : null, !props.collageItem.style.rightEdge.value ? /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: resizeRightHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [resizerStyle.rightResizer, resizerStyle.resizeDragerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: [resizerStyle.resizeDragerKnob]
  }))) : null);
};
//# sourceMappingURL=ResizableView.js.map