import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
const style = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: 'GeikaiSuiKou'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
});
export const EditableText = props => {
  let [text, setText] = useState(props.text);
  const onTextChange = e => {
    setText(e.nativeEvent.text);
  };
  const [isEditMode, toggleEditMode] = useState(false);
  const onDoubleTapped = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      toggleEditMode(!isEditMode);
    }
  };
  return /*#__PURE__*/React.createElement(View, null, isEditMode ? /*#__PURE__*/React.createElement(View, {
    style: [style.inputContainer]
  }, /*#__PURE__*/React.createElement(TextInput, {
    multiline: true,
    value: text,
    onChange: onTextChange,
    editable: true
  }), /*#__PURE__*/React.createElement(View, null), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, null, "not"))) : /*#__PURE__*/React.createElement(TapGestureHandler, {
    onHandlerStateChange: onDoubleTapped,
    numberOfTaps: 2
  }, /*#__PURE__*/React.createElement(Text, {
    style: [style.text]
  }, text)));
};
//# sourceMappingURL=EditableText.js.map