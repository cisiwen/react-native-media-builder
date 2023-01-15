"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = exports.getLinkItemByIds = exports.findValues = exports.computeCollageStyle = exports.computeCollageResizerAll = exports.computeCollageResizer = exports.collageLayoutToCollageItem = exports.assignValue = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
/* eslint-disable react-hooks/rules-of-hooks */

const getValue = function (percent) {
  let rootW = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 411.4285583496094;
  let rootH = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 411.4285583496094;
  let borderWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  let w = rootW - borderWidth;
  let h = rootH - borderWidth;
  return w * percent;
};
exports.getValue = getValue;
const computeCollageResizerAll = all => {
  all.forEach((item, i) => {
    item.resizerItem = computeCollageResizer(item, all);
    item.resizerItemValue = (0, _reactNativeReanimated.useSharedValue)(null);
  });
};
exports.computeCollageResizerAll = computeCollageResizerAll;
const computeCollageResizer = (item, all) => {
  var _n$filter, _n$filter2, _n$filter3, _n$filter4, _n$filter5, _n$filter6, _n$filter7, _n$filter8;
  let resizerItem = {
    id: item.id
  };
  let n = all.filter(a => a.id !== item.id);
  let left = item.style.oriLeft;
  let top = item.style.oriTop;
  let right = left + item.style.oriWidth;
  let bottom = top + item.style.oriHeight;
  let topBottomLinks = (_n$filter = n.filter(a => Math.abs(a.style.oriTop + a.style.oriHeight - top) < 5)) === null || _n$filter === void 0 ? void 0 : _n$filter.map(a => a.id);
  let topTopLinks = (_n$filter2 = n.filter(a => Math.abs(a.style.oriTop - top) < 5)) === null || _n$filter2 === void 0 ? void 0 : _n$filter2.map(a => a.id);
  resizerItem.topResizerPointLinks = {
    topIds: topTopLinks,
    bottomIds: topBottomLinks,
    leftIds: null,
    rightIds: null,
    left: (0, _reactNativeReanimated.useSharedValue)(null),
    right: (0, _reactNativeReanimated.useSharedValue)(null),
    top: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, topTopLinks)),
    bottom: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, topBottomLinks))
  };
  let bottomTopLinks = (_n$filter3 = n.filter(a => Math.abs(a.style.oriTop - bottom) < 5)) === null || _n$filter3 === void 0 ? void 0 : _n$filter3.map(a => a.id);
  let bottomBottomLinks = (_n$filter4 = n.filter(a => Math.abs(a.style.oriTop + a.style.oriHeight - bottom) < 5)) === null || _n$filter4 === void 0 ? void 0 : _n$filter4.map(a => a.id);
  resizerItem.bottomResizerPointLinks = {
    topIds: bottomTopLinks,
    bottomIds: bottomBottomLinks,
    leftIds: null,
    rightIds: null,
    left: (0, _reactNativeReanimated.useSharedValue)(null),
    right: (0, _reactNativeReanimated.useSharedValue)(null),
    top: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, bottomTopLinks)),
    bottom: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, bottomBottomLinks))
  };
  let leftLeftLinks = (_n$filter5 = n.filter(a => Math.abs(a.style.oriLeft - left) < 5)) === null || _n$filter5 === void 0 ? void 0 : _n$filter5.map(a => a.id);
  let leftRightLinks = (_n$filter6 = n.filter(a => Math.abs(a.style.oriLeft + a.style.oriWidth - left) < 5)) === null || _n$filter6 === void 0 ? void 0 : _n$filter6.map(a => a.id);
  resizerItem.leftResizerPointLinks = {
    leftIds: leftLeftLinks,
    rightIds: leftRightLinks,
    top: (0, _reactNativeReanimated.useSharedValue)(null),
    bottom: (0, _reactNativeReanimated.useSharedValue)(null),
    left: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, leftLeftLinks)),
    right: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, leftRightLinks))
  };
  let rightLeftLink = (_n$filter7 = n.filter(a => Math.abs(a.style.oriLeft - right) < 5)) === null || _n$filter7 === void 0 ? void 0 : _n$filter7.map(a => a.id);
  let rightRightLink = (_n$filter8 = n.filter(a => Math.abs(a.style.oriLeft + a.style.oriWidth - right) < 5)) === null || _n$filter8 === void 0 ? void 0 : _n$filter8.map(a => a.id);
  resizerItem.rightResizerPointLinks = {
    leftIds: rightLeftLink,
    rightIds: rightRightLink,
    top: (0, _reactNativeReanimated.useSharedValue)(null),
    bottom: (0, _reactNativeReanimated.useSharedValue)(null),
    left: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, rightLeftLink)),
    right: (0, _reactNativeReanimated.useSharedValue)(getLinkItemByIds(all, rightRightLink))
  };
  return resizerItem;
};
exports.computeCollageResizer = computeCollageResizer;
const collageLayoutToCollageItem = (layout, w, h, borderW) => {
  let items = layout.map((lout, i) => {
    let cItem = {
      id: i,
      key: i,
      style: computeCollageStyle(lout, w, h, borderW, i),
      uri: null,
      resizerItem: null,
      resizerItemValue: null,
      sourceLayout: lout
    };
    return cItem;
  });
  items.forEach((item, i) => {
    item.resizerItem = computeCollageResizer(item, items);
    item.resizerItemValue = (0, _reactNativeReanimated.useSharedValue)(null);
  });
  return items;
};
exports.collageLayoutToCollageItem = collageLayoutToCollageItem;
const computeCollageStyle = (layout, w, h, borderW, index) => {
  let left = getValue(layout.percentLeft, w, h, borderW);
  let top = getValue(layout.percentTop, w, h, borderW);
  let height = getValue(layout.percentHeight, w, h, borderW);
  let width = getValue(layout.percentWidth, w, h, borderW);
  let leftEdge = left === 0;
  let topEdge = top === 0;
  let bottomEdge = top + height > h - 5;
  let rightEdge = left + width > w - 5;
  let style = {
    height: (0, _reactNativeReanimated.useSharedValue)(height),
    width: (0, _reactNativeReanimated.useSharedValue)(width),
    top: (0, _reactNativeReanimated.useSharedValue)(top),
    left: (0, _reactNativeReanimated.useSharedValue)(left),
    leftEdge: (0, _reactNativeReanimated.useSharedValue)(leftEdge),
    topEdge: (0, _reactNativeReanimated.useSharedValue)(topEdge),
    bottomEdge: (0, _reactNativeReanimated.useSharedValue)(bottomEdge),
    rightEdge: (0, _reactNativeReanimated.useSharedValue)(rightEdge),
    hitTestOpacity: (0, _reactNativeReanimated.useSharedValue)(1),
    zIndex: (0, _reactNativeReanimated.useSharedValue)(index),
    translateX: (0, _reactNativeReanimated.useSharedValue)(0),
    translateY: (0, _reactNativeReanimated.useSharedValue)(0),
    oriHeight: height,
    oriWidth: width,
    oriLeft: left,
    oriTop: top,
    oriLeftEdge: leftEdge,
    oriBottomEdge: bottomEdge,
    oriRightEdge: rightEdge,
    oriTopEdge: topEdge
  };
  return style;
};

