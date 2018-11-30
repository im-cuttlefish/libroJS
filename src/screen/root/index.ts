import * as PIXI from "pixi.js";
import { Display } from "../interface/Display.interface";
import * as Animation from "../Animation";

export class DisplayRoot {
  readonly app: PIXI.Application;
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    const stage = document.getElementById("stage");
    this.app = new PIXI.Application({ width, height });
    this.width = width;
    this.height = height;
    stage.appendChild(this.app.view);
  }

  add(...display: Display[]) {
    display.forEach(elm => this.app.stage.addChild(elm.container));
    return this;
  }

  remove(...display: Display[]) {
    display.forEach(elm => this.app.stage.removeChild(elm.container));
    return this;
  }

  async fadeIn() {
    await Animation.fadeIn(this.app.stage);
  }

  async fadeOut() {
    await Animation.fadeOut(this.app.stage);
  }
}
