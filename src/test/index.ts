import * as loader from "../loader";
import { BackgroundDisplay } from "../screen/background";
import { Text, TextDisplay, TextFrame } from "../screen/text";
import { Character, CharacterDisplay } from "../screen/character";

(async () => {
  // ローディング
  const bg_load = new loader.BackgroundLoader();
  bg_load.add("http://127.0.0.1:8080/src/assets/school/school.json");
  const bg_resource = await bg_load.load();

  const tx_load = new loader.FrameLoader();
  tx_load.add("http://127.0.0.1:8080/src/assets/frame/frame.json");
  const tx_resource = await tx_load.load();

  const ch_load = new loader.CharacterLoader();
  ch_load.add("http://127.0.0.1:8080/src/assets/taro/taro.json");
  ch_load.add("http://127.0.0.1:8080/src/assets/taro/taro2.json");
  ch_load.add("http://127.0.0.1:8080/src/assets/taro/taro3.json");
  const ch_resource = await ch_load.load();

  // 背景処理
  const background = new BackgroundDisplay();
  await background.set(bg_resource.get("school"));
  await new Promise(resolve => window.setTimeout(resolve, 2000));
  await background.set(bg_resource.get("school"), "evening");

  // キャラクター処理
  const character = new CharacterDisplay();

  const taro = new Character(ch_resource.get("taro"));
  const taro2 = new Character(ch_resource.get("taro2"));
  const taro3 = new Character(ch_resource.get("taro3"));
  await character.add(taro);
  await character.add(taro2);
  await character.add(taro3);
  taro.face = "angry";
  await character.remove(taro2);

  // テキスト処理
  const view = new TextDisplay();
  const text = new Text();
  const frame = new TextFrame(tx_resource.get("frame"));

  view.add(text);
  text.content =
    "こんにちは。今日は晴れてますね。あああああああrefbhrfhiufvhgbfuvibsdcuiyfbuhvgujervvvvvvvvvgcdああああああああああああ";
  text.x = (text.width - 640) / 2;
  text.y = document.documentElement.clientHeight - 250;
  text.width = 640;
  text.frame = frame;
})();
