import getDistanceBetweenEntities from "./getDistaceBetweenEntities";

export default (first, second) =>
  getDistanceBetweenEntities(first, second) < 10 && first.id !== second.id;
