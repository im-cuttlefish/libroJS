export interface StoryData {
  config: {
    title: string;
    width: number;
    height: number;
  };
  assets: {
    background: string[];
    character: string[];
    frame: string[];
  };
  scenario: [

      | ["background", "set", [string, string?]]
      | ["character", "add" | "remove", string[]]
      | ["character", "face", [string, string]]
      | ["text", "clear"]
      | ["text", "select" | "write" | "remove" | "frame", [string]]
      | ["text", "make", [string, string]]
      | ["text", "position", ["x" | "y", number]]
      | ["text", "margin", ["left" | "top" | "right" | "bottom", number]]
      | ["text", "link", [string]]
      | ["system", "jump", [string]]
      | ["system", "label", [string]]
      | ["system", "stop"]
  ];
}
