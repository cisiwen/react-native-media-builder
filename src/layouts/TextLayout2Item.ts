import { ICollageItemLayout, ICollageLayout } from '../models/Collage'
import { collageLayoutToCollageItem } from '../utility/Utitliy'
export const TextTopAndBottom = (): ICollageItemLayout[] => {
  return [
    {
      percentWidth: 1,
      percentHeight: 0.2,
      percentLeft: 0,
      percentTop: 0.2,
    },
  ]
}

export const TextTopAndBottomLayout = (
  w: number,
  h: number,
  borderW: number
): ICollageLayout[] => {
  let output: ICollageLayout[] = [
    {
      title: TextTopAndBottom.name,
      items: collageLayoutToCollageItem(TextTopAndBottom(), w, h, borderW),
    },
  ]
  return output
}
