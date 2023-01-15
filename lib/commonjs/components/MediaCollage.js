"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaCollage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CollageItem = require("./CollageItem");
var _EventBus = require("./EventBus");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MediaCollage = props => {
  let [selectedItem, setSelectedItem] = (0, _react.useState)(undefined);
  let onResizerSelected = item => {
    console.log(_EventBus.MCEventBus.events.length);
    setSelectedItem(selectedItem && selectedItem.id === item.id ? undefined : item);
  };
  let eventId = `MediaCollage${_EventBus.MCEventType.LayoutChanged}`;
  _EventBus.MCEventBus.addToEvents({
    id: eventId,
    type: _EventBus.MCEventType.LayoutChanged,
    callback: () => {
      if (selectedItem) {
        setSelectedItem(undefined);
      }
    }
  });
  (0, _react.useEffect)(() => {
    return () => {
      _EventBus.MCEventBus.removeFromEvents(eventId);
    };
  });
  const style = _reactNative.StyleSheet.create({
    rootContainer: {
      zIndex: 10,
      overflow: 'visible',
      borderStyle: 'solid',
      borderColor: '#fff',
      borderWidth: 0,
      backgroundColor: '#fff'
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
      position: 'relative'
    }
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.rootContainer]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.innerContainer]
  }, props.layout.items.map((a, i) => {
    return /*#__PURE__*/_react.default.createElement(_CollageItem.CollageItem, {
      allItems: props.layout.items,
      item: a,
      resizer: a.resizerItem,
      key: i,
      onResizerSelected: onResizerSelected,
      selectedItem: selectedItem
    });
  })));
};
exports.MediaCollage = MediaCollage;
//# sourceMappingURL=MediaCollage.js.map