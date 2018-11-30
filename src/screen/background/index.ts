import * as PIXI from "pixi.js";
import * as Animation from "../Animation";
import { Display } from "../interface/Display.interface";
import { BackgroundData } from "../../interface/BackgroundData.interface";

export class BackgroundDisplay implements Display {
  readonly container: PIXI.Container;
  private width: number;
  private height: number;
  private background: PIXI.Sprite;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.container = new PIXI.Container();
  }

  async set(background: BackgroundData, scene: string = "default") {
    const next = PIXI.Sprite.from(background.scene[scene]);
    const prev = this.background;
    const is_landscape = next.width / next.height > this.width / this.height;
    const scale = is_landscape
      ? this.height / next.height
      : this.width / next.width;

    next.anchor.set(0.5, 0.5);
    next.position.set(this.width / 2, this.height / 2);
    next.scale.set(scale, scale);

    this.container.addChild(next);

    if (!this.background) {
      await Animation.fadeIn(next);
    } else {
      await Promise.all([Animation.fadeIn(next), Animation.fadeOut(prev)]);
    }

    this.container.removeChild(prev);
    this.background = next;
  }
}
