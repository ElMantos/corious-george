class LiveEntity {
  name;
  posX;
  posY;
  speedX;
  speedY;
  height;
  width;
  strength = 5;
  fillColor = "green";

  constructor(name, id, posX, posY, speedX, speedY, height = 30, width = 30) {
    this.name = name;
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.height = height;
    this.width = width;
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
