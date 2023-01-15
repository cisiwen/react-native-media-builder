import { Dimensions, Platform, StatusBar } from 'react-native';
export const createRandumFileName = function () {
  let min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  let max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999;
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
export const extractExtension = file => {
  const parseFileName = file.split('.');
  return parseFileName[parseFileName.length - 1];
};
export const createNewFilePath = path => {
  const parsePath = path.split('/');
  const fileName = parsePath[parsePath.length - 1];
  if (fileName) {
    parsePath[parsePath.length - 1] = `${createRandumFileName()}.${extractExtension(fileName)}`;
    return parsePath.join('/');
  }
  return undefined;
};
export const calcCropLayout = layout => {
  let {
    width,
    height,
    x,
    y
  } = layout;
  const scale = Dimensions.get('window').scale;
  if (Platform.OS === 'android') {
    width = Math.ceil(layout.width * scale);
    height = Math.ceil(layout.height * scale);
    x = Math.ceil(layout.x * scale);
    const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
    y = Math.ceil((layout.y + statusbarHeight) * scale);
  }
  return {
    width,
    height,
    x,
    y
  };
};
//# sourceMappingURL=RecorderUtility.js.map