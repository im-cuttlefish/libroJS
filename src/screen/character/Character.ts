import * as PIXI from "pixi.js";
import { CharacterData } from "../../interface/CharacterData.interface";

export class Character {
  readonly view: PIXI.Container;
  readonly data: CharacterData;

  private face_sprite: PIXI.Sprite;
  private body_sprite: PIXI.Sprite;

  private _face: string;

  constructor(data: CharacterData) {
    this.data = data;

    this.view = new PIXI.Container();
    this.face_sprite = PIXI.Sprite.from(data.face.default);
    this.body_sprite = PIXI.Sprite.from(data.body.default);

    this.view.addChild(this.body_sprite, this.face_sprite);
  }

  set face(value: string) {
    // 本来はエラー設計すべきポイント
    if (!Object.keys(this.data.face).includes(value)) {
      return;
    }

    this._face = value;
    this.view.removeChild(this.face_sprite);
    const sprite = PIXI.Sprite.from(this.data.face[value]);
    this.view.addChild(sprite);
    this.face_sprite = sprite;
  }
  get face() {
    return this._face;
  }
}
