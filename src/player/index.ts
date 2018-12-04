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

  constructor(root: DisplayRoot) {
    const width = root.width;
    const height = root.height;

    this.root = root;
    this.background = new BackgroundManager(width, height);
    this.character = new CharacterManager(width, height);
    this.text = new TextManager(width, height);

    this.root.add(
      this.background.display,
      this.character.display,
      this.text.display
    );
  }

  async init(story_data: StoryData) {
    this.story_data = story_data;

    await Promise.all([
      this.background.init(story_data),
      this.character.init(story_data),
      this.text.init(story_data)
    ]);
  }

  async start() {
    const scenario = this.story_data.scenario;

    await this.root.fadeIn();

    for (let i = 0; i < scenario.length; i++) {
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
              this.background.clear();
              this.character.clear();
              this.text.clear();

              return command[2][0];
            }
          }
          break;
        }
      }
    }
  }
}
