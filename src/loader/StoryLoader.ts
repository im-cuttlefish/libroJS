import Axios from "axios";

import { StoryData } from "../interface";

export class StoryLoader {
  url: string[] = [];

  constructor(...url: string[]) {
    this.url = url;
  }

  add(...url: string[]) {
    this.url.splice(this.url.length, 0, ...url);
    return this;
  }

  async load(): Promise<Map<string, StoryData>> {
    const result = new Map<string, StoryData>();

    const story_json = await Promise.all(
      this.url.map(url => Axios.get(url))
    ).then(response => {
      return Promise.resolve(response.map(json => json.data));
    });

    for (const json of story_json) {
      result.set(json.name, json as StoryData);
    }

    return result;
  }
}
