import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ImageViewerV2 } from '../components/ImageViewerV2'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'visible',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: 300,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1,
    aspectRatio: 1,
    backgroundColor: '#ffcc00',
    overflow: 'visible',
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: 'black',
  },
})

export const ImageViewer = () => {
  let url =
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F51d76cebj00r2l9oq004wc000ku00tqg.jpg&thumbnail=650x2147483647&quality=80&type=jpg'
  //url = 'file:///storage/emulated/0/Pictures/WeChat/mmexport1635114586604.jpg'
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.wrapper]}>
        <ImageViewerV2 url={url} />
      </View>
    </GestureHandlerRootView>
  )
}
