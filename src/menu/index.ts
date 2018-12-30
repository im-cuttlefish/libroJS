import { app } from "hyperapp";
import { view } from "./view";
import { ToggleActions } from "./util";
import { SelectActions, SaveActions, State } from "./pages";

import { History, HistoryData } from "../history";

export const initMenu = async (data: HistoryData) => {
  const root = document.getElementById("menu") as HTMLElement;

  const actions = {
    toggle: ToggleActions,
    save: SaveActions,
    entry: SelectActions
  };

  const log = await new History().get();

  const state: State = {
    entry: { current: "entry" },
    toggle: { visible: false },
    save: {
      savedata: data,
      log
    }
  };

  app(state, actions, view, root);
};
