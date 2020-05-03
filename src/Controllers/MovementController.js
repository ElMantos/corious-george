class MovementController {
  expectedKey;
  callback;
  shouldCall;
  stopCallback;
  interval = () => null;
  constructor(callback, stopCallback) {
    this.callback = callback;
    this.stopCallback = stopCallback;
  }

  stop = () => {
    this.interval();
    this.stopCallback();
    this.shouldCall = false;
  };

  run = () => {
    this.interval = this.callback();
  };
}

export default MovementController;
