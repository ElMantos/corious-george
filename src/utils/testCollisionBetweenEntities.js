import getDistanceBetweenEntities from "./getDistaceBetweenEntities";

export default (first, second) => {
  const distance = getDistanceBetweenEntities(first, second);

  return !isNaN(distance) && distance < first.width && first.id !== second.id;
};
