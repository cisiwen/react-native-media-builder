import React, { useEffect } from 'react';
import { View } from 'react-native';

import { CollageLayoutScreen } from 'react-native-media-builder';
const App = () => {
  useEffect(() => {
    console.log('MB', 1);
  });
  let urls = [
    //'https://www.fsbus.com/wp-content/uploads/2016/02/0713084kx.jpg',
    'https://photos.smugmug.com/photos/i-FP3gngL/0/52c53d83/L/i-FP3gngL-L.jpg',
    'https://www.popo8.com/host/data/202301/13/14/8a78d1d.jpg',
    'https://www.popo8.com/host/data/202301/12/8/eab4cbc.jpg',
    'https://www.popo8.com/host/data/202301/13/12/2dfed39.jpg',
    'https://www.popo8.com/host/data/202301/12/3/d2df2fb.jpg',
    'https://www.popo8.com/host/data/202301/12/10/35f6949.jpg',
  ];

  //let oneUrl = 'file:///storage/emulated/0/DCIM/Camera/20220121_192708.mp4';
  //oneUrl = 'file:///storage/emulated/0/DCIM/Camera/20210924_110922.mp4'
  return (
    <View style={{ flex: 1, backgroundColor: '#ff0000' }}>
      <CollageLayoutScreen mediasUri={urls} />
    </View>
  );
};

export default App;
