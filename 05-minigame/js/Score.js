import App from "./App.js";
import Coin from "./Coin.js";

export default class Score {
  constructor() {
    this.coin = new Coin(App.width - 50, 50, 0);

    this.distCount = 0;
    this.coinCount = 0;
  }
  update() {
    this.distCount += 1 / 60;
  }
  draw() {
    this.coin.update();
    this.coin.draw();

    App.ctx.font = "55px Jua";
    App.ctx.fillStyle = "#F1F1F1";
    App.ctx.textAlign = "right";
    App.ctx.fillText(this.coinCount, App.width - 90, 70);
    App.ctx.fillText;

    App.ctx.fillStyle = "#F1F1F1";
    App.ctx.textAlign = "left";
    App.ctx.fillText(Math.floor(this.distCount) + "m", 25, 70);
    App.ctx.fillText;
  }
}
