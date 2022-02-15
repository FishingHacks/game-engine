import Layer from "./Layer";
import Renderer from "./Renderer";
import Vector from "./Vector";
import * as _Layer from "./Layer";
import Tile from "./Tile";
import Color from "./Color";

class cLayer extends Layer {
  private __z: number;

  constructor(options: _Layer.LayerConstructorOptions) {
    super(options);
    this.opacity = options.opacity || 1;
    this.isVisible = options.isVisible || true;
    this.pos = options.pos || Vector.zero;
    this.size = options.size;

    this.__z = options.z || 0;
  }

  set z(value) {
    this.__z = value;
  }

  get z(): number {
    return this.__z;
  }
}

export default class TextManager {
  private layer: cLayer;
  private tiles: Array<Tile> = [];

  constructor(w: number, h: number) {
    this.layer = new cLayer({
      opacity: 0,
      isVisible: true,
      pos: Vector.zero,
      size: new Vector(w, h),
      z: 0,
    });
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        this.tiles.push(
          new Tile({
            background: new Color(0, 0, 0, 1),
            char: "",
            color: new Color(255, 255, 255, 1),
            isVisible: true,
            pos: new Vector(x, y),
          })
        );
      }
    }
  }

  drawText(pos: Vector, text: string) {
    pos = pos.clone;
    let textArray: Array<string> = [];
    text.split("\n").forEach((el) => textArray.push(el));
    textArray.forEach((el) => {
      for (let i in el as any) {
        this.tiles.find(
          (el) => el.pos.x == pos.x + Number(i) && el.pos.y == pos.y
        ).char = el[i];
      }
      pos.y++;
    });
  }

  isTextAt(position: Vector) {
    console.log(
      this.tiles.find((el) => el.pos.x == position.x && el.pos.y == position.y)
        .char
    );
    return (
      this.tiles.find((el) => el.pos.x == position.x && el.pos.y == position.y)
        .char != ""
    );
  }

  clear() {
    this.tiles.forEach((el) => (el.char = ""));
  }

  update(renderer: Renderer, maxZ: number) {
    this.layer.z = maxZ + 10;
    this.tiles.forEach((el) => this.layer.draw(el));
    let t = "";
    this.tiles.forEach((el) => (t += el.char));
    renderer.addLayer("text", this.layer);
  }
}