/*
export const computeLayouts = (layout: ICollageItem[], w: number, h: number, borderW: number) => {
    layout.forEach((a) => {

        a.resizerItem.height = useSharedValue(getValue(a.resizerItem.percentHeight, w, h, borderW));
        a.resizerItem.width = useSharedValue(getValue(a.resizerItem.percentWidth, w, h, borderW));
        a.resizerItem.top = useSharedValue(getValue(a.resizerItem.percentTop, w, h, borderW));
        a.resizerItem.left = useSharedValue(getValue(a.resizerItem.percentLeft, w, h, borderW));

        let left = getValue(a.resizerItem.percentLeft, w, h, borderW);
        let top = getValue(a.resizerItem.percentTop, w, h, borderW);

        a.resizerItem.leftEdge = useSharedValue(left == 0);
        a.resizerItem.topEdge = useSharedValue(top == 0);
        a.resizerItem.bottomEdge = useSharedValue((top + a.resizerItem.height.value) > (h - 5));
        a.resizerItem.rightEdge = useSharedValue((left + a.resizerItem.width.value) > (w - 5));
    })

}
*/
exports.computeCollageStyle = computeCollageStyle;
const getLinkItemByIds = (layout, ids) => {
  if (ids) {
    let output = [];
    ids.forEach(id => {
      let item = layout.find(a => a.id === id);
      if (item) {
        output.push({
          height: item.style.height,
          width: item.style.width,
          translateX: item.style.translateX,
          translateY: item.style.translateY
        });
      }
    });
    return output;
  }
  return undefined;
};
exports.getLinkItemByIds = getLinkItemByIds;
const findValues = (layout, pointsLink) => {
  if (pointsLink) {
    let idsLooking = ids => {
      if (ids) {
        let output = [];
        ids.forEach(id => {
          let item = layout.find(a => a.id === id);
          if (item) {
            output.push({
              height: item.style.height,
              width: item.style.width,
              translateX: item.style.translateX,
              translateY: item.style.translateY
            });
          }
        });
        return output;
      }
      return undefined;
    };
    pointsLink.bottom.value = idsLooking(pointsLink.bottomIds);
    pointsLink.top.value = idsLooking(pointsLink.topIds);
    pointsLink.left.value = idsLooking(pointsLink.leftIds);
    pointsLink.right.value = idsLooking(pointsLink.rightIds);
  }
};
exports.findValues = findValues;
const assignValue = layout => {
  layout.forEach(a => {
    findValues(layout, a.resizerItem.bottomResizerPointLinks);
    findValues(layout, a.resizerItem.topResizerPointLinks);
    findValues(layout, a.resizerItem.leftResizerPointLinks);
    findValues(layout, a.resizerItem.rightResizerPointLinks);
  });
};
exports.assignValue = assignValue;
//# sourceMappingURL=Utitliy.js.map