import { h } from "hyperapp";

import { Toggle } from "./components";

export const view = (state, actions) => (
  <Toggle
    visible={state.toggle.visible}
    toVisible={actions.toggle.toVisible}
    toHidden={actions.toggle.toHidden}
  >
    <ul className="visible-button">
      <li>Topに戻る</li>
      <li>セーブ</li>
      <li>ロード</li>
    </ul>
  </Toggle>
);
