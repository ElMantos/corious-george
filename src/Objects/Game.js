class Game {
  world;
  fps = 1000 / 30;
  isRunning = false;
  constructor(world) {
    this.world = world;
    this.controls = document.querySelector(".pause");
  }

  run = () => {
    this.isRunning = true;
    this.controls.style.top = "-1000px";
  };

  stop = () => {
    this.isRunning = false;
    this.controls.style.top = "0px";
  };

  getIsRunning = () => {
    return this.isRunning;
  };

  render = () => {
    if (!this.world.player.isAlive()) {
      this.world.clear();
      this.stop();
      this.world.ctx.fillText("Game is over, you are dead", 150, 150);
    }
    if (this.isRunning) {
      this.world.repaint();
    }
  };
}

export default Game;
