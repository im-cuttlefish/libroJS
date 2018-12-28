import { h } from "hyperapp";

export const Select = ({ current, selectPage }) => (
  <ul className="visible-button">
    <li onclick={() => selectPage("save")}>セーブ</li>
    <li>{current}</li>
  </ul>
);
