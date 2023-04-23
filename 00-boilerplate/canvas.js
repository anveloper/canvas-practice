const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
const fps = 60;
const interval = 1000 / fps;
let now, delta;
let then = Date.now();

const canvasSize = {
  width: innerWidth,
  height: innerHeight,
};

function init() {
  canvasSize.width = innerWidth;
  canvasSize.height = innerHeight;

  canvas.width = canvasSize.width * dpr;
  canvas.height = canvasSize.height * dpr;
  ctx.scale(dpr, dpr);

  canvas.style.width = canvasSize.width + "px";
  canvas.style.height = canvasSize.height + "px";
}

function render() {
  requestAnimationFrame(render);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;
  then = now - (delta % interval);
  // frame
  ctx.fillRect(100, 100, 200, 200);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", () => {
  init();
});
