import Axios from "axios";

import { imageLoader } from "./imageLoader";
import { CharacterData } from "../interface";

export class CharacterLoader {
  url: string[] = [];

  constructor(...url: string[]) {
    this.url = url;
  }

  add(...url: string[]) {
    this.url.splice(this.url.length, 0, ...url);
    return this;
  }

  async load(): Promise<Map<string, CharacterData>> {
    const result = new Map<string, CharacterData>();

    const chara_json = await Promise.all(
      this.url.map(url => Axios.get(url))
    ).then(response => Promise.resolve(response.map(json => json.data)));

    for (const json of chara_json) {
      await imageLoader(json);
      result.set(json.name, json as CharacterData);
    }

    return result;
  }
}
