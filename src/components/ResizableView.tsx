import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { ICollageItem } from '../models/Collage'
import { GlobalSetting } from './GlobalSetting'

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
})

export const ResizableView = (props: {
  collageItem: ICollageItem
  allItem: ICollageItem[]
  onStartResizing: (sender: any) => void
  onAcitveResize: (sender: any) => void
}) => {
  const resizerDynamicStyle = useAnimatedStyle(() => {
    return {
      borderRadius: GlobalSetting.radius.value,
      borderStyle: 'solid',
      position: 'relative',
      borderColor: '#ff0000',
      borderWidth: 2,
      flex: 1,
    }
  })

  let style = props.collageItem.style
  let resizer = props.collageItem.resizerItem //computeCollageResizer(GlobalSetting.selectedItem, GlobalSetting.newLayout.items);
  //console.log("resizer", resizer);
  //assignValue(props.allItem);
  let minSize: number = 50
  const resizeBottomHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx: any) => {
      ctx.boxWidth = style.width.value
      ctx.boxHeight = style.height.value

      if (resizer.bottomResizerPointLinks) {
        resizer.bottomResizerPointLinks.bottom?.value?.forEach((a, i) => {
          ctx[`${i}bottomW`] = a.width.value
          ctx[`${i}bottomH`] = a.height.value
          ctx[`${i}bottomX`] = a.translateX.value
          ctx[`${i}bottomY`] = a.translateY.value
        })
        resizer.bottomResizerPointLinks.top?.value?.forEach((a, i) => {
          ctx[`${i}topW`] = a.width.value
          ctx[`${i}topH`] = a.height.value
          ctx[`${i}topX`] = a.translateX.value
          ctx[`${i}topY`] = a.translateY.value
        })
      }

      //props.allItem.forEach((a)=>{});
      //runOnJS(onStartResizing)(_ev);
    },
    onActive: (ev, ctx: any) => {
      let allGood = (): boolean => {
        let ok = true
        let height = ctx.boxHeight + ev.translationY
        if (height > minSize) {
          if (resizer.bottomResizerPointLinks) {
            resizer.bottomResizerPointLinks.bottom?.value?.forEach((a, i) => {
              let value = ctx[`${i}bottomH`] + ev.translationY
              if (value < minSize) {
                ok = false
              }
            })
            resizer.bottomResizerPointLinks.top?.value?.forEach((a, i) => {
              let value = ctx[`${i}topH`] - ev.translationY
              if (value < minSize) {
                ok = false
              }
            })
          }
        } else {
          ok = false
        }
        return ok
      }

      if (allGood()) {
        let height = ctx.boxHeight + ev.translationY
        style.height.value = height
        if (resizer.bottomResizerPointLinks) {
          resizer.bottomResizerPointLinks.bottom?.value?.forEach((a, i) => {
            a.height.value = ctx[`${i}bottomH`] + ev.translationY
          })
          resizer.bottomResizerPointLinks.top?.value?.forEach((a, i) => {
            a.height.value = ctx[`${i}topH`] - ev.translationY
            a.translateY.value = ctx[`${i}topY`] + ev.translationY
          })
        }
      }
      //runOnJS(onAcitveBottomResize)(ev);
      //props.allItem[2].resizerItem.height = (ctx.boxHeight + ev.translationY);
    },
    onFinish: () => {
      'worklet'
    },
  })

  const resizeLeftHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx: any) => {
      //console.log(JSON.stringify(_ev));
      ctx.boxWidth = style.width.value
      ctx.boxHeight = style.height.value
      ctx.offsetX = style.translateX.value
      ctx.offsetY = style.translateY.value
      if (resizer.leftResizerPointLinks) {
        resizer.leftResizerPointLinks?.left?.value?.forEach((a, i) => {
          ctx[`${i}leftW`] = a.width.value
          ctx[`${i}leftH`] = a.height.value
          ctx[`${i}leftX`] = a.translateX.value
          ctx[`${i}bottomY`] = a.translateY.value
        })
        resizer.leftResizerPointLinks?.right?.value?.forEach((a, i) => {
          ctx[`${i}rightW`] = a.width.value
          ctx[`${i}rightH`] = a.height.value
          ctx[`${i}rightX`] = a.translateX.value
          ctx[`${i}rightY`] = a.translateY.value
        })
      }
    },
    onActive: (ev, ctx: any) => {
      //console.log(ev, JSON.stringify(ctx));

      let allGood = (): boolean => {
        let ok = true
        let width = ctx.boxWidth - ev.translationX
        if (width > minSize) {
          if (resizer.leftResizerPointLinks) {
            resizer.leftResizerPointLinks.left?.value?.forEach((a, i) => {
              let value = ctx[`${i}leftW`] - ev.translationX
              if (value < minSize) {
                ok = false
              }
            })
            resizer.leftResizerPointLinks.right?.value?.forEach((a, i) => {
              let value = ctx[`${i}rightW`] + ev.translationX
              if (value < minSize) {
                ok = false
              }
            })
          }
        } else {
          ok = false
        }
        return ok
      }

      if (allGood()) {
        style.width.value = ctx.boxWidth - ev.translationX
        style.translateX.value = ctx.offsetX + ev.translationX

        if (resizer.leftResizerPointLinks) {
          resizer.leftResizerPointLinks.left?.value?.forEach((a, i) => {
            a.width.value = ctx[`${i}leftW`] - ev.translationX
            a.translateX.value = ctx[`${i}leftX`] + ev.translationX
          })
          resizer.leftResizerPointLinks.right?.value?.forEach((a, i) => {
            a.width.value = ctx[`${i}rightW`] + ev.translationX
          })
        }
      }
    },
    onFinish: () => {
      'worklet'
    },
  })

  const resizeRightHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx: any) => {
      //console.log(JSON.stringify(_ev));
      ctx.boxWidth = style.width.value
      ctx.boxHeight = style.height.value
      if (resizer.rightResizerPointLinks) {
        resizer.rightResizerPointLinks?.left?.value?.forEach((a, i) => {
          ctx[`${i}leftW`] = a.width.value
          ctx[`${i}leftH`] = a.height.value
          ctx[`${i}leftX`] = a.translateX.value
          ctx[`${i}bottomY`] = a.translateY.value
        })
        resizer.rightResizerPointLinks?.right?.value?.forEach((a, i) => {
          ctx[`${i}rightW`] = a.width.value
          ctx[`${i}rightH`] = a.height.value
          ctx[`${i}rightX`] = a.translateX.value
          ctx[`${i}rightY`] = a.translateY.value
        })
      }
    },
    onActive: (ev, ctx: any) => {
      let allGood = (): boolean => {
        let ok = true
        let width = ev.translationX + ctx.boxWidth
        if (width > minSize) {
          if (resizer.rightResizerPointLinks) {
            resizer.rightResizerPointLinks?.left?.value?.forEach((a, i) => {
              let value = ctx[`${i}leftW`] - ev.translationX
              if (value < minSize) {
                ok = false
              }
            })
            resizer.rightResizerPointLinks.right?.value?.forEach((a, i) => {
              let value = ctx[`${i}rightW`] + ev.translationX
              if (value < minSize) {
                ok = false
              }
            })
          }
        } else {
          ok = false
        }
        return ok
      }

      if (allGood()) {
        let newWidth = ev.translationX + ctx.boxWidth
        //console.log(newWidth, ev.translationX, JSON.stringify(ctx));
        style.width.value = newWidth

        if (resizer.rightResizerPointLinks) {
          resizer.rightResizerPointLinks.left?.value?.forEach((a, i) => {
            a.width.value = ctx[`${i}leftW`] - ev.translationX
            a.translateX.value = ctx[`${i}leftX`] + ev.translationX
          })
          resizer.rightResizerPointLinks?.right?.value?.forEach((a, i) => {
            a.width.value = ctx[`${i}rightW`] + ev.translationX
          })
        }
      }
    },
    onFinish: () => {
      'worklet'
    },
  })

  const resizeTopHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx: any) => {
      //console.log(JSON.stringify(_ev));
      ctx.boxWidth = style.width.value
      ctx.boxHeight = style.height.value
      ctx.offsetX = style.translateX.value
      ctx.offsetY = style.translateY.value
      if (resizer.topResizerPointLinks) {
        resizer.topResizerPointLinks.bottom?.value?.forEach((a, i) => {
          ctx[`${i}bottomW`] = a.width.value
          ctx[`${i}bottomH`] = a.height.value
          ctx[`${i}bottomX`] = a.translateX.value
          ctx[`${i}bottomY`] = a.translateY.value
        })
        resizer.topResizerPointLinks.top?.value?.forEach((a, i) => {
          ctx[`${i}topW`] = a.width.value
          ctx[`${i}topH`] = a.height.value
          ctx[`${i}topX`] = a.translateX.value
          ctx[`${i}topY`] = a.translateY.value
        })
      }
    },
    onActive: (ev, ctx: any) => {
      //console.log(ctx.boxHeight - ev.translationY, JSON.stringify(ctx));

      let allGood = (): boolean => {
        let ok = true
        let height = ctx.boxHeight - ev.translationY
        if (height > minSize) {
          if (resizer.topResizerPointLinks) {
            resizer.topResizerPointLinks?.bottom?.value?.forEach((a, i) => {
              let value = ctx[`${i}bottomH`] + ev.translationY
              if (value < minSize) {
                ok = false
              }
            })
            resizer.topResizerPointLinks?.top?.value?.forEach((a, i) => {
              let value = ctx[`${i}topH`] - ev.translationY
              if (value < minSize) {
                ok = false
              }
            })
          }
        } else {
          ok = false
        }
        return ok
      }

      if (allGood()) {
        style.height.value = ctx.boxHeight - ev.translationY
        style.translateY.value = ctx.offsetY + ev.translationY
        if (resizer.topResizerPointLinks) {
          resizer.topResizerPointLinks?.bottom?.value?.forEach((a, i) => {
            a.height.value = ctx[`${i}bottomH`] + ev.translationY
          })
          resizer.topResizerPointLinks?.top?.value?.forEach((a, i) => {
            a.height.value = ctx[`${i}topH`] - ev.translationY
            a.translateY.value = ctx[`${i}topY`] + ev.translationY
          })
        }
      }
    },
    onFinish: () => {
      'worklet'
    },
  })

  return (
    <Animated.View style={[resizerDynamicStyle]}>
      {!props.collageItem.style.bottomEdge.value ? (
        <PanGestureHandler onGestureEvent={resizeBottomHandler}>
          <Animated.View
            style={[resizerStyle.bottomResizer, resizerStyle.resizeDragerStyle]}
          >
            <View style={[resizerStyle.resizeDragerKnob]} />
          </Animated.View>
        </PanGestureHandler>
      ) : null}

      {!props.collageItem.style.topEdge.value ? (
        <PanGestureHandler onGestureEvent={resizeTopHandler}>
          <Animated.View
            style={[resizerStyle.topResizer, resizerStyle.resizeDragerStyle]}
          >
            <View style={[resizerStyle.resizeDragerKnob]} />
          </Animated.View>
        </PanGestureHandler>
      ) : null}

      {!props.collageItem.style.leftEdge.value ? (
        <PanGestureHandler onGestureEvent={resizeLeftHandler}>
          <Animated.View
            style={[resizerStyle.resizeDragerStyle, resizerStyle.leftResizer]}
          >
            <View style={[resizerStyle.resizeDragerKnob]} />
          </Animated.View>
        </PanGestureHandler>
      ) : null}
      {!props.collageItem.style.rightEdge.value ? (
        <PanGestureHandler onGestureEvent={resizeRightHandler}>
          <Animated.View
            style={[resizerStyle.rightResizer, resizerStyle.resizeDragerStyle]}
          >
            <View style={[resizerStyle.resizeDragerKnob]} />
          </Animated.View>
        </PanGestureHandler>
      ) : null}
    </Animated.View>
  )
}
