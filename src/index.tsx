import * as React from 'react';
import { Button, NativeModules, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
export * from './components/CollageItem';
export * from './components/ControlBar';
export * from './components/ControlBorderRadius';
export * from './components/EditableText';
export * from './components/EventBus';
export * from './components/GlobalSetting';
export * from './components/ImageViewerV2';
export * from './components/MediaCollage';
export * from './components/MoveResizeView';
export * from './components/ResizableView';
export * from './components/SwappableViewItem';
export * from './components/ViewRecorder';
export * from './layouts/Layout5Items';
export * from './layouts/TextLayout2Item';
export * from './models/Collage';
export * from './screens/CollageLayoutScreen';
export * from './screens/ImageViewer';
export * from './utility/Helper';
export * from './utility/RecorderUtility';
export * from './utility/Utitliy';
export * from 'react-native-reanimated';
export const addOne = (input: number) => input + 1;
export const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <Text>You pressed {count} times</Text>
        <Button onPress={() => setCount(addOne(count))} title="Press Me" />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

export default NativeModules.RNMediaBuilderModule;
