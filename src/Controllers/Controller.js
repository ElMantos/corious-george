class Controller {
  left;
  right;
  top;
  bottom;

  shouldRun = false;

  constructor({ left, right, top, bottom }) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
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
