import EventManager from "./EventListener";
import Record, { RecordList } from "./Record";
import Renderer from "./Renderer";
import Key from "./Key";
import config from "../../src/.asciiEngine/config";
import run from "../game/game";
import TextManager from "./TextManager";
import Vector from "./Vector";
let WIDTH = 80;
let HEIGHT = 24;

const layers: RecordList = new RecordList();
const eventManager: EventManager = new EventManager();
const renderer = new Renderer();
renderer.setSize(35);
const textManager: TextManager = new TextManager(WIDTH, HEIGHT);

function getWidth() {
  return WIDTH;
}
function getHeight() {
  return HEIGHT;
}

function setFontSize(px: number) {
  renderer.setSize(px);
}

function on(event: string, cb: (...args) => void) {
  eventManager.on(event, cb);
}

function addLayer(rec: Record) {
  layers.add(rec);
  eventManager.call("layerAdded", rec);
}

function removeLayer(name?: string) {
  layers.remove(name);
  eventManager.call("layerRemoved", name);
}

function setSize(width: number, height: number) {
  WIDTH = width;
  HEIGHT = height;
}

function setTitle(title: string) {
  document.head.querySelector("title").textContent =
    title + (config.activated ? "" : " - ASCII Engine");
}

function blanks(length: number) {
  let t = "";
  for (let i = 0; i < length; i++) {
    t += " ";
  }
  return t;
}

const draw = () => {
    textManager.clear();
  textManager.drawText(
    Vector.zero,
    document.head.querySelector("title").textContent +
    " \n" +
    blanks(document.head.querySelector("title").textContent.length+1)
  );
  eventManager.call("render", renderer, renderer.frames, layers);
  let maxZ = 0;
  layers.foreach((el) => { renderer.addLayer(el.name, el.layer); if (el.layer.z > maxZ) { maxZ = el.layer.z } });
  textManager.update(renderer, maxZ);
  renderer.commit();
  eventManager.call("afterRender");
  requestAnimationFrame(draw);
};

function isActivated(): boolean {
  return config.activated;
}

//setup Eventlisteners
addEventListener("keydown", (el) =>
  eventManager.call(
    "press",
    new Key(el.keyCode, el.key, el.code, el.ctrlKey, el.altKey, el.repeat)
  )
);
addEventListener("keyup", (el) =>
  eventManager.call(
    "release",
    new Key(el.keyCode, el.key, el.code, el.ctrlKey, el.altKey, el.repeat)
  )
);
export default {
  addLayer,
  removeLayer,
  renderer,
  on,
  eventManager,
  setSize,
  setFontSize,
  getWidth,
  setTitle,
  getHeight,
  isActivated,
  textManager
};
run();
draw();
