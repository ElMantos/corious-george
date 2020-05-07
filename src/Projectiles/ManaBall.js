import Projectile from "./Projectile";

import projectileSprite from "~/assets/sprites/projectile-mana.png";

class ManaBall extends Projectile {
  sprite;
  frameX = 0;
  width = 50;
  height = 51;
  duration = 1000;
  spriteInterval;

  constructor(posX, posY, angle, speedX, speedY, ownerID, width, height) {
    super(posX, posY, angle, speedX, speedY, ownerID, width, height);

    this.sprite = new Image();
    this.sprite.src = projectileSprite;
    this.updateAnimation();
  }

  static getSpeedMultiplies() {
    return 9;
  }

  static energyRequired() {
    return 5;
  }

  getSpritesOffsetX = () => {
    return this.width * this.frameX;
  };

  getSpritesOffsetY = () => {
    return 0;
  };

  clean = () => {
    clearInterval(this.spriteInterval);
  };

  updateAnimation = () => {
    this.spriteInterval = setInterval(() => {
      this.frameX = this.frameX < 6 ? this.frameX + 1 : 1;
    }, this.duration / 6);
  };
}

export default ManaBall;
