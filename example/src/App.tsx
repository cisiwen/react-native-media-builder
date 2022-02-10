import React, { useEffect } from 'react'
import { Text, View } from 'react-native';
import { CollageLayoutScreen } from "./screens/CollageLayoutScreen"
const App = () => {
  useEffect(() => {
    console.log("MB", 1);
  })
  let urls = [
    //'https://www.fsbus.com/wp-content/uploads/2016/02/0713084kx.jpg',
    'https://csm-e-n7aus-eb.tls1.yospace.com/csm/extlive/sevenprd01,CAS04.m3u8?appId=7plus&deviceType=web&platformType=web&ppId=d5508b44a3df39478309d09ce3140f9c&videoType=live&accountId=5650355166001&advertId=d5508b44a3df39478309d09ce3140f9c&uaId=d5508b44a3df39478309d09ce3140f9c&optinDeviceType=&optinAdTracking=0&tvid=18cc5a67617d4d6a87aff665bf4a9c9d&pc=2015&deviceId=f83bb957-319e-4dfb-950c-17dc4c48f694&hl=en&vid=6266059263001&&pp=ssai-web&custParams=rc%25253D7&rc=7',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F51d76cebj00r2l9oq004wc000ku00tqg.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2Feec49515j00r2l9oq0048c000ku00v9g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F8419eac2j00r2l9pc001lc000ku00dwg.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F11062988j00r2l9q0002sc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
    'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1115%2F5f30e2c3j00r2l9q3003dc000ku00u0g.jpg&thumbnail=650x2147483647&quality=80&type=jpg',
  ]
  return <View style={{ flex: 1, backgroundColor: "#ff0000" }}><CollageLayoutScreen mediasUri={urls}></CollageLayoutScreen></View>
}

export default App
