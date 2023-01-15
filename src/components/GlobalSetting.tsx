import type Animated from 'react-native-reanimated';

import type { ICollageItem, ICollageLayout } from '../models/Collage';

export class GlobalSetting {
  public static spacing: Animated.SharedValue<number>;

  public static spacingV2: Animated.Value<number>;
  public static radius: Animated.SharedValue<number>;

  public static newLayout: ICollageLayout;
  public static selectedItem: ICollageItem;
}
