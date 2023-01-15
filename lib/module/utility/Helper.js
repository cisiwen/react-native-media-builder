export class Helper {
  static isImageExtension(uri) {
    let imgs = ['.jpg', '.jpeg', '.png', '.gif', '.heic'];
    return imgs.filter(a => uri.toLowerCase().indexOf(a) > -1).length > 0;
  }
}
//# sourceMappingURL=Helper.js.map