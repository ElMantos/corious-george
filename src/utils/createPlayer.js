import { Player as PlayerClass } from "~/Characters";

export default () => {
  const Player = new PlayerClass("P", "player", 30, 30, 30, 5, 30, 20);

  return Player;
};
