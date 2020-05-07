export default (first, second) => {
  if (!first || !second) {
    return;
  }
  const vx = first.posX - second.posX;
  const vy = first.posY - second.posY;
  return Math.sqrt(vx * vx + vy * vy);
};
