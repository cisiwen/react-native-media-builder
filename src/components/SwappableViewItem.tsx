import React, { ReactNode } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  GestureEvent,
  GestureEventPayload,
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  Easing,
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { ICollageItem } from '../models/Collage'

export interface ISwappableViewItemProps {
  children: ReactNode
  item: ICollageItem
  allItems: ICollageItem[]
  moveOnly?: boolean
}
const UIStyle = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
})
export const SwappableViewItem = (props: ISwappableViewItemProps) => {
  const originX = useSharedValue(0)
  const originY = useSharedValue(0)
  const originW = useSharedValue(0)
  const originH = useSharedValue(0)
  const centerX = useSharedValue(0)
  const centerY = useSharedValue(0)

  let currentTranslateX: number
  let currentTranslateY: number
  const scale = useSharedValue(0)

  props.item.style.hitTestOpacity = useSharedValue(1)
  props.item.element = useAnimatedRef<Animated.View>()
  props.item.layout = useSharedValue({
    x: 0,
    pageX: 0,
    y: 0,
    pageY: 0,
    width: 0,
    height: 0,
  })

  const style = useAnimatedStyle(() => {
    return {
      padding: scale.value,
      opacity: props.item.style.hitTestOpacity?.value,
    }
  })
  const setSelectedItem = (sender: ICollageItem) => {
    props.allItems.forEach((item, i) => {
      if (item.id !== sender.id) {
        item.style.zIndex.value = item.id
      } else {
        item.style.zIndex.value = 9
      }
    })
  }

  const onHandlerStateChange = (
    evt: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>
  ) => {
    console.log('onHandlerStateChange', evt.nativeEvent)
    if (evt.nativeEvent.state === State.BEGAN) {
    } else if (evt.nativeEvent.state === State.ACTIVE) {
      centerX.value = originW.value / 2 - evt.nativeEvent.x
      centerY.value = originH.value / 2 - evt.nativeEvent.y
      currentTranslateX = props.item.style.translateX.value
      currentTranslateY = props.item.style.translateY.value
      setSelectedItem(props.item)
      let padding = Math.min(originH.value, originW.value) * 0.2
      scale.value = withTiming(10, {
        duration: 300,
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      })
    }
  }

  let hitTarget: ICollageItem | null = null
  const hitTest = (evt: GestureEvent<LongPressGestureHandlerEventPayload>) => {
    let hitted = false
    for (let i = 0; i < props.allItems.length; i++) {
      let item = props.allItems[i]
      if (item.id !== props.item.id) {
        //console.log(item.id, item.layout, evt.nativeEvent);
        if (item.layout) {
          let value = item.layout.value
          let x2 = value.pageX + value.width
          let y2 = value.pageY + value.height
          let xMeeted =
            evt.nativeEvent.absoluteX > value.pageX &&
            evt.nativeEvent.absoluteX < x2
          let yMeeted =
            evt.nativeEvent.absoluteY > value.pageY &&
            evt.nativeEvent.absoluteY < y2
          if (xMeeted && yMeeted) {
            if (item.style.hitTestOpacity) {
              item.style.hitTestOpacity.value = 0.5
            }
            hitted = true
            hitTarget = item
          } else {
            if (item.style.hitTestOpacity) {
              item.style.hitTestOpacity.value = 1
            }
          }
        }
      }
    }
    if (!hitted) {
      hitTarget = null
    }
  }

  const onMoveGestureEvent = (
    evt: GestureEvent<LongPressGestureHandlerEventPayload>
  ) => {
    //console.log("onMoveGestureEvent", evt.nativeEvent.state);
    if (evt.nativeEvent.state === State.BEGAN) {
    } else if (evt.nativeEvent.state === State.ACTIVE) {
      let tranX = evt.nativeEvent.absoluteX - originW.value / 2 - originX.value
      let tranY = evt.nativeEvent.absoluteY - originH.value / 2 - originY.value
      tranY = tranY - 30
      console.log(
        'StatusBar height',
        Dimensions.get('screen').height - Dimensions.get('window').height
      )
      //console.log("onMoveGestureEvent", tranX, tranY, centerX.value, centerY.value, originW.value, originH.value, evt.nativeEvent.absoluteX, evt.nativeEvent.absoluteY, evt.nativeEvent.x, evt.nativeEvent.y);
      props.item.style.translateX.value =
        tranX + centerX.value + currentTranslateX
      props.item.style.translateY.value =
        tranY + centerY.value + currentTranslateY
      if (!props.moveOnly) {
        hitTest(evt)
      }
      //console.log(originX.value, originY.value);
      //props.item.resizerItem.translateX.value = evt.nativeEvent.absoluteX - originW.value / 2 - originX.value;
      //props.item.resizerItem.translateY.value = evt.nativeEvent.absoluteY - originH.value / 2 - originY.value;
    }
  }

  const handler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: (ev: GestureEventPayload & TapGestureHandlerEventPayload) => {
      if (props.item.element) {
        let measured = measure(props.item.element)
        originX.value = measured.pageX
        originY.value = measured.pageY
        originW.value = measured.width
        originH.value = measured.height
        //console.log("measured", measured);
        props.allItems.forEach((item) => {
          if (item.id !== props.item.id) {
            if (item.element != null) {
              let eMeasured = measure(item.element)
              if (item.layout) {
                item.layout.value = eMeasured
              }
              //measureedLayout.push({ layout: measured });
              //console.log("computeLayout", item.id, measured);
            }
          }
        })
      }
    },
  })

  const onDragEnded = () => {
    if (!props.moveOnly) {
      props.item.style.translateX.value = withTiming(currentTranslateX, {
        duration: 500,
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      })
      props.item.style.translateY.value = withTiming(currentTranslateY, {
        duration: 500,
        easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
      })
    }
    originH.value = 0
    originW.value = 0
    originX.value = 0
    originY.value = 0
    centerX.value = 0
    centerY.value = 0
    scale.value = withTiming(0, {
      duration: 300,
      easing: Easing.bezierFn(0.25, 0.1, 0.25, 1),
    })
    if (!props.moveOnly) {
      props.allItems.forEach((a) => {
        if (a.style.hitTestOpacity) {
          a.style.hitTestOpacity.value = 1
        }
      })
      if (hitTarget) {
        if (hitTarget.setUrlState && props.item.setUrlState) {
          let targetUrl = hitTarget.uriShareValue?.value
          if (targetUrl) {
            let myUrl = props.item.uriShareValue?.value
            if (myUrl) {
              hitTarget.setUrlState(myUrl)
              props.item.setUrlState(targetUrl)
              if (props.item.uriShareValue) {
                props.item.uriShareValue.value = targetUrl
              }
              if (hitTarget.uriShareValue) {
                hitTarget.uriShareValue.value = myUrl
              }
            }
          }
        }
      }
    }
  }
  return (
    <TapGestureHandler onHandlerStateChange={handler}>
      <Animated.View ref={props.item.element} style={[UIStyle.flexOne]}>
        <LongPressGestureHandler
          onHandlerStateChange={onHandlerStateChange}
          onEnded={onDragEnded}
          maxDist={10050}
          onGestureEvent={onMoveGestureEvent}
        >
          <View style={[UIStyle.flexOne]}>
            <Animated.View style={[UIStyle.flexOne, style]}>
              {props.children}
            </Animated.View>
          </View>
        </LongPressGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}
