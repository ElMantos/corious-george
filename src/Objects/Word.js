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
    this.ctx.fillText(entity.name, entity.posX, entity.posY);
  }

  updateEntityPosition = entity => {
    this.drawEntity(entity);

    entity.updatePos();

    if (testCollisionBetweenEntities(entity, this.player)) {
      console.log("coliding");
    }
  };

  repaint = () => {
    this.clear();
    this.liveEntities.forEach(this.updateEntityPosition);
  };
}

export default World;
