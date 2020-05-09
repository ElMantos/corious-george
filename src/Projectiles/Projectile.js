import { updatePos, setSpeedX, setSpeedY } from "~/Traits";

class Projectile {
  fillColor = "black";

  constructor(posX, posY, angle, speedX, speedY, ownerID, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.angle = angle;
    this.speedX = speedX;
    this.speedY = speedY;
    this.id = ownerID;
    this.width = width;
    this.height = height;
    this.effective = true;
  }

  isEffective() {
    return this.effective;
  }

  setEffective(val) {
    this.effective = val;
  }
}

Projectile.prototype.updatePos = updatePos;
Projectile.prototype.setSpeedX = setSpeedX;
Projectile.prototype.setSpeedY = setSpeedY;

export default Projectile;
