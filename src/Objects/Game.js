class Game {
  world;
  fps = 1000 / 30;

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
    if (this.isRunning) {
      this.world.repaint();
    }
  };
}

export default Game;
