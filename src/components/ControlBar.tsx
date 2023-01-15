import * as React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import type { ICollageLayout } from '../models/Collage';
import { getValue } from '../utility/Utitliy';
export interface IControlBarProps {
  onControlItemPressed: (
    event: GestureResponderEvent,
    payload: ICollageLayout
  ) => void;
  layouts: ICollageLayout[];
}

export const ControlBar = (props: { data: IControlBarProps }) => {
  let w = 50;
  let h = 50;
  let borderW = 1;
  let lists = props.data.layouts;

  const style = StyleSheet.create({
    continaer: {
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: 1,
      marginRight: 10,
      width: w,
      height: h,
    },
    scrollView: {
      display: 'flex',
      margin: 10,
      flexDirection: 'row',
    },
    itemStyle: {
      position: 'absolute',
      backgroundColor: '#fff',
    },
  });
  const render = (layout: ICollageLayout, index: number) => {
    return (
      <Pressable
        key={`${layout.title}${index}`}
        onPress={(evt) => props.data.onControlItemPressed(evt, layout)}
      >
        <View key={`${layout.title}`} style={[style.continaer]}>
          {layout.items.map((a, i) => {
            return (
              <View
                key={`${layout.title}${a.id}${i}`}
                style={[
                  style.itemStyle,
                  {
                    left: getValue(a.sourceLayout.percentLeft, w, h, borderW),
                    top: getValue(a.sourceLayout.percentTop, w, h, borderW),
                  },
                  {
                    width:
                      getValue(a.sourceLayout.percentWidth, w, h, borderW) - 1,
                    height:
                      getValue(a.sourceLayout.percentHeight, w, h, borderW) - 1,
                  },
                ]}
              />
            );
          })}
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={[style.scrollView]}
      >
        {lists.map((item, i) => {
          return render(item, i);
        })}
      </ScrollView>
    </View>
  );
};
