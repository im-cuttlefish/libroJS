import { StoryData, CharacterData } from "../interface";
import { CharacterLoader } from "../loader";
import { Character, CharacterDisplay } from "../screen/character";
type Command = StoryData["scenario"][number];

export class CharacterManager {
  readonly display: CharacterDisplay;
  private loader: CharacterLoader;
  private assets: Map<string, CharacterData>;
  private character: Map<string, Character>;

  constructor(story_data: StoryData) {
    const url = story_data.assets.character;
    const width = story_data.config.width;
    const height = story_data.config.height;

    this.loader = new CharacterLoader(...url);
    this.display = new CharacterDisplay(width, height);
  }

  async init() {
    this.assets = await this.loader.load();
    this.character = new Map();
    for (const asset of this.assets.entries()) {
      this.character.set(asset[0], new Character(asset[1]));
    }
  }

  async update(command: Command) {
    switch (command[1]) {
      case "add": {
        for (const name of command[2]) {
          const character = this.character.get(name);
          await this.display.add(character);
        }
        break;
      }
      case "remove": {
        for (const name of command[2]) {
          const character = this.character.get(name);
          await this.display.remove(character);
        }
        break;
      }
      case "face": {
        const name = command[2][0];
        const character = this.character.get(name);
        character.face = command[2][1];
        break;
      }
    }
  }
}
