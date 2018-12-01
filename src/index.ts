import Axios from "axios";

import { Player } from "./model";
import { StoryData } from "./interface";

(async () => {
  const story_data = await Axios.get(
    "http://127.0.0.1:8080/src/assets/scenario.json"
  ).then(response => {
    return Promise.resolve(response.data as StoryData);
  });

  const player = new Player(story_data);
  await player.init();
  player.start();
})();
