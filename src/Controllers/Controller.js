class Controller {
  left;
  right;
  top;
  bottom;
  e;

  shouldRun = false;

  constructor({ left, right, top, bottom, e }) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.e = e;
  }

  handleMovement = key => {
    if (!this.shouldRun) {
      return;
    }

    switch (key) {
      case "ArrowUp":
        this.top.run();
        break;
      case "ArrowLeft":
        this.left.run();
        break;
      case "ArrowRight":
        this.right.run();
        break;
      case "ArrowDown":
        this.bottom.run();
        break;
      case "e":
        this.e.run();
    }
  };

  run = e => {
    if (!this.shouldRun) {
      this.shouldRun = true;
    }

    this.handleMovement(e.key);
  };

  stop = () => {
    [this.left, this.right, this.top, this.bottom].forEach(controller =>
      controller.stop()
    );
    this.shouldRun = false;
  };
}

export default Controller;
