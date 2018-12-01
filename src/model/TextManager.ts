import { StoryData, FrameData } from "../interface";
import { FrameLoader } from "../loader";
import { TextDisplay, Text, TextFrame } from "../screen/text";
type Command = StoryData["scenario"][number];

export class TextManager {
  readonly display: TextDisplay;
  private scenario: Command[];
  private loader: FrameLoader;
  private assets: Map<string, FrameData>;
  private text: Map<string, Text>;
  private frame: Map<string, TextFrame>;
  private selected: Text;

  constructor(story_data: StoryData) {
    const url = story_data.assets.frame;
    const width = story_data.config.width;
    const height = story_data.config.height;

    this.scenario = story_data.scenario;
    this.loader = new FrameLoader(...url);
    this.display = new TextDisplay(width, height);
  }

  async init() {
    this.assets = await this.loader.load();
    this.text = new Map();
    this.frame = new Map();
    for (const asset of this.assets.entries()) {
      this.frame.set(asset[0], new TextFrame(asset[1]));
    }
  }

  async update(command: Command) {
    let next_index: number = 0;

    switch (command[1]) {
      case "clear": {
        this.display.clear();
        break;
      }
      case "make": {
        const made = new Text();
        made.content = command[2][1];
        this.text.set(command[2][0], made);
        this.display.add(made);
        break;
      }
      case "write": {
        const content = command[2][0];

        await new Promise(resolve => {
          let i = 0;
          const loop = setInterval(() => {
            const text = content.slice(0, ++i);
            this.selected.content = text;
            if (text === content) {
              this.display.unclickable();
              clearInterval(loop);
              resolve();
            }
          }, 20);

          this.display.clickable(() => {
            this.display.unclickable();
            clearInterval(loop);
            this.selected.content = content;
            resolve();
          });
        });

        await new Promise(resolve => this.display.clickable(resolve));
        this.display.unclickable();

        break;
      }
      case "select": {
        this.selected = this.text.get(command[2][0]);
        break;
      }
      case "link": {
        const label = command[2][0];

        this.selected.clickable = true;
        await new Promise(resolve => {
          this.selected.registerEvent("click", resolve);
        });
        this.selected.revokeEvent("click");
        this.selected.clickable = false;

        next_index = this.scenario.findIndex(
          elm =>
            elm[0] === "system" && elm[1] === "label" && elm[2][0] === label
        );
        break;
      }
      case "frame": {
        this.selected.frame = this.frame.get(command[2][0]);
        break;
      }
      case "position": {
        this.selected[command[2][0]] = command[2][1];
        break;
      }
    }

    return next_index;
  }
}
