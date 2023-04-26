import App from "./App.js";

const app = new App();

window.addEventListener("load", () => {
  app.resize();
  app.render();
});
