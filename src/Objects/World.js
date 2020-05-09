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
    this.ctx.drawImage(
      entity.sprite,
      entity.getSpritesOffsetX(),
      entity.getSpritesOffsetY(),
      entity.width,
      entity.height,
      entity.posX,
      entity.posY,
      entity.width,
      entity.height
    );
    this.ctx.restore();
  }

  renderProjectiles = () => {
    this.liveEntities
      .map(e => e.projectiles)
      .forEach(projectile => {
        projectile.forEach(p => {
          for (let i = 0; i < this.liveEntities.length; i++) {
            if (
              testCollisionBetweenEntities(this.liveEntities[i], p, true) &&
              this.liveEntities[i].alive() &&
              p.isEffective()
            ) {
              this.liveEntities[i].takeDamage(this.player.getStrength());
              p.setEffective(false);
              const tempX = this.liveEntities[i].speedX;
              const tempY = this.liveEntities[i].speedY;
              this.liveEntities[i].setSpeedX(p.speedX);
              this.liveEntities[i].setSpeedY(p.speedY);
              setTimeout(() => {
                if (this.liveEntities[i].alive()) {
                  this.liveEntities[i].setSpeedX(tempX);
                  this.liveEntities[i].setSpeedY(tempY);
                } else {
                  this.liveEntities[i].setSpeedX(0);
                  this.liveEntities[i].setSpeedY(0);
                }
              }, 100);
              if (!this.liveEntities[i].alive()) {
                this.player.addExperience(this.liveEntities[i].experience);
                this.liveEntities[i].die();
              }
              return;
            }
          }
          this.updateEntityPosition(p);
        });
      });
  };

  updateEntityPosition = entity => {
    const isLiveEntity =
      Object.getPrototypeOf(entity.constructor).name === "LiveEntity" ||
      Object.getPrototypeOf(entity.constructor).name === "Enemy";
    if (
      (entity.posX + entity.width / 2 <= 0 ||
        entity.posX + entity.width / 2 >= this.width) &&
      isLiveEntity
    ) {
      entity.setSpeedX(-entity.speedX);
    }
    if (
      (entity.posY + entity.height / 2 <= 0 ||
        entity.posY + entity.height / 2 >= this.height) &&
      isLiveEntity
    ) {
      entity.setSpeedY(-entity.speedY);
    }

    entity.updatePos();
    if (testCollisionBetweenEntities(entity, this.player) && entity.alive()) {
      entity.setSpeedX(-entity.speedX);
      entity.setSpeedY(-entity.speedY);
      setTimeout(() => {
        entity.setSpeedX(-entity.speedX);
        entity.setSpeedY(-entity.speedY);
      }, 100);
      this.player.takeDamage(entity.strength);
    }

    this.drawEntity(entity);
  };

  repaint = () => {
    this.clear();
    this.renderProjectiles();
    this.liveEntities.forEach(this.updateEntityPosition);
  };
}

export default World;
