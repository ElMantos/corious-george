class Indicator {
  indicator;
  max;
  constructor(elementId, max) {
    this.indicator = document.getElementById(elementId);
    this.max = max;
  }

  setPercentage(currentAmount) {
    const width = (100 / this.max) * currentAmount;

    this.indicator.style.width = `${width <= 100 ? width : 100}%`;
  }

  setMax = max => {
    this.max = max;
  };
}

export default Indicator;
