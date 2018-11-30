import * as PIXI from "pixi.js";
import { FrameData } from "../../interface/FrameData.interface";

export class TextFrame {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly texture: PIXI.Texture;
  readonly marginLeft?: number;
  readonly marginTop?: number;
  readonly marginRight?: number;
  readonly marginBottom?: number;

  constructor(data: FrameData) {
    this.name = data.name;

    if (data.width !== undefined) {
      this.width = data.width;
    } else {
      this.width = data.image.width;
    }

    if (data.height !== undefined) {
      this.height = data.height;
    } else {
      this.height = data.image.height;
    }

    this.texture = PIXI.Texture.from(data.image);
    this.marginLeft = data.marginLeft;
    this.marginTop = data.marginTop;
    this.marginRight = data.marginRight;
    this.marginBottom = data.marginBottom;
  }
}
