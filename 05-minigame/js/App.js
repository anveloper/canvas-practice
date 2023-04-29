import Background from "./Background.js";
import Coin from "./Coin.js";
import GameHandler from "./GameHandler.js";
import Player from "./Player.js";
import Score from "./Score.js";
import Wall from "./Wall.js";

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector("#bg3-img"), speed: -1 }),
      new Background({ img: document.querySelector("#bg2-img"), speed: -2 }),
      new Background({ img: document.querySelector("#bg1-img"), speed: -4 }),
    ];

    this.gameHandler = new GameHandler(this);
    this.reset();
  }
  reset() {
    this.walls = [new Wall({ type: "SMALL" })];
    this.coins = [];
    this.player = new Player();
    this.score = new Score();
  }
  init() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);
    this.backgrounds.forEach((background) => {
      background.draw();
    });
  }
  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < App.interval) return;
      then = now - (delta % App.interval);
      //

      if (this.gameHandler.status !== "PLAYING") return;

      //
      App.ctx.clearRect(0, 0, App.width, App.height);
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      for (let i = this.walls.length - 1; i >= 0; i--) {
        this.walls[i].update();
        this.walls[i].draw();
        if (this.walls[i].isOutside) {
          this.walls.splice(i, 1);
          continue;
        }

        if (this.walls[i].canGenerateNext) {
          this.walls[i].generatedNext = true;
          const newWall = new Wall({
            type: Math.random() > 0.3 ? "SMALL" : "BIG",
          });
          this.walls.push(newWall);

          if (Math.random() < 0.5) {
            const x = newWall.x + newWall.width / 2;
            const y = newWall.y2 - newWall.gapY / 2;
            this.coins.push(new Coin(x, y, newWall.vx));
          }
        }
        if (true) {
          if (this.walls[i].isColliding(this.player.boundingBox)) {
            this.gameHandler.status = "FINISHED";
            break;
          }
        } else {
          if (this.walls[i].isColliding(this.player.boundingBox)) {
            this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
          } else {
            this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
          }
        }
      }

      for (let i = this.coins.length - 1; i >= 0; i--) {
        this.coins[i].update();
        this.coins[i].draw();
        if (this.coins[i].x + this.coins[i].width < 0) {
          this.coins.splice(i, 1);
          continue;
        }

        if (this.coins[i].boundingBox.isColliding(this.player.boundingBox)) {
          this.coins.splice(i, 1);
          this.score.coinCount += 1;
        }
      }

      this.player.update();
      this.player.draw();

      // if y map out

      this.score.update();
      this.score.draw();
    };
    requestAnimationFrame(frame);
  }
}
