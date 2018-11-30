import { StoryData, BackgroundData } from "../interface";
import { BackgroundLoader } from "../loader";
import { BackgroundDisplay } from "../screen/background";
type Command = StoryData["scenario"][number];

export class BackgroundManager {
  readonly display: BackgroundDisplay;
  private loader: BackgroundLoader;
  private assets: Map<string, BackgroundData>;

  constructor(story_data: StoryData) {
    const url = story_data.assets.background;
    const width = story_data.config.width;
    const height = story_data.config.height;

    this.loader = new BackgroundLoader(...url);
    this.display = new BackgroundDisplay(width, height);
  }

  async init() {
    this.assets = await this.loader.load();
  }

  async update(command: Command) {
    switch (command[1]) {
      case "set": {
        await this.display.set(
          this.assets.get(command[2][0]),
          command[2][1] || "default"
        );
        break;
      }
    }
  }
}
