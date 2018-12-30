import Axios from "axios";

import { DisplayRoot } from "./screen/root";
import { Player } from "./screen";
import { initMenu } from "./menu";
import { StoryData } from "./interface";

const getDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const getStory = async (url: string) =>
  await Axios.get(url).then(response => {
    return Promise.resolve(response.data as StoryData);
  });

(async () => {
  const url = "http://127.0.0.1:8080/src/assets/init.json";

  const story_data = await getStory(url);

  const config = story_data.config;
  const title = config.title;
  const width = config.width;
  const height = config.height;

  const root = new DisplayRoot(width, height);
  const player = new Player(root);
  const date = getDate();

  initMenu({ date, title, url });

  const render = async (story_data: StoryData) => {
    await player.init(story_data);

    const url = await player.start();
    const next = await getStory(url);
    const title = config.title;
    const date = getDate();

    initMenu({ date, url, title });
    await render(next);
  };

  await render(story_data);
})();
