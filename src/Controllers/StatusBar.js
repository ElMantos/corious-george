class StatusBar {
  currExp;
  nextLevelExp;
  statusNode;
  levelNode;
  level;
  health;
  energy;
  strength;
  constructor(
    currExp,
    nextLevelExp,
    health,
    energy,
    strength,
    level,
    statusNodeId,
    statsNodeId
  ) {
    this.currExp = currExp;
    this.nextLevelExp = nextLevelExp;
    this.level = level;
    this.health = health;
    this.energy = energy;
    this.strength = strength;
    this.levelNode = document.getElementById(statusNodeId);
    this.statsNode = document.getElementById(statsNodeId);
  }

  redraw() {
    this.levelNode.innerHTML = `
    EXP: ${this.currExp} / ${this.nextLevelExp} </br>
    LVL: ${this.level}`;
    this.statsNode.innerHTML = `
    HP: ${this.health} </br>
    MP ${this.energy} </br>
    STR: ${this.strength}
    `;
  }

  setHealth = health => {
    this.health = health;
  };

  setStrength = strength => {
    this.strength = strength;
  };

  setEnergy = energy => {
    this.energy = energy;
  };

  setLevel = level => {
    this.level = level;
  };

  setCurrExp = currExp => {
    this.currExp = currExp;
  };

  setNextLevelExp = nextLevelExp => {
    this.nextLevelExp = nextLevelExp;
  };
}

export default StatusBar;
