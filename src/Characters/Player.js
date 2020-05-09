import LiveEntity from "./LiveEntity";
import { ManaBall } from "~/Projectiles";
import { Indicator, StatusBar, Inventory } from "~/Controllers";

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
  regainingHealth;
  experience = 0;
  nextLevelExp = 100;
  level = 1;
  inventoryCapacity = 7;
  inventory;
  isGameRunning = false;

  equippedItems = {
    helmet: null,
    armor: null,
    weapon: null
  };

  constructor(name, id, posX, posY, height, width) {
    super(name, id, posX, posY, 0, 0, height, width);
    this.maxSpeed = 1;
    this.velocity = 0;
    this.velocitySpeed = 1 / 10;
    this.health = 50;
    this.energy = 50;
    this.maxEnergy = 50;
    this.maxHealth = 50;
    this.strength = 5;
    this.sprite = new Image(this.width, this.height);
    this.sprite.src = playerSprites;
    this.healthIndicator = new Indicator("health", this.maxHealth);
    this.energyIndicator = new Indicator("energy", this.maxEnergy);
    this.statusIndicator = new StatusBar(
      this.experience,
      this.nextLevelExp,
      this.health,
      this.energy,
      this.strength,
      this.level,
      "experience",
      "characteristics"
    );
    this.inventory = new Inventory();

    this.statusIndicator.redraw();
  }

  takeDamage = amount => {
    this.healthIndicator.setPercentage(this.health);
    this.health -= amount;
    this.regainHealth();
    this.repaintStatus();
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
    this.setAimDirection(-90);
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY -= this.velocity;
    });
  };

  moveBottom = () => {
    this.setAimDirection(90);
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedY += this.velocity;
    });
  };

  moveRight = () => {
    this.setAimDirection(0);
    return this.startMovement(() => {
      this.velocity += this.velocitySpeed;
      this.speedX += this.velocity;
    });
  };

  moveLeft = () => {
    this.setAimDirection(180);
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

  setAimDirection = deg => {
    this.aimDirection = deg;
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
      const interval = setInterval(() => {
        this.regainingEnergy = true;
        console.log(this.isGameRunning);

        if (!this.isGameRunning) {
          return;
        }

        if (this.energy >= this.getMaxEnergy()) {
          clearInterval(interval);
          this.regainingEnergy = false;
        } else {
          this.energy += 1;
          this.energyIndicator.setPercentage(this.energy);
        }
        this.repaintStatus();
      }, 500);
    }
  };

  regainHealth = () => {
    if (!this.regainingHealth) {
      const interval = setInterval(() => {
        this.regainingHealth = true;
        if (!this.isGameRunning) {
          return;
        }

        if (this.health >= this.getMaxHealth()) {
          clearInterval(interval);
          this.regainingHealth = false;
        } else {
          this.health += 1;
          this.healthIndicator.setPercentage(this.health);
        }
        this.repaintStatus();
      }, 3000);
    }
  };

  getSpritesOffsetX = () => {
    return this.width * this.frameX;
  };

  getSpritesOffsetY = () => {
    return this.height * this.frameY;
  };

  addExperience = exp => {
    this.experience += exp;
    this.updateLevel();
  };

  updateLevel = () => {
    if (this.experience >= this.nextLevelExp) {
      this.level++;
      this.strength = this.strength + this.strength * 1.5;
      this.maxEnergy = this.energy * 1.5;
      this.energyIndicator.setMax(this.getMaxEnergy());
      this.maxHealth = this.health * 1.5;
      this.healthIndicator.setMax(this.getMaxHealth());
      this.takeDamage(0);
      if (this.shootingSpeed > 100) {
        this.shootingSpeed -= 50;
      }
      this.setNextLevelExp();
    }
    this.repaintStatus();
  };

  setNextLevelExp = () => {
    this.nextLevelExp = this.nextLevelExp + this.nextLevelExp * 1.5;
  };

  repaintStatus = () => {
    this.statusIndicator.setCurrExp(this.experience);
    this.statusIndicator.setNextLevelExp(this.nextLevelExp);
    this.statusIndicator.setLevel(this.level);
    this.statusIndicator.setEnergy(this.energy);
    this.statusIndicator.setHealth(this.health);
    this.statusIndicator.setStrength(this.strength);
    this.statusIndicator.redraw();
  };

  addItem = item => {
    this.inventory.addItem(item);
  };

  toggleEquip = item => {
    const currItem = this.equippedItems[item.type];
    if (currItem?.id === item.id) {
      this.equippedItems[item.type] = null;
      currItem.setEquipped(false);
    } else if (currItem) {
      this.equippedItems[item.type] = item;
      currItem.setEquipped(false);
    } else {
      this.equippedItems[item.type] = item;
      item.setEquipped(true);
    }

    this.inventory.redraw();
    console.log(item);
    console.log(this.equippedItems);
    this.resetStats();
  };

  resetStats = () => {
    this.energyIndicator.setMax(this.getMaxEnergy());
    this.energyIndicator.setPercentage(this.energy);
    if (this.energy > this.getMaxEnergy()) {
      this.energy = this.maxEnergy;
    }
    this.healthIndicator.setMax(this.getMaxHealth());
    this.healthIndicator.setPercentage(this.health);

    this.regainHealth();
    this.regainEnergy();
  };

  getMaxHealth = () => {
    let max = this.maxHealth;
    if (this.equippedItems.armor) {
      max += this.equippedItems.armor.bonus;
    }
    return max;
  };

  getMaxEnergy = () => {
    let max = this.maxEnergy;
    if (this.equippedItems.helmet) {
      max += this.equippedItems.helmet.bonus;
    }
    return max;
  };

  updateGameStatus = val => {
    this.isGameRunning = val;
  };
}

export default Player;
