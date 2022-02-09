import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Counter, ImageViewer } from 'react-native-media-builder'

const App = () => {
  useEffect(() => {
    console.log("MB", 1);
  })

  return <ImageViewer />
}

export default App
