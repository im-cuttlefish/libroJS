import { Menu } from "./Menu";

export const initMenu = () => {
  const menu = new Menu();
  const open = document.getElementById("open-button") as HTMLElement;
  const close = document.getElementById("close-button") as HTMLElement;

  close.style.display = "none";
  menu.hide();

  open.addEventListener(
    "click",
    () => {
      menu.show();
      open.style.display = "none";
      close.style.display = "initial";
    },
    false
  );

  close.addEventListener(
    "click",
    () => {
      menu.hide();
      open.style.display = "initial";
      close.style.display = "none";
    },
    false
  );
};
