export { Select } from "./Select/Select";
export { Save } from "./Save/Save";
export { Load } from "./Load/Load";

export { SelectActions } from "./Select/SelectActions";
export { LoadActions } from "./Load/LoadActions";
export { SaveActions } from "./Save/SaveActions";

import { SaveState } from "./Save/SaveState.interface";

export interface State {
  entry: any;
  toggle: any;
  save: SaveState;
}
