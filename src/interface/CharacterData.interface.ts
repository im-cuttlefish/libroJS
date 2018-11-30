export interface CharacterData {
  name: string;
  height: number;
  face: {
    area?: [number, number];
    default: HTMLImageElement;
    [s: string]: HTMLImageElement;
  };
  body: {
    area?: [number, number];
    default: HTMLImageElement;
    [s: string]: HTMLImageElement;
  };
  plugin?: any;
}
