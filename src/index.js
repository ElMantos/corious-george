import { Game as GameClass, World as WorldClass } from "./Objects";
import { LiveEntity } from "./Characters";
import { createPlayer } from "./utils";
import {
  Controller as ControllerClass,
  MovementController
} from "./Controllers";

let ctx = document.getElementById("ctx").getContext("2d");

ctx.canvas.width = 500; // window.innerWidth;
ctx.canvas.height = 500; // window.innerHeight;

const Player = createPlayer();
Player.fillColor = "blue";
const Controller = new ControllerClass({
  top: new MovementController(
    () => Player.move("top"),
    () => Player.stop()
  ),
  left: new MovementController(
    () => Player.move("left"),
    () => Player.stop()
  ),
  right: new MovementController(
    () => Player.move("right"),
    () => Player.stop()
  ),
  bottom: new MovementController(
    () => Player.move("bottom"),
    () => Player.stop()
  ),
  e: new MovementController(
    () => Player.shoot(),
    () => null
  )
});

window.onkeydown = Controller.run;

document.getElementById("ctx").onmousemove = function(e) {
  Player.setAimDirection(e.clientX, e.clientY);
};

window.onkeyup = Controller.stop;

const World = new WorldClass(ctx);
const e = new LiveEntity("E", "e-1", 80, 300, 10, -3);
const e2 = new LiveEntity("E2", "e-2", 200, 400, 7, 3);
// const e3 = new LiveEntity("E3", "e-3", 345, 200, 3, 1);
// const e4 = new LiveEntity("E4", "e-4", 123, 400, 2, 4);

World.setLiveEntities([e, e2]);
World.setPlayer(Player);

const Game = new GameClass(World);

window.onmousedown = function() {
  Game.run();
};
setInterval(Game.render, Game.fps);
