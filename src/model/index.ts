import Axios from "axios";

import { StoryData } from "../interface";
import { DisplayRoot } from "../screen/root";
import { BackgroundManager } from "./BackgroundManager";
import { CharacterManager } from "./CharacterManager";
import { TextManager } from "./TextManager";

export class Player {
  private story_data: StoryData;
  private root: DisplayRoot;
  private background: BackgroundManager;
  private character: CharacterManager;
  private text: TextManager;

  constructor(story_data: StoryData, root?: DisplayRoot) {
    const width = story_data.config.width;
    const height = story_data.config.height;

    this.story_data = story_data;
    this.root = root || new DisplayRoot(width, height);
    this.background = new BackgroundManager(story_data);
    this.character = new CharacterManager(story_data);
    this.text = new TextManager(story_data);

    this.root.add(
      this.background.display,
      this.character.display,
      this.text.display
    );
  }

  async init() {
    await Promise.all([
      this.background.init(),
      this.character.init(),
      this.text.init()
    ]);
  }

  async start() {
    const scenario = this.story_data.scenario;

    loop: for (let i = 0; i < scenario.length; i++) {
      const command = scenario[i];

      switch (command[0]) {
        case "background": {
          await this.background.update(command);
          break;
        }
        case "character": {
          await this.character.update(command);
          break;
        }
        case "text": {
          const index = await this.text.update(command);
          i = index || i;
          break;
        }
        case "system": {
          switch (command[1]) {
            case "jump": {
              await this.root.fadeOut();
              this.root.remove(
                this.background.display,
                this.character.display,
                this.text.display
              );

              const story_data = await Axios.get(command[2][0]).then(response =>
                Promise.resolve(response.data as StoryData)
              );

              const player = new Player(story_data, this.root);
              await player.init();

              await this.root.fadeIn();
              player.start();

              break loop;
            }
          }
          break;
        }
      }
    }
  }
}
