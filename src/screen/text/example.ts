import { FrameLoader } from "../../loader/FrameLoader";
import { Text, TextDisplay, TextFrame } from "../text";

(async () => {
  const loader = new FrameLoader();
  loader.add("http://127.0.0.1:8080/src/assets/frame/frame.json");
  const assets = await loader.load();

  const view = new TextDisplay();
  const text = new Text();
  const text2 = new Text();
  const frame = new TextFrame(assets.get("frame"));

  view.add(text);
  text.content =
    "こんにちは。今日は晴れてますね。あああああああああああああああああああ";
  text.x = (text.width - 640) / 2;
  text.y = document.documentElement.clientHeight - 250;
  text.width = 640;
  text.frame = frame;

  view.add(text2);
  text2.frame = frame;
  text2.content = "ABC";
  text2.x = (text.width - 640) / 2;
  text2.y = 100;
  text2.clickable = true;
  text2.registerEvent("click", () => {
    console.log("clicked");
  });
})();
