import Axios from "axios";

import { imageLoader } from "./imageLoader";
import { BackgroundData } from "../interface";

export class BackgroundLoader {
  url: string[] = [];

  constructor(...url: string[]) {
    this.url = url;
  }

  add(...url: string[]) {
    this.url.splice(this.url.length, 0, ...url);
    return this;
  }

  async load(): Promise<Map<string, BackgroundData>> {
    const result = new Map<string, BackgroundData>();

    const background_json = await Promise.all(
      this.url.map(url => Axios.get(url))
    ).then(response => Promise.resolve(response.map(json => json.data)));

    for (const json of background_json) {
      await imageLoader(json);
      result.set(json.name, json as BackgroundData);
    }

    return result;
  }
}
