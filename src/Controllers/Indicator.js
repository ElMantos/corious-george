class Indicator {
  indicator;
  max;
  constructor(elementId, max) {
    this.indicator = document.getElementById(elementId);
    this.max = max;
  }

  setPercentage(currentAmount) {
    this.indicator.style.width = `${(100 / this.max) * currentAmount}%`;
  }
}

export default Indicator;
