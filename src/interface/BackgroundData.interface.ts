export interface BackgroundData {
  name: string;
  scene: {
    default: HTMLImageElement;
    [s: string]: HTMLImageElement;
  };
  plugin?: any;
}
