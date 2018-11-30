import Axios from "axios";

export const imageLoader = async (object: any) => {
  const loadImage = async (url: string): Promise<HTMLImageElement> => {
    const image = new Image();
    const response = await Axios.get(url, { responseType: "blob" });
    const objectURL = await URL.createObjectURL(response.data);
    image.src = objectURL;
    await new Promise(resolve => (image.onload = resolve));
    return image;
  };

  for (const key of Object.keys(object)) {
    const value = object[key];
    const type = typeof value;
    const isURL = type === "string" && /url\(.*?\)/.test(value);

    if (type === "object") {
      await imageLoader(value);
      continue;
    }
    if (!isURL) {
      continue;
    }

    const image = await loadImage(value.slice(4, -1));
    object[key] = image;
  }
};
