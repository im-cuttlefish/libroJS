import Axios from "axios";

import { imageLoader } from "./imageLoader";
import { FrameData } from "../interface";

export class FrameLoader {
  url: string[] = [];

  constructor(...url: string[]) {
    this.url = url;
  }

  add(...url: string[]) {
    this.url.splice(this.url.length, 0, ...url);
    return this;
  }

  async load(): Promise<Map<string, FrameData>> {
    const result = new Map<string, FrameData>();

    const frame_json = await Promise.all(
      this.url.map(url => Axios.get(url))
    ).then(response => {
      return Promise.resolve(response.map(json => json.data));
    });

    for (const json of frame_json) {
      await imageLoader(json);
      result.set(json.name, json as FrameData);
    }

    return result;
  }
}
