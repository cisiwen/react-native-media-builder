import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import Video from 'react-native-video';
import { CollageLayoutScreen } from "./screens/CollageLayoutScreen"
const App = () => {
  useEffect(() => {
    console.log("MB", 1);
  })
  let urls = [
    //'https://www.fsbus.com/wp-content/uploads/2016/02/0713084kx.jpg',
    'https://moviesphere.cdn.7livecloud.io/hls/live/MVS/master.m3u8',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F51d76cebj00r2l9oq004wc000ku00tqg.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2Feec49515j00r2l9oq0048c000ku00v9g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F8419eac2j00r2l9pc001lc000ku00dwg.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://lovenature.cdn.7livecloud.io/hls/live/LOV/master.m3u8',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F5f30e2c3j00r2l9q3003dc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
  ];
  urls = [
    "file:///storage/emulated/0/DCIM/Camera/20220130_150648.heic",
    "file:///storage/emulated/0/DCIM/Camera/20220130_150649.heic",
    "file:///storage/emulated/0/DCIM/Camera/20220130_150647(0).heic",
    "file:///storage/emulated/0/DCIM/Camera/20220121_192708.mp4",
    "https://www.fsbus.com/wp-content/uploads/2016/02/0713084kx.jpg"
  ]
  let oneUrl = 'file:///storage/emulated/0/DCIM/Camera/20220121_192708.mp4';
  //oneUrl = 'file:///storage/emulated/0/DCIM/Camera/20210924_110922.mp4'
  return <View style={{ flex: 1, backgroundColor: "#ff0000" }}>
    <CollageLayoutScreen mediasUri={urls}></CollageLayoutScreen>
  </View>
}

export default App
