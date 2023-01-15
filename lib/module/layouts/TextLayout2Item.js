import { collageLayoutToCollageItem } from '../utility/Utitliy';
export const TextTopAndBottom = () => {
  return [{
    percentWidth: 1,
    percentHeight: 0.2,
    percentLeft: 0,
    percentTop: 0.2
  }];
};
export const TextTopAndBottomLayout = (w, h, borderW) => {
  let output = [{
    title: TextTopAndBottom.name,
    items: collageLayoutToCollageItem(TextTopAndBottom(), w, h, borderW)
  }];
  return output;
};
//# sourceMappingURL=TextLayout2Item.js.map