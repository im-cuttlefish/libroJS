import { StoryData, BackgroundData } from "../interface";
import { BackgroundLoader } from "../loader";
import { BackgroundDisplay } from "./background";
type Command = StoryData["scenario"][number];

export class BackgroundManager {
  readonly display: BackgroundDisplay;
  private assets: Map<string, BackgroundData>;

  constructor(width: number, height: number) {
    this.display = new BackgroundDisplay(width, height);
  }

  async init(story_data: StoryData) {
    const url = story_data.assets.background;
    const loader = new BackgroundLoader(...url);
    this.assets = await loader.load();
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

  clear() {
    this.display.clear();
  }
}
