import { testCollisionBetweenEntities } from "~/utils";

class World {
  liveEntities = [];
  height = 0;
  width = 0;
  ctx;
  player;

  constructor(ctx) {
    this.ctx = ctx;
    this.height = ctx.canvas.height;
    this.width = ctx.canvas.width;
  }

  setLiveEntities = entities => {
    this.liveEntities = entities;
  };

  setPlayer = player => {
    this.player = player;
    this.liveEntities = this.liveEntities.concat(player);
  };

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawEntity(entity) {
    this.ctx.save();
    this.ctx.fillStyle = entity.fillColor;
    this.ctx.fillRect(
      entity.posX - entity.width / 2,
      entity.posY - entity.height / 2,
      30,
      30
    );
    this.ctx.restore();
  }

  updateEntityPosition = entity => {
    if (
      entity.posX + entity.width / 2 <= 0 ||
      entity.posX + entity.width / 2 >= this.width
    ) {
      entity.setSpeedX(-entity.speedX);
    }
    if (
      entity.posY + entity.height / 2 <= 0 ||
      entity.posY + entity.height / 2 >= this.height
    ) {
      entity.setSpeedY(-entity.speedY);
    }

    entity.updatePos();

    if (testCollisionBetweenEntities(entity, this.player)) {
      entity.setSpeedX(-entity.speedX);
      entity.setSpeedY(-entity.speedY);
      setTimeout(() => {
        entity.setSpeedX(-entity.speedX);
        entity.setSpeedY(-entity.speedY);
      }, 100);
      this.player.takeDamage(entity.strength);
    }

    this.drawEntity(entity);
    this.ctx.fillText(`HP: ${this.player.health}`, 10, 20);
  };

  repaint = () => {
    this.clear();
    this.liveEntities.forEach(this.updateEntityPosition);
  };
}

export default World;
