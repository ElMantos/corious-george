import { updatePos, setSpeedX, setSpeedY } from "~/Traits";

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
  projectiles = [];

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

  setSpeedX(speed) {
    this.speedX = speed;
  }

  setSpeedY(speed) {
    this.speedY = speed;
  }
}

LiveEntity.prototype.updatePos = updatePos;
LiveEntity.prototype.setSpeedX = setSpeedX;
LiveEntity.prototype.setSpeedY = setSpeedY;

export default LiveEntity;
