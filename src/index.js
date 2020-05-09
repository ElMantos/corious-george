import { Game as GameClass, World as WorldClass } from "./Objects";
import { EnemyGreen, EnemyRed } from "./Characters";
import { createPlayer } from "./utils";
import {
  Controller as ControllerClass,
  MovementController
} from "./Controllers";

import "./style.scss";
import { Armor, Helmet } from "./Items";

let ctx = document.getElementById("ctx").getContext("2d");

ctx.canvas.width = 1300; // window.innerWidth;
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
    () => Player.startShooting(),
    () => Player.stopShooting()
  )
});

window.onkeydown = Controller.run;

document.getElementById("ctx").onmousemove = function(e) {
  Player.setAimDirection(e.clientX, e.clientY);
};

window.onkeyup = Controller.stop;

const World = new WorldClass(ctx);
const e = new EnemyRed("E", "e-1", 80, 300, 1, 3);
const e2 = new EnemyGreen("E2", "e-2", 200, 400, 3, 1);
const e3 = new EnemyGreen("E3", "e-3", 200, 200, 2, 2);

const helmet = new Helmet();
const armor = new Armor();

Player.addItem(helmet);
Player.addItem(armor);

// World.setLiveEntities([e, e2, e3]);
World.setPlayer(Player);

window.addEventListener("toggleEquip", e => {
  console.log(e);
  e.detail.toggleEquip(Player);
});

const Game = new GameClass(World);

window.onmousedown = function() {
  Game.run();
};
setInterval(Game.render, Game.fps);
