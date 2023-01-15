import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CollageItem } from './CollageItem';
import { MCEventBus, MCEventType } from './EventBus';
export const MediaCollage = props => {
  let [selectedItem, setSelectedItem] = useState(undefined);
  let onResizerSelected = item => {
    console.log(MCEventBus.events.length);
    setSelectedItem(selectedItem && selectedItem.id === item.id ? undefined : item);
  };
  let eventId = `MediaCollage${MCEventType.LayoutChanged}`;
  MCEventBus.addToEvents({
    id: eventId,
    type: MCEventType.LayoutChanged,
    callback: () => {
      if (selectedItem) {
        setSelectedItem(undefined);
      }
    }
  });
  useEffect(() => {
    return () => {
      MCEventBus.removeFromEvents(eventId);
    };
  });
  const style = StyleSheet.create({
    rootContainer: {
      zIndex: 10,
      overflow: 'visible',
      borderStyle: 'solid',
      borderColor: '#fff',
      borderWidth: 0,
      backgroundColor: '#fff'
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
      position: 'relative'
    }
  });
  return /*#__PURE__*/React.createElement(View, {
    style: [style.rootContainer]
  }, /*#__PURE__*/React.createElement(View, {
    style: [style.innerContainer]
  }, props.layout.items.map((a, i) => {
    return /*#__PURE__*/React.createElement(CollageItem, {
      allItems: props.layout.items,
      item: a,
      resizer: a.resizerItem,
      key: i,
      onResizerSelected: onResizerSelected,
      selectedItem: selectedItem
    });
  })));
};
//# sourceMappingURL=MediaCollage.js.map