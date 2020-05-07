import LiveEntity from "./LiveEntity";
import { ManaBall } from "~/Projectiles";
import { Indicator } from "~/Controllers";

import playerSprites from "~/assets/sprites/hero.png";

class Player extends LiveEntity {
  maxSpeed;
  velocity;
  isMoving;
  health;
  maxSpeed;
  velocity;
  velocitySpeed;
  aimDirection = 0;
  shootingInterval;
  shootingSpeed = 500;
  isShooting = false;
  canShoot = true;
  sprite;
  frameX = 0;
  frameY = 0;
  spriteInterval;
  regainingEnergy;

  constructor(name, id, posX, posY, height, width) {
    super(name, id, posX, posY, 0, 0, height, width);
    this.maxSpeed = 1;
    this.velocity = 0;
    this.velocitySpeed = 1 / 10;
    this.health = 50;
    this.energy = 50;
    this.maxEnergy = 50;
    this.sprite = new Image(this.width, this.height);
    this.sprite.src = playerSprites;
    this.healthIndicator = new Indicator("health", this.health);
    this.energyIndicator = new Indicator("energy", this.energy);
  }

  takeDamage = amount => {
    this.healthIndicator.setPercentage(this.health);
    this.health -= amount;
  };

  isAlive = () => this.health > 0;

  startMovement = callback => {
    if (!this.isMoving) {
      this.updateAnimation();
      this.isMoving = true;
      this.movementInterval = setInterval(() => {
        if (this.velocity < this.maxSpeed && this.velocity >= 0) {
          callback();
        }
      }, 10);
    }
  };

  moveTop = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY -= this.velocity;
    });
  };

  moveBottom = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY += this.velocity;
    });
  };

  moveRight = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX += this.velocity;
    });
  };

  moveLeft = () => {
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX -= this.velocity;
    });
  };

  updateAnimation = () => {
    if (!this.velocity) {
      this.spriteInterval = setInterval(() => {
        this.frameX = this.frameX < 5 ? this.frameX + 1 : 1;

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
    }
  };

  move = direction => {
    switch (direction) {
      case "top":
        return this.moveTop();
      case "bottom":
        return this.moveBottom();
      case "left":
        return this.moveLeft();
      case "right":
        return this.moveRight();
    }
  };

  stop = () => {
    this.velocity = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.isMoving = false;
    clearInterval(this.movementInterval);
    clearInterval(this.spriteInterval);
    this.frameX = 0;
  };

  setController(controller) {
    this.controller = controller;
  }

  setAimDirection = (mouseX, mouseY) => {
    this.aimDirection =
      (Math.atan2(mouseY - this.posY, mouseX - this.posX) / Math.PI) * 180;
  };

  startShooting = () => {
    if (!this.isShooting) {
      this.createProjectile();

      this.shootingInterval = setInterval(
        this.createProjectile,
        this.shootingSpeed
      );
      this.isShooting = true;
    }
  };

  stopShooting = () => {
    clearInterval(this.shootingInterval);
    this.isShooting = false;
  };

  createProjectile = () => {
    if (this.canShoot && this.energy - ManaBall.energyRequired() >= 0) {
      this.energy -= ManaBall.energyRequired();

      this.projectiles.push(
        new ManaBall(
          this.posX,
          this.posY,
          this.aimDirection,
          Math.cos((this.aimDirection / 180) * Math.PI) *
            ManaBall.getSpeedMultiplies(),
          Math.sin((this.aimDirection / 180) * Math.PI) *
            ManaBall.getSpeedMultiplies(),
          this.id,
          5,
          5
        )
      );

      const currentIndex = this.projectiles.length - 1;
      setTimeout(() => {
        this.projectiles[currentIndex].clean();
        delete this.projectiles[currentIndex];
      }, this.projectiles[currentIndex].duration);
      this.canShoot = false;

      setTimeout(() => {
        this.canShoot = true;
      }, this.shootingSpeed - 10);
    }
    this.regainEnergy();

    this.energyIndicator.setPercentage(this.energy);
  };

  regainEnergy = () => {
    if (!this.regainingEnergy) {
      console.log("setting interval");
      const interval = setInterval(() => {
        this.regainingEnergy = true;

        if (this.energy >= this.maxEnergy) {
          clearInterval(interval);
          this.regainingEnergy = false;
        } else {
          this.energy += 1;
          this.energyIndicator.setPercentage(this.energy);
        }
      }, 500);
    }
  };

  getSpritesOffsetX = () => {
    return this.width * this.frameX;
  };

  getSpritesOffsetY = () => {
    return this.height * this.frameY;
  };
}

export default Player;
