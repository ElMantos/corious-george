import Enemy from "./Enemy";

import enemySprite from "~/assets/sprites/enemy-green.png";

class EnemyGreen extends Enemy {
  constructor(name, id, posX, posY, speedX, speedY) {
    const sprite = new Image();
    sprite.src = enemySprite;
    super(name, id, posX, posY, speedX, speedY, sprite);
  }
}
export default EnemyGreen;
