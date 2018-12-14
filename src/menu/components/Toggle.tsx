import { h } from "hyperapp";
import anime from "animejs";

export const Toggle = ({ visible, toVisible, toHidden }, children) => (
  <div>
    {visible ? (
      <div
        id="visible"
        style={{
          pointerEvents: visible ? "initial" : "none"
        }}
        oncreate={element => {
          anime({
            targets: element,
            opacity: 1
          });
        }}
      >
        {children}
      </div>
    ) : (
      ""
    )}
    <img
      id="open-button"
      className="button"
      src="http://127.0.0.1:8080/src/assets/baseline-settings-20px.svg"
      style={{
        visibility: visible ? "hidden" : "visible"
      }}
      onclick={() => toVisible()}
    />
    <img
      id="close-button"
      className="button"
      src="http://127.0.0.1:8080/src/assets/baseline-close-24px.svg"
      style={{
        visibility: !visible ? "hidden" : "visible"
      }}
      onclick={() => toHidden()}
    />
  </div>
);
