import LiveEntity from "./LiveEntity";

class Player extends LiveEntity {
  maxSpeed;
  velocity;
  isMoving;
  health;
  maxSpeed;
  velocity;
  velocitySpeed;

  constructor(name, id, posX, posY, height, width) {
    super(name, id, posX, posY, 0, 0, height, width);
    this.maxSpeed = 1;
    this.velocity = 0;
    this.velocitySpeed = 1 / 10;
    this.health = 50;
  }

  takeDamage = amount => (this.health -= amount);

  isAlive = () => this.health > 0;

  startMovement = callback => {
    if (!this.isMoving) {
      this.isMoving = true;
      this.movementInterval = setInterval(() => {
        if (this.velocity < this.maxSpeed && this.velocity >= 0) {
          callback();
        }
      }, 10);
    }
  };

  moveTop = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY -= this.velocity;
    });
  };

  moveBottom = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY += this.velocity;
    });
  };

  moveRight = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX += this.velocity;
    });
  };

  moveLeft = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX -= this.velocity;
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
    this.speedX = 0;
    this.isMoving = false;
    clearInterval(this.movementInterval);
  };

  setController(controller) {
    this.controller = controller;
  }
}

export default Player;
