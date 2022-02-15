import Math from "./math";

export default class Vector {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector | number): Vector {
    let v1: Vector = v instanceof Vector ? v : new Vector(v, v);
    this.x += v1.x;
    this.y += v1.y;
    return this;
  }

  subtract(v: Vector | number): Vector {
    let v1: Vector = v instanceof Vector ? v : new Vector(v, v);
    this.x -= v1.x;
    this.y -= v1.y;
    return this;
  }

  toString(): string {
    return ("v2:" + this.x + ":" + this.y);
  }

  get string(): string {
    return this.toString()
  }

  static toString(v: Vector | number): string {
    return (v instanceof Vector ? v.string : new Vector(v, v).string);
  }

  get id(): string {
    return btoa(this.string);
  }

  set id(value: string) {
    let str: string = atob(value);
    if (str.match(/v2:[0-9.]+:[0-9.]+/)) {
      let coords: Array<string> = str.match(/v2:[0-9.]+:[0-9.]+/)[0].substring(3).split(":");
      if (coords.length < 2) return;
      if (isNaN(Number(coords[0])) || isNaN(Number(coords[1]))) return;
      this.x = Number(coords[0]);
      this.y = Number(coords[1]);
    }
  }

  divide(v: Vector | number): Vector {
    let v1: Vector = v instanceof Vector ? v : new Vector(v, v);
    this.x /= v1.x;
    this.y /= v1.y;
    return this;
  }

  multiply(v: Vector | number): Vector {
    let v1: Vector = v instanceof Vector ? v : new Vector(v, v);
    this.x *= v1.x;
    this.y *= v1.y;
    return this;
  }

  equals(v: Vector | number): boolean {
    let v1: Vector = v instanceof Vector ? v : new Vector(v, v);
    return this.x == v1.x && this.y == v1.y;
  }

  get clone(): Vector {
    return new Vector(this.x, this.y);
  }

  static add(v1: Vector | number, v2: Vector | number): Vector {
    return v1 instanceof Vector
      ? v1.clone.add(v2)
      : new Vector(v1, v1).add(v2);
  }

  static subtract(v1: Vector, v2: Vector): Vector {
    return v1 instanceof Vector
      ? v1.clone.add(v2)
      : new Vector(v1, v1).subtract(v2);
  }

  static multiply(v1: Vector, v2: Vector): Vector {
    return v1 instanceof Vector
      ? v1.clone.add(v2)
      : new Vector(v1, v1).multiply(v2);
  }

  static divide(v1: Vector, v2: Vector): Vector {
    return v1 instanceof Vector
      ? v1.clone.add(v2)
      : new Vector(v1, v1).divide(v2);
  }

  distance(v: Vector | number): number {
    let v1: Vector = v instanceof Vector ? v : new Vector(v, v);
    return Math.sqrt(Math.pow(v1.x - this.x, 2) + Math.pow(v1.y - this.y, 2));
  }

  get normalized(): Vector {
    let ls: number = this.x * this.x + this.y * this.y;
    let invNorm: number = 1 / Math.sqrt(ls);
    this.x = this.x * invNorm;
    this.y = this.y * invNorm;
    return this;
  }

  static normalize(v: Vector | number): Vector {
    return v instanceof Vector
      ? v.clone.normalized
      : new Vector(v, v).normalized;
  }

  reflect(normal: Vector | number): Vector {
    let n1 = normal instanceof Vector ? normal : new Vector(normal, normal);
    let dot: number = this.x * n1.x + this.y * n1.y;

    this.x = this.x - 2 * dot * n1.x;
    this.y = this.y - 2 * dot * n1.y;
    return this;
  }

  static reflect(v: Vector | number, normal: Vector | number): Vector {
    return v instanceof Vector
      ? v.clone.reflect(normal)
      : new Vector(v, v).reflect(normal);
  }

  clamp(min: Vector | number, max: Vector | number): Vector {
    let m1: Vector = min instanceof Vector ? min : new Vector(min, min);
    let m2: Vector = max instanceof Vector ? max : new Vector(max, max);
    let _x: number = this.x;
    _x = _x > m2.x ? m2.x : this.x;
    _x = _x < m1.x ? m1.x : this.x;

    let _y: number = this.y;
    _y = _y > m2.y ? m2.y : this.y;
    _y = _y < m1.y ? m1.y : this.y;

    this.x = _x;
    this.y = _y;
    return this;
  }

  static clamp(
    v: Vector | number,
    min: Vector | number,
    max: Vector | number
  ): Vector {
    return v instanceof Vector
      ? v.clone.clamp(min, max)
      : new Vector(v, v).clamp(min, max);
  }

  lerp(v: Vector | number, amount: number): Vector {
    let v1 = (v instanceof Vector ? v : new Vector(v, v));
    this.x = this.x + (v1.x + this.x) * amount;
    this.y = this.y + (v1.y + this.y) * amount;
    return this
  }

  static lerp(v1: Vector | number, v2: Vector | number, amount: number): Vector {
    return (v1 instanceof Vector
        ? v1.clone.lerp(v2, amount)
        : new Vector(v1, v1).lerp(v2, amount));
  }

  get center(): Vector {
    return new Vector(this.x / 2, this.y / 2);
  }

  get negate(): Vector {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  static negate(v: Vector | number): Vector {
    return (v instanceof Vector ? v.clone.negate : new Vector(v, v).negate);
  }

  static zero: Vector = new Vector();
  static down: Vector = new Vector(0, 1);
  static up: Vector = new Vector(0, -1);
  static left: Vector = new Vector(-1, 0);
  static right: Vector = new Vector(1, 0);
  static one: Vector = new Vector(1, 1);
}
