class MovementController {
  expectedKey;
  callback;
  stopCallback;

  constructor(callback, stopCallback) {
    this.callback = callback;
    this.stopCallback = stopCallback;
  }

  stop = () => {
    this.stopCallback();
  };

  run = () => this.callback();
}

export default MovementController;
