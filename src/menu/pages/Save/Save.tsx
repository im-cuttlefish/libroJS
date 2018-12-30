import { h } from "hyperapp";
import { SaveState } from "./SaveState.interface";

interface argument extends SaveState {
  add: Function;
  remove: Function;
}

export const Save = ({ savedata, log, add, remove }: argument) => (
  <div>
    <div onclick={() => add(savedata)}>セーブする</div>
    {console.log(savedata)}
    {log ? (
      log.map(data => (
        <div onclick={() => remove(data.id)}>
          {data.date}: {data.title}
        </div>
      ))
    ) : (
      <div>データはありません</div>
    )}
  </div>
);
