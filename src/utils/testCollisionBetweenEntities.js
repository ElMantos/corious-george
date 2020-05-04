import getDistanceBetweenEntities from "./getDistaceBetweenEntities";

export default (first, second) => {
  const distance = getDistanceBetweenEntities(first, second);

  return (
    !isNaN(distance) && distance < first.width / 2 && first.id !== second.id
  );
};
