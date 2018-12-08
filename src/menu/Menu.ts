import anime from "animejs";

export class Menu {
  private root: HTMLElement;
  private visible: HTMLElement;
  private timeline: anime.AnimeTimelineInstance;

  constructor() {
    this.root = document.getElementById("menu") as HTMLElement;
    this.visible = document.getElementById("visible") as HTMLElement;

    this.visible.style.opacity = "0";
    this.visible.style.pointerEvents = "none";
    this.timeline = anime.timeline();
  }

  show() {
    this.visible.style.pointerEvents = "auto";

    this.timeline.pause();
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.visible,
      opacity: 1,
      duration: 1500
    });
  }

  hide() {
    this.visible.style.pointerEvents = "none";

    this.timeline.pause();
    this.timeline = anime.timeline();

    this.timeline.add({
      targets: this.visible,
      opacity: 0,
      duration: 1500
    });
  }
}
