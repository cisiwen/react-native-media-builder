/* eslint-disable react-hooks/rules-of-hooks */
import { useSharedValue } from 'react-native-reanimated';

import type {
  ICollageItem,
  ICollageItemLayout,
  ICollageItemStyle,
  IPointStyleItem,
  IResizerItem,
  IResizerPointLink,
} from '../models/Collage';

export const getValue = (
  percent: number,
  rootW: number = 411.4285583496094,
  rootH: number = 411.4285583496094,
  borderWidth: number = 1
) => {
  let w = rootW - borderWidth;
  let h = rootH - borderWidth;
  return w * percent;
};

export const computeCollageResizerAll = (all: ICollageItem[]) => {
  all.forEach((item, i) => {
    item.resizerItem = computeCollageResizer(item, all);
    item.resizerItemValue = useSharedValue(null);
  });
};

export const computeCollageResizer = (
  item: ICollageItem,
  all: ICollageItem[]
) => {
  let resizerItem: IResizerItem = {
    id: item.id,
  };
  let n = all.filter((a) => a.id !== item.id);
  let left = item.style.oriLeft;
  let top = item.style.oriTop;
  let right = left + item.style.oriWidth;
  let bottom = top + item.style.oriHeight;
  let topBottomLinks = n
    .filter((a) => Math.abs(a.style.oriTop + a.style.oriHeight - top) < 5)
    ?.map((a) => a.id);
  let topTopLinks = n
    .filter((a) => Math.abs(a.style.oriTop - top) < 5)
    ?.map((a) => a.id);
  resizerItem.topResizerPointLinks = {
    topIds: topTopLinks,
    bottomIds: topBottomLinks,
    leftIds: null,
    rightIds: null,
    left: useSharedValue(null),
    right: useSharedValue(null),
    top: useSharedValue(getLinkItemByIds(all, topTopLinks)),
    bottom: useSharedValue(getLinkItemByIds(all, topBottomLinks)),
  };

  let bottomTopLinks = n
    .filter((a) => Math.abs(a.style.oriTop - bottom) < 5)
    ?.map((a) => a.id);
  let bottomBottomLinks = n
    .filter((a) => Math.abs(a.style.oriTop + a.style.oriHeight - bottom) < 5)
    ?.map((a) => a.id);
  resizerItem.bottomResizerPointLinks = {
    topIds: bottomTopLinks,
    bottomIds: bottomBottomLinks,
    leftIds: null,
    rightIds: null,
    left: useSharedValue(null),
    right: useSharedValue(null),
    top: useSharedValue(getLinkItemByIds(all, bottomTopLinks)),
    bottom: useSharedValue(getLinkItemByIds(all, bottomBottomLinks)),
  };

  let leftLeftLinks = n
    .filter((a) => Math.abs(a.style.oriLeft - left) < 5)
    ?.map((a) => a.id);
  let leftRightLinks = n
    .filter((a) => Math.abs(a.style.oriLeft + a.style.oriWidth - left) < 5)
    ?.map((a) => a.id);
  resizerItem.leftResizerPointLinks = {
    leftIds: leftLeftLinks,
    rightIds: leftRightLinks,
    top: useSharedValue(null),
    bottom: useSharedValue(null),
    left: useSharedValue(getLinkItemByIds(all, leftLeftLinks)),
    right: useSharedValue(getLinkItemByIds(all, leftRightLinks)),
  };

  let rightLeftLink = n
    .filter((a) => Math.abs(a.style.oriLeft - right) < 5)
    ?.map((a) => a.id);
  let rightRightLink = n
    .filter((a) => Math.abs(a.style.oriLeft + a.style.oriWidth - right) < 5)
    ?.map((a) => a.id);
  resizerItem.rightResizerPointLinks = {
    leftIds: rightLeftLink,
    rightIds: rightRightLink,
    top: useSharedValue(null),
    bottom: useSharedValue(null),
    left: useSharedValue(getLinkItemByIds(all, rightLeftLink)),
    right: useSharedValue(getLinkItemByIds(all, rightRightLink)),
  };

  return resizerItem;
};
export const collageLayoutToCollageItem = (
  layout: ICollageItemLayout[],
  w: number,
  h: number,
  borderW: number
): ICollageItem[] => {
  let items = layout.map((lout, i) => {
    let cItem: ICollageItem = {
      id: i,
      key: i,
      style: computeCollageStyle(lout, w, h, borderW, i),
      uri: null,
      resizerItem: null,
      resizerItemValue: null,
      sourceLayout: lout,
    };
    return cItem;
  });
  items.forEach((item, i) => {
    item.resizerItem = computeCollageResizer(item, items);
    item.resizerItemValue = useSharedValue(null);
  });

  return items;
};

export const computeCollageStyle = (
  layout: ICollageItemLayout,
  w: number,
  h: number,
  borderW: number,
  index: number
): ICollageItemStyle => {
  let left = getValue(layout.percentLeft, w, h, borderW);
  let top = getValue(layout.percentTop, w, h, borderW);
  let height = getValue(layout.percentHeight, w, h, borderW);
  let width = getValue(layout.percentWidth, w, h, borderW);
  let leftEdge = left === 0;
  let topEdge = top === 0;
  let bottomEdge = top + height > h - 5;
  let rightEdge = left + width > w - 5;
  let style: ICollageItemStyle = {
    height: useSharedValue(height),
    width: useSharedValue(width),
    top: useSharedValue(top),
    left: useSharedValue(left),

    leftEdge: useSharedValue(leftEdge),
    topEdge: useSharedValue(topEdge),
    bottomEdge: useSharedValue(bottomEdge),
    rightEdge: useSharedValue(rightEdge),

    hitTestOpacity: useSharedValue(1),
    zIndex: useSharedValue(index),
    translateX: useSharedValue(0),
    translateY: useSharedValue(0),

    oriHeight: height,
    oriWidth: width,
    oriLeft: left,
    oriTop: top,
    oriLeftEdge: leftEdge,
    oriBottomEdge: bottomEdge,
    oriRightEdge: rightEdge,
    oriTopEdge: topEdge,
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

export const getLinkItemByIds = (
  layout: ICollageItem[],
  ids?: number[]
): IPointStyleItem[] | undefined => {
  if (ids) {
    let output: IPointStyleItem[] = [];
    ids.forEach((id) => {
      let item = layout.find((a) => a.id === id);
      if (item) {
        output.push({
          height: item.style.height,
          width: item.style.width,
          translateX: item.style.translateX,
          translateY: item.style.translateY,
        });
      }
    });

    return output;
  }
  return undefined;
};

export const findValues = (
  layout: ICollageItem[],
  pointsLink?: IResizerPointLink
) => {
  if (pointsLink) {
    let idsLooking = (ids?: number[]): IPointStyleItem[] | undefined => {
      if (ids) {
        let output: IPointStyleItem[] = [];
        ids.forEach((id) => {
          let item = layout.find((a) => a.id === id);
          if (item) {
            output.push({
              height: item.style.height,
              width: item.style.width,
              translateX: item.style.translateX,
              translateY: item.style.translateY,
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
export const assignValue = (layout: ICollageItem[]) => {
  layout.forEach((a) => {
    findValues(layout, a.resizerItem.bottomResizerPointLinks);
    findValues(layout, a.resizerItem.topResizerPointLinks);
    findValues(layout, a.resizerItem.leftResizerPointLinks);
    findValues(layout, a.resizerItem.rightResizerPointLinks);
  });
};
