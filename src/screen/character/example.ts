import * as loader from "../../loader";
import { CharacterDisplay, Character } from "../character";

(async () => {
  const load = new loader.CharacterLoader();
  load.add("http://127.0.0.1:8080/src/assets/taro/taro.json");
  load.add("http://127.0.0.1:8080/src/assets/taro/taro2.json");
  load.add("http://127.0.0.1:8080/src/assets/taro/taro3.json");
  const resource = await load.load();

  const character = new CharacterDisplay();

  const taro = new Character(resource.get("taro"));
  const taro2 = new Character(resource.get("taro2"));
  const taro3 = new Character(resource.get("taro3"));
  await character.add(taro);
  await character.add(taro2);
  await character.add(taro3);
  taro.face = "angry";
  await character.remove(taro2);
})();
