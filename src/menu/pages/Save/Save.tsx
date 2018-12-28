import { h } from "hyperapp";
import { HistoryData } from "../../../history";

type argument = {
  savedata: HistoryData;
  log: HistoryData[];
  add: Function;
  remove: Function;
};

export const Save = ({ savedata, log, add, remove }: argument) => (
  <div>
    <div onclick={() => add(savedata)}>セーブする</div>
    {log.map(data => (
      <div onclick={() => remove(data.id)}>{data.name}</div>
    ))}
  </div>
);
