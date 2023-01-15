"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helper = void 0;
class Helper {
  static isImageExtension(uri) {
    let imgs = ['.jpg', '.jpeg', '.png', '.gif', '.heic'];
    return imgs.filter(a => uri.toLowerCase().indexOf(a) > -1).length > 0;
  }
}
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map