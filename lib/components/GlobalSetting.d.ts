import Animated from 'react-native-reanimated';
import { ICollageItem, ICollageLayout } from '../models/Collage';
export declare class GlobalSetting {
    static spacing: Animated.SharedValue<number>;
    static spacingV2: Animated.Value<number>;
    static radius: Animated.SharedValue<number>;
    static newLayout: ICollageLayout;
    static selectedItem: ICollageItem;
}
