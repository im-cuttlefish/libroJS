import { app } from "hyperapp";
import { view } from "./view";
import { ToggleActions } from "./actions";

export class Menu {
  constructor() {
    const root = document.getElementById("menu") as HTMLElement;
    const actions = {
      toggle: ToggleActions
    };

    const state = {
      toggle: { visible: false }
    };

    app(state, actions, view, root);
  }

  show() {}

  hide() {}
}
