import * as loader from "../../loader";
import { BackgroundDisplay } from "../background";

(async () => {
  const load = new loader.BackgroundLoader();
  load.add("http://127.0.0.1:8080/src/assets/school/school.json");
  const resource = await load.load();

  const background = new BackgroundDisplay();
  await background.set(resource.get("school"));
  await new Promise(resolve => window.setTimeout(resolve, 2000));
  await background.set(resource.get("school"), "evening");
})();
