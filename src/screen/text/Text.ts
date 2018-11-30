import { TextEvent } from "./TextEvent.type";
import { TextFrame } from "./TextFrame";
import * as PIXI from "pixi.js";

export class Text {
  readonly view: PIXI.Container;

  private text: PIXI.Text;
  private sprite?: PIXI.Sprite;
  private events: Map<TextEvent, Function>;

  private _width: number;
  private _height: number;
  private _content: string = "";
  private _x: number = 0;
  private _y: number = 0;
  private _color: string = "#000000FF";
  private _marginLeft: number = 0;
  private _marginTop: number = 0;
  private _marginRight: number = 0;
  private _marginBottom: number = 0;
  private _clickable: boolean = false;
  private _frame?: TextFrame;

  constructor(width?: number, height?: number) {
    const root = document.documentElement as HTMLElement;

    this._width = width || root.clientWidth;
    this._height = height || root.clientHeight;

    const style = new PIXI.TextStyle({
      breakWords: true,
      wordWrap: true,
      wordWrapWidth: this._width
    });

    this.text = new PIXI.Text("", style);
    this.events = new Map();

    this.view = new PIXI.Container();
    this.view.position.set(this._x, this._y);
    this.view.addChild(this.text);
  }

  registerEvent(event: TextEvent, callback: Function) {
    this.events.set(event, callback);
    this.view.on(event, callback);
  }

  revokeEvent(event: TextEvent) {
    this.events.delete(event);
    this.view.off(event);
  }

  set width(value: number) {
    this._width = value;
    this.text.style.wordWrapWidth = value - this._marginRight;
  }
  get width() {
    return this._width;
  }

  set height(value: number) {
    this._height = value;
  }
  get height() {
    return this._height;
  }

  set content(value: string) {
    this._content = value;
    this.text.text = value;
  }
  get content() {
    return this._content;
  }

  set x(value: number) {
    this._x = value;
    this.view.x = value;
  }
  get x() {
    return this._x;
  }

  set y(value: number) {
    this._y = value;
    this.view.y = value;
  }
  get y() {
    return this._y;
  }

  set color(value: string) {
    this._color = value;
    this.text.style.fill = value;
  }
  get color() {
    return this._color;
  }

  set marginLeft(value: number) {
    this._marginLeft = value;
    this.text.x = value;
  }
  get marginLeft() {
    return this._marginLeft;
  }

  set marginTop(value: number) {
    this._marginTop = value;
    this.text.y = value;
  }
  get marginTop() {
    return this._marginTop;
  }

  set marginRight(value: number) {
    this._marginRight = value;
    this.text.style.wordWrapWidth = this._width - value;
  }
  get marginRight() {
    return this._marginRight;
  }

  set marginBottom(value: number) {
    this._marginBottom = value;
  }
  get marginBottom() {
    return this._marginBottom;
  }

  set clickable(value: boolean) {
    this._clickable = value;
    this.view.interactive = value;
    this.view.buttonMode = value;
  }
  get clickable() {
    return this._clickable;
  }

  set frame(value: TextFrame) {
    if (this.sprite !== undefined) {
      this.view.removeChild(this.sprite);
    }

    this._frame = value;
    this.sprite = new PIXI.Sprite(value.texture);
    this.view.addChildAt(this.sprite, 0);

    if (value.marginLeft !== undefined) {
      this.marginLeft = value.marginLeft;
    }
    if (value.marginTop !== undefined) {
      this.marginTop = value.marginTop;
    }
    if (value.marginRight !== undefined) {
      this.marginRight = value.marginRight;
    }
    if (value.marginBottom !== undefined) {
      this.marginBottom = value.marginBottom;
    }
  }
  get frame() {
    return this._frame;
  }
}
