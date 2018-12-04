import Axios from "axios";

import { DisplayRoot } from "./screen/root";
import { Player } from "./player";
import { StoryData } from "./interface";

(async () => {
  const story_data = await Axios.get(
    "http://127.0.0.1:8080/src/assets/scenario.json"
  ).then(response => {
    return Promise.resolve(response.data as StoryData);
  });

  const width = story_data.config.width;
  const height = story_data.config.height;

  const root = new DisplayRoot(width, height);
  const player = new Player(root);

  const render = async (story_data: StoryData) => {
    await player.init(story_data);
    const url = await player.start();
    const next = await Axios.get(url).then(response =>
      Promise.resolve(response.data as StoryData)
    );
    await render(next);
  };

  await render(story_data);
})();
