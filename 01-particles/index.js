const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasSize = {
  width: innerWidth,
  height: innerHeight,
};

console.log(dpr);

canvas.style.backgroundColor = "white";
canvas.style.width = canvasSize.width + "px";
canvas.style.height = canvasSize.height + "px";

canvas.width = canvasSize.width * dpr;
canvas.height = canvasSize.height * dpr;

ctx.scale(dpr, dpr);

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");
const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

const gui = new dat.GUI();
const f1 = gui.addFolder("Gooey Effect");
f1.open();
f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});
// matrix 효과 미적용
f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  );
});
f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
  );
});
const f2 = gui.addFolder("Particle Property");
f2.open();
gui.add(controls, "acc", 1, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => (particle.acc = value));
});
// ctx.fillRect(10, 10, 50, 50);

// 원형
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.stroke();
// ctx.closePath();

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.vy = vy;
    this.acc = 1.03;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

const arr = [
  {
    x: 100,
    y: 100,
    radius: 50,
  },
];

const particles = [];

const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasSize.width);
  const y = randomNumBetween(0, canvasSize.height);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

const fps = 60;
const interval = 1000 / fps; // 60fps
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate); // 모니터 주사율
  // frame
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;
  then = now - (delta % interval);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radius > canvasSize.height) {
      particle.x = randomNumBetween(0, canvasSize.width);
      particle.y = -particle.radius;
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });
}

animate();
/*
  if(delta > interval) {
    animate();
  }
  then = now - (delta % interval)
 */ // 60 fps로 설정하는 편이 좋다.

// gooey effect -> blur + contrast
