import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
const style = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: 'GeikaiSuiKou',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const EditableText = (props: { text: string }) => {
  let [text, setText] = useState<string>(props.text);
  const onTextChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text);
  };

  const [isEditMode, toggleEditMode] = useState<boolean>(false);
  const onDoubleTapped = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      toggleEditMode(!isEditMode);
    }
  };
  return (
    <View>
      {isEditMode ? (
        <View style={[style.inputContainer]}>
          <TextInput
            multiline={true}
            value={text}
            onChange={onTextChange}
            editable={true}
          />
          <View />
          <View>
            <Text>not</Text>
          </View>
        </View>
      ) : (
        <TapGestureHandler
          onHandlerStateChange={onDoubleTapped}
          numberOfTaps={2}
        >
          <Text style={[style.text]}>{text}</Text>
        </TapGestureHandler>
      )}
    </View>
  );
};
