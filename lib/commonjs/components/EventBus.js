"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MCEventType = exports.MCEventBus = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let MCEventType;
exports.MCEventType = MCEventType;
(function (MCEventType) {
  MCEventType["LayoutChanged"] = "LayoutChanged";
})(MCEventType || (exports.MCEventType = MCEventType = {}));
class MCEventBus {
  static addToEvents(event) {
    MCEventBus.events.push(event);
  }
  static removeFromEvents(id) {
    MCEventBus.events.splice(MCEventBus.events.findIndex(a => a.id === id), 1);
  }
  static dispatchEevent(type, parameter) {
    MCEventBus.events.filter(a => a.type === type).forEach(b => {
      b.callback(parameter);
    });
  }
}
exports.MCEventBus = MCEventBus;
_defineProperty(MCEventBus, "events", []);
//# sourceMappingURL=EventBus.js.map