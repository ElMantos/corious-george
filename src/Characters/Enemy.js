import LiveEntity from "./LiveEntity";

class Enemy extends LiveEntity {
  sprite;
  frameX = 0;
  frameY = 0;

  constructor(name, id, posX, posY, speedX, speedY, sprite) {
    super(name, id, posX, posY, speedX, speedY, 64, 64);

    this.sprite = sprite;
    this.updateAnimation();
  }

  getSpritesOffsetX = () => {
    return this.width * this.frameX;
  };

  getSpritesOffsetY = () => {
    return this.height * this.frameY;
  };

  updateAnimation = () => {
    this.spriteInterval = setInterval(() => {
      this.frameX = this.frameX < 8 ? this.frameX + 1 : 1;

      if (this.speedX > 0) {
        this.frameY = 3;
      } else if (this.speedX < 0) {
        this.frameY = 2;
      } else if (this.speedY > 0) {
        this.frameY = 0;
      } else {
        this.frameY = 1;
      }
    }, 100);
  };
}
export default Enemy;
