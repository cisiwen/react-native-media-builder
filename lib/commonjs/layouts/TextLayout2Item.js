"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextTopAndBottomLayout = exports.TextTopAndBottom = void 0;
var _Utitliy = require("../utility/Utitliy");
const TextTopAndBottom = () => {
  return [{
    percentWidth: 1,
    percentHeight: 0.2,
    percentLeft: 0,
    percentTop: 0.2
  }];
};
exports.TextTopAndBottom = TextTopAndBottom;
const TextTopAndBottomLayout = (w, h, borderW) => {
  let output = [{
    title: TextTopAndBottom.name,
    items: (0, _Utitliy.collageLayoutToCollageItem)(TextTopAndBottom(), w, h, borderW)
  }];
  return output;
};
exports.TextTopAndBottomLayout = TextTopAndBottomLayout;
//# sourceMappingURL=TextLayout2Item.js.map