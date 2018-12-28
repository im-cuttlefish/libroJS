import { app } from "hyperapp";
import { view } from "./view";
import { ToggleActions } from "./util";
import { SelectActions, SaveActions } from "./pages";

export class Menu {
  private url?: string;

  constructor(url?: string) {
    if (url) this.url = url;

    const root = document.getElementById("menu") as HTMLElement;
    const actions = {
      toggle: ToggleActions,
      save: SaveActions,
      entry: SelectActions
    };

    const state = {
      entry: { current: "entry" },
      toggle: { visible: false }
    };

    app(state, actions, view, root);
  }
}
