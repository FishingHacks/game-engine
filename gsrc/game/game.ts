//#region ignore
import Color from "../ASE/Color";
import Tile from "../ASE/Tile";
import Vector from "../ASE/Vector";
import game from "../ASE/index";
import Record, { RecordList } from "../ASE/Record";
import Layer from "../ASE/Layer";
import Key from "../ASE/Key";
import keyCode from "../ASE/KeyCodes";
export default setup;
//#endregion

//setup your game
function setup() {
  console.log("setting up...");
  let WIDTH = game.getWidth();
  let HEIGHT = game.getHeight();

  const player = new Tile({
    background: new Color(0, 0, 0, 0),
    char: "@",
    color: new Color(255, 0, 0),
    isVisible: true,
    pos: new Vector(WIDTH, HEIGHT).center,
  });

  const backgroundTiles = Array.from({ length: WIDTH * HEIGHT }, (_, i) => {
    const x = i % WIDTH;
    1;
    const y = Math.floor(i / WIDTH);

    return new Tile({
      char: ".",
      pos: new Vector(x, y),
    });
  });

  game.addLayer(
    new Record(
      "background",
      new Layer({ size: new Vector(WIDTH, HEIGHT), z: 1 })
    )
  );
  game.addLayer(
    new Record(
      "foreground",
      new Layer({ size: new Vector(WIDTH, HEIGHT), z: 2 })
    )
  );

    game.setTitle("Test Game")

  game.on("render", (a, b, layers: RecordList) => {
    backgroundTiles.forEach((el) => layers.get("background").layer.draw(el));
    layers.get("foreground").layer.draw(player);
  });

  game.on("press", (key: Key) => {
    if (key.keyCode == keyCode.leftarrow || key.keyCode==keyCode.a) {
      if (player.pos.x < 1) return;
      player.pos.add(Vector.left);
      if (game.textManager.isTextAt(player.pos)) player.pos.add(Vector.right);
    }
    if (key.keyCode == keyCode.rightarrow || key.keyCode == keyCode.d) {
      if (player.pos.x >= WIDTH - 1) return;
      player.pos.add(Vector.right);
      if (game.textManager.isTextAt(player.pos)) player.pos.add(Vector.left);
      //a
    }
    if (key.keyCode == keyCode.uparrow || key.keyCode == keyCode.w) {
      if (player.pos.y < 1) return;
      player.pos.add(Vector.up);
      if (game.textManager.isTextAt(player.pos)) player.pos.add(Vector.down);
    }
    if (key.keyCode == keyCode.downarrow || key.keyCode == keyCode.s) {
      if (player.pos.y >= HEIGHT - 1) return;
      player.pos.add(Vector.down);
      if (game.textManager.isTextAt(player.pos)) player.pos.add(Vector.up);
    }
  });
}
