import { Character } from "./Character";

export * from "../Animation";

export const reposition = async (width: number, ...character: Character[]) => {
  const space = width / (character.length + 1);
  await Promise.all(
    character.map(
      (item, index) =>
        new Promise(resolve => {
          const container = item.view;
          const duration = 700;
          const start_time = Date.now();
          const from = container.x;
          const to = Math.floor(space * (index + 1) - container.width / 2);
          const diff = to - from;
          const sign = Math.sign(diff);
          const loop = () => {
            const id = requestAnimationFrame(loop);
            const now = Date.now();
            const next = from + (diff * (now - start_time)) / duration;
            if (sign < 0 ? next > to : next < to) {
              container.x = next;
            } else {
              cancelAnimationFrame(id);
              resolve();
            }
          };
          loop();
        })
    )
  );
};
