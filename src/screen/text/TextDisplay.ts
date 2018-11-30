import * as PIXI from "pixi.js";
import { Text } from "./Text";
import { Display } from "../interface/Display.interface";

export class TextDisplay implements Display {
  readonly container: PIXI.Container;
  private width: number;
  private height: number;
  private text: Set<Text>;
  private callback: Function[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.container = new PIXI.Container();
    this.text = new Set();
  }

  add(text: Text) {
    if (this.text.has(text)) {
      return false;
    }
    this.text.add(text);
    this.container.addChild(text.view);
  }

  remove(text: Text) {
    if (!this.text.has(text)) {
      return false;
    }
    this.text.delete(text);
    this.container.removeChild(text.view);
  }

  clear() {
    this.container.removeChildren();
  }

  // 以下は仮実装
  clickable(callback: Function) {
    this.callback.push(callback);
    const root = this.container.parent;
    root.interactive = true;
    root.buttonMode = true;
    root.on("click", callback);
  }

  unclickable() {
    const root = this.container.parent;
    root.interactive = false;
    root.buttonMode = false;
    this.callback.forEach(elm => root.off("click", elm));
    this.callback = [];
  }
}
