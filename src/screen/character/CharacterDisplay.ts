import * as PIXI from "pixi.js";
import { Display } from "../interface/Display.interface";
import { Character } from "./Character";
import * as Animater from "./CharacterAnimater";

export class CharacterDisplay implements Display {
  readonly container: PIXI.Container;
  private width: number;
  private height: number;
  private character: Set<Character>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.container = new PIXI.Container();
    this.character = new Set();
  }

  async add(...character: Character[]) {
    await Promise.all(
      character.map(
        item =>
          new Promise(resolve => {
            const view = item.view;
            const data = item.data;

            this.character.add(item);

            const scale =
              (this.height * data.height) / data.body.default.height;
            view.scale.set(scale, scale);
            view.x =
              (this.width * this.character.size) / (this.character.size + 1) -
              view.width / 2;
            view.y = this.height - view.height;

            this.container.addChild(view);
            Animater.fadeIn(view).then(() => resolve());
          })
      )
    );
    await Animater.reposition(this.width, ...this.character.values());
  }

  async remove(...character: Character[]) {
    await Promise.all(
      character.map(
        item =>
          new Promise(async resolve => {
            const view = item.view;
            await Animater.fadeOut(view);
            this.container.removeChild(view);
            this.character.delete(item);
            resolve();
          })
      )
    );
    await Animater.reposition(this.width, ...this.character.values());
  }

  clear() {
    this.character.forEach(character => {
      this.container.removeChild(character.view);
    });

    this.character.clear();
  }
}
