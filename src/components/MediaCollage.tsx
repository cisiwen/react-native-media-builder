import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { ICollageItem, ICollageLayout } from '../models/Collage'
import { CollageItem } from './CollageItem'
import { MCEventBus, MCEventType } from './EventBus'

export const MediaCollage = (props: { layout: ICollageLayout }) => {
  let [selectedItem, setSelectedItem] = useState<ICollageItem | undefined>(
    undefined
  )
  let onResizerSelected = (item: ICollageItem) => {
    console.log(MCEventBus.events.length)
    setSelectedItem(
      selectedItem && selectedItem.id === item.id ? undefined : item
    )
  }
  let eventId = `MediaCollage${MCEventType.LayoutChanged}`

  MCEventBus.addToEvents({
    id: eventId,
    type: MCEventType.LayoutChanged,
    callback: () => {
      if (selectedItem) {
        setSelectedItem(undefined)
      }
    },
  })

  useEffect(() => {
    return () => {
      MCEventBus.removeFromEvents(eventId)
    }
  })

  const style = StyleSheet.create({
    rootContainer: {
      zIndex: 10,
      overflow: 'visible',
      borderStyle: 'solid',
      borderColor: '#fff',
      borderWidth: 0,
      backgroundColor: '#fff',
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
      position: 'relative',
    },
  })

  return (
    <View style={[style.rootContainer]}>
      <View style={[style.innerContainer]}>
        {props.layout.items.map((a, i) => {
          return (
            <CollageItem
              allItems={props.layout.items}
              item={a}
              resizer={a.resizerItem}
              key={i}
              onResizerSelected={onResizerSelected}
              selectedItem={selectedItem}
            />
          )
        })}
      </View>
    </View>
  )
}
