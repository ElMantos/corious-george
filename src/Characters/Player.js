import LiveEntity from "./LiveEntity";

class Player extends LiveEntity {
  maxSpeed;
  velocity;
  constructor(name, id, posX, posY) {
    super(name, id, posX, posY, 0, 0);
    this.maxSpeed = 2;
    this.velocity = 0;
    this.velocitySpeed = 1 / 10;
  }

  startMovement = callback => {
    const interval = setInterval(() => {
      if (this.velocity < this.maxSpeed && this.velocity >= 0) {
        callback();
      }
    }, 100);

    return () => clearInterval(interval);
  };

  moveTop = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX += this.velocity;
    });
  };

  moveBottom = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX -= this.velocity;
    });
  };

  moveRight = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY += this.velocity;
    });
  };

  moveLeft = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY -= this.velocity;
    });
  };

  move = direction => {
    switch (direction) {
      case "top":
        return this.moveTop();
      case "bottom":
        return this.moveBottom();
      case "left":
        return this.moveLeft();
      case "right":
        return this.moveRight();
    }
  };

  stop = () => {
    this.velocity = 0;
    this.speedY = 0;
    this.speedY = 0;
  };

  setController(controller) {
    this.controller = controller;
  }
}

export default Player;
