import { Player as PlayerClass } from "~/Characters";

export default () => {
  const Player = new PlayerClass("P", "player", 30, 30, 65, 32);

  return Player;
};
