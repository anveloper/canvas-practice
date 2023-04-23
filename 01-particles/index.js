const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;

const canvasSize = {
  width: 300,
  height: 300,
};

console.log(dpr);

canvas.style.backgroundColor = "orange";
canvas.style.width = canvasSize.width + "px";
canvas.style.height = canvasSize.height + "px";

canvas.width = canvasSize.width * dpr;
canvas.height = canvasSize.height * dpr;

ctx.scale(dpr, dpr);

// ctx.fillRect(10, 10, 50, 50);

// 원형
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.stroke();
// ctx.closePath();

class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "red";
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

const particles = new Particle(arr[0].x, arr[0].y, arr[0].radius);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.x += 1;
  particles.draw();
}

animate();
