import Layer from "./Layer";

export class RecordList {
  private _recs: Record[];
  constructor(...records: Record[]) {
    this._recs = records;
  }

  foreach(cb: (value?: Record, index?: number, array?: Record[])=>void) {
    this._recs.forEach((v, i, a) => cb(v, i, a));
  }

  add(rec: Record) {
    this._recs.push(rec);
  }

  get(name: string): Record|null {
    let rec: Record = null;
    this._recs.forEach((el) => {
      if (el.name == name) {
        rec = el;
      }
    });
    return rec;
    }
    
    clear() {
        while (this._recs.length > 0) {
            this._recs.shift();
        }
    }

    remove(name: string) {
        let newArr: Record[] = [];
        this._recs.forEach(el => {
            if (el.name != name) {
                newArr.push(el);
            }
        })
        this._recs = newArr;
    }
}

export default class Record {
  private _str;
  private _lay;
  constructor(name: string, layer: Layer) {
    this._str = name;
    this._lay = layer;
  }

  get name(): string {
    return this._str;
  }
  get layer(): Layer {
    return this._lay;
  }
}
