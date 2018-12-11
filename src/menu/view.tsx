export const view = (state, actions) => (
  <div id="stage">
    <div id="visible">
      <ul className="visible-button">
        <li>Topに戻る</li>
        <li>セーブ</li>
        <li>ロード</li>
      </ul>
    </div>
    <img
      id="open-button"
      className="button"
      src="./assets/baseline-settings-20px.svg"
    />
    <img
      id="close-button"
      className="button"
      src="./assets/baseline-close-24px.svg"
    />
  </div>
);
