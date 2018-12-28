import { h } from "hyperapp";

import { Toggle } from "./util";

import { Save, Load } from "./pages";

export const view = (state, actions) => (
  <Toggle
    visible={state.toggle.visible}
    toVisible={actions.toggle.toVisible}
    toHidden={actions.toggle.toHidden}
  >
    {state.entry.current === "entry" ? (
      <ul className="visible-button">
        <li
          onclick={actions.entry.selectPage}
          style={{
            background: state.current === "save" ? "green" : "red"
          }}
        >
          セーブ
        </li>
        <li>ロード</li>
      </ul>
    ) : state.entry.current === "save" ? (
      <Save
        savedata={state.save.savedata}
        log={state.save.savedata.log}
        add={actions.save.add}
        remove={actions.save.remove}
      />
    ) : null}
    })()}
  </Toggle>
);
