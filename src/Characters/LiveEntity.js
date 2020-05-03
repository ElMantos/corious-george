class LiveEntity {
  name;
  posX;
  posY;
  speedX;
  speedY;

  constructor(name, id, posX, posY, speedX, speedY) {
    this.name = name;
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  updatePos() {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }

  setSpeedX(speed) {
    this.speedX = speed;
  }

  setSpeedY(speed) {
    this.speedY = speed;
  }
}

export default LiveEntity;
