"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractExtension = exports.createRandumFileName = exports.createNewFilePath = exports.calcCropLayout = void 0;
var _reactNative = require("react-native");
const createRandumFileName = function () {
  let min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  let max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999;
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
exports.createRandumFileName = createRandumFileName;
const extractExtension = file => {
  const parseFileName = file.split('.');
  return parseFileName[parseFileName.length - 1];
};
exports.extractExtension = extractExtension;
const createNewFilePath = path => {
  const parsePath = path.split('/');
  const fileName = parsePath[parsePath.length - 1];
  if (fileName) {
    parsePath[parsePath.length - 1] = `${createRandumFileName()}.${extractExtension(fileName)}`;
    return parsePath.join('/');
  }
  return undefined;
};
exports.createNewFilePath = createNewFilePath;
const calcCropLayout = layout => {
  let {
    width,
    height,
    x,
    y
  } = layout;
  const scale = _reactNative.Dimensions.get('window').scale;
  if (_reactNative.Platform.OS === 'android') {
    width = Math.ceil(layout.width * scale);
    height = Math.ceil(layout.height * scale);
    x = Math.ceil(layout.x * scale);
    const statusbarHeight = _reactNative.StatusBar.currentHeight ? _reactNative.StatusBar.currentHeight : 0;
    y = Math.ceil((layout.y + statusbarHeight) * scale);
  }
  return {
    width,
    height,
    x,
    y
  };
};
exports.calcCropLayout = calcCropLayout;
//# sourceMappingURL=RecorderUtility.js.map