class Game {
  world;
  fps = 1000 / 7;

  constructor(world) {
    this.world = world;
  }

  run = () => {
    this.isRunning = true;
  };

  stop = () => {
    this.isRunning = false;
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
