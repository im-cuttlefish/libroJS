export const fadeIn = (display: PIXI.DisplayObject) => {
  return new Promise(resolve => {
    display.alpha = 0;
    const loop = () => {
      const id = requestAnimationFrame(loop);
      const next = display.alpha + 0.03;
      display.alpha = next > 1 ? 1 : next;
      if (next > 1) {
        cancelAnimationFrame(id);
        resolve();
      }
    };
    loop();
  });
};

export const fadeOut = (display: PIXI.DisplayObject) => {
  return new Promise(resolve => {
    const loop = () => {
      const id = requestAnimationFrame(loop);
      const next = display.alpha - 0.03;
      display.alpha = next < 0 ? 0 : next;
      if (next < 0) {
        cancelAnimationFrame(id);
        resolve();
      }
    };
    loop();
  });
};
