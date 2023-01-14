export class Helper {
  public static isImageExtension(uri: string): boolean {
    let imgs: string[] = ['.jpg', '.jpeg', '.png', '.gif', '.heic'];
    return imgs.filter((a) => uri.toLowerCase().indexOf(a) > -1).length > 0;
  }
}
